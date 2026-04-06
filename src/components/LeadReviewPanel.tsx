import { useState } from 'react';
import { Mail, Phone, MapPin, DollarSign, Tag, AlertCircle, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import type { ExtractedLeadInfo } from '../services/forumToLeadsService';
import type { Database } from '../lib/database.types';

type ForumPost = Database['public']['Tables']['forum_posts']['Row'];

interface LeadReviewItem {
  post: ForumPost;
  extractedInfo: ExtractedLeadInfo;
  approved: boolean;
  edited: ExtractedLeadInfo;
}

interface LeadReviewPanelProps {
  items: LeadReviewItem[];
  onApprove: (items: LeadReviewItem[]) => void;
  isLoading?: boolean;
}

export function LeadReviewPanel({ items, onApprove, isLoading = false }: LeadReviewPanelProps) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [editingItems, setEditingItems] = useState<Map<string, LeadReviewItem>>(new Map(items.map(item => [item.post.id, item])));

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedIds);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedIds(newExpanded);
  };

  const updateItem = (id: string, updates: Partial<ExtractedLeadInfo>) => {
    const item = editingItems.get(id);
    if (item) {
      const updated = {
        ...item,
        edited: { ...item.edited, ...updates }
      };
      setEditingItems(new Map(editingItems).set(id, updated));
    }
  };

  const toggleApproval = (id: string) => {
    const item = editingItems.get(id);
    if (item) {
      item.approved = !item.approved;
      setEditingItems(new Map(editingItems).set(id, item));
    }
  };

  const approvedCount = Array.from(editingItems.values()).filter(item => item.approved).length;

  const handleSubmit = () => {
    const approved = Array.from(editingItems.values()).filter(item => item.approved);
    onApprove(approved);
  };

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
        <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
        <p className="text-gray-600">No leads to review. Import forum posts first.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Review & Approve Leads</h2>
        <div className="text-sm text-gray-600">
          {approvedCount} of {items.length} selected
        </div>
      </div>

      <div className="space-y-3 mb-6 max-h-96 overflow-y-auto">
        {Array.from(editingItems.values()).map((item) => (
          <LeadReviewCard
            key={item.post.id}
            item={item}
            isExpanded={expandedIds.has(item.post.id)}
            onToggleExpanded={() => toggleExpanded(item.post.id)}
            onToggleApproval={() => toggleApproval(item.post.id)}
            onUpdate={(updates) => updateItem(item.post.id, updates)}
          />
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={isLoading || approvedCount === 0}
        className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 font-medium"
      >
        {isLoading ? 'Creating Leads...' : `Create ${approvedCount} Lead${approvedCount !== 1 ? 's' : ''}`}
      </button>
    </div>
  );
}

interface LeadReviewCardProps {
  item: LeadReviewItem;
  isExpanded: boolean;
  onToggleExpanded: () => void;
  onToggleApproval: () => void;
  onUpdate: (updates: Partial<ExtractedLeadInfo>) => void;
}

function LeadReviewCard({
  item,
  isExpanded,
  onToggleExpanded,
  onToggleApproval,
  onUpdate
}: LeadReviewCardProps) {
  const { post, edited, approved } = item;
  const confidence = edited.confidence;

  return (
    <div className={`border rounded-lg transition ${approved ? 'border-green-300 bg-green-50' : 'border-gray-200 hover:border-gray-300'}`}>
      <div
        className="p-4 cursor-pointer flex items-start gap-3"
        onClick={onToggleExpanded}
      >
        <input
          type="checkbox"
          checked={approved}
          onChange={onToggleApproval}
          onClick={(e) => e.stopPropagation()}
          className="w-4 h-4 rounded cursor-pointer mt-0.5 flex-shrink-0"
        />

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">{post.title}</h3>
          <p className="text-sm text-gray-600 mt-1">{edited.name} • {edited.email}</p>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="flex items-center gap-1">
            <div className="w-10 h-6 bg-gray-200 rounded-full relative">
              <div
                className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full transition ${
                  confidence >= 70 ? 'bg-green-500' : confidence >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
              />
            </div>
            <span className="text-xs font-medium text-gray-600">{confidence}%</span>
          </div>

          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="border-t border-gray-200 px-4 py-4 space-y-4 bg-gray-50">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={edited.name}
              onChange={(e) => onUpdate({ name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <input
                type="email"
                value={edited.email}
                onChange={(e) => onUpdate({ email: e.target.value })}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
            </div>
          </div>

          {edited.phone && (
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Phone</label>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <input
                  type="tel"
                  value={edited.phone}
                  onChange={(e) => onUpdate({ phone: e.target.value })}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
            </div>
          )}

          {edited.location && (
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Location</label>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <input
                  type="text"
                  value={edited.location}
                  onChange={(e) => onUpdate({ location: e.target.value })}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
            </div>
          )}

          {edited.budget && (
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Budget</label>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <input
                  type="text"
                  value={edited.budget}
                  onChange={(e) => onUpdate({ budget: e.target.value })}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
            </div>
          )}

          {edited.projectTypes && edited.projectTypes.length > 0 && (
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">Project Types</label>
              <div className="flex flex-wrap gap-2">
                {edited.projectTypes.map((type, idx) => (
                  <div key={idx} className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                    <Tag className="w-3 h-3" />
                    {type}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-700">
            <p className="font-medium mb-1">From forum post:</p>
            <p className="line-clamp-2 text-blue-600">{post.content.substring(0, 100)}...</p>
          </div>
        </div>
      )}
    </div>
  );
}
