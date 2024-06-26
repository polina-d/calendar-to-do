import React, {FC} from 'react';
import {useAppDispatch} from 'hooks';
import {createCalendarKeyByDate} from 'utils/helpers';
import {changeIsDone, deleteTarget, TargetParams} from 'store/calendarSlice';
import {DeleteIcon, EditIcon} from '../../assets/icons';
import {TargetEditParams} from 'components';

export interface TargetProps {
    date: Date;
    target: TargetParams;
    setEdit: ({isEdit, target: {id, value, isDone}}: TargetEditParams) => void;
}

export const Target: FC<TargetProps> = ({target, date, setEdit}) => {
    const dispatch = useAppDispatch();
    const dateKey = createCalendarKeyByDate(date);

    const onChangeIsDone = () => dispatch(changeIsDone({id: target?.id, dateKey}));
    const onClickDelete = () => dispatch(deleteTarget({id: target?.id, dateKey}));
    return (
        <>
            <li>
                <div className={'add-form__list-element'}>
                    <div style={{width: '90%'}}>
                        <label style={{textDecoration: target?.isDone ? 'line-through' : 'none'}}>
                            <input
                                type='checkbox'
                                value={target?.id}
                                defaultChecked={target?.isDone}
                                onChange={onChangeIsDone}
                            />
                            {target?.value}
                        </label>
                    </div>
                    <div>
                        <button
                            className={'button--icon'}
                            type={'button'}
                            onClick={() => setEdit({isEdit: true, target: target})}>
                            <EditIcon />
                        </button>
                        <button className={'button--icon'} type={'button'} onClick={onClickDelete}>
                            <DeleteIcon />
                        </button>
                    </div>
                </div>
            </li>
            <hr className={'divider'} />
        </>
    );
};
