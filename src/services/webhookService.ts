export interface WebhookPayload {
  [key: string]: any;
}

const WEBHOOK_URL = "https://hook.eu1.make.com/c7uq11eapapdstqfpb7artotf7qd857r";
const WEBHOOK_TIMEOUT = 5000;

function isWebhookConfigured(): boolean {
  return !!WEBHOOK_URL && WEBHOOK_URL.trim().length > 0;
}

async function sendWebhook(payload: WebhookPayload): Promise<void> {
  if (!isWebhookConfigured()) {
    console.warn('Webhook URL not configured. Skipping webhook delivery.');
    return;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), WEBHOOK_TIMEOUT);

    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error(`Webhook delivery failed with status ${response.status}`, {
        url: WEBHOOK_URL,
        status: response.status,
        statusText: response.statusText,
      });
    } else {
      console.log('Webhook delivered successfully', {
        url: WEBHOOK_URL,
        timestamp: new Date().toISOString(),
      });
    }
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      console.error('Webhook request timeout', {
        url: WEBHOOK_URL,
        timeout: WEBHOOK_TIMEOUT,
      });
    } else {
      console.error('Webhook delivery failed', {
        error: error instanceof Error ? error.message : String(error),
        url: WEBHOOK_URL,
      });
    }
  }
}

export async function sendConsultationWebhook(data: {
  id?: string;
  civilite?: string;
  workType: string;
  budget?: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  email: string;
  phone: string;
  address: string;
  postalCode?: string;
  projectDescription: string;
  appointmentDate?: string;
  submittedAt?: string;
}): Promise<void> {
  const payload: WebhookPayload = {
    type: 'consultation_form',
    submissionId: data.id,
    submittedAt: data.submittedAt || new Date().toISOString(),
    civilite: data.civilite || null,
    workType: data.workType,
    budget: data.budget || null,
    firstName: data.firstName || data.fullName?.split(' ')[0] || null,
    lastName: data.lastName || data.fullName?.split(' ').slice(1).join(' ') || null,
    fullName: data.fullName || `${data.firstName || ''} ${data.lastName || ''}`.trim() || null,
    email: data.email,
    phone: data.phone,
    address: data.address,
    postalCode: data.postalCode || null,
    projectDescription: data.projectDescription,
    appointmentDate: data.appointmentDate || null,
  };

  await sendWebhook(payload);
}

export async function sendLeadWebhook(data: {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  budget?: string;
  message: string;
  source: string;
  submittedAt?: string;
}): Promise<void> {
  const payload: WebhookPayload = {
    type: 'lead_form',
    submissionId: data.id,
    submittedAt: data.submittedAt || new Date().toISOString(),
    name: data.name,
    email: data.email,
    phone: data.phone || null,
    subject: data.subject || null,
    budget: data.budget || null,
    message: data.message,
    source: data.source,
  };

  await sendWebhook(payload);
}
