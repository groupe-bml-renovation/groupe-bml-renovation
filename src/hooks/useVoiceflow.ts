import { useEffect, useRef } from 'react';

const MAX_RETRY_ATTEMPTS = 3;
const RETRY_DELAY_MS = 2000;
const VOICEFLOW_CDN = 'https://cdn.voiceflow.com/widget-next/bundle.mjs';
const VOICEFLOW_RUNTIME = 'https://general-runtime.voiceflow.com';
const VOICEFLOW_VOICE_URL = 'https://runtime-api.voiceflow.com';
const VOICEFLOW_INIT_DELAY = 6000;

export const useVoiceflow = () => {
  const retryCountRef = useRef(0);
  const scriptRef = useRef<HTMLScriptElement | null>(null);
  const initTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const projectID = import.meta.env.VITE_VOICEFLOW_PROJECT_ID;

    if (!projectID) {
      console.warn('Voiceflow Project ID not configured in environment variables');
      return;
    }

    const initializeVoiceflow = () => {
      if (window.voiceflow?.chat) {
        try {
          window.voiceflow.chat.load({
            verify: { projectID },
            url: VOICEFLOW_RUNTIME,
            versionID: 'production',
            voice: {
              url: VOICEFLOW_VOICE_URL,
            },
          });
          console.log('Voiceflow chatbot initialized successfully');
          retryCountRef.current = 0;
        } catch (error) {
          console.error('Error initializing Voiceflow:', error);
          retryWithBackoff();
        }
      } else if (retryCountRef.current < MAX_RETRY_ATTEMPTS) {
        retryWithBackoff();
      } else {
        console.error('Failed to initialize Voiceflow after maximum retry attempts');
      }
    };

    const retryWithBackoff = () => {
      retryCountRef.current += 1;
      const delayTime = RETRY_DELAY_MS * retryCountRef.current;
      console.log(`Retrying Voiceflow initialization (attempt ${retryCountRef.current}/${MAX_RETRY_ATTEMPTS})...`);
      setTimeout(initializeVoiceflow, delayTime);
    };

    const loadVoiceflowScript = () => {
      if (document.querySelector('script[src="' + VOICEFLOW_CDN + '"]')) {
        initializeVoiceflow();
        return;
      }

      scriptRef.current = document.createElement('script');
      scriptRef.current.type = 'text/javascript';
      scriptRef.current.src = VOICEFLOW_CDN;
      scriptRef.current.async = true;

      scriptRef.current.onload = () => {
        setTimeout(initializeVoiceflow, 100);
      };

      scriptRef.current.onerror = () => {
        console.error('Failed to load Voiceflow widget from CDN');
        if (retryCountRef.current < MAX_RETRY_ATTEMPTS) {
          retryWithBackoff();
        }
      };

      document.body.appendChild(scriptRef.current);
    };

    initTimerRef.current = window.setTimeout(() => {
      loadVoiceflowScript();
    }, VOICEFLOW_INIT_DELAY);

    return () => {
      if (initTimerRef.current) {
        clearTimeout(initTimerRef.current);
      }
      if (scriptRef.current?.parentNode) {
        scriptRef.current.parentNode.removeChild(scriptRef.current);
      }
    };
  }, []);
};

export const openVoiceflowChat = () => {
  if (window.voiceflow?.chat?.open) {
    window.voiceflow.chat.open();
  }
};

export const closeVoiceflowChat = () => {
  if (window.voiceflow?.chat?.close) {
    window.voiceflow.chat.close();
  }
};

export const toggleVoiceflowChat = () => {
  if (window.voiceflow?.chat?.toggle) {
    window.voiceflow.chat.toggle();
  }
};
