// Description: Formatter functions for numbers and dates

/**
 * Format a number to a currency string
 *
 * @param {number} amount
 * @param {number} maximumFractionDigits
 * @returns {string}
 */
export function currency(amount, maximumFractionDigits = 2) {
	return new Intl.NumberFormat(undefined, {
		style: 'currency',
		currency: 'EUR',
		maximumFractionDigits
	}).format(amount);
}

export const kebapDate = (date) => new Date(date).toISOString().split('T')[0];

export const localDate = (date) => new Intl.DateTimeFormat(undefined).format(new Date(date));

export const localMonth = (date) => new Date(date).toLocaleString(undefined, { month: 'long' });

export const localYear = (date) => new Date(date).toLocaleString(undefined, { year: 'numeric' });

export const localMonthYear = (date) => `${localMonth(date)} ${localYear(date)}`;

export const monthSlashYear = (date) =>
	new Date(date).toLocaleString(undefined, { month: '2-digit', year: '2-digit' });

export const daySlashMonthSlashYear = (date) =>
	new Date(date).toLocaleString(undefined, { day: '2-digit', month: '2-digit', year: '2-digit' });

export const getYearMonth = (date) => {
	const dateObj = new Date(date);
	const year = dateObj.getFullYear();
	const monthString = String(dateObj.getMonth() + 1);
	const month = monthString.length === 1 ? `0${monthString}` : monthString;
	return `${year}-${month}`;
};
