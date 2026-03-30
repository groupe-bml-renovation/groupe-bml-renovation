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
          (window as any).gtag('event', 'conversion', {
            'send_to': 'AW-17790717407/TKBZCOH7CQMD67Z63GEY'
          });

          (window as any).gtag('event', 'call_conversion', {
            'phone_conversion_number': '07 56 91 59 97'
          });

          console.log('Phone call tracking triggered for:', phoneNumber);
        } else {
          console.warn('gtag not available for phone tracking');
        }
      }
    }
  };

  document.addEventListener('click', handleTelClick, true);

  return () => {
    document.removeEventListener('click', handleTelClick, true);
  };
};
