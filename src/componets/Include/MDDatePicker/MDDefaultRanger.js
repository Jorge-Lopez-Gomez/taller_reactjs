import {
	addDays,
	addMonths,
	differenceInCalendarDays,
	endOfDay,
	endOfMonth,
	endOfWeek,
	isSameDay,
	startOfDay,
	startOfMonth,
	startOfWeek,
} from 'date-fns';

const defineds = {
	startOfWeek: startOfWeek(new Date()),
	endOfWeek: endOfWeek(new Date()),
	startOfLastWeek: startOfWeek(addDays(new Date(), -7)),
	endOfLastWeek: endOfWeek(addDays(new Date(), -7)),
	startOfToday: startOfDay(new Date()),
	endOfToday: endOfDay(new Date()),
	startOfYesterday: startOfDay(addDays(new Date(), -1)),
	endOfYesterday: endOfDay(addDays(new Date(), -1)),
	startOfMonth: startOfMonth(new Date()),
	endOfMonth: endOfMonth(new Date()),
	startOfLastMonth: startOfMonth(addMonths(new Date(), -1)),
	endOfLastMonth: endOfMonth(addMonths(new Date(), -1)),
};

const staticRangeHandler = {
	range: {},
	isSelected(range) {
		const definedRange = this.range();
		return (
			isSameDay(range.startDate, definedRange.startDate) &&
			isSameDay(range.endDate, definedRange.endDate)
		);
	},
};

export function createStaticRanges(ranges) {
	return ranges.map(range => ({...staticRangeHandler, ...range}));
}

export const defaultStaticRanges = createStaticRanges([
	{
		label: 'Hoy',
		range: () => ({
			startDate: defineds.startOfToday,
			endDate: defineds.endOfToday,
		}),
	},
	{
		label: 'Ayer',
		range: () => ({
			startDate: defineds.startOfYesterday,
			endDate: defineds.endOfYesterday,
		}),
	},
	
	{
		label: 'Esta semana',
		range: () => ({
			startDate: defineds.startOfWeek,
			endDate: defineds.endOfWeek,
		}),
	},
	{
		label: 'La semana pasada',
		range: () => ({
			startDate: defineds.startOfLastWeek,
			endDate: defineds.endOfLastWeek,
		}),
	},
	{
		label: 'Este mes',
		range: () => ({
			startDate: defineds.startOfMonth,
			endDate: defineds.endOfMonth,
		}),
	},
	{
		label: 'El mes pasado',
		range: () => ({
			startDate: defineds.startOfLastMonth,
			endDate: defineds.endOfLastMonth,
		}),
	},
]);

export const defaultInputRanges = [
	{
		label: 'días hasta hoy',
		range(value) {
			return {
				startDate: addDays(defineds.startOfToday, (Math.max(Number(value), 1) - 1) * -1),
				endDate: defineds.endOfToday,
			};
		},
		getCurrentValue(range) {
			if (!isSameDay(range.endDate, defineds.endOfToday)) return '-';
			if (!range.startDate) return '∞';
			return differenceInCalendarDays(defineds.endOfToday, range.startDate) + 1;
		},
	},
	{
		label: 'días a partir de hoy',
		range(value) {
			const today = new Date();
			return {
				startDate: today,
				endDate: addDays(today, Math.max(Number(value), 1) - 1),
			};
		},
		getCurrentValue(range) {
			if (!isSameDay(range.startDate, defineds.startOfToday)) return '-';
			if (!range.endDate) return '∞';
			return differenceInCalendarDays(range.endDate, defineds.startOfToday) + 1;
		},
	},
];
