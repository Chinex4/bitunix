import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import zh from './locales/zh.json';
import fr from './locales/fr.json';
import es from './locales/es.json';
import pt from './locales/pt.json';
import ptBR from './locales/pt-BR.json';
import ru from './locales/ru.json';
import vi from './locales/vi.json';
import ja from './locales/ja.json';
import it from './locales/it.json';
import de from './locales/de.json';
import fa from './locales/fa.json';
import id from './locales/id.json';
import hi from './locales/hi.json';
import pl from './locales/pl.json';
import uz from './locales/uz.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    resources: {
      en: { translation: en },
      zh: { translation: zh },
      fr: { translation: fr },
      es: { translation: es },
      pt: { translation: pt },
      'pt-BR': { translation: ptBR },
      ru: { translation: ru },
      vi: { translation: vi },
      ja: { translation: ja },
      it: { translation: it },
      de: { translation: de },
      fa: { translation: fa },
      id: { translation: id },
      hi: { translation: hi },
      pl: { translation: pl },
      uz: { translation: uz },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
