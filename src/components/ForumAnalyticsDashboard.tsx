import { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Users, Target, RefreshCw } from 'lucide-react';
import { getForumStatistics, getForumPosts } from '../services/forumService';
import { getLeads } from '../services/leadsService';

export interface AnalyticsData {
  totalForumPosts: number;
  totalLeads: number;
  conversionRate: number;
  topForums: Array<{ name: string; count: number }>;
  topCategories: Array<{ name: string; count: number }>;
  leadsLastWeek: number;
  leadsLastMonth: number;
}

interface ForumAnalyticsDashboardProps {
  refresh?: boolean;
}

export function ForumAnalyticsDashboard({ refresh = false }: ForumAnalyticsDashboardProps) {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAnalytics();
  }, [refresh]);

  const loadAnalytics = async () => {
    setLoading(true);

    try {
      const statsResult = await getForumStatistics();
      const leadsResult = await getLeads({ limit: 1000 });
      const postsResult = await getForumPosts({ limit: 1000 });

      if (statsResult.success && leadsResult.success && postsResult.success) {
        const stats = statsResult.data;
        const leads = leadsResult.data.items || [];
        const posts = postsResult.data.items || [];

        const now = new Date();
        const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

        const leadsLastWeek = leads.filter(lead => new Date(lead.created_at || '') > oneWeekAgo).length;
        const leadsLastMonth = leads.filter(lead => new Date(lead.created_at || '') > oneMonthAgo).length;

        const conversionRate = posts.length > 0 ? Math.round((leads.length / posts.length) * 100) : 0;

        const topForums = Object.entries(stats.by_forum)
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 5);

        const topCategories = Object.entries(stats.by_category)
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 5);

        setAnalytics({
          totalForumPosts: stats.total_posts,
          totalLeads: leads.length,
          conversionRate,
          topForums,
          topCategories,
          leadsLastWeek,
          leadsLastMonth
        });
      }
    } catch (err) {
      console.error('Failed to load analytics:', err);
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8 flex items-center justify-center">
        <RefreshCw className="w-6 h-6 animate-spin text-gray-400" />
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
        <p className="text-gray-600">No analytics data available</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          icon={Target}
          title="Forum Posts"
          value={analytics.totalForumPosts}
          subtitle="total imported"
          color="bg-blue-100"
          iconColor="text-blue-600"
        />
        <StatCard
          icon={Users}
          title="Leads Created"
          value={analytics.totalLeads}
          subtitle="from forum posts"
          color="bg-green-100"
          iconColor="text-green-600"
        />
        <StatCard
          icon={TrendingUp}
          title="Conversion Rate"
          value={`${analytics.conversionRate}%`}
          subtitle="posts → leads"
          color="bg-purple-100"
          iconColor="text-purple-600"
        />
        <StatCard
          icon={BarChart3}
          title="This Month"
          value={analytics.leadsLastMonth}
          subtitle={`${analytics.leadsLastWeek} this week`}
          color="bg-orange-100"
          iconColor="text-orange-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Top Forums" data={analytics.topForums} />
        <ChartCard title="Top Categories" data={analytics.topCategories} />
      </div>

      <button
        onClick={loadAnalytics}
        className="w-full px-4 py-2 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 font-medium flex items-center justify-center gap-2"
      >
        <RefreshCw className="w-4 h-4" />
        Refresh Analytics
      </button>
    </div>
  );
}

interface StatCardProps {
  icon: React.ComponentType<{ className: string }>;
  title: string;
  value: string | number;
  subtitle: string;
  color: string;
  iconColor: string;
}

function StatCard({ icon: Icon, title, value, subtitle, color, iconColor }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className={`${color} w-10 h-10 rounded-lg flex items-center justify-center mb-3`}>
        <Icon className={`w-6 h-6 ${iconColor}`} />
      </div>
      <h3 className="text-sm font-medium text-gray-600">{title}</h3>
      <div className="mt-2 flex items-baseline gap-1">
        <span className="text-2xl font-bold text-gray-900">{value}</span>
      </div>
      <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
    </div>
  );
}

interface ChartCardProps {
  title: string;
  data: Array<{ name: string; count: number }>;
}

function ChartCard({ title, data }: ChartCardProps) {
  const maxCount = Math.max(...data.map(d => d.count), 1);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="font-semibold text-gray-900 mb-4">{title}</h3>

      {data.length === 0 ? (
        <p className="text-gray-500 text-sm">No data available</p>
      ) : (
        <div className="space-y-3">
          {data.map((item, idx) => (
            <div key={idx}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-700 truncate">{item.name}</span>
                <span className="text-sm text-gray-600">{item.count}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full transition-all"
                  style={{ width: `${(item.count / maxCount) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
