import Input from "@/components/Input/Input";
import colors from "@/constants/colors";
import { combineDateTime } from "@/utils/combineDateTime";
import { myInfoValidate } from "@/utils/myInfoValidate";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import React, { useState } from "react";
import {
  Alert,
  Keyboard,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { styles } from "./MyInfo.styles";

type activePickerType =
  | "smokeStartDate"
  | "smokeStartTime"
  | "quitDate"
  | "quitTime"
  | null;

const MyInfo = () => {
  const navigation = useNavigation();
  const [form, setForm] = useState({
    smokeStartDate: null as Date | null,
    smokeStartTime: null as Date | null,
    quitDate: null as Date | null,
    quitTime: null as Date | null,
    smokePrice: "",
    cigaretteCount: "",
  });

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
    if (activePicker === "smokeStartDate")
      handleFormChange("smokeStartDate", date);
    else if (activePicker === "smokeStartTime")
      handleFormChange("smokeStartTime", date);
    else if (activePicker === "quitDate") handleFormChange("quitDate", date);
    else if (activePicker === "quitTime") handleFormChange("quitTime", date);
    setActivePicker(null);
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
    });
    setErrorFields(errorFields);
    if (errorMessage) {
      Alert.alert(errorMessage);
      return;
    }
    Alert.alert("저장 완료", "정보가 정상적으로 저장되었습니다.");
    navigation.goBack();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
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
              onPress={() => setActivePicker("smokeStartDate")}
            >
              <Text style={styles.dateText}>
                {form.smokeStartDate
                  ? dayjs(form.smokeStartDate).format("YYYY-MM-DD")
                  : "날짜 선택"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.timeBox}
              onPress={() => setActivePicker("smokeStartTime")}
            >
              <Text style={styles.dateText}>
                {form.smokeStartTime
                  ? dayjs(form.smokeStartTime).format("HH:mm")
                  : "시간 선택"}
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
              onPress={() => setActivePicker("quitDate")}
            >
              <Text style={styles.dateText}>
                {form.quitDate
                  ? dayjs(form.quitDate).format("YYYY-MM-DD")
                  : "날짜 선택"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.timeBox}
              onPress={() => setActivePicker("quitTime")}
            >
              <Text style={styles.dateText}>
                {form.quitTime
                  ? dayjs(form.quitTime).format("HH:mm")
                  : "시간 선택"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Input
          label={
            <>
              담배 한 갑 가격 (₩)
              {errorFields.smokePrice && (
                <Text style={{ color: colors.red }}> *</Text>
              )}
            </>
          }
          keyboardType="numeric"
          placeholder="예: 4500"
          value={form.smokePrice}
          setValue={(v) => handleFormChange("smokePrice", v)}
        />
        <Input
          label={
            <>
              한 갑당 개비 수
              {errorFields.cigaretteCount && (
                <Text style={{ color: colors.red }}> *</Text>
              )}
            </>
          }
          keyboardType="numeric"
          placeholder="예: 20"
          value={form.cigaretteCount}
          setValue={(v) => handleFormChange("cigaretteCount", v)}
        />
        <DateTimePickerModal
          isVisible={activePicker === "smokeStartDate"}
          mode="date"
          date={form.smokeStartDate || new Date()}
          onConfirm={handleConfirm}
          onCancel={() => setActivePicker(null)}
          cancelTextIOS="취소"
          confirmTextIOS="확인"
        />
        <DateTimePickerModal
          isVisible={activePicker === "smokeStartTime"}
          mode="time"
          date={form.smokeStartTime || new Date()}
          onConfirm={handleConfirm}
          onCancel={() => setActivePicker(null)}
          cancelTextIOS="취소"
          confirmTextIOS="확인"
        />
        <DateTimePickerModal
          isVisible={activePicker === "quitDate"}
          mode="date"
          date={form.quitDate || new Date()}
          onConfirm={handleConfirm}
          onCancel={() => setActivePicker(null)}
          cancelTextIOS="취소"
          confirmTextIOS="확인"
        />
        <DateTimePickerModal
          isVisible={activePicker === "quitTime"}
          mode="time"
          date={form.quitTime || new Date()}
          onConfirm={handleConfirm}
          onCancel={() => setActivePicker(null)}
          cancelTextIOS="취소"
          confirmTextIOS="확인"
        />
        <TouchableOpacity
          style={styles.submitButton}
          onPress={validateAndSubmit}
        >
          <Text style={styles.submitButtonText}>저장</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default MyInfo;
