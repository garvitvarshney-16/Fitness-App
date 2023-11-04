import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Screens/Home';
import Onboard from './Auth/Onboard';
import Social from './Screens/Social';
import Progresstrack from './Screens/Progresstrack';
import Diet from './Screens/Diet';
import Profile from './Screens/Profile';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Onboard" component={Onboard} />
        <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
        <Stack.Screen options={{ headerShown: false }} name="Social" component={Social} />
        <Stack.Screen options={{ headerShown: false }} name="Progresstrack" component={Progresstrack} />
        <Stack.Screen options={{ headerShown: false }} name="Diet" component={Diet} />
        <Stack.Screen options={{ headerShown: false }} name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
