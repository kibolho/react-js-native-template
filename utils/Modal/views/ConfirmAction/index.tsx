import React from 'react';
import {
	Modal,
	Container,
	Body,
	Title,
	Description,
	ButtonsContainer,
} from './styles';
import ActionsModal from '../../redux/store';
import { useDispatch } from 'react-redux';

import { Button, ButtonLink } from '@superlogica/button-native/Button';

export interface ModalConfirmActionProps {
	title: string;
	description: string;
	primaryText?: string;
	secondaryText?: string;
	dispatchAction?: {
		action: any;
		params?: any;
	};
	onPrimaryPress?(): void;
	onSecondaryPress?(): void;
}

const ModalConfirmAction: React.FC<ModalConfirmActionProps> = ({
	title,
	description,
	onPrimaryPress,
	onSecondaryPress,
	secondaryText,
	primaryText,
	dispatchAction,
}) => {
	const dispatch = useDispatch();

	const closeModal = () => {
		dispatch(ActionsModal.modalStackClear());
	};

	const onSecondaryButtonPress = () => {
		closeModal();

		if (onSecondaryPress) {
			return onSecondaryPress();
		}
	};

	const onPrimaryButtonPress = () => {
		closeModal();

		if (dispatchAction) {
			const { action, params } = dispatchAction;
			return dispatch(action(params || undefined));
		}

		if (onPrimaryPress) {
			return onPrimaryPress();
		}
	};

	return (
		<Modal visible>
			<Container>
				<Body>
					<Title>{title}</Title>
					<Description>{description}</Description>
					<ButtonsContainer>
						<ButtonLink onPress={onSecondaryButtonPress} style={{ flex: 1 }}>
							{secondaryText || 'Cancelar'}
						</ButtonLink>
						<Button onPress={onPrimaryButtonPress} style={{ flex: 1 }}>
							{primaryText || 'Ok'}
						</Button>
					</ButtonsContainer>
				</Body>
			</Container>
		</Modal>
	);
};

export default ModalConfirmAction;
