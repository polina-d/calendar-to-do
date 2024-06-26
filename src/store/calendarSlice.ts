import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {createUniqueID} from 'utils/helpers';

export interface TargetParams {
    id: string;
    value: string;
    isDone: boolean;
}

export interface CalendarParams {
    calendar: {[key: string]: TargetParams[]};
}

const initialState: CalendarParams = {
    calendar: {}
};
export const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
        addTarget: (state, action: PayloadAction<{text: string; dateKey: string}>) => {
            const {dateKey, text} = action.payload;
            if (!!text.trim() && !!dateKey) {
                state.calendar[dateKey] = state.calendar[dateKey] || [];
                state.calendar[dateKey]?.push({
                    id: createUniqueID(),
                    value: text,
                    isDone: false
                });
            }
        },
        editTarget: (state, action: PayloadAction<{text: string; dateKey: string; id: string}>) => {
            const {dateKey, text, id} = action.payload;
            if (!!dateKey && !!text.trim() && !!id) {
                state.calendar[dateKey] = state.calendar[dateKey]?.map((target) =>
                    target?.id === id
                        ? {
                              ...target,
                              value: text
                          }
                        : target
                );
            }
        },
        changeIsDone: (state, action: PayloadAction<{dateKey: string; id: string}>) => {
            const {dateKey, id} = action.payload;
            if (!!dateKey && !!id) {
                state.calendar[dateKey] = state.calendar[dateKey]?.map((target) =>
                    target?.id === id
                        ? {
                              ...target,
                              isDone: !target?.isDone
                          }
                        : target
                );
            }
        },
        deleteTarget: (state, action: PayloadAction<{dateKey: string; id: string}>) => {
            const {dateKey, id} = action.payload;
            if (!!dateKey && !!id) {
                state.calendar[dateKey] = state.calendar[dateKey]?.filter((target) => target?.id !== id);
            }
        }
    }
});
export const {addTarget, editTarget, deleteTarget, changeIsDone} = calendarSlice.actions;
export default calendarSlice.reducer;
