export const initPhoneTracking = () => {
  if (typeof window === 'undefined') return;

  const handleTelClick = (e: Event) => {
    let element = e.target as HTMLElement;
    let link: HTMLAnchorElement | null = null;

    if (element.tagName === 'A') {
      link = element as HTMLAnchorElement;
    } else {
      link = element.closest('a[href^="tel:"]') as HTMLAnchorElement | null;
    }

    if (link) {
      const href = link.getAttribute('href');
      if (href && href.startsWith('tel:')) {
        const phoneNumber = href.replace('tel:', '');

        if (typeof window !== 'undefined' && 'gtag' in window) {
          // Fire conversion event directly without blocking the link
          (window as any).gtag('event', 'conversion', {
            'send_to': 'AW-17790717407/_73uCO7D7ZUcEN-bo6NC',
            'value': 1200.0,
            'currency': 'EUR'
          });
          console.log('Phone call tracking triggered for:', phoneNumber);
        }
      }
    }
  };

  document.addEventListener('click', handleTelClick, true);

  return () => {
    document.removeEventListener('click', handleTelClick, true);
  };
};
