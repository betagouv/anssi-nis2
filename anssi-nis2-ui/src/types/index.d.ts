declare global {
  interface Window {
    _paq: [string, ...unknown[]][];
    _mtm: unknown[];
  }
}

export {};
