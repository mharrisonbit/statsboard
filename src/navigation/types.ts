export type RootStackParamList = {
  Main: undefined;
  Home: undefined;
  Details: { id?: string } | undefined;
  Teams:{team:string};
  Stats: undefined;
  Shows:undefined;
  Glossary:undefined;
};

export type RootTabParamList = {
  HomeTab: undefined;
  Settings: undefined;
};
