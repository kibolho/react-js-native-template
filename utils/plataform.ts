import { Platform } from 'react-native';

export const formatPlatformUri = (uri: string): string => {
	const prefix = Platform.select({
		android: 'content://',
		ios: 'assets-library://',
		macos: '',
		web: '',
		windows: '',
	});

	if (uri?.startsWith(prefix) || uri?.startsWith('file://')) {
		return uri;
	}

	return Platform.OS === 'android' ? 'file://' + uri : uri;
};