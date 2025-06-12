import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type MyInfoState = {
  smokeStartDateAndTime: Date | null;
  quitDateAndTime: Date | null;
  smokePrice: string;
  cigaretteCount: string;
  averagePerDay: string;
};

export type MyInfoStore = MyInfoState & {
  setMyInfo: (info: Partial<MyInfoState>) => void;
  resetMyInfo: () => void;
};

const initialState: MyInfoState = {
  smokeStartDateAndTime: null,
  quitDateAndTime: null,
  smokePrice: "",
  cigaretteCount: "",
  averagePerDay: "",
};

const zustandAsyncStorage = {
  getItem: async (key: string) => {
    const value = await AsyncStorage.getItem(key);
    return value ? value : null;
  },
  setItem: async (key: string, value: any) =>
    await AsyncStorage.setItem(key, JSON.stringify(value)),
  removeItem: async (key: string) => await AsyncStorage.removeItem(key),
};

const dateKeys = ["smokeStartDateAndTime", "quitDateAndTime"];

function dateReviver(key: string, value: any) {
  if (dateKeys.includes(key) && typeof value === "string" && value) {
    const date = new Date(value);
    if (!isNaN(date.getTime())) return date;
  }
  return value;
}

export const useMyInfoStore = create<MyInfoStore>()(
  persist(
    (set) => ({
      ...initialState,
      setMyInfo: (info) => set((state) => ({ ...state, ...info })),
      resetMyInfo: () => set(initialState),
    }),
    {
      name: "my-info-storage",
      storage: createJSONStorage(() => zustandAsyncStorage),
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
