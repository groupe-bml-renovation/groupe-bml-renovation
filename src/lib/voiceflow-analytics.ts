import { trackEvent } from './analytics';

export const trackVoiceflowOpen = (pageContext?: string) => {
  trackEvent('voiceflow_opened', {
    page: pageContext || window.location.pathname,
    timestamp: new Date().toISOString(),
  });
};

export const trackVoiceflowClose = (pageContext?: string) => {
  trackEvent('voiceflow_closed', {
    page: pageContext || window.location.pathname,
    timestamp: new Date().toISOString(),
  });
};

export const trackVoiceflowInteraction = (
  interactionType: 'message_sent' | 'option_selected' | 'audio_played',
  pageContext?: string
) => {
  trackEvent(`voiceflow_${interactionType}`, {
    page: pageContext || window.location.pathname,
    timestamp: new Date().toISOString(),
  });
};

export const trackVoiceflowConversion = (
  conversionType: 'lead_captured' | 'contact_form_initiated' | 'quote_requested',
  details?: Record<string, unknown>
) => {
  trackEvent(`voiceflow_conversion_${conversionType}`, {
    page: window.location.pathname,
    timestamp: new Date().toISOString(),
    ...details,
  });
};

export const setupVoiceflowAnalytics = () => {
  if (window.voiceflow?.events?.on) {
    window.voiceflow.events.on('open', () => {
      trackVoiceflowOpen();
    });

    window.voiceflow.events.on('close', () => {
      trackVoiceflowClose();
    });

    window.voiceflow.events.on('message', (payload: Record<string, unknown>) => {
      if (payload.type === 'user') {
        trackVoiceflowInteraction('message_sent');
      }
    });
  }
};
