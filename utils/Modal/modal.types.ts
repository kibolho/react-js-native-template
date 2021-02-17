import { DefaultActionCreators, DefaultActionTypes } from 'reduxsauce';
import { Action } from 'redux';

import { ModalConfirmActionProps } from './views/ConfirmAction';
import { ModalTitleDescriptionProps } from './views/TitleDescription';

export enum ModalTypes {
	TitleDescription = 'modal/TitleDescription',
	ConfirmAction = 'modal/ConfirmAction',
}
export interface ModalTitleDescription {
	title: string;
	description: string;
}

export type ModalProps =
	| ModalConfirmActionProps
	| ModalTitleDescriptionProps
	| undefined;

export interface Modals {
	modalType: ModalTypes;
	modalProps: ModalProps;
}

export interface ActionTypes extends DefaultActionTypes {
	MODAL_STACK_PUSH: string;
	MODAL_STACK_POP: string;
	MODAL_STACK_CLEAR: string;
}

export interface HandleModalPush extends Action {
	modal: string;
}

export interface ActionCreators extends DefaultActionCreators {
	modalStackPush: (params: Modals) => HandleModalPush;
	modalStackPop: () => Action<ActionTypes>;
	modalStackClear: () => Action<ActionTypes>;
}

export type ModalState = Modals[];
