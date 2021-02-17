import styled from 'styled-components/native';
import * as Typography from '@superlogica/typography-native';
import { getDimensions } from '../../../deviceUtils';
import { Button as SuperlogicaButton } from '@superlogica/button-native';

const { width } = getDimensions();

export const Modal = styled.Modal.attrs({
	transparent: true,
})``;

export const Container = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
	background: rgba(0, 0, 0, 0.5);
`;

export const Body = styled.View`
	width: ${width * 0.8}px;
	background: #fff;
	align-self: center;
	border-radius: 8px;
	padding: 16px;
	box-shadow: 0 0 2px #000;
`;

export const Title = styled(Typography.Subtitle).attrs(() => ({
	bold: true,
}))`
	text-align: center;
	margin-bottom: 16px;
`;

export const Description = styled(Typography.Body)`
	text-align: center;
	margin-bottom: 16px;
`;

export const Button = styled(SuperlogicaButton)`
	margin-bottom: 0;
	width: 200px;
	align-self: center;
	z-index: -99;
`;
