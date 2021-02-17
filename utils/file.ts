import DocumentPicker from 'react-native-document-picker';
import ImagePicker, { ImageOrVideo } from 'react-native-image-crop-picker';
import uuid from 'react-native-uuid';
import RNFetchBlob from 'rn-fetch-blob';
import { Platform } from 'react-native';

type MediaType = 'video' | 'photo' | 'any';

export type ReadFormat = 'pdf' | 'json';
export type ContentType = 'image/jpg';
export type Encoding = 'multipart/form-data';

export type FileType = {
	name: string;
	filename: string;
	data: string;
	encoding: Encoding;
	'content-type': string;
};

const extension: { [key: string]: string } = {
	'application/pdf': 'pdf',
	'image/jpeg': 'jpeg',
	'image/jpg': 'jpg',
};

export interface FilePickerOptions {
	width?: number;
	height?: number;
	cropping?: boolean;
	multiple?: boolean;
	mediaType: MediaType;
	useFrontCamera?: boolean;
	compressImageQuality?: number;
	compressImageMaxWidth?: number;
	compressImageMaxHeight?: number;
	minFiles?: number;
	maxFiles?: number;
}

export interface FilePickerResponse {
	contentType: string;
	path: string;
	width?: number;
	height?: number;
	size?: number;
}

type PossibleArray<O, T> = O extends { multiple: true } ? T[] : T;

const File = {
	fixFileURI(uri = ''): string {
		return Platform.OS === 'ios'
			? uri.replace('file://', '')
			: !uri.includes('file://')
			? `file://${uri}`
			: uri;
	},

	getCorrectPathToUpload(path: string): any {
		const uri = File.fixFileURI(path);
		return RNFetchBlob.wrap(uri);
	},

	filesFactory(file: FilePickerResponse): FileType[] {
		const factoredFile: FileType = {
			name: 'arquivos',
			filename: `${uuid.v4()}.${extension[file.contentType]}`,
			data: File.getCorrectPathToUpload(file.path),
			encoding: 'multipart/form-data',
			'content-type': file.contentType,
		};

		return [factoredFile];
	},

	FilePicker() {
		const openGalery = async <O extends FilePickerOptions>(
			options: O,
		): Promise<PossibleArray<O, FilePickerResponse>> => {
			return new Promise(async (resolve, reject) => {
				const response = await ImagePicker.openPicker(options).catch((e) => {
					reject(e);
				});
				if (response) {
					if (options.multiple) {
						const arrayResponse = response as ImageOrVideo[];
						resolve(
							arrayResponse.map(
								(res: ImageOrVideo): FilePickerResponse => ({
									contentType: res.mime,
									width: res.width,
									height: res.height,
									size: res.size,
									path: res.path,
								}),
							) as PossibleArray<typeof options, FilePickerResponse>,
						);
					} else {
						const responseResolve = {
							contentType: response.mime,
							width: response.width,
							height: response.height,
							size: response.size,
							path: response.path,
						} as PossibleArray<typeof options, FilePickerResponse>;
						resolve(responseResolve);
					}
				}
			});
		};

		const openCamera = async (
			options: FilePickerOptions,
		): Promise<FilePickerResponse> => {
			return new Promise(async (resolve, reject) => {
				const response = await ImagePicker.openCamera(options).catch((_) => {
					reject(null);
				});
				if (response) {
					resolve({
						contentType: response.mime,
						width: response.width,
						height: response.height,
						size: response.size,
						path: response.path,
					});
				}
			});
		};

		const openFileManager = async (): Promise<FilePickerResponse> => {
			return new Promise(async (resolve, reject) => {
				const response = await DocumentPicker.pick({
					type: [DocumentPicker.types.allFiles],
				}).catch((_) => {
					reject(null);
				});

				if (response) {
					resolve({
						contentType: response.type,
						path: response.uri,
					});
				}
			});
		};
		return { openGalery, openCamera, openFileManager };
	},
};

export default File;
