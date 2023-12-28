import { derived, writable } from 'svelte/store';
import translations from './translations';

/** @type {import('svelte/store').Writable<Locale>} */
export const locale = writable('en');
export const locales = Object.keys(translations);

/**
 * @param {Locale} locale
 * @param {keyof typeof translations.en} key
 * @param {{[key: string]: string}} vars
 * */
function translate(locale, key, vars) {
  let text = translations[locale][key];

  Object.keys(vars).map((k) => {
    const regex = new RegExp(`{{${k}}}`, 'g');
    text = text.replace(regex, vars[k]);
  });

  return text;
}

export const t = derived(
  locale,
  ($locale) =>
    /**
     * @param {keyof typeof translations.en} key
     */
    (key, vars = {}) =>
      translate($locale, key, vars)
);
