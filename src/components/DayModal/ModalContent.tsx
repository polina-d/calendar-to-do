import React, {FC, useContext, useState} from 'react';
import {createKey, TargetParams, TargetsListContext} from 'context';

export interface TargetsProps {
    date: Date;
}

export interface TargetProps {
    date: Date;
    target: TargetParams;
}

export const ModalContent: FC<TargetsProps> = ({date}) => {
    const [target, setTarget] = useState('');
    const {targets, addTarget} = useContext(TargetsListContext);
    const dateKey = createKey(date) || '';
    const targetsByDate = targets?.[dateKey] || [];
    const handleClick = () => {
        addTarget(target, date);
        setTarget('');
    };
    return (
        <>
            <input value={target} onChange={(e) => setTarget(e.target.value)} />
            <button onClick={handleClick}>Add target</button>
            <ul>{targetsByDate?.map((target) => <Target target={target} date={date} key={target?.id} />)}</ul>
        </>
    );
};

const Target: FC<TargetProps> = ({target, date}) => {
    const {changeIsDone} = useContext(TargetsListContext);
    return (
        <li>
            <input
                type='checkbox'
                value={target?.id}
                defaultChecked={target?.isDone}
                onChange={() => changeIsDone(target?.id, date)}
            />
            <label style={{textDecoration: target?.isDone ? 'line-through' : 'none'}}>{target?.value}</label>
        </li>
    );
};
