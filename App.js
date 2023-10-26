import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Screens/Home';
import Onboard from './Auth/Onboard';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Onboard" component={Onboard} />
        <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
