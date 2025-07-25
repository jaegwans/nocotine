import Input from '@/components/Input/Input';
import colors from '@/constants/colors';
import { useMyInfoStore } from '@/store/useMyInfoStore';
import { combineDateTime } from '@/utils/combineDateTime';
import { myInfoValidate } from '@/utils/myInfoValidate';
import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';
import React, { useLayoutEffect, useState } from 'react';
import {
    Alert,
    Keyboard,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import DateTimePickerModalWrapper from './components/DateTimePickerModalWrapper';
import { styles } from './MyInfo.styles';
import KeyboardAwareScrollViewWrapper from './KeyboardAwareScrollViewWrapper';

type activePickerType =
    | 'smokeStartDate'
    | 'smokeStartTime'
    | 'quitDate'
    | 'quitTime'
    | null;

const MyInfo = () => {
    const navigation = useNavigation();
    const [form, setForm] = useState({
        smokeStartDate: null as Date | null,
        smokeStartTime: null as Date | null,
        quitDate: null as Date | null,
        quitTime: null as Date | null,
        smokePrice: '',
        cigaretteCount: '',
        averagePerDay: '',
    });
    const myInfoStore = useMyInfoStore((state) => state);
    const { getSmokeStartDate, getQuitDate } = useMyInfoStore((state) => state);
    const smokeStartDateAndTime = getSmokeStartDate();
    const quitDateAndTime = getQuitDate();
    const setMyInfo = useMyInfoStore((state) => state.setMyInfo);
    useLayoutEffect(() => {
        if (
            smokeStartDateAndTime ||
            quitDateAndTime ||
            myInfoStore.smokePrice ||
            myInfoStore.cigaretteCount ||
            myInfoStore.averagePerDay
        ) {
            setForm({
                smokeStartDate: smokeStartDateAndTime,
                smokeStartTime: smokeStartDateAndTime,
                quitDate: quitDateAndTime,
                quitTime: quitDateAndTime,
                smokePrice: myInfoStore.smokePrice,
                cigaretteCount: myInfoStore.cigaretteCount,
                averagePerDay: myInfoStore.averagePerDay,
            });
        }
    }, []);

    const handleFormChange = <K extends keyof typeof form>(
        key: K,
        value: (typeof form)[K]
    ) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const [activePicker, setActivePicker] = useState<activePickerType>(null);
    const [errorFields, setErrorFields] = useState<{ [key: string]: boolean }>(
        {}
    );

    const handleConfirm = (date: Date) => {
        if (activePicker === 'smokeStartDate')
            handleFormChange('smokeStartDate', date);
        else if (activePicker === 'smokeStartTime')
            handleFormChange('smokeStartTime', date);
        else if (activePicker === 'quitDate')
            handleFormChange('quitDate', date);
        else if (activePicker === 'quitTime')
            handleFormChange('quitTime', date);
        setActivePicker(null);
    };

    const handleOpenPicker = (picker: activePickerType) => {
        setActivePicker(picker);
    };

    const validateAndSubmit = () => {
        const finalSmokeStart = combineDateTime(
            form.smokeStartDate,
            form.smokeStartTime
        );
        const finalQuit = combineDateTime(form.quitDate, form.quitTime);
        const { errorMessage, errorFields } = myInfoValidate({
            smokePrice: form.smokePrice,
            smokeStartDate: finalSmokeStart,
            quitDate: finalQuit,
            cigaretteCount: form.cigaretteCount,
            averagePerDay: form.averagePerDay,
        });
        setErrorFields(errorFields);
        if (errorMessage) {
            Alert.alert(errorMessage);
            return;
        }
        try {
            setMyInfo({
                smokeStartDateAndTime: finalSmokeStart,
                quitDateAndTime: finalQuit,
                smokePrice: form.smokePrice,
                cigaretteCount: form.cigaretteCount,
                averagePerDay: form.averagePerDay,
            });
            Alert.alert('저장 완료', '정보가 정상적으로 저장되었습니다.');
            navigation.goBack();
        } catch (error) {
            console.error('Error saving my info:', error);
            Alert.alert('저장 실패', '정보 저장 중 오류가 발생했습니다.');
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <TouchableWithoutFeedback
                onPress={Keyboard.dismiss}
                accessible={false}
            >
                <KeyboardAwareScrollViewWrapper
                    contentContainerStyle={[styles.container]}
                    style={{ backgroundColor: colors.white }}
                >
                    <View>
                        <Text style={styles.label}>
                            흡연 시작일
                            {errorFields.smokeStartDate && (
                                <Text style={{ color: colors.red }}> *</Text>
                            )}
                        </Text>
                        <View style={styles.dateInputContainer}>
                            <TouchableOpacity
                                style={styles.dateBox}
                                onPress={() =>
                                    handleOpenPicker('smokeStartDate')
                                }
                            >
                                <Text style={styles.dateText}>
                                    {form.smokeStartDate
                                        ? dayjs(form.smokeStartDate).format(
                                              'YYYY-MM-DD'
                                          )
                                        : '날짜 선택'}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.timeBox}
                                onPress={() =>
                                    handleOpenPicker('smokeStartTime')
                                }
                            >
                                <Text style={styles.dateText}>
                                    {form.smokeStartTime
                                        ? dayjs(form.smokeStartTime).format(
                                              'HH:mm'
                                          )
                                        : '시간 선택'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.label}>
                            금연 시작일
                            {errorFields.quitDate && (
                                <Text style={{ color: colors.red }}> *</Text>
                            )}
                        </Text>
                        <View style={styles.dateInputContainer}>
                            <TouchableOpacity
                                style={styles.dateBox}
                                onPress={() => handleOpenPicker('quitDate')}
                            >
                                <Text style={styles.dateText}>
                                    {form.quitDate
                                        ? dayjs(form.quitDate).format(
                                              'YYYY-MM-DD'
                                          )
                                        : '날짜 선택'}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.timeBox}
                                onPress={() => handleOpenPicker('quitTime')}
                            >
                                <Text style={styles.dateText}>
                                    {form.quitTime
                                        ? dayjs(form.quitTime).format('HH:mm')
                                        : '시간 선택'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Input
                        label={
                            <>
                                담배 한 갑 가격 (₩)
                                {errorFields.smokePrice && (
                                    <Text style={{ color: colors.red }}>
                                        {' '}
                                        *
                                    </Text>
                                )}
                            </>
                        }
                        keyboardType="numeric"
                        placeholder="예: 4500"
                        value={form.smokePrice}
                        setValue={(v) => handleFormChange('smokePrice', v)}
                    />
                    <Input
                        label={
                            <>
                                한 갑당 개비 수
                                {errorFields.cigaretteCount && (
                                    <Text style={{ color: colors.red }}>
                                        {' '}
                                        *
                                    </Text>
                                )}
                            </>
                        }
                        keyboardType="numeric"
                        placeholder="예: 20"
                        value={form.cigaretteCount}
                        setValue={(v) => handleFormChange('cigaretteCount', v)}
                    />
                    <Input
                        label={
                            <>
                                하루 평균 흡연량
                                {errorFields.averagePerDay && (
                                    <Text style={{ color: colors.red }}>
                                        {' '}
                                        *
                                    </Text>
                                )}
                            </>
                        }
                        keyboardType="numeric"
                        placeholder="예: 10"
                        value={form.averagePerDay}
                        setValue={(v) => handleFormChange('averagePerDay', v)}
                    />
                    <DateTimePickerModalWrapper
                        activePicker={activePicker}
                        form={form}
                        onConfirm={handleConfirm}
                        onCancel={() => setActivePicker(null)}
                    />
                </KeyboardAwareScrollViewWrapper>
            </TouchableWithoutFeedback>
            <TouchableOpacity
                style={styles.submitButton}
                onPress={validateAndSubmit}
            >
                <Text style={styles.submitButtonText}>저장</Text>
            </TouchableOpacity>
        </View>
    );
};

export default MyInfo;
