import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FirstOpenState {
    isFirstOpen: boolean;
    setFirstOpen: (value: boolean) => void;
}

export const useFirstOpenStore = create<FirstOpenState>()(
    persist(
        (set) => ({
            isFirstOpen: true,
            setFirstOpen: (value) => set({ isFirstOpen: value }),
        }),
        {
            name: 'first-open-storage',
            storage: {
                getItem: async (name) => {
                    const value = await AsyncStorage.getItem(name);
                    return value ? JSON.parse(value) : null;
                },
                setItem: async (name, value) => {
                    await AsyncStorage.setItem(name, JSON.stringify(value));
                },
                removeItem: async (name) => {
                    await AsyncStorage.removeItem(name);
                },
            },
        }
    )
);
