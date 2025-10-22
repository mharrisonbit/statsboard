import { CommonActions, createNavigationContainerRef } from '@react-navigation/native';
import type { RootStackParamList } from './types';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

// Type-safe helpers for imperative navigation from non-component code
export function isReady(): boolean {
  return navigationRef.isReady();
}

export function navigate<RouteName extends keyof RootStackParamList>(
  name: RouteName,
  params?: RootStackParamList[RouteName]
) {
  if (navigationRef.isReady()) {
    // dispatch a CommonActions.navigate to ensure the action is sent to the root container
    navigationRef.dispatch(CommonActions.navigate({ name: name as any, params: params as any }));
  }
}

export function push<RouteName extends keyof RootStackParamList>(
  name: RouteName,
  params?: RootStackParamList[RouteName]
) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(CommonActions.navigate({ name: name as any, params: params as any }));
  }
}

export function replace<RouteName extends keyof RootStackParamList>(
  name: RouteName,
  params?: RootStackParamList[RouteName]
) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(CommonActions.reset({
      index: 0,
      routes: [{ name: name as string, params }],
    }));
  }
}

export function goBack() {
  if (navigationRef.isReady() && navigationRef.canGoBack()) {
    navigationRef.goBack();
  }
}

export function reset(state: any) {
  if (navigationRef.isReady()) {
    navigationRef.reset(state);
  }
}

export function getCurrentRoute() {
  if (!navigationRef.isReady()) return undefined;
  return navigationRef.getCurrentRoute();
}
