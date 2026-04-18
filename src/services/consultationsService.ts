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
  firstName?: string;
  lastName?: string;
  fullName?: string;
  email: string;
  phone: string;
  address: string;
  postalCode?: string;
  projectDescription?: string;
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

  if (!data.fullName && (!data.firstName || !data.lastName)) {
    return 'Le nom complet est requis';
  }

  const emailError = validateRequired(data.email, 'Email');
  if (emailError) return emailError;

  if (!validateEmail(data.email)) {
    return 'Format d\'email invalide';
  }

  const phoneError = validateRequired(data.phone, 'Téléphone');
  if (phoneError) return phoneError;

  const addressError = validateRequired(data.address, 'Adresse');
  if (addressError) return addressError;

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

    const now = new Date().toISOString();
    const consultationId = crypto.randomUUID?.() || Date.now().toString();

    console.log('Consultation processing, sending webhook first:', {
      id: consultationId,
      workType: data.workType,
      email: data.email,
      timestamp: now
    });

    // Send webhook regardless of Supabase config
    await sendConsultationWebhook({
      id: consultationId,
      workType: data.workType,
      budget: data.budget,
      firstName: data.firstName || data.fullName?.split(' ')[0],
      lastName: data.lastName || data.fullName?.split(' ').slice(1).join(' '),
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      address: data.address,
      postalCode: data.postalCode,
      projectDescription: data.projectDescription || '',
      appointmentDate: data.appointmentDate,
      civilite: data.civilite || '',
      submittedAt: now,
    });

    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    // Database fallback without failing the whole request
    if (supabaseUrl && supabaseKey) {
      const supabase = createClient(supabaseUrl, supabaseKey);
      const { error: dbError } = await supabase
        .from('consultation_requests')
        .insert([
          {
            id: consultationId,
            work_type: data.workType,
            budget: data.budget || null,
            first_name: data.firstName || data.fullName?.split(' ')[0] || null,
            last_name: data.lastName || data.fullName?.split(' ').slice(1).join(' ') || null,
            full_name: data.fullName || null,
            email: data.email,
            phone: data.phone,
            address: data.address,
            postal_code: data.postalCode || null,
            project_description: data.projectDescription || null,
            civilite: data.civilite || null,
            created_at: now,
            updated_at: now,
          }
        ]);

      if (dbError) {
        console.error('Database error saving consultation, but webhook was sent:', dbError);
      }
    } else {
      console.warn('Supabase not configured, skipping database save. Webhook was sent.');
    }

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
