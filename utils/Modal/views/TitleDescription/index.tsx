import React from 'react';
import { Modal, Container, Body, Title, Description, Button } from './styles';
import ActionsModal from '../../redux/store';
import { useDispatch } from 'react-redux';

export interface ModalTitleDescriptionProps {
	title: string;
	description: string;
	onButtonPress?(): void;
	buttonText?: string;
}

const ModalTitleDescription: React.FC<ModalTitleDescriptionProps> = ({
	title,
	description,
	buttonText = 'Ok',
	onButtonPress,
}) => {
	const dispatch = useDispatch();
	return (
		<Modal visible={true}>
			<Container>
				<Body>
					<Title>{title}</Title>
					<Description>{description}</Description>
					<Button
						onPress={() => {
							if (onButtonPress) return onButtonPress();
							dispatch(ActionsModal.modalStackPop());
						}}>
						{buttonText}
					</Button>
				</Body>
			</Container>
		</Modal>
	);
};

export default ModalTitleDescription;
