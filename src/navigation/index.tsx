import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import GameStatsView from '../Views/GameStatsView';
import GlossaryView from '../Views/GlossaryView';
import HomeView from '../Views/HomeView';
import SettingsView from '../Views/SettingsView';
import ShowsView from '../Views/ShowsView';
import { navigationRef } from './ref';
import type { RootStackParamList, RootTabParamList } from './types';

// Guard enableScreens
try {
  if (typeof enableScreens === 'function' && typeof jest === 'undefined') {
    enableScreens();
  }
} catch (e) {}

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
type DetailsProps = NativeStackScreenProps<RootStackParamList, 'Details'>;
type SettingsProps = BottomTabScreenProps<RootTabParamList, 'Settings'>;

function DetailsScreen({ route }: DetailsProps) {
  const id = route.params?.id;
  return (
    <SafeAreaView
      style={[
        styles.container,
        { justifyContent: 'center', alignItems: 'center' },
      ]}
    >
      <Text>{`Details Screen${id ? ` (${id})` : ''}`}</Text>
    </SafeAreaView>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="HomeTab"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="home" color={color} size={size || 18} />
          ),
        }}
      >
        {() => (
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Home" component={HomeView} />
          </Stack.Navigator>
        )}
      </Tab.Screen>
      <Tab.Screen
        name="Settings"
        component={SettingsView}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="cog" solid color={color} size={size || 18} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function Navigation() {
  return (
    <SafeAreaProvider>
      <NavigationContainer
        ref={navigationRef}
        theme={{
          ...DefaultTheme,
          colors: {
            ...DefaultTheme.colors,
            background: '#fff',
          },
        }}
        linking={{
          prefixes: ['statsboard://', 'https://example.com'],
          config: {
            screens: {
              Main: {
                screens: {
                  HomeTab: {
                    screens: {
                      Home: 'home',
                      Details: 'details/:id',
                    },
                  },
                  Settings: 'settings',
                },
              },
              Details: 'details/:id',
              Stats: 'stats',
              Shows: 'shows',
              Glossary: 'glossary',
            },
          },
        }}
      >
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
          <RootStack.Screen name="Main" component={MainTabs} />
          <RootStack.Screen
            name="Details"
            component={DetailsScreen}
            options={({ route }) => ({
              headerShown: true,
              title: route?.params?.id
                ? `Details ${route.params.id}`
                : 'Details',
            })}
          />
          <RootStack.Screen
            name="Stats"
            component={GameStatsView}
            options={({ route }) => ({
              headerShown: true,
              title: route?.params?.id
                ? `game stats ${route.params.id}`
                : 'games stat',
            })}
          />
          <RootStack.Screen
            name="Shows"
            component={ShowsView}
            options={({ route }) => ({
              headerShown: true,
              title: route?.params?.id ? `show ${route.params.id}` : 'shows',
            })}
          />
          <RootStack.Screen
            name="Glossary"
            component={GlossaryView}
            options={({ route }) => ({
              headerShown: true,
              title: route?.params?.id
                ? `glossary ${route.params.id}`
                : 'glossarys',
            })}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
