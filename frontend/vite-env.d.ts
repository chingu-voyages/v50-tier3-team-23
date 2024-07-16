/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_STRIPE_LOAD_KEY: string;
    // Add more environment variables here if needed
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  
