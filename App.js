import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/navigation/AppNavigator';
import { initDB } from './src/database/db';
import { C } from './src/components/theme';

export default function App() {
  const [ready, setReady] = useState(false);
  useEffect(() => { initDB().then(() => setReady(true)); }, []);

  if (!ready)
    return (
      <View style={{ flex: 1, justifyContent: 'center', backgroundColor: C.bg }}>
        <ActivityIndicator size="large" color={C.primary} />
      </View>
    );

  return (
    <NavigationContainer theme={{ ...DarkTheme, colors: { ...DarkTheme.colors, background: C.bg } }}>
      <StatusBar style="light" />
      <AppNavigator />
    </NavigationContainer>
  );
}
