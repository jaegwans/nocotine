import colors from '@/constants/colors';
import React from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

interface DateTimePickerModalWrapperProps {
    activePicker:
        | 'smokeStartDate'
        | 'smokeStartTime'
        | 'quitDate'
        | 'quitTime'
        | null;
    form: {
        smokeStartDate: Date | null;
        smokeStartTime: Date | null;
        quitDate: Date | null;
        quitTime: Date | null;
    };
    onConfirm: (date: Date) => void;
    onCancel: () => void;
}

const DateTimePickerModalWrapper = ({
    activePicker,
    form,
    onConfirm,
    onCancel,
}: DateTimePickerModalWrapperProps) => {
    let date: Date | null = null;
    switch (activePicker) {
        case 'smokeStartDate':
            date = form.smokeStartDate;
            break;
        case 'smokeStartTime':
            date = form.smokeStartTime;
            break;
        case 'quitDate':
            date = form.quitDate;
            break;
        case 'quitTime':
            date = form.quitTime;
            break;
        default:
            date = new Date();
    }
    return (
        <>
            <DateTimePickerModal
                isVisible={
                    activePicker === 'smokeStartDate' ||
                    activePicker === 'quitDate'
                }
                mode={'date'}
                date={date instanceof Date ? date : new Date()}
                onConfirm={onConfirm}
                onCancel={onCancel}
                cancelTextIOS="취소"
                confirmTextIOS="확인"
                textColor={colors.black}
            />
            <DateTimePickerModal
                isVisible={
                    activePicker === 'smokeStartTime' ||
                    activePicker === 'quitTime'
                }
                mode={'time'}
                date={date instanceof Date ? date : new Date()}
                onConfirm={onConfirm}
                onCancel={onCancel}
                cancelTextIOS="취소"
                confirmTextIOS="확인"
                textColor={colors.black}
            />
        </>
    );
};

export default DateTimePickerModalWrapper;
