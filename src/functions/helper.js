export const maskEmail = (email) => {
	if (!email || typeof email !== 'string') return '';

	const [localPart, domain] = email.split('@');
	if (!domain) return email;

	const visibleChars = Math.min(4, localPart.length); // show up to 4 starting characters
	const maskedLength = localPart.length - visibleChars;
	const masked = '*'.repeat(maskedLength > 0 ? maskedLength : 0);

	return `${localPart.slice(0, visibleChars)}${masked}@${domain}`;
};
