interface Paginator<ItemType> {
	currentPage: number;
	previousItems: ItemType[];
	newItems: ItemType[];
}

export function withPagination<ItemType = any>({
	currentPage,
	newItems,
	previousItems,
}: Paginator<ItemType>): Array<ItemType> {
	if (currentPage > 1) {
		return [...previousItems, ...newItems];
	}

	return newItems;
}
