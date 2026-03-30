declare global {
  interface Window {
    gtag: (command: string, ...args: unknown[]) => void;
  }
}

export const trackPageView = (pageName: string, pageTitle?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'G-KP0VM4CYCS', {
      page_path: pageName,
      page_title: pageTitle || document.title,
    });
  }
};

export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, unknown>
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams);
  }
};

export const trackFormSubmission = (formName: string, values?: Record<string, unknown>) => {
  trackEvent('form_submission', {
    form_name: formName,
    ...values,
  });
};

export const trackButtonClick = (buttonName: string, buttonCategory?: string) => {
  trackEvent('button_click', {
    button_name: buttonName,
    button_category: buttonCategory,
  });
};

export const trackNavigation = (destination: string) => {
  trackEvent('navigation', {
    destination,
  });
};

export const trackPhoneClick = (phoneNumber: string) => {
  trackEvent('phone_click', {
    phone_number: phoneNumber,
  });
};

export const trackServiceView = (serviceName: string) => {
  trackEvent('service_view', {
    service_name: serviceName,
  });
};

export const trackQuoteRequest = (details?: Record<string, unknown>) => {
  trackFormSubmission('quote_request', details);
};

export const trackContactForm = (details?: Record<string, unknown>) => {
  trackFormSubmission('contact_form', details);
};
