export const locales = ["pl", "en", "es", "ru", "tr", "ka"] as const;
export type Locale = (typeof locales)[number];
