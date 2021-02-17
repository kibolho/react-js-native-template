import { addDays } from 'date-fns';
import dayjs from 'dayjs';
import I18n from '~/i18n';

export const formatDate = (
	date?: string | null | Date,
	format = 'DD/MM/YYYY',
): string => {
	if (!date) {
		return '';
	}

	return dayjs(date).format(format);
};

export const formatDateToShow = (
	dateToBeShow: string,
	format = 'DD/MM',
	isShowYearIfNotThisYear = false,
): string => {
	const dateFormated = formatDate(dateToBeShow, format);

	const isYesterday = (date: string) =>
		dayjs(date).format('DD/MM/YYYY') ===
		dayjs().add(-1, 'day').format('DD/MM/YYYY');

	const isToday = (date: string) =>
		dayjs().format('DD/MM/YYYY') === dayjs(date).format('DD/MM/YYYY');

	const isThisYear = (date: string) =>
		dayjs(date).format('YYYY') === dayjs().format('YYYY');

	if (isToday(dateToBeShow)) {
		return I18n.t('pjbank_utils.date.today');
	}

	if (isYesterday(dateToBeShow)) {
		return I18n.t('pjbank_utils.date.yesterday');
	}
	if (
		isShowYearIfNotThisYear &&
		format === 'DD/MM' &&
		!isThisYear(dateToBeShow)
	) {
		return formatDate(dateToBeShow, 'DD/MM/YY');
	}
	return dateFormated;
};

export const removeDay = (date: string | Date, count: number): Date | null => {
	if (!date) return null;
	return addDays(new Date(date), count * -1);
};

export const addDay = (date: string | Date, count: number): Date | null => {
	if (!date) return null;
	return addDays(new Date(date), count);
};
