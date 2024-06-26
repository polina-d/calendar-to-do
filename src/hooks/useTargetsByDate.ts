import {useAppSelector} from 'hooks/redux';
import {createCalendarKeyByDate} from 'utils/helpers';

export const useTargetsByDate = ({date}: {date: Date}) => {
    const calendar = useAppSelector((state) => state.calendarReducer.calendar);
    const dateKey = createCalendarKeyByDate(date) || '';
    return {targets: calendar?.[dateKey] || []};
};
