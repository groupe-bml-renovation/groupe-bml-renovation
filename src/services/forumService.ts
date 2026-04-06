import {
  type DatabaseResult,
  createSuccess,
  createError,
  validateRequired,
  type PaginationOptions,
  type PaginationResult,
  calculatePagination
} from '../lib/db-utils';

export interface ForumPostInput {
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
  created_at: string | Date;
  is_active?: boolean;
}

export interface ForumPost extends ForumPostInput {
  id: string;
  scraped_at: string;
  updated_at: string;
}

export interface ForumQueryOptions extends PaginationOptions {
  source_forum?: string;
  category?: string;
  author?: string;
  search?: string;
  is_active?: boolean;
}

function validateForumPostInput(data: ForumPostInput): string | null {
  const titleError = validateRequired(data.title, 'Title');
  if (titleError) return titleError;

  const contentError = validateRequired(data.content, 'Content');
  if (contentError) return contentError;

  const authorError = validateRequired(data.author, 'Author');
  if (authorError) return authorError;

  const sourceUrlError = validateRequired(data.source_url, 'Source URL');
  if (sourceUrlError) return sourceUrlError;

  const sourceForumError = validateRequired(data.source_forum, 'Source forum');
  if (sourceForumError) return sourceForumError;

  const sourceIdError = validateRequired(data.source_id, 'Source ID');
  if (sourceIdError) return sourceIdError;

  return null;
}

export async function submitForumPost(data: ForumPostInput): Promise<DatabaseResult<ForumPost[]>> {
  try {
    const validationError = validateForumPostInput(data);
    if (validationError) {
      return createError(validationError);
    }

    const postId = crypto.randomUUID?.() || Date.now().toString();
    const now = new Date().toISOString();
    const post: ForumPost = {
      ...data,
      id: postId,
      created_at: typeof data.created_at === 'string' ? data.created_at : data.created_at.toISOString(),
      scraped_at: now,
      updated_at: now,
      is_active: data.is_active !== false,
      tags: data.tags || [],
      likes_count: data.likes_count || 0,
      replies_count: data.replies_count || 0
    };

    console.log('Forum post submission - database disconnected, not persisted');
    return createSuccess([post]);
  } catch (err) {
    console.error('Unexpected error submitting forum post:', err);
    return createError('Une erreur inattendue est survenue lors de l\'ajout du post forum');
  }
}

export async function submitMultipleForumPosts(
  posts: ForumPostInput[]
): Promise<DatabaseResult<{ inserted: ForumPost[]; count: number }>> {
  try {
    const validationErrors = posts.map((post, index) => {
      const error = validateForumPostInput(post);
      return error ? { index, error } : null;
    }).filter(Boolean);

    if (validationErrors.length > 0) {
      return createError(`Validation failed: ${validationErrors.map(e => `Post ${e?.index}: ${e?.error}`).join(', ')}`);
    }

    console.log('Multiple forum posts submission - database disconnected, not persisted');
    return createSuccess({
      inserted: [],
      count: 0
    });
  } catch (err) {
    console.error('Unexpected error submitting forum posts:', err);
    return createError('Une erreur inattendue est survenue lors de l\'ajout des posts forum');
  }
}

export async function getForumPosts(
  options?: ForumQueryOptions
): Promise<DatabaseResult<PaginationResult<ForumPost>>> {
  try {
    const limit = options?.limit || 50;
    const offset = options?.offset || 0;

    console.log('Fetching forum posts - database disconnected, returning empty list');
    const emptyResult: PaginationResult<ForumPost> = {
      data: [],
      total: 0,
      limit,
      offset,
      hasMore: false
    };

    return createSuccess(emptyResult);
  } catch (err) {
    console.error('Unexpected error fetching forum posts:', err);
    return createError('Une erreur inattendue est survenue');
  }
}

export async function getForumPostById(id: string): Promise<DatabaseResult<ForumPost | null>> {
  try {
    console.log('Fetching forum post by ID - database disconnected');
    return createSuccess(null);
  } catch (err) {
    console.error('Unexpected error fetching forum post:', err);
    return createError('Une erreur inattendue est survenue');
  }
}

export async function getForumPostBySourceId(source_id: string): Promise<DatabaseResult<ForumPost | null>> {
  try {
    console.log('Fetching forum post by source ID - database disconnected');
    return createSuccess(null);
  } catch (err) {
    console.error('Unexpected error fetching forum post by source ID:', err);
    return createError('Une erreur inattendue est survenue');
  }
}

export async function updateForumPost(
  id: string,
  updates: Partial<ForumPostInput>
): Promise<DatabaseResult<ForumPost[]>> {
  try {
    console.log('Updating forum post - database disconnected, update not persisted');
    return createSuccess([]);
  } catch (err) {
    console.error('Unexpected error updating forum post:', err);
    return createError('Une erreur inattendue est survenue lors de la mise à jour du post');
  }
}

export async function deleteForumPost(id: string): Promise<DatabaseResult<null>> {
  try {
    console.log('Deleting forum post - database disconnected, delete not persisted');
    return createSuccess(null);
  } catch (err) {
    console.error('Unexpected error deleting forum post:', err);
    return createError('Une erreur inattendue est survenue lors de la suppression du post');
  }
}

export async function deactivateForumPost(id: string): Promise<DatabaseResult<ForumPost[]>> {
  try {
    console.log('Deactivating forum post - database disconnected, deactivation not persisted');
    return createSuccess([]);
  } catch (err) {
    console.error('Unexpected error deactivating forum post:', err);
    return createError('Une erreur inattendue est survenue lors de la désactivation du post');
  }
}

export async function getForumStatistics(): Promise<DatabaseResult<{
  total_posts: number;
  by_forum: Record<string, number>;
  by_category: Record<string, number>;
}>> {
  try {
    console.log('Fetching forum statistics - database disconnected');
    return createSuccess({
      total_posts: 0,
      by_forum: {},
      by_category: {}
    });
  } catch (err) {
    console.error('Unexpected error fetching statistics:', err);
    return createError('Une erreur inattendue est survenue');
  }
}
