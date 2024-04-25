import './global.css';

import 'react-native-gesture-handler';
import 'intl-pluralrules';

import LanguageDetector from '@os-team/i18next-react-native-language-detector';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { PaperProvider } from 'react-native-paper';

import translationEN from '~/locales/en/translation.json';
import translationES from '~/locales/es/translation.json';
import RootStack from '~/navigation';

const resources = {
  en: {
    translation: translationEN,
  },
  es: {
    translation: translationES,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources,
    fallbackLng: 'es',
    interpolation: {
      escapeValue: false,
    },
  });

export default function App() {
  return (
    <PaperProvider>
      <RootStack />
    </PaperProvider>
  );
}
