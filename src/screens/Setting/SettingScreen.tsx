import { RootStackParamList } from "@/navigation/types";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { ScrollView } from "react-native";
import { styles } from "./SettingScreen.styles";
import ListItem from "./components/ListItem";

const SettingScreen = () => {
  const navigation =
    useNavigation<BottomTabNavigationProp<RootStackParamList, "MyInfo">>();
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
          console.log("Language selected");
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
