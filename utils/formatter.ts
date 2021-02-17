/**
 * Add ... to text if pass the length
 * @param text
 * @param maxLength
 */
export function limitText(text: string, maxLength = 12): string {
	return text.length > maxLength ? text.slice(0, maxLength - 1) + '...' : text;
}

export function onlyNumbers(text = '', withDecimal = false): string {
	if (!text) {
		return '';
	}

	if (withDecimal) {
		return text.replace(/\./g, '').replace(',', '.');
	}

	return text.replace(/[^\d]/g, '');
}

export function capitalize(str: string): string {
	if (typeof str !== 'string') return '';
	return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function removeEspecialChars(value: string): string {
	return value.normalize('NFD').replace(/[^a-zA-Zs0-9\_\.]/g, '');
}

export function removeAccents(value: string): string {
	return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}



export const showHideText = (textToHide: string, show: boolean): string =>
	show ? textToHide : '*'.repeat(textToHide.length);

export const toPlural = (
	value: Array<any> | number,
	singularWord: string,
	pluralWord: string,
): string => {
	let isPlural = false;
	if (typeof value === 'number') {
		isPlural = value > 1;
	} else {
		isPlural = value.length > 1;
	}
	return isPlural ? pluralWord : singularWord;
};

export const toPluralWithQuantity = (
	value: Array<any> | number,
	singularWord: string,
	pluralWord: string,
	replaceString?: string,
): string => {
	let quantity = 0;
	if (typeof value === 'number') {
		quantity = value;
	} else {
		quantity = value.length;
	}
	if (replaceString) {
		return toPlural(value, singularWord, pluralWord).replace(
			replaceString,
			String(quantity),
		);
	}
	return `${quantity} ${toPlural(value, singularWord, pluralWord)}`;
};

export function getInitials(name: string): string {
	const nameSplit = name.split(' ');
	let nameFormatted = '';
	nameSplit.forEach((element: any, index: any) => {
		if (parseInt(index, 10) === 0) {
			nameFormatted += element.substring(0, 1).toUpperCase();
		} else if (parseInt(index, 10) === nameSplit.length - 1) {
			nameFormatted += `${element.substr(0, 1).toUpperCase()}`;
		}
	});
	return nameFormatted;
}

export const removeInitialFinalSpaces = (text?: string): string => {
	if (text) return text.trimStart().trimEnd();
	return '';
};