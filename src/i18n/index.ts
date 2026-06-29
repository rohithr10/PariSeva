import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import en from './en.json';
import ta from './ta.json';

const LANG_STORAGE_KEY = '@myholynest/language';

export type AppLanguage = 'en' | 'ta';

export const resources = {
  en: { translation: en },
  ta: { translation: ta },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    compatibilityJSON: 'v4',
  });

// Restore the persisted language on app start
AsyncStorage.getItem(LANG_STORAGE_KEY)
  .then(saved => {
    if (saved === 'ta' || saved === 'en') {
      i18n.changeLanguage(saved);
    }
  })
  .catch(() => {});

/** Change the app language and persist the choice across launches. */
export async function setAppLanguage(lang: AppLanguage) {
  await i18n.changeLanguage(lang);
  AsyncStorage.setItem(LANG_STORAGE_KEY, lang).catch(() => {});
}

export default i18n;
