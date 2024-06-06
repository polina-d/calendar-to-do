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
export const TargetsListContext = createContext({
    targets: {[createKey(new Date())]: [{id: '', value: '', isDone: false}]},
    addTarget: (text: string, date: Date) => {},
    changeIsDone: (id: string, date: Date) => {}
});
export const TargetsListProvider = ({children}: PropsWithChildren) => {
    const [targets, setTargets] = useState<TargetListParams>({});
    const addTarget = (text: string, date: Date) => {
        const dateKey = createKey(date);
        const newTarget: TargetListParams = targets?.[dateKey]
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
        setTargets((prevState: TargetListParams) => ({...prevState, ...newTarget}));
    };

    const changeIsDone = (id: string, date: Date) => {
        const dateKey = createKey(date);
        setTargets((prevState: TargetListParams) => {
            const targetsById = prevState?.[dateKey]?.map((i) => (i?.id === id ? {...i, isDone: !i?.isDone} : i));
            return {...prevState, ...{[dateKey]: targetsById}};
        });
    };
    return (
        <TargetsListContext.Provider value={{targets, addTarget, changeIsDone}}>{children}</TargetsListContext.Provider>
    );
};
