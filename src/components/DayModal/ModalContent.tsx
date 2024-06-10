import React, {FC, useContext, useEffect, useState} from 'react';
import {TargetParams, TargetsListContext} from 'context';
import {AddIcon, CheckIcon, DeleteIcon, EditIcon} from '../../assets/icons';

export interface TargetsProps {
    date: Date;
}

export interface TargetProps {
    date: Date;
    target: TargetParams;
    setEdit: ({
        isEdit,
        target: {id, value, isDone}
    }: {
        isEdit: boolean;
        target: {id: string; value: string; isDone: boolean};
    }) => void;
}

export const ModalContent: FC<TargetsProps> = ({date}) => {
    const [target, setTarget] = useState('');
    const {getTargetsByDate, addTarget, editTarget} = useContext(TargetsListContext);
    const targetsByDate = getTargetsByDate(date);
    const defaultEdit = {isEdit: false, target: {id: '', value: '', isDone: false}};
    const [edit, setEdit] = useState(defaultEdit);

    useEffect(() => {
        if (edit?.isEdit) {
            setTarget(edit?.target?.value);
        }
    }, [edit]);

    const handleClick = () => {
        if (edit?.isEdit) {
            editTarget(edit?.target?.id, target, date);
            setEdit(defaultEdit);
        } else addTarget(target, date);
        setTarget('');
        return false;
    };

    return (
        <form onSubmit={(event) => event.preventDefault()} style={{height: '100%'}}>
            <div className={'add-form'}>
                <input
                    value={target}
                    onChange={(e) => setTarget(e.target.value)}
                    autoFocus={true}
                    className={'add-form__input'}
                />
                <button onClick={handleClick} type={'submit'} className={'button'}>
                    {edit?.isEdit ? <CheckIcon color={'white'} /> : <AddIcon color={'white'} />}
                </button>
            </div>
            <div style={{height: '70%', paddingTop: '16px'}}>
                <div className={'add-form__list'}>
                    <ul>
                        {targetsByDate?.map((target) => (
                            <Target target={target} setEdit={setEdit} date={date} key={target?.id} />
                        ))}
                    </ul>
                </div>
            </div>
        </form>
    );
};

const Target: FC<TargetProps> = ({target, date, setEdit}) => {
    const {changeIsDone, deleteTarget} = useContext(TargetsListContext);
    return (
        <>
            <li>
                <div className={'add-form__list-element'}>
                    <div style={{width: '90%'}}>
                        <input
                            type='checkbox'
                            value={target?.id}
                            defaultChecked={target?.isDone}
                            onChange={() => changeIsDone(target?.id, date)}
                        />
                        <label style={{textDecoration: target?.isDone ? 'line-through' : 'none'}}>
                            {target?.value}
                        </label>
                    </div>
                    <div>
                        <button
                            className={'button button--icon'}
                            type={'button'}
                            onClick={() => setEdit({isEdit: true, target: target})}>
                            <EditIcon />
                        </button>
                        <button
                            className={'button button--icon'}
                            type={'button'}
                            onClick={() => deleteTarget(target?.id, date)}>
                            <DeleteIcon />
                        </button>
                    </div>
                </div>
            </li>
            <hr className={'divider'} />
        </>
    );
};
