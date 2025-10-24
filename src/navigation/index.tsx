import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import GamesView from '../Views/GamesView';
import GlossaryView from '../Views/GlossaryView';
import HomeView from '../Views/HomeView';
import SettingsView from '../Views/SettingsView';
import ShowsView from '../Views/ShowsView';
import TeamStatsView from '../Views/TeamStatsView.tsx';
import TeamsView from '../Views/TeamsView';
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

type DetailsProps = NativeStackScreenProps<RootStackParamList, 'Details'>;

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
                      Teams: 'teams',
                      Stats: 'stats',
                      Shows: 'shows',
                      Games: 'games',
                      Glossary: 'glossary',
                    },
                  },
                  Settings: 'settings',
                },
              },
              Details: 'details/:id',
              Teams: 'teams',
              Stats: 'stats',
              Shows: 'shows',
              Games: 'games',
              Glossary: 'glossary',
            },
          },
        }}
      >
        <RootStack.Navigator
          screenOptions={{
            headerShown: false,
            headerBackButtonDisplayMode: 'minimal',
          }}
        >
          <RootStack.Screen name="Main" component={MainTabs} />
          <RootStack.Screen
            name="Teams"
            component={TeamsView}
            options={({ route }) => ({
              headerShown: true,
              title: 'Teams',
            })}
          />
          <RootStack.Screen
            name="Stats"
            component={TeamStatsView}
            options={({ route }) => ({
              headerShown: true,
              title: 'Games Stat',
            })}
          />
          <RootStack.Screen
            name="Games"
            component={GamesView}
            options={({ route }) => ({
              headerShown: true,
              title: 'Games',
            })}
          />
          <RootStack.Screen
            name="Shows"
            component={ShowsView}
            options={({ route }) => ({
              headerShown: true,
              title: 'Streams',
            })}
          />
          <RootStack.Screen
            name="Glossary"
            component={GlossaryView}
            options={({ route }) => ({
              headerShown: true,
              title: 'Glossary',
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
