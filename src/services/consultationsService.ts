import {
  type DatabaseResult,
  createSuccess,
  createError,
  validateRequired,
  validateEmail,
} from '../lib/db-utils';
import { sendConsultationWebhook } from './webhookService';
import { createClient } from '@supabase/supabase-js';

export interface ConsultationFormData {
  workType: string;
  budget?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  postalCode?: string;
  city?: string;
  projectDescription: string;
  appointmentDate?: string;
  calendlyEventUri?: string;
  calendlyScheduledTime?: string;
  calendlyInviteeUri?: string;
  calendlyBookingStatus?: string;
  civilite?: string;
}

export interface Consultation extends ConsultationFormData {
  id: string;
  status: string;
  created_at: string;
  updated_at: string;
}

function validateConsultationData(data: ConsultationFormData): string | null {
  const workTypeError = validateRequired(data.workType, 'Type de travaux');
  if (workTypeError) return workTypeError;

  const firstNameError = validateRequired(data.firstName, 'Prénom');
  if (firstNameError) return firstNameError;

  const lastNameError = validateRequired(data.lastName, 'Nom');
  if (lastNameError) return lastNameError;

  const emailError = validateRequired(data.email, 'Email');
  if (emailError) return emailError;

  if (!validateEmail(data.email)) {
    return 'Format d\'email invalide';
  }

  const phoneError = validateRequired(data.phone, 'Téléphone');
  if (phoneError) return phoneError;

  const addressError = validateRequired(data.address, 'Adresse');
  if (addressError) return addressError;

  const descriptionError = validateRequired(data.projectDescription, 'Description du projet');
  if (descriptionError) return descriptionError;

  return null;
}

export async function submitConsultation(
  data: ConsultationFormData
): Promise<DatabaseResult<Consultation[]>> {
  try {
    const validationError = validateConsultationData(data);
    if (validationError) {
      return createError(validationError);
    }

    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.warn('Supabase not configured, skipping database save');
      return createError('Configuration error');
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    const now = new Date().toISOString();

    const { data: insertedData, error: dbError } = await supabase
      .from('consultation_requests')
      .insert([
        {
          work_type: data.workType,
          budget: data.budget || null,
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          phone: data.phone,
          address: data.address,
          postal_code: data.postalCode || null,
          city: data.city || null,
          project_description: data.projectDescription,
          civilite: data.civilite || null,
          created_at: now,
          updated_at: now,
        }
      ])
      .select();

    if (dbError) {
      console.error('Database error saving consultation:', dbError);
      return createError('Erreur lors de l\'enregistrement de votre demande');
    }

    const consultationId = insertedData?.[0]?.id || crypto.randomUUID?.() || Date.now().toString();

    console.log('Consultation saved:', {
      id: consultationId,
      workType: data.workType,
      email: data.email,
      timestamp: now
    });

    await sendConsultationWebhook({
      id: consultationId,
      workType: data.workType,
      budget: data.budget,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      address: data.address,
      postalCode: data.postalCode,
      city: data.city,
      projectDescription: data.projectDescription,
      appointmentDate: data.appointmentDate,
      civilite: data.civilite,
      submittedAt: now,
    });

    const consultation: Consultation = {
      ...data,
      id: consultationId,
      status: 'new',
      created_at: now,
      updated_at: now,
    };

    return createSuccess([consultation]);
  } catch (err) {
    console.error('Unexpected error submitting consultation:', err);
    return createError('Une erreur inattendue est survenue lors de l\'envoi de votre demande');
  }
}

export async function getConsultations(): Promise<DatabaseResult<Consultation[]>> {
  try {
    console.log('Fetching consultations - database disconnected, returning empty list');
    return createSuccess([]);
  } catch (err) {
    console.error('Unexpected error fetching consultations:', err);
    return createError('Une erreur inattendue est survenue');
  }
}

export async function getConsultationById(id: string): Promise<DatabaseResult<Consultation | null>> {
  try {
    console.log('Fetching consultation by ID - database disconnected');
    return createSuccess(null);
  } catch (err) {
    console.error('Unexpected error fetching consultation:', err);
    return createError('Une erreur inattendue est survenue');
  }
}
