import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type MyInfoState = {
    smokeStartDateAndTime: string | Date | null;
    quitDateAndTime: string | Date | null;
    smokePrice: string;
    cigaretteCount: string;
    averagePerDay: string;
};

export type MyInfoStore = MyInfoState & {
    setMyInfo: (info: Partial<MyInfoState>) => void;
    resetMyInfo: () => void;
    getSmokeStartDate: () => Date | null;
    getQuitDate: () => Date | null;
};

const initialState: MyInfoState = {
    smokeStartDateAndTime: null,
    quitDateAndTime: null,
    smokePrice: '',
    cigaretteCount: '',
    averagePerDay: '',
};

export const useMyInfoStore = create<MyInfoStore>()(
    persist(
        (set, get) => ({
            ...initialState,
            setMyInfo: (info) => set((state) => ({ ...state, ...info })),
            resetMyInfo: () => set(initialState),
            getSmokeStartDate: () => {
                const val = get().smokeStartDateAndTime;
                return val ? new Date(val) : null;
            },
            getQuitDate: () => {
                const val = get().quitDateAndTime;
                return val ? new Date(val) : null;
            },
        }),
        {
            name: 'my-info-storage',
            storage: createJSONStorage(() => AsyncStorage),
            partialize: (state) => ({
                smokeStartDateAndTime: state.smokeStartDateAndTime,
                quitDateAndTime: state.quitDateAndTime,
                smokePrice: state.smokePrice,
                cigaretteCount: state.cigaretteCount,
                averagePerDay: state.averagePerDay,
            }),
        }
    )
);
