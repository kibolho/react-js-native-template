import { Platform } from 'react-native';
import Share from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob';

interface ShareProps {
	filePath: string;
	filename: string;
	description: string;
	fileFormat?: string;
}

const urlToBase64 = async (url: string) => {
	const file = await RNFetchBlob.config({ fileCache: true }).fetch('GET', url);
	return file.base64();
};

async function share({
	filePath,
	filename,
	description,
	fileFormat = 'image/jpg',
}: ShareProps) {
	const fileBase64 = await urlToBase64(filePath);

	const options: any = Platform.select({
		ios: {
			activityItemSources: [
				{
					linkMetadata: { originalUrl: filePath },
					placeholderItem: { type: 'url', content: filePath },
					item: {
						default: { type: 'url', content: filePath },
					},
				},
			],
		},
		default: {
			filename,
			url: `data:image/png;base64,${fileBase64}`,
			message: description,
			type: fileFormat,
		},
	});

	await Share.open(options)
		.then(() => {})
		.catch((err: any) => {
			err && console.log(err);
		});
}

export default share;
