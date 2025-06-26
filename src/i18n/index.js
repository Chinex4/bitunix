import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import vi from './locales/vi.json';
// import ru from './locales/ru.json';
// import ja from './locales/ja.json';
// import it from './locales/it.json';
// import de from './locales/de.json';

const resources = {
	en: { translation: en },
	vi: { translation: vi },
	// ru: { translation: ru },
	// ja: { translation: ja },
	// it: { translation: it },
	// de: { translation: de },
};

i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources,
		fallbackLng: 'en',
		interpolation: {
			escapeValue: false,
		},
		detection: {
			order: ['localStorage', 'navigator'],
			caches: ['localStorage'],
		},
	});

export default i18n;
