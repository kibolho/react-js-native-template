import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
class Storage {
	async set(
		key: string,
		value: string | Date | Record<string, unknown>,
	): Promise<any> {
		return await AsyncStorage.setItem(key, JSON.stringify(value));
	}

	async get(key: string): Promise<any> {
		const value = await AsyncStorage.getItem(key);

		if (value) {
			return JSON.parse(value);
		}

		return null;
	}

	async del(key: string): Promise<any> {
		return await AsyncStorage.removeItem(key);
	}
}

const getKeyValue = async (
	storage: Storage,
	key: any,
	initialValue: any,
	setValue: (arg: any) => any,
): Promise<void> => {
	try {
		const item = await storage.get(key);
		setValue(item ?? initialValue);
	} catch (error) {
		return initialValue;
	}
};

const useFetch = (storage: Storage, key: any, initialValue: any): any => {
	const [value, setValue] = useState();

	useEffect(() => {
		getKeyValue(storage, key, initialValue, setValue);
	}, []);

	return value;
};

function useLocalStorage(
	storage: Storage,
	key: string,
	initialValue: any,
): any {
	const fetchValue = useFetch(storage, key, initialValue);
	const [storedValue, setStoredValue] = useState(fetchValue);

	useEffect(() => {
		setStoredValue(fetchValue);
	}, [fetchValue]);

	const setValue = useCallback(
		(value) => {
			try {
				const valueToStore =
					value instanceof Function ? value(storedValue) : value;
				setStoredValue(valueToStore);
				storage.set(key, valueToStore);
			} catch (error) {
				console.log(error);
			}
		},
		[key, storage, storedValue],
	);

	return [storedValue || initialValue, setValue];
}

export default useLocalStorage;
