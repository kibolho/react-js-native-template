export function objectGroupBy(
	objectArray: any[],
	property: string,
): { [key: string]: any[] } {
	return objectArray.reduce(function (acc: any, obj: any) {
		const key = obj[property];
		if (!acc[key]) {
			acc[key] = [];
		}
		acc[key].push(obj);
		return acc;
	}, {});
}

export function arrayGroupBy(
	objectArray: any[],
	property: string,
): { title: any; data: any[] }[] {
	return objectArray.reduce(function (acc: any, obj: any) {
		const index = acc.findIndex((item: any) => item.title == obj[property]);

		if (index != -1) {
			acc[index].data.push(obj);
		} else {
			acc.push({ title: obj[property], data: [obj] });
		}

		return acc;
	}, []);
}


export const removeEmptyKeysFromObject = (object: any): string => {
	Object.keys(object).forEach((key) => {
		if (object[key] === null || object[key] === undefined) {
			delete object[key];
		}
	});
	return object;
};
