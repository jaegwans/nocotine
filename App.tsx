import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';

import RootStackNavigator from '@/navigation/RootStackNavigator';
import OnboardingScreen from '@/screens/OnboardingScreen';
import { useFirstOpenStore } from '@/store/useFirstOpenStore';

export default function App() {
    const { isFirstOpen, setFirstOpen } = useFirstOpenStore();

    if (isFirstOpen) {
        return (
            <View style={{ flex: 1 }}>
                <OnboardingScreen onDone={() => setFirstOpen(false)} />
            </View>
        );
    }

    return (
        <NavigationContainer>
            <RootStackNavigator />
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({});
