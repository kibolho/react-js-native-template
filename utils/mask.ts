import {
	isValidCPF,
	isValidCNPJ,
	isValidEmail,
	isValidCellPhone,
} from './valid';

type InputType = string | null;

export const maskCPF = (string: InputType, hidden?: boolean): string => {
	if (!string) {
		return '';
	}
	if (hidden) {
		return string
			.replace(/[^\d]/g, '')
			.replace(
				/([\d]{1,3})([\d]{1,3})?([\d]{1,3})?([\d]{1,2})?/,
				(_, __, p2, p3, ___) => {
					return `***.${p2}.${p3}-**`.replace(/.undefined/g, '');
				},
			);
	}
	return string
		.replace(/[^\d]/g, '')
		.replace(
			/([\d]{1,3})([\d]{1,3})?([\d]{1,3})?([\d]{1,2})?/,
			(_, p1, p2, p3, p4) => {
				return `${p1}.${p2}.${p3}-${p4}`.replace(/.undefined/g, '');
			},
		);
};

export const maskCNPJ = (string: InputType, hidden?: boolean): string => {
	if (!string) {
		return '';
	}

	if (hidden) {
		return string
			.replace(/[^\d]/g, '')
			.replace(/([\d]{1,2})([\d]{1,10})?([\d]{1,2})?/, (_, p1, p2, p3) => {
				return `${p1}${p2.replace(/\d/g, '*')}${p3}`.replace(/.undefined/g, '');
			});
	}
	return string
		.replace(/[^\d]/g, '')
		.replace(
			/([\d]{1,2})([\d]{1,3})?([\d]{1,3})?([\d]{1,4})?([\d]{1,2})?/,
			(_, p1, p2, p3, p4, p5) => {
				return `${p1}.${p2}.${p3}/${p4}-${p5}`.replace(/.undefined/g, '');
			},
		);
};

export const maskRG = (string: InputType): string => {
	if (!string) {
		return '';
	}
	return string
		.replace(/[^\d]/g, '')
		.replace(
			/([\d]{1,2})([\d]{1,3})?([\d]{1,3})?([\d]{1})?/,
			(_, p1, p2, p3, p4) => {
				return `${p1}.${p2}.${p3}-${p4}`.replace(/.undefined/g, '');
			},
		);
};

export const maskCellPhone = (string: InputType, hidden: boolean): string => {
	if (!string) {
		return '';
	}
	if (hidden) {
		return string
			.replace(/[^\d]/g, '')
			.replace(/([\d]{1,2})?([\d]{1,5})?([\d]{1,4})?/, (_, p1, p2, p3) => {
				return `(${p1}) *****-${p3}`.replace(/(\(|\)|\-|\) )undefined/g, '');
			});
	}
	return string
		.replace(/[^\d]/g, '')
		.replace(/([\d]{1,2})?([\d]{1,5})?([\d]{1,4})?/, (_, p1, p2, p3) => {
			return `(${p1}) ${p2}-${p3}`.replace(/(\(|\)|\-|\) )undefined/g, '');
		});
};

export const maskEmail = (string: InputType): string => {
	if (!string) {
		return '';
	}
	return string.replace(
		/^(.)(.*)(.@.*)$/,
		(_, a, b, c) => a + b.replace(/./g, '*') + c,
	);
};
export const maskHidden = (string: InputType): string => {
	return mask(string, true);
};

export const maskDocuments = (string: string): string => {
	if (!string) {
		return '';
	}

	if (string.length > 14) {
		return maskCNPJ(string);
	}

	return maskCPF(string);
};

export const mask = (string: InputType, hidden = false): string => {
	if (!string) {
		return '';
	}
	if (isValidCPF(string)) {
		return maskCPF(string, hidden);
	}
	if (isValidEmail(string)) {
		return maskEmail(string);
	}
	if (isValidCNPJ(string)) {
		return maskCNPJ(string, hidden);
	}
	if (isValidCellPhone(string)) {
		return maskCellPhone(string, hidden);
	}
	return string;
};

export const maskCurrency = (string: string): string => {
	if (!string) {
		return '';
	}

	return string
		.replace(/\D/g, '')
		.replace(/(\d{1})(\d{14})$/, '$1.$2')
		.replace(/(\d{1})(\d{11})$/, '$1.$2')
		.replace(/(\d{1})(\d{8})$/, '$1.$2')
		.replace(/(\d{1})(\d{5})$/, '$1.$2')
		.replace(/(\d{1})(\d{1,2})$/, '$1,$2');
};

export const maskCardNumber = (
	string: InputType,
	onlyLastDigits = false,
): string => {
	if (!string) {
		return '';
	}

	const lastDigits = string.substr(-4);

	if (onlyLastDigits) {
		return lastDigits;
	}

	const maskedCard = lastDigits.padStart(19, '**** ');

	return maskedCard;
};
