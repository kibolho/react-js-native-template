import SpacesStorage from '~/modules/lib/spacesPlugin/storage';
import * as Navigator from '~/utils/rootNavigations';

interface NavigationParams {
	pluginName: string;
}

const pluginStorage = () => {
	const currentRoute = Navigator.getCurrentRoute() as any;
	const currentRouteParams: NavigationParams =
		currentRoute?.params?.params ?? currentRoute?.params;
	const spacesStorage = new SpacesStorage(currentRouteParams.pluginName);
	return spacesStorage;
};

export default pluginStorage;
