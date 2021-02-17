import { Platform, PermissionsAndroid } from 'react-native';

export const verifyPermissions = async (
	permissionsToRequest: any,
	callback: (arg0: boolean) => void,
): Promise<void> => {
	try {
		let granted = true;

		if (Platform.Version < 23) {
			return callback(granted);
		}

		for (const permission of permissionsToRequest) {
			const result = await PermissionsAndroid.request(permission);
			if (result !== PermissionsAndroid.RESULTS.GRANTED) {
				granted = false;
			}
		}
		callback(granted);
	} catch (err) {
		callback(false);
	}
};
