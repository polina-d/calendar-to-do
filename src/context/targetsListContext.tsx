import React, {createContext, PropsWithChildren, useState} from 'react';
import {createDate, createUniqueID} from 'utils/helpers';

export interface TargetParams {
    id: string;
    value: string;
    isDone: boolean;
}

interface TargetListParams {
    [key: string]: TargetParams[];
}

export const createKey = (date: Date): string => {
    const selectedData = createDate(date);
    return selectedData?.year + '-' + selectedData?.monthIndex + '-' + selectedData?.dayNumber;
};
const defaultTargets = [{id: '', value: '', isDone: false}];
export const TargetsListContext = createContext({
    targets: {[createKey(new Date())]: defaultTargets},
    addTarget: (text: string, date: Date) => {},
    changeIsDone: (id: string, date: Date) => {},
    editTarget: (id: string, text: string, date: Date) => {},
    deleteTarget: (id: string, date: Date) => {},
    getTargetsByDate: (date: Date) => defaultTargets
});
export const TargetsListProvider = ({children}: PropsWithChildren) => {
    const [targets, setTargets] = useState<TargetListParams>({});

    const getTargetsByDate = (date: Date) => {
        const dateKey = createKey(date) || '';
        return targets?.[dateKey] || [];
    };

    const addTarget = (text: string, date: Date) => {
        if (!!text.trim() && !!date) {
            const dateKey = createKey(date);
            const target: TargetListParams = !!targets?.[dateKey]?.length
                ? {
                      [dateKey]: [
                          ...targets?.[dateKey],
                          {
                              id: createUniqueID(),
                              value: text,
                              isDone: false
                          }
                      ]
                  }
                : {[dateKey]: [{id: createUniqueID(), value: text, isDone: false}]};
            setTargets((prevState: TargetListParams) => ({...prevState, ...target}));
        }
    };
    const editTarget = (id: string, text: string, date: Date) => {
        if (!!text.trim() && !!date && !!id) {
            const dateKey = createKey(date);
            const targetsByDate = targets?.[dateKey]?.map((i) => (i?.id === id ? {...i, value: text} : i));
            setTargets((prevState: TargetListParams) => ({...prevState, [dateKey]: targetsByDate}));
        }
    };

    const deleteTarget = (id: string, date: Date) => {
        if (!!date && !!id) {
            const dateKey = createKey(date);
            const targetsByDate = targets?.[dateKey]?.filter((i) => i?.id !== id);
            setTargets((prevState: TargetListParams) => ({...prevState, [dateKey]: targetsByDate}));
        }
    };
    const changeIsDone = (id: string, date: Date) => {
        const dateKey = createKey(date);
        setTargets((prevState: TargetListParams) => {
            const targetsById = prevState?.[dateKey]?.map((i) => (i?.id === id ? {...i, isDone: !i?.isDone} : i));
            return {...prevState, [dateKey]: targetsById};
        });
    };

    return (
        <TargetsListContext.Provider
            value={{targets, addTarget: addTarget, changeIsDone, editTarget, deleteTarget, getTargetsByDate}}>
            {children}
        </TargetsListContext.Provider>
    );
};
