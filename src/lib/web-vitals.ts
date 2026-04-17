export interface WebVitalsMetric {
  name: 'CLS' | 'FID' | 'FCP' | 'LCP' | 'TTFB';
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
  navigationType: string;
}

export const reportWebVitals = (metric: WebVitalsMetric) => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    console.log('Web Vital:', {
      name: metric.name,
      value: metric.value.toFixed(2),
      rating: metric.rating,
    });

    if (window.gtag) {
      window.gtag('event', metric.name, {
        value: Math.round(metric.value),
        event_category: 'Web Vitals',
        event_label: metric.id,
        non_interaction: true,
      });
    }
  }
};

export const loadWebVitalsMetrics = () => {
  if (typeof window !== 'undefined') {
    import('web-vitals').then(({ onCLS, onFID, onFCP, onLCP, onTTFB }) => {
      onCLS(reportWebVitals);
      onFID(reportWebVitals);
      onFCP(reportWebVitals);
      onLCP(reportWebVitals);
      onTTFB(reportWebVitals);
    }).catch(error => {
      console.warn('Web Vitals library not available:', error);
    });
  }
};

export const measureComponentRenderTime = (componentName: string) => {
  const startMark = `${componentName}-start`;
  const endMark = `${componentName}-end`;
  const measureName = `${componentName}-duration`;

  return {
    start: () => {
      if (typeof window !== 'undefined' && 'performance' in window) {
        window.performance.mark(startMark);
      }
    },
    end: () => {
      if (typeof window !== 'undefined' && 'performance' in window) {
        window.performance.mark(endMark);
        try {
          window.performance.measure(measureName, startMark, endMark);
          const measure = window.performance.getEntriesByName(measureName)[0];
          console.log(`${componentName} render time:`, measure?.duration.toFixed(2), 'ms');
        } catch (error) {
          console.warn('Error measuring render time:', error);
        }
      }
    },
  };
};
