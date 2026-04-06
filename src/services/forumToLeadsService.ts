import {
  type DatabaseResult,
  createSuccess,
  createError,
} from '../lib/db-utils';
import { submitLead } from './leadsService';

export interface ExtractedLeadInfo {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  location?: string;
  budget?: string;
  projectTypes?: string[];
  confidence: number;
}

export interface ConversionResult {
  success: boolean;
  extracted: ExtractedLeadInfo | null;
  forumPostId: string;
  leadCreated: boolean;
  message: string;
}

const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
const PHONE_REGEX = /(?:\+33|0)[1-9](?:[0-9]{8}|[0-9]{2}(?:[0-9]{2}){3})|(?:\+1|001)?[-.\s]?\(?[2-9]\d{2}\)?[-.\s]?\d{3}[-.\s]?\d{4}|(?:\+33|0)[67](?:[0-9]{8})/g;
const LOCATION_REGEX = /(?:à|in|near|near\s+|around|vicinity\s+of)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*(?:\s+\d{5})?)/gi;
const BUDGET_REGEX = /(?:budget|budget[:\s]+|budget\s+of|estimated|estimate|cost|around|approximately|about)\s*(?:€|EUR|€)?[\s]*(\d+(?:[,.]?\d{3})*(?:[,.]?\d{2})?)/gi;
const PROJECT_TYPE_REGEX = /(?:renovate|renovation|remodel|remodeling|rebuild|restore|interior|exterior|kitchen|bathroom|floor|wall|paint|flooring|ceiling|insulation|heating|cooling|plumbing|electric|roof|window|door)/gi;

export function extractEmailsFromText(text: string): string[] {
  const emails = text.match(EMAIL_REGEX);
  return emails ? [...new Set(emails.map(e => e.toLowerCase()))] : [];
}

export function extractPhoneFromText(text: string): string | undefined {
  const phones = text.match(PHONE_REGEX);
  return phones ? phones[0] : undefined;
}

export function extractLocationFromText(text: string): string | undefined {
  const matches = text.matchAll(LOCATION_REGEX);
  for (const match of matches) {
    if (match[1]) return match[1].trim();
  }
  return undefined;
}

export function extractBudgetFromText(text: string): string | undefined {
  const matches = text.matchAll(BUDGET_REGEX);
  for (const match of matches) {
    if (match[1]) {
      const amount = match[1].replace(/[,]/g, '.');
      return `€${amount}`;
    }
  }
  return undefined;
}

export function extractProjectTypesFromText(text: string): string[] {
  const matches = text.matchAll(PROJECT_TYPE_REGEX);
  const types = new Set<string>();
  for (const match of matches) {
    if (match[0]) types.add(match[0].toLowerCase());
  }
  return Array.from(types);
}

export function sanitizePhoneNumber(phone: string): string {
  return phone.replace(/[-.\s()]/g, '');
}

export function calculateConfidence(leadInfo: Omit<ExtractedLeadInfo, 'confidence'>): number {
  let score = 0;
  const maxScore = 5;

  if (leadInfo.email) score += 1.5;
  if (leadInfo.phone) score += 1;
  if (leadInfo.location) score += 0.5;
  if (leadInfo.budget) score += 1;
  if (leadInfo.projectTypes && leadInfo.projectTypes.length > 0) score += 1;

  return Math.round((score / maxScore) * 100);
}

export function extractLeadInfo(forumPost: any): ExtractedLeadInfo | null {
  const searchText = `${forumPost.title} ${forumPost.content}`;

  const emails = extractEmailsFromText(searchText);
  if (emails.length === 0) {
    return null;
  }

  const phone = extractPhoneFromText(searchText);
  const sanitizedPhone = phone ? sanitizePhoneNumber(phone) : undefined;
  const location = extractLocationFromText(searchText);
  const budget = extractBudgetFromText(searchText);
  const projectTypes = extractProjectTypesFromText(searchText);

  const leadInfo = {
    name: forumPost.author || 'Forum User',
    email: emails[0],
    phone: sanitizedPhone,
    subject: forumPost.title || forumPost.category || 'Forum Post Inquiry',
    location: location || undefined,
    budget: budget || undefined,
    projectTypes: projectTypes.length > 0 ? projectTypes : undefined
  };

  return {
    ...leadInfo,
    confidence: calculateConfidence(leadInfo)
  };
}

export async function convertForumPostToLead(
  forumPostId: string
): Promise<DatabaseResult<ConversionResult>> {
  try {
    console.log('Converting forum post to lead - database disconnected');
    return createError('Forum posts unavailable - database disconnected');
  } catch (err) {
    console.error('Unexpected error converting forum post to lead:', err);
    return createError('Unexpected error converting forum post to lead');
  }
}

export async function convertMultipleForumPostsToLeads(
  forumPostIds: string[]
): Promise<DatabaseResult<{
  total: number;
  successful: number;
  failed: number;
  results: ConversionResult[];
}>> {
  try {
    console.log('Converting multiple forum posts to leads - database disconnected');
    return createSuccess({
      total: forumPostIds.length,
      successful: 0,
      failed: forumPostIds.length,
      results: forumPostIds.map(postId => ({
        success: false,
        extracted: null,
        forumPostId: postId,
        leadCreated: false,
        message: 'Database disconnected'
      }))
    });
  } catch (err) {
    console.error('Unexpected error in bulk conversion:', err);
    return createError('Unexpected error in bulk conversion');
  }
}

export async function getForumPostsWithExtractableInfo(
  limit: number = 50
): Promise<DatabaseResult<Array<any>>> {
  try {
    console.log('Fetching forum posts with extractable info - database disconnected, returning empty list');
    return createSuccess([]);
  } catch (err) {
    console.error('Unexpected error fetching forum posts:', err);
    return createError('Unexpected error fetching forum posts');
  }
}
