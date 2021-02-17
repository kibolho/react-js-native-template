export const getModal = ({ modals }) => {
	return modals.slice(modals.length - 1)[0] || {};
};
