/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FLEEK_API_KEY: string
  readonly VITE_CREATIVE_MUSE_AGENT_ID: string
  readonly VITE_ELIZA_AGENT_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
