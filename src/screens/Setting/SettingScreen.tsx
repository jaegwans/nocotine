import { RootStackParamList } from "@/navigation/types";
import { useMyInfoStore } from "@/store/useMyInfoStore";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Alert, ScrollView } from "react-native";
import { styles } from "./SettingScreen.styles";
import ListItem from "./components/ListItem";

const SettingScreen = () => {
  const navigation =
    useNavigation<BottomTabNavigationProp<RootStackParamList, "MyInfo">>();
  const resetMyInfo = useMyInfoStore((state) => state.resetMyInfo);
  return (
    <ScrollView style={styles.container}>
      <ListItem
        label="내 정보"
        onPress={() => {
          navigation.navigate("MyInfo");
        }}
        isFirst={true}
      />
      <ListItem
        label="기록 데이터 초기화"
        onPress={() => {
          Alert.alert("기록 데이터 초기화", "정말로 초기화하시겠습니까?", [
            { text: "취소", style: "cancel" },
            {
              text: "확인",
              onPress: () => {
                resetMyInfo();
                Alert.alert("초기화 완료", "기록 데이터가 초기화되었습니다.");
              },
            },
          ]);
        }}
      />
      <ListItem
        label="금연 재시작"
        onPress={() => {
          console.log("Language selected");
        }}
      />
      <ListItem
        label="서비스 이용약관"
        onPress={() => {
          console.log("Language selected");
        }}
      />
      <ListItem
        label="개인정보 처리방침"
        onPress={() => {
          console.log("Language selected");
        }}
      />
    </ScrollView>
  );
};

export default SettingScreen;
