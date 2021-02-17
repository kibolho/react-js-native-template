type CurrencyCodes = 'BRL';

export type CurrencyCode = { [currentCode in CurrencyCodes]: string };

export const CURRENCY_CODE: CurrencyCode = {
	BRL: 'R$',
};

export const getCurrencyCode = (currency: CurrencyCodes = 'BRL'): string => {
	return CURRENCY_CODE[currency];
};
export const toCurrencyWithOutCode = (
	value: number | string,
	currency: CurrencyCodes = 'BRL',
): string => {
	switch (currency) {
		case 'BRL':
		default:
			return Number(value)
				.toFixed(2)
				.toString()
				.replace('.', ',')
				.split(/(?=(?:\d{3})+(?:,|$))/g)
				.join('.')
				.replace('-.', '-');
	}
};

export const toCurrencyWithCode = (
	value: number | string,
	currency: CurrencyCodes = 'BRL',
): string => {
	const valueNumber = Number(value);

	if (isNaN(valueNumber)) {
		return 'Não foi possível consultar';
	}

	const formatedValue = toCurrencyWithOutCode(Math.abs(valueNumber), currency);
	const currencyCode = CURRENCY_CODE[currency] || '';
	return `${valueNumber < 0 ? '- ' : ''}${currencyCode} ${formatedValue}`;
};
