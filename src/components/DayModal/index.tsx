import React, {FC, useEffect, useState} from 'react';
import {createCalendarKeyByDate, createDate} from 'utils/helpers';
import {CustomModal} from 'components/CustomModal';
import {useAppDispatch, useTargetsByDate} from 'hooks';
import {addTarget, editTarget} from 'store/calendarSlice';
import {AddIcon, CheckIcon} from '../../assets/icons';
import {Target} from 'components/DayModal/Target';

export interface DayModalProps {
    onClose: () => void;
    date: Date;
}

export interface TargetEditParams {
    isEdit: boolean;
    target: {id: string; value: string; isDone: boolean};
}

export const DayModal: FC<DayModalProps> = ({date, onClose}) => {
    const selectedDate = createDate(date);
    const dispatch = useAppDispatch();
    const dateKey = createCalendarKeyByDate(date);
    const {targets} = useTargetsByDate({date});
    const [targetText, setTargetText] = useState('');
    const initialEdit = {isEdit: false, target: {id: '', value: '', isDone: false}};
    const [edit, setEdit] = useState<TargetEditParams>(initialEdit);
    useEffect(() => {
        if (edit?.isEdit) {
            setTargetText(edit?.target?.value);
        }
    }, [edit]);

    const handleClick = () => {
        if (edit?.isEdit) {
            dispatch(
                editTarget({
                    id: edit?.target?.id,
                    text: targetText,
                    dateKey
                })
            );
            setEdit(initialEdit);
        } else dispatch(addTarget({text: targetText, dateKey}));
        setTargetText('');
        return false;
    };

    return (
        <CustomModal title={selectedDate?.fullDate} onClose={onClose}>
            <form onSubmit={(event) => event.preventDefault()} style={{height: '100%'}}>
                <div className={'add-form'}>
                    <input
                        value={targetText}
                        onChange={(e) => setTargetText(e.target.value)}
                        autoFocus={true}
                        className={'add-form__input'}
                    />
                    <button onClick={handleClick} type={'submit'}>
                        {edit?.isEdit ? <CheckIcon color={'white'} /> : <AddIcon color={'white'} />}
                    </button>
                </div>
                <div style={{height: '70%', paddingTop: '16px'}}>
                    <div className={'add-form__list'}>
                        <ul>
                            {targets?.map((target) => (
                                <Target target={target} setEdit={setEdit} date={date} key={target?.id} />
                            ))}
                        </ul>
                    </div>
                </div>
            </form>
        </CustomModal>
    );
};
