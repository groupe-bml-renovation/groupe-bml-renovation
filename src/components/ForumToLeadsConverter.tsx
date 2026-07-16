import { useState } from 'react';
import { Upload, List, BarChart3 } from 'lucide-react';
import { ForumImportPanel } from './ForumImportPanel';
import { ForumPostsTable } from './ForumPostsTable';
import { ForumAnalyticsDashboard } from './ForumAnalyticsDashboard';
import { LeadReviewPanel } from './LeadReviewPanel';
import { submitMultipleForumPosts } from '../services/forumService';
import { extractLeadInfo } from '../services/forumToLeadsService';
import { submitLead } from '../services/leadsService';
import type { ImportedPost } from '../services/forumImportService';
import type { ExtractedLeadInfo } from '../services/forumToLeadsService';
import type { Database } from '../lib/database.types';

type ForumPost = Database['public']['Tables']['forum_posts']['Row'];

interface LeadReviewItem {
  post: ForumPost;
  extractedInfo: ExtractedLeadInfo;
  approved: boolean;
  edited: ExtractedLeadInfo;
}

type Tab = 'import' | 'review' | 'analytics';

export function ForumToLeadsConverter() {
  const [activeTab, setActiveTab] = useState<Tab>('import');
  const [reviewItems, setReviewItems] = useState<LeadReviewItem[]>([]);
  const [isImporting, setIsImporting] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [refreshPosts, setRefreshPosts] = useState(false);
  const [refreshAnalytics, setRefreshAnalytics] = useState(false);

  const handleImport = async (posts: ImportedPost[]) => {
    setIsImporting(true);
    setError(null);
    setSuccess(null);

    try {
      const forumPostInput = posts.map(post => ({
        ...post,
        created_at: new Date().toISOString()
      }));

      const result = await submitMultipleForumPosts(forumPostInput);

      if (result.success) {
        const newPosts = result.data.inserted;

        const reviewItems: LeadReviewItem[] = newPosts
          .map(post => {
            const extractedInfo = extractLeadInfo(post);
            if (!extractedInfo) return null;
            return {
              post,
              extractedInfo,
              approved: false,
              edited: extractedInfo
            };
          })
          .filter((item): item is LeadReviewItem => item !== null);

        setReviewItems(reviewItems);
        setSuccess(`Successfully imported ${newPosts.length} forum post${newPosts.length !== 1 ? 's' : ''}`);
        setActiveTab('review');
        setRefreshPosts(true);
        setRefreshAnalytics(true);
      } else {
        setError(result.error || 'Failed to import forum posts');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    }

    setIsImporting(false);
  };

  const handleApproveLeads = async (items: LeadReviewItem[]) => {
    setIsProcessing(true);
    setError(null);
    setSuccess(null);

    try {
      let successCount = 0;
      let failCount = 0;

      for (const item of items) {
        const leadResult = await submitLead({
          name: item.edited.name,
          email: item.edited.email,
          phone: item.edited.phone,
          subject: item.edited.subject,
          message: `${item.post.content}\n\nLocation: ${item.edited.location || 'Not specified'}\nBudget: ${item.edited.budget || 'Not specified'}\nProject Types: ${item.edited.projectTypes?.join(', ') || 'Not specified'}`,
          source: 'forum'
        });

        if (leadResult.success) {
          successCount++;
        } else {
          failCount++;
        }
      }

      setSuccess(`Created ${successCount} lead${successCount !== 1 ? 's' : ''}${failCount > 0 ? ` (${failCount} failed)` : ''}`);
      setReviewItems([]);
      setRefreshAnalytics(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    }

    setIsProcessing(false);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Forum to Leads Converter</h1>
        <p className="text-gray-600">Import forum posts, extract leads, et manage your pipeline</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm">
          {success}
        </div>
      )}

      <div className="border-b border-gray-200 mb-6">
        <div className="flex gap-8">
          <button
            onClick={() => setActiveTab('import')}
            className={`px-4 py-3 border-b-2 font-medium transition ${
              activeTab === 'import'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            } flex items-center gap-2`}
          >
            <Upload className="w-4 h-4" />
            Import
          </button>
          <button
            onClick={() => setActiveTab('review')}
            className={`px-4 py-3 border-b-2 font-medium transition ${
              activeTab === 'review'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            } flex items-center gap-2`}
          >
            <List className="w-4 h-4" />
            Review
            {reviewItems.length > 0 && (
              <span className="ml-1 px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                {reviewItems.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-3 border-b-2 font-medium transition ${
              activeTab === 'analytics'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            } flex items-center gap-2`}
          >
            <BarChart3 className="w-4 h-4" />
            Analytics
          </button>
        </div>
      </div>

      {activeTab === 'import' && (
        <div className="space-y-6">
          <ForumImportPanel onImport={handleImport} isLoading={isImporting} />
          <ForumPostsTable refresh={refreshPosts} />
        </div>
      )}

      {activeTab === 'review' && (
        <div className="space-y-6">
          {reviewItems.length > 0 ? (
            <LeadReviewPanel items={reviewItems} onApprove={handleApproveLeads} isLoading={isProcessing} />
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
              <p className="text-gray-600">No leads to review. Import forum posts first to see extracted leads here.</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <ForumAnalyticsDashboard refresh={refreshAnalytics} />
        </div>
      )}
    </div>
  );
}
