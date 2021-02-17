import * as Navigator from '~/utils/rootNavigations';
import { ScreensNameRootPJBankType } from '../navigations';

interface NavigationParams {
	pluginName: string;
}

export function navigate<ParamsType = any>(
	screen: ScreensNameRootPJBankType,
	params?: ParamsType,
): void {
	const currentRoute = Navigator.getCurrentRoute() as any;
	const currentRouteParams: NavigationParams =
		currentRoute?.params?.params ?? currentRoute?.params;
	Navigator.navigate(`${currentRouteParams?.pluginName}${screen}`, {
		pluginName: currentRouteParams.pluginName,
		...params,
	});
}

export function pop(count = 1): void {
	Navigator.pop(count);
}

export function goBackSpaces(): void {
	Navigator.navigate('Home');
}
