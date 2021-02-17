import { put } from 'redux-saga/effects';
import i18n from '~/i18n';
import { ActionsModal, ModalTypes } from './store';
import { ModalProps, ModalTypes as MTypes } from '../modal.types';

interface ActionPayload {
	modalType?: MTypes;
	payload?: ModalProps;
	error?: any;
	type?: any;
}

export function* showModal(action: ActionPayload) {
	const props = action?.payload || action?.error;
	const modalType = action?.modalType || ModalTypes.TitleDescription;

	let modalProps: ModalProps;

	switch (modalType) {
		case ModalTypes.ConfirmAction:
			modalProps = props;
			break;

		case ModalTypes.TitleDescription:
		default:
			if (props?.description.includes('undefined')) {
				props.description = i18n.t('pjbank_utils.modal.unknown_error');
			}

			modalProps = {
				title: props?.title,
				description: props?.description,
			};

			break;
	}

	yield put(ActionsModal.modalStackPush({ modalType, modalProps }));
}
