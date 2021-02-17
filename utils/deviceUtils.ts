import { Dimensions, Platform } from 'react-native';

export const getDimensions = () => Dimensions.get('window');

export const isIos = () => Platform.OS === 'ios';
