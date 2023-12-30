import { browser } from '$app/environment';
import translations from './translations';

/**
 * @param {keyof typeof translations.en} key
 * @param {{[key: string]: string}} vars
 * */
export function t(key, vars = {}) {
  /** @type {'en'|'de'} */
  let locale = 'en';
  if (browser) {
    const language = navigator.language || navigator.languages[0];
    const langLocale = language.split('-')[0];
    if (langLocale == 'de' || langLocale == 'en') locale = langLocale;
  }

  let text = translations[locale][key];

  Object.keys(vars).map((k) => {
    const regex = new RegExp(`{{${k}}}`, 'g');
    text = text.replace(regex, vars[k]);
  });

  return text;
}
