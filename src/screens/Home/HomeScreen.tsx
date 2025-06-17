import { useMyInfoStore } from "@/store/useMyInfoStore";
import React from "react";
import { Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./HomeScreen.styles";
import LifeGainedCard from "./components/LifeGainedCard";
import MoneySavedCard from "./components/MoneySavedCard";
import SmokeFreeDurationCard from "./components/SmokeFreeDurationCard";

const HomeScreen = () => {
  const { smokeStartDateAndTime, quitDateAndTime } = useMyInfoStore(
    (state) => state
  );
  if (smokeStartDateAndTime !== null && quitDateAndTime !== null) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <SmokeFreeDurationCard
            smokeStartDateAndTime={smokeStartDateAndTime}
            smokeEndDateAndTime={quitDateAndTime}
          />

          <MoneySavedCard
            smokeStartDateAndTime={smokeStartDateAndTime}
            smokeEndDateAndTime={quitDateAndTime}
          />
          <LifeGainedCard />
        </ScrollView>
      </SafeAreaView>
    );
  } else {
    return <Text>금연 정보를 입력해주세요.</Text>;
  }
};

export default HomeScreen;
