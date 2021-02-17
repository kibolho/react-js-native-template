export const isValidCPF = (cpf: string): boolean => {
	if (!cpf) return false;
	let resultado;
	let digitos_iguais = 1;
	cpf = cpf.replace(/-/g, '').replace(/\./g, '');

	if (!cpf || cpf.length < 11) return false;
	for (let i = 0; i < cpf.length - 1; i++)
		if (cpf.charAt(i) !== cpf.charAt(i + 1)) {
			digitos_iguais = 0;
			break;
		}

	if (!digitos_iguais) {
		let numeros = cpf.substring(0, 9);
		const digitos = cpf.substring(9);
		let soma = 0;
		for (let i = 10; i > 1; i--) soma += Number(numeros.charAt(10 - i)) * i;

		resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);

		if (resultado !== Number(digitos.charAt(0))) return false;
		numeros = cpf.substring(0, 10);
		soma = 0;

		for (let i = 11; i > 1; i--) soma += Number(numeros.charAt(11 - i)) * i;

		resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
		if (resultado !== Number(digitos.charAt(1))) return false;

		return true;
	}

	return false;
};

export const isValidCNPJ = (cnpj: string): boolean => {
	cnpj = cnpj.replace(/[^\d]+/g, '');
	if (cnpj === '') return false;
	if (cnpj.length !== 14) return false;
	// Valida DVs
	let tamanho = cnpj.length - 2;
	let numeros = cnpj.substring(0, tamanho);
	const digitos = cnpj.substring(tamanho);
	let soma = 0;
	let pos = tamanho - 7;
	for (let i = tamanho; i >= 1; i--) {
		soma += Number(numeros.charAt(tamanho - i)) * pos--;
		if (pos < 2) pos = 9;
	}
	let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
	if (resultado !== Number(digitos.charAt(0))) return false;
	tamanho = tamanho + 1;
	numeros = cnpj.substring(0, tamanho);
	soma = 0;
	pos = tamanho - 7;
	for (let i = tamanho; i >= 1; i--) {
		soma += Number(numeros.charAt(tamanho - i)) * pos--;
		if (pos < 2) pos = 9;
	}
	resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
	if (resultado !== Number(digitos.charAt(1))) return false;
	return true;
};

export const isValidEmail = (email: string): boolean => {
	const regexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return regexp.test(email);
};

export const isValidCellPhone = (cellphone: string): boolean => {
	cellphone = cellphone.replace(/[^\d]+/g, '');
	if (cellphone === '') return false;
	if (cellphone.length >= 10 && cellphone.length <= 14) return true;
	return false;
};
