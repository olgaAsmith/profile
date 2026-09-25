/** Inlined at build time from NEXT_BASE_PATH (see next.config.mjs). */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export const withBasePath = (path: string) => `${basePath}${path}`;
