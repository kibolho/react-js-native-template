import { createReducer, createActions } from 'reduxsauce';
import { BankReducers } from '../../../redux/models/types.redux';
import {
	ModalState,
	ActionTypes,
	ActionCreators,
	ModalTypes as MTypes,
} from '../modal.types';

const { Types, Creators } = createActions<ActionTypes, ActionCreators>(
	{
		modalStackPush: ['modal'],
		modalStackPop: null,
		modalStackClear: null,
	},
	{
		prefix: `${BankReducers.modal}/`,
	},
);

export default Creators;
export const ActionsModal = Creators;

export const ModalTypes = MTypes;
export const ModalActionTypes = Types;

const INITIAL_STATE: ModalState = [];

const handleModalPush = (state: ModalState, action: any) => {
	return [...state, action.modal];
};

const handleModalPop = (state: ModalState) => {
	return state.slice(0, state.length - 1);
};

const handleModalClear = () => INITIAL_STATE;

export const reducer = createReducer<ModalState>(INITIAL_STATE, {
	[Types.MODAL_STACK_PUSH]: handleModalPush,
	[Types.MODAL_STACK_POP]: handleModalPop,
	[Types.MODAL_STACK_CLEAR]: handleModalClear,
});
