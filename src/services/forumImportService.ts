import type { ForumPostInput } from './forumService';

export interface ImportedPost {
  title: string;
  content: string;
  author: string;
  source_url: string;
  source_forum: string;
  source_id: string;
  category?: string;
  tags?: string[];
  likes_count?: number;
  replies_count?: number;
}

export interface ImportError {
  row: number;
  error: string;
  data?: Partial<ImportedPost>;
}

export interface ImportResult {
  success: boolean;
  valid: ImportedPost[];
  errors: ImportError[];
  total: number;
}

function validatePostData(data: any, row?: number): { isValid: boolean; error?: string; post?: ImportedPost } {
  const rowNum = row !== undefined ? ` (Row ${row})` : '';

  if (!data.title || typeof data.title !== 'string' || data.title.trim() === '') {
    return { isValid: false, error: `Title is required${rowNum}` };
  }

  if (!data.content || typeof data.content !== 'string' || data.content.trim() === '') {
    return { isValid: false, error: `Content is required${rowNum}` };
  }

  if (!data.author || typeof data.author !== 'string' || data.author.trim() === '') {
    return { isValid: false, error: `Author is required${rowNum}` };
  }

  if (!data.source_url || typeof data.source_url !== 'string' || data.source_url.trim() === '') {
    return { isValid: false, error: `Source URL is required${rowNum}` };
  }

  if (!data.source_forum || typeof data.source_forum !== 'string' || data.source_forum.trim() === '') {
    return { isValid: false, error: `Source forum is required${rowNum}` };
  }

  if (!data.source_id || (typeof data.source_id !== 'string' && typeof data.source_id !== 'number')) {
    return { isValid: false, error: `Source ID is required${rowNum}` };
  }

  const post: ImportedPost = {
    title: data.title.trim(),
    content: data.content.trim(),
    author: data.author.trim(),
    source_url: data.source_url.trim(),
    source_forum: data.source_forum.trim(),
    source_id: String(data.source_id),
    category: data.category ? String(data.category).trim() : undefined,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : undefined,
    likes_count: typeof data.likes_count === 'number' ? data.likes_count : 0,
    replies_count: typeof data.replies_count === 'number' ? data.replies_count : 0
  };

  return { isValid: true, post };
}

export function parseJSON(jsonString: string): ImportResult {
  const errors: ImportError[] = [];
  const valid: ImportedPost[] = [];

  try {
    const parsed = JSON.parse(jsonString);
    const items = Array.isArray(parsed) ? parsed : [parsed];

    items.forEach((item, index) => {
      const validation = validatePostData(item, index + 1);
      if (validation.isValid && validation.post) {
        valid.push(validation.post);
      } else {
        errors.push({
          row: index + 1,
          error: validation.error || 'Unknown validation error',
          data: item
        });
      }
    });
  } catch (err) {
    errors.push({
      row: 0,
      error: `Invalid JSON: ${err instanceof Error ? err.message : 'Parse error'}`
    });
  }

  return {
    success: errors.length === 0,
    valid,
    errors,
    total: valid.length + errors.length
  };
}

export function parseCSV(csvString: string): ImportResult {
  const errors: ImportError[] = [];
  const valid: ImportedPost[] = [];

  try {
    const lines = csvString.split('\n').map(line => line.trim()).filter(Boolean);
    if (lines.length < 2) {
      return {
        success: false,
        valid: [],
        errors: [{ row: 0, error: 'CSV must have at least a header row and one data row' }],
        total: 0
      };
    }

    const header = lines[0].split(',').map(h => h.trim().toLowerCase());
    const requiredFields = ['title', 'content', 'author', 'source_url', 'source_forum', 'source_id'];

    const missingFields = requiredFields.filter(field => !header.includes(field));
    if (missingFields.length > 0) {
      return {
        success: false,
        valid: [],
        errors: [{ row: 0, error: `Missing required columns: ${missingFields.join(', ')}` }],
        total: 0
      };
    }

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim());
      const row: Record<string, string> = {};

      header.forEach((field, index) => {
        row[field] = values[index] || '';
      });

      const validation = validatePostData(row, i + 1);
      if (validation.isValid && validation.post) {
        valid.push(validation.post);
      } else {
        errors.push({
          row: i + 1,
          error: validation.error || 'Unknown validation error',
          data: row as Partial<ImportedPost>
        });
      }
    }
  } catch (err) {
    errors.push({
      row: 0,
      error: `CSV parsing error: ${err instanceof Error ? err.message : 'Unknown error'}`
    });
  }

  return {
    success: errors.length === 0,
    valid,
    errors,
    total: valid.length + errors.length
  };
}

export function parseSinglePost(data: any): { isValid: boolean; post?: ImportedPost; error?: string } {
  return validatePostData(data);
}

export function formatPostAsJSON(posts: ImportedPost[]): string {
  return JSON.stringify(posts, null, 2);
}

export function formatPostAsCSV(posts: ImportedPost[]): string {
  if (posts.length === 0) return '';

  const headers = ['title', 'content', 'author', 'source_url', 'source_forum', 'source_id', 'category', 'tags', 'likes_count', 'replies_count'];
  const rows = posts.map(post => [
    `"${post.title.replace(/"/g, '""')}"`,
    `"${post.content.replace(/"/g, '""')}"`,
    `"${post.author.replace(/"/g, '""')}"`,
    `"${post.source_url.replace(/"/g, '""')}"`,
    `"${post.source_forum.replace(/"/g, '""')}"`,
    post.source_id,
    post.category ? `"${post.category.replace(/"/g, '""')}"` : '',
    post.tags?.length ? `"${post.tags.join(';')}"` : '',
    post.likes_count || 0,
    post.replies_count || 0
  ]);

  return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
}
