import { onlyNumbers } from './formatter';

interface GetAmountAndDueDate {
	amount: string;
	dueDate: string;
}

export const getBarcode = (digitableLine: string): string => {
	let barCode = digitableLine.replace(/[^0-9]/g, '');

	if (barCode.substr(0, 1) === '8') {
		barCode =
			barCode.substr(0, 11) +
			barCode.substr(12, 11) +
			barCode.substr(24, 11) +
			barCode.substr(36, 11);

		return barCode;
	}

	if (barCode.length < 47) {
		barCode += '00000000000'.substr(0, 47 - barCode.length);
	}

	if (barCode.length !== 47) {
		return '';
	}

	barCode =
		barCode.substr(0, 4) +
		barCode.substr(32, 15) +
		barCode.substr(4, 5) +
		barCode.substr(10, 10) +
		barCode.substr(21, 10);

	if (
		modulo11Banco(barCode.substr(0, 4) + barCode.substr(5, 39)) !==
		Number(barCode.substr(4, 1))
	)
		return '';

	return barCode;
};

export const getDigitableLine = (barcode: string): string => {
	let linha = onlyNumbers(barcode);

	if (linha.substr(0, 1) === '8') {
		return toDigitableLineOfConcessionaria(barcode);
	}

	if (linha.length !== 44) {
		return '';
	}

	const campo1 = `${linha.substr(0, 4)}${linha.substr(19, 1)}.${linha.substr(
		20,
		4,
	)}`;
	const campo2 = `${linha.substr(24, 5)}.${linha.substr(24 + 5, 5)}`;
	const campo3 = `${linha.substr(34, 5)}.${linha.substr(34 + 5, 5)}`;
	const campo4 = linha.substr(4, 1); // Digito verificador
	const campo5 = linha.substr(5, 14); // Vencimento + Valor

	if (
		modulo11Banco(linha.substr(0, 4) + linha.substr(5, 99)) !== Number(campo4)
	)
		return '';

	linha = `${campo1 + modulo10(campo1)} ${campo2}${modulo10(
		campo2,
	)} ${campo3}${modulo10(campo3)} ${campo4} ${campo5}`;

	return linha;
};

export const getAmountAndDueDate = (barCode: string): GetAmountAndDueDate => {
	const barcodeChecker = barCode.substr(0, 1);
	let valordocumento = '';

	switch (true) {
		case barcodeChecker <= '7':
			valordocumento = barCode.substr(9, 10);
			break;
		case barcodeChecker >= '8':
			valordocumento = barCode.substr(5, 10);
			break;
		default:
			break;
	}

	const valorFormatado = `${valordocumento.substr(
		0,
		valordocumento.length - 2,
	)}.${valordocumento.substr(valordocumento.length - 2, 2)}`;
	const valorCentavos = valordocumento.substr(valordocumento.length - 2, 2);

	const result: GetAmountAndDueDate = {
		amount: `${parseInt(valorFormatado, 10)},${valorCentavos}`,
		dueDate:
			Number(barCode.substr(5, 4)) === 0 || barCode[0] === '8'
				? ''
				: fatorVencimento(Number(barCode.substr(5, 4))),
	};

	return result;
};

/*
 ** Fator contado a partir da data base 07/10/1997
 ** Ex: 31/12/2011 fator igual a = 5198
 */
function fatorVencimento(dias: number) {
	const currentDate = new Date();
	const time = new Date();

	currentDate.setFullYear(1997, 9, 7);
	time.setTime(currentDate.getTime() + 1000 * 60 * 60 * 24 * dias);

	return time.toLocaleString();
}

function toDigitableLineOfConcessionaria(barCode: string) {
	const codigoBarras = barCode
		.replace(' ', '')
		.replace('.', '')
		.replace('-', '')
		.replace(',', '');

	// Conta de concessionária
	if (codigoBarras[0] === '8' && codigoBarras.length === 44) {
		let modulo;
		/* O 3º dígito é o 'Identificador de Valor Efetivo ou Referência'.
    Ele diz com qual módulo deve ser feito o cálculo */
		switch (codigoBarras[2]) {
			case '6':
			case '7':
				modulo = modulo10;
				break;
			case '8':
			case '9':
				modulo = modulo11;
				break;
			default:
				break;
		}

		if (!modulo) {
			return 'Não foi possível calcular o dígito verificador.';
		}

		const p1 = codigoBarras.substr(0, 11);
		const p2 = codigoBarras.substr(12, 11);
		const p3 = codigoBarras.substr(24, 11);
		const p4 = codigoBarras.substr(36, 11);

		return (
			p1 + modulo(p1) + p2 + modulo(p2) + p3 + modulo(p3) + p4 + modulo(p4)
		);
	}
	return '';
}

function modulo10(number: any) {
	const numero = number.replace(/[^0-9]/g, '');
	let soma = 0;
	let peso = 2;
	let counter = numero.length - 1;

	while (counter >= 0) {
		let multiplicacao = numero.substr(counter, 1) * peso;

		if (multiplicacao >= 10) {
			multiplicacao = 1 + (multiplicacao - 10);
		}

		soma += multiplicacao;
		peso = peso === 2 ? 1 : 2;
		counter--;
	}

	const digito = 10 - (soma % 10);

	return digito === 10 ? 0 : digito;
}

function modulo11(valor: any, base = 9, resto = false) {
	let soma = 0;
	let peso = 2;
	let counter = 0;

	for (counter = valor.length - 1; counter >= 0; counter--) {
		soma += parseInt(valor[counter], 10) * peso;
		peso = peso < base ? peso + 1 : 2;
	}

	const result = soma % 11;

	if (resto) return result;

	const digito = 11 - result;

	return digito > 9 ? 0 : digito;
}

function modulo11Banco(number: any) {
	const numero = number.replace(/[^0-9]/g, '');
	let soma = 0;
	let peso = 2;
	const base = 9;

	const counter = numero.length - 1;

	for (let i = counter; i >= 0; i--) {
		soma += numero.substring(i, i + 1) * peso;
		peso = peso < base ? peso + 1 : 2;
	}

	let digito = 11 - (soma % 11);

	if (digito > 9) digito = 0;
	if (digito === 0) digito = 1;

	return digito;
}
