import React from 'react';
import { useSelector } from 'react-redux';
import { getModal } from './redux/selectors';
import { ModalTypes } from './modal.types';

import TitleDescription from './views/TitleDescription';
import ConfirmAction from './views/ConfirmAction';

function ModalManager() {
	const { modalType, modalProps } = useSelector(getModal);

	switch (modalType) {
		case ModalTypes.TitleDescription:
			return <TitleDescription {...modalProps} />;
		case ModalTypes.ConfirmAction:
			return <ConfirmAction {...modalProps} />;
		default:
			return null;
	}
}

export default ModalManager;
