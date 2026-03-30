export interface CalendlyEventData {
  eventUri: string;
  scheduledTime: string;
  inviteeUri: string;
  inviteeName: string;
  inviteeEmail: string;
}

export interface CalendlyEventPayload {
  event: {
    uri: string;
    scheduled_time: string;
  };
  invitee: {
    uri: string;
    name: string;
    email: string;
  };
}

export const loadCalendlyScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if ((window as any).Calendly) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;

    script.onload = () => {
      resolve();
    };

    script.onerror = () => {
      reject(new Error('Failed to load Calendly script'));
    };

    document.head.appendChild(script);
  });
};

export const initCalendlyWidget = (
  containerId: string,
  options: {
    name?: string;
    email?: string;
  } = {}
): void => {
  if (!(window as any).Calendly) {
    console.error('Calendly widget not loaded');
    return;
  }

  const calendarUrl = import.meta.env.VITE_CALENDLY_CALENDAR_URL || 'https://calendly.com/';
  const prefillUrl = buildCalendlyUrl(calendarUrl, options);

  (window as any).Calendly.initInlineWidget({
    url: prefillUrl,
    parentElement: document.getElementById(containerId),
    prefill: {
      name: options.name,
      email: options.email,
    },
  });
};

export const buildCalendlyUrl = (baseUrl: string, options: { name?: string; email?: string } = {}): string => {
  const url = new URL(baseUrl);

  if (options.email) {
    url.searchParams.set('email', options.email);
  }

  if (options.name) {
    url.searchParams.set('name', options.name);
  }

  if (!url.searchParams.has('hide_gdpr_banner')) {
    url.searchParams.set('hide_gdpr_banner', '1');
  }

  return url.toString();
};

export const setupCalendlyEventListener = (callback: (eventData: CalendlyEventData) => void): void => {
  window.addEventListener('message', (event: MessageEvent<CalendlyEventPayload>) => {
    if (event.data?.event?.uri && event.data?.invitee?.email) {
      const eventData: CalendlyEventData = {
        eventUri: event.data.event.uri,
        scheduledTime: event.data.event.scheduled_time,
        inviteeUri: event.data.invitee.uri,
        inviteeName: event.data.invitee.name || '',
        inviteeEmail: event.data.invitee.email || '',
      };
      callback(eventData);
    }
  });
};

export const destroyCalendlyWidget = (containerId: string): void => {
  const container = document.getElementById(containerId);
  if (container) {
    container.innerHTML = '';
  }
};
