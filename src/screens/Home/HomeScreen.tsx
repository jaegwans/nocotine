import { useMyInfoStore } from "@/store/useMyInfoStore";
import React from "react";
import { Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./HomeScreen.styles";
import CigarettesAvoidedCard from "./components/CigarettesAvoidedCard";

const HomeScreen = () => {
  const { smokeStartDateAndTime, quitDateAndTime } = useMyInfoStore(
    (state) => state
  );
  if (smokeStartDateAndTime !== null && quitDateAndTime !== null) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <CigarettesAvoidedCard
            smokeStartDateAndTime={smokeStartDateAndTime}
            smokeEndDateAndTime={quitDateAndTime}
          />
        </ScrollView>
      </SafeAreaView>
    );
  } else {
    return <Text>금연 정보를 입력해주세요.</Text>;
  }
};

export default HomeScreen;
