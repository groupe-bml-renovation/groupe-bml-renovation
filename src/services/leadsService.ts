import {
  type DatabaseResult,
  createSuccess,
  createError,
  validateRequired,
  validateEmail,
  type PaginationOptions,
  type PaginationResult,
  calculatePagination
} from '../lib/db-utils';
import { sendLeadWebhook } from './webhookService';

export interface LeadData {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  budget?: string;
  message: string;
  source: 'home' | 'contact' | 'forum';
}

export interface Lead extends LeadData {
  id: string;
  created_at: string;
  updated_at?: string;
}

function validateLeadData(data: LeadData): string | null {
  const nameError = validateRequired(data.name, 'Name');
  if (nameError) return nameError;

  const emailError = validateRequired(data.email, 'Email');
  if (emailError) return emailError;

  if (!validateEmail(data.email)) {
    return 'Invalid email format';
  }

  const messageError = validateRequired(data.message, 'Message');
  if (messageError) return messageError;

  return null;
}

export async function submitLead(data: LeadData): Promise<DatabaseResult<Lead[]>> {
  try {
    const validationError = validateLeadData(data);
    if (validationError) {
      return createError(validationError);
    }

    const leadId = crypto.randomUUID?.() || Date.now().toString();
    const leadRecord: Lead = {
      ...data,
      id: leadId,
      created_at: new Date().toISOString(),
    };

    console.log('Lead submission:', {
      id: leadRecord.id,
      name: data.name,
      email: data.email,
      source: data.source,
      timestamp: leadRecord.created_at
    });

    await sendLeadWebhook({
      id: leadRecord.id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      subject: data.subject,
      budget: data.budget,
      message: data.message,
      source: data.source,
      submittedAt: leadRecord.created_at,
    });

    return createSuccess([leadRecord]);
  } catch (err) {
    console.error('Unexpected error submitting lead:', err);
    return createError('Une erreur inattendue est survenue lors de l\'envoi du formulaire');
  }
}

export async function getLeads(
  options?: PaginationOptions
): Promise<DatabaseResult<PaginationResult<Lead>>> {
  try {
    const limit = options?.limit || 50;
    const offset = options?.offset || 0;

    console.log('Fetching leads - database disconnected, returning empty list');
    const emptyResult: PaginationResult<Lead> = {
      data: [],
      total: 0,
      limit,
      offset,
      hasMore: false
    };

    return createSuccess(emptyResult);
  } catch (err) {
    console.error('Unexpected error fetching leads:', err);
    return createError('Une erreur inattendue est survenue');
  }
}

export async function getLeadById(id: string): Promise<DatabaseResult<Lead | null>> {
  try {
    console.log('Fetching lead by ID - database disconnected');
    return createSuccess(null);
  } catch (err) {
    console.error('Unexpected error fetching lead:', err);
    return createError('Une erreur inattendue est survenue');
  }
}

export async function updateLead(
  id: string,
  updates: Partial<LeadData>
): Promise<DatabaseResult<Lead[]>> {
  try {
    console.log('Updating lead - database disconnected, update not persisted');
    return createSuccess([]);
  } catch (err) {
    console.error('Unexpected error updating lead:', err);
    return createError('Une erreur inattendue est survenue lors de la mise à jour du lead');
  }
}

export async function deleteLead(id: string): Promise<DatabaseResult<null>> {
  try {
    console.log('Deleting lead - database disconnected, delete not persisted');
    return createSuccess(null);
  } catch (err) {
    console.error('Unexpected error deleting lead:', err);
    return createError('Une erreur inattendue est survenue lors de la suppression du lead');
  }
}
