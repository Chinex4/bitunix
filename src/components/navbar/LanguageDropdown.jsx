import React from 'react';
import { useTranslation } from 'react-i18next';

const languages = [
	'English', '繁體中文', 'Français (International)', 'Español (Internacional)',
	'Português (Portugal)', 'Português (Brasil)', 'Русский', 'Tiếng Việt',
	'日本語', 'Italiano', 'Deutsch', 'فارسی', 'Bahasa Indonesia', 'Hindi',
	'Polski', 'Uzbek'
];

const langCodeFromName = (name) => {
	const mapping = {
		English: 'en',
		Русский: 'ru',
		'Tiếng Việt': 'vi',
		日本語: 'ja',
		Italiano: 'it',
		Deutsch: 'de',
		'Français (International)': 'fr',
		'Español (Internacional)': 'es',
		'Português (Portugal)': 'pt',
		'Português (Brasil)': 'pt-BR',
		فارسی: 'fa',
		'Bahasa Indonesia': 'id',
		Hindi: 'hi',
		Polski: 'pl',
		Uzbek: 'uz',
		繁體中文: 'zh',
	};
	return mapping[name] || 'en';
};

export default function LanguageDropdown({ selected, onChange }) {
	const { i18n } = useTranslation();

	const handleSelect = async (lang) => {
		const code = langCodeFromName(lang);
		i18n.changeLanguage(code);
		onChange(lang, code);
	};

	return (
		<div className='grid grid-cols-2 md:grid-cols-4 gap-3 text-[12px] max-h-[400px] overflow-y-auto pr-2'>
			{languages.map((lang, i) => (
				<div
					key={i}
					onClick={() => handleSelect(lang)}
					className={`px-3 py-2 rounded cursor-pointer ${
						selected === lang ? 'bg-white/10 text-lime-400' : 'hover:bg-white/10'
					}`}>
					{lang}
				</div>
			))}
		</div>
	);
}
