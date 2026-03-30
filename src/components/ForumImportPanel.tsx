import { useState } from 'react';
import { Upload, FileJson, FileText, Plus, Download, AlertCircle, CheckCircle, X } from 'lucide-react';
import { parseJSON, parseCSV, parseSinglePost, formatPostAsJSON, type ImportedPost, type ImportError } from '../services/forumImportService';

interface ForumImportPanelProps {
  onImport: (posts: ImportedPost[]) => void;
  isLoading?: boolean;
}

type ImportMode = 'json' | 'csv' | 'manual';

export function ForumImportPanel({ onImport, isLoading = false }: ForumImportPanelProps) {
  const [mode, setMode] = useState<ImportMode>('manual');
  const [textInput, setTextInput] = useState('');
  const [preview, setPreview] = useState<ImportedPost[]>([]);
  const [errors, setErrors] = useState<ImportError[]>([]);
  const [manualForm, setManualForm] = useState({
    title: '',
    content: '',
    author: '',
    source_url: '',
    source_forum: '',
    source_id: '',
    category: '',
    tags: ''
  });

  const handleJSONPaste = () => {
    const result = parseJSON(textInput);
    setPreview(result.valid);
    setErrors(result.errors);
  };

  const handleCSVPaste = () => {
    const result = parseCSV(textInput);
    setPreview(result.valid);
    setErrors(result.errors);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const content = await file.text();
      if (file.name.endsWith('.json')) {
        setMode('json');
        setTextInput(content);
        const result = parseJSON(content);
        setPreview(result.valid);
        setErrors(result.errors);
      } else if (file.name.endsWith('.csv')) {
        setMode('csv');
        setTextInput(content);
        const result = parseCSV(content);
        setPreview(result.valid);
        setErrors(result.errors);
      }
    } catch (err) {
      setErrors([{ row: 0, error: `File read error: ${err instanceof Error ? err.message : 'Unknown error'}` }]);
    }
  };

  const handleAddManual = () => {
    const validation = parseSinglePost({
      ...manualForm,
      tags: manualForm.tags ? manualForm.tags.split(',').map(t => t.trim()) : []
    });

    if (!validation.isValid) {
      setErrors([{ row: 0, error: validation.error || 'Validation failed', data: manualForm }]);
      return;
    }

    if (validation.post) {
      setPreview([...preview, validation.post]);
      setManualForm({
        title: '',
        content: '',
        author: '',
        source_url: '',
        source_forum: '',
        source_id: '',
        category: '',
        tags: ''
      });
      setErrors([]);
    }
  };

  const handleRemovePreview = (index: number) => {
    setPreview(preview.filter((_, i) => i !== index));
  };

  const handleImport = () => {
    if (preview.length === 0) return;
    onImport(preview);
    setPreview([]);
    setTextInput('');
    setErrors([]);
  };

  const handleDownloadTemplate = () => {
    const template = [
      {
        title: 'Example Forum Post',
        content: 'This is an example forum post about home renovation...',
        author: 'John Doe',
        source_url: 'https://example.com/forum/post/123',
        source_forum: 'Example Forum',
        source_id: '123',
        category: 'Renovation',
        tags: ['interior', 'bathroom'],
        likes_count: 5,
        replies_count: 2
      }
    ];
    const dataStr = formatPostAsJSON(template);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'forum-posts-template.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Import Forum Posts</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <button
          onClick={() => {
            setMode('manual');
            setTextInput('');
            setPreview([]);
            setErrors([]);
          }}
          className={`p-4 rounded-lg border-2 transition cursor-pointer text-left ${
            mode === 'manual'
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <Plus className="w-6 h-6 text-gray-600 mb-2" />
          <h3 className="font-semibold text-gray-900">Manual Entry</h3>
          <p className="text-sm text-gray-600 mt-1">Add posts one by one</p>
        </button>

        <button
          onClick={() => {
            setMode('json');
            setTextInput('');
            setPreview([]);
            setErrors([]);
          }}
          className={`p-4 rounded-lg border-2 transition cursor-pointer text-left ${
            mode === 'json'
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <FileJson className="w-6 h-6 text-gray-600 mb-2" />
          <h3 className="font-semibold text-gray-900">JSON Import</h3>
          <p className="text-sm text-gray-600 mt-1">Paste or upload JSON</p>
        </button>

        <button
          onClick={() => {
            setMode('csv');
            setTextInput('');
            setPreview([]);
            setErrors([]);
          }}
          className={`p-4 rounded-lg border-2 transition cursor-pointer text-left ${
            mode === 'csv'
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <FileText className="w-6 h-6 text-gray-600 mb-2" />
          <h3 className="font-semibold text-gray-900">CSV Import</h3>
          <p className="text-sm text-gray-600 mt-1">Paste or upload CSV</p>
        </button>
      </div>

      {mode === 'manual' ? (
        <div className="space-y-4 mb-6">
          <input
            type="text"
            placeholder="Post Title"
            value={manualForm.title}
            onChange={(e) => setManualForm({ ...manualForm, title: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="Post Content"
            value={manualForm.content}
            onChange={(e) => setManualForm({ ...manualForm, content: e.target.value })}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Author"
              value={manualForm.author}
              onChange={(e) => setManualForm({ ...manualForm, author: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Source Forum"
              value={manualForm.source_forum}
              onChange={(e) => setManualForm({ ...manualForm, source_forum: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="url"
              placeholder="Source URL"
              value={manualForm.source_url}
              onChange={(e) => setManualForm({ ...manualForm, source_url: e.target.value })}
              className="col-span-2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Source ID"
              value={manualForm.source_id}
              onChange={(e) => setManualForm({ ...manualForm, source_id: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Category (optional)"
              value={manualForm.category}
              onChange={(e) => setManualForm({ ...manualForm, category: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Tags (comma-separated, optional)"
              value={manualForm.tags}
              onChange={(e) => setManualForm({ ...manualForm, tags: e.target.value })}
              className="col-span-2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={handleAddManual}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            Add to Preview
          </button>
        </div>
      ) : (
        <div className="mb-6 space-y-4">
          <div className="flex gap-2">
            <input
              type="file"
              accept={mode === 'json' ? '.json' : '.csv'}
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="flex-1 px-4 py-2 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 cursor-pointer font-medium flex items-center justify-center gap-2"
            >
              <Upload className="w-4 h-4" />
              Upload {mode.toUpperCase()} File
            </label>
            <button
              onClick={handleDownloadTemplate}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-medium flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Template
            </button>
          </div>

          <textarea
            placeholder={`Paste your ${mode.toUpperCase()} here...`}
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            rows={8}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
          />

          <button
            onClick={mode === 'json' ? handleJSONPaste : handleCSVPaste}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            Parse {mode.toUpperCase()}
          </button>
        </div>
      )}

      {errors.length > 0 && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-semibold text-red-900 mb-2">Import Errors</h3>
              <ul className="space-y-1 text-red-800 text-sm">
                {errors.map((err, idx) => (
                  <li key={idx}>
                    {err.row > 0 ? `Row ${err.row}: ` : ''}{err.error}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {preview.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold text-gray-900">{preview.length} Post(s) Ready to Import</h3>
            </div>
            <button
              onClick={() => setPreview([])}
              className="text-gray-600 hover:text-gray-900"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-3 max-h-64 overflow-y-auto mb-4">
            {preview.map((post, idx) => (
              <div key={idx} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex justify-between items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 truncate">{post.title}</h4>
                    <p className="text-xs text-gray-600 mt-1">
                      {post.author} • {post.source_forum}
                    </p>
                    <p className="text-xs text-gray-600 truncate">{post.source_url}</p>
                  </div>
                  <button
                    onClick={() => handleRemovePreview(idx)}
                    className="text-gray-400 hover:text-gray-600 flex-shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleImport}
            disabled={isLoading || preview.length === 0}
            className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 font-medium"
          >
            {isLoading ? 'Importing...' : `Import ${preview.length} Post${preview.length !== 1 ? 's' : ''}`}
          </button>
        </div>
      )}
    </div>
  );
}
