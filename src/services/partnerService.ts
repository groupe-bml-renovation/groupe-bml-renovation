import {
  type DatabaseResult,
  createSuccess,
  createError,
  validateRequired,
  validateEmail,
} from '../lib/db-utils';

export interface PartnerFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  tradeSpecialization: string;
  certifications?: string;
  yearsExperience?: number;
  serviceAreas: string;
  insuranceDetails?: string;
  employeeCount?: number;
  availability: string;
  additionalInfo?: string;
}

export interface PartnerApplication extends PartnerFormData {
  id: string;
  status: string;
  created_at: string;
}

function validatePartnerData(data: PartnerFormData): string | null {
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

  const tradeError = validateRequired(data.tradeSpecialization, 'Spécialisation de métier');
  if (tradeError) return tradeError;

  const areaError = validateRequired(data.serviceAreas, 'Zones de service');
  if (areaError) return areaError;

  const availabilityError = validateRequired(data.availability, 'Disponibilité');
  if (availabilityError) return availabilityError;

  return null;
}

export async function submitPartnerApplication(
  data: PartnerFormData
): Promise<DatabaseResult<PartnerApplication[]>> {
  try {
    const validationError = validatePartnerData(data);
    if (validationError) {
      return createError(validationError);
    }

    const applicationId = crypto.randomUUID?.() || Date.now().toString();
    const now = new Date().toISOString();
    const application: PartnerApplication = {
      ...data,
      id: applicationId,
      status: 'new',
      created_at: now,
    };

    console.log('Partner application submission:', {
      trade_specialization: data.tradeSpecialization,
      email: data.email,
      timestamp: now
    });

    return createSuccess([application]);
  } catch (err) {
    console.error('Unexpected error submitting partner application:', err);
    return createError('Une erreur inattendue est survenue lors de l\'envoi de votre candidature');
  }
}

export async function getPartnerApplications(): Promise<DatabaseResult<PartnerApplication[]>> {
  try {
    console.log('Fetching partner applications - database disconnected, returning empty list');
    return createSuccess([]);
  } catch (err) {
    console.error('Unexpected error fetching partner applications:', err);
    return createError('Une erreur inattendue est survenue');
  }
}
