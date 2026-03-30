import {
  type DatabaseResult,
  createSuccess,
  createError,
  validateRequired,
  validateEmail,
} from '../lib/db-utils';

export interface ArtisanPartnerFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  tradeSpecialization: string;
  yearsExperience?: number;
  certifications?: string;
  serviceAreas: string;
  insuranceDetails?: string;
  previousProjects?: string;
  employeeCount?: number;
  availability: string;
  additionalInfo?: string;
}

export interface ArtisanPartnerApplication extends ArtisanPartnerFormData {
  id: string;
  status: string;
  created_at: string;
}

function validateArtisanPartnerData(data: ArtisanPartnerFormData): string | null {
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

export async function submitArtisanPartnerApplication(
  data: ArtisanPartnerFormData
): Promise<DatabaseResult<any>> {
  try {
    const validationError = validateArtisanPartnerData(data);
    if (validationError) {
      return createError(validationError);
    }

    const applicationId = crypto.randomUUID?.() || Date.now().toString();
    const now = new Date().toISOString();
    const application: ArtisanPartnerApplication = {
      ...data,
      id: applicationId,
      status: 'pending',
      created_at: now,
    };

    console.log('Submitting artisan partner application:', {
      trade_specialization: data.tradeSpecialization,
      email: data.email,
      timestamp: now
    });

    return createSuccess([application]);
  } catch (err) {
    console.error('Unexpected error submitting artisan partner application:', err);
    return createError('Une erreur inattendue est survenue lors de l\'envoi de votre candidature');
  }
}

export async function getArtisanPartnerApplications(): Promise<DatabaseResult<any>> {
  try {
    console.log('Fetching artisan partner applications - database disconnected, returning empty list');
    return createSuccess([]);
  } catch (err) {
    console.error('Unexpected error fetching artisan partner applications:', err);
    return createError('Une erreur inattendue est survenue');
  }
}
