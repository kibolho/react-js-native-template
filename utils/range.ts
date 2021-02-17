export const range = (start: number, stop: number): number[] => {
	const length = stop - start + 1;
	return Array.from({ length }, (_, i) => start + i);
};
