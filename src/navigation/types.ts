export type MainBottomTabParamList = {
  Home: undefined;
  Map: undefined;
  Contents: undefined;
  Setting: undefined;
};

export type SettingStackParamList = {
  Setting: undefined;
  MyInfo: undefined;
};

export type RootStackParamList = {
  MainBottomTab: MainBottomTabParamList;
  MyInfo: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  HealthStatus: undefined;
};
