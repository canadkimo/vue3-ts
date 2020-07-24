import { createI18n } from 'vue-i18n';
import zhTW from '@/locales/zh-tw.json';
import enUS from '@/locales/en-us.json';
import { LocalStorageName } from './storage';

export type AcceptedLanguages = 'en-us' | 'zh-tw';
export const languages: Array<AcceptedLanguages | string> = ['en-us', 'zh-tw'];

export const defaultLang = 'zh-tw';
export const i18n = createI18n({
  locale: defaultLang,
  availableLocales: languages,
  messages: {
    'en-us': enUS,
    'zh-tw': zhTW,
  },
});

export const changeLang = (lang: AcceptedLanguages) => {
  if (languages.includes(lang)) {
    localStorage.setItem(LocalStorageName.i18nLang, lang);
    i18n.global.locale.value = lang;
    return true;
  }
  return false;
};

export const getLocalStorageLang = () => {
  const lang = localStorage.getItem(LocalStorageName.i18nLang) as AcceptedLanguages;
  if (lang && languages.includes(lang)) {
    return lang;
  }
  return null;
};

export const getBrowserLang = () => {
  const browserLangs = navigator.languages
    .filter((lang) => languages.includes(lang.toLowerCase()));
  const browserLang = browserLangs?.[0]?.toLowerCase() as AcceptedLanguages;
  return browserLang ?? null;
};

export const getUserLang = (pathLang?: AcceptedLanguages) => {
  /**
   * priority
   * 1. localStorage
   * 2. path lang
   * 3. browser
   */
  let lang = getLocalStorageLang();
  if (lang && languages.includes(lang)) {
    return lang;
  }

  if (pathLang && languages.includes(pathLang)) {
    lang = pathLang;
  } else if (navigator.languages) {
    lang = getBrowserLang() ?? defaultLang;
  } else {
    lang = defaultLang;
  }
  localStorage.setItem(LocalStorageName.i18nLang, lang);

  return defaultLang;
};
