interface VoiceflowChat {
  load: (config: VoiceflowConfig) => void;
  open?: () => void;
  close?: () => void;
  toggle?: () => void;
  interact?: (payload: Record<string, unknown>) => void;
}

interface VoiceflowConfig {
  verify: {
    projectID: string;
  };
  url: string;
  versionID: string;
  voice?: {
    url: string;
  };
  assistant?: {
    stylesheet?: string;
    title?: string;
  };
  theme?: {
    primaryColor?: string;
    accentColor?: string;
  };
}

declare global {
  interface Window {
    voiceflow?: {
      chat: VoiceflowChat;
      events?: {
        on?: (event: string, callback: (payload: Record<string, unknown>) => void) => void;
      };
    };
  }
}

export {};
