import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Screens/Home';
import Onboard from './Auth/Onboard';
import Social from './Screens/Social';
import Progresstrack from './Screens/Progresstrack';
import Diet from './Screens/Diet';
import Profile from './Screens/Profile';
import Notification from './Screens/Notification';
import ChatBot from './Screens/ChatBot';
import Leaderboard from './Screens/Leaderboard';
import Training from './Screens/Training';


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
        <Stack.Screen options={{ headerShown: false }} name='Notification' component={Notification} />
        <Stack.Screen options={{ headerShown: false }} name='ChatBot' component={ChatBot} />
        <Stack.Screen options={{ headerShown: false }} name='Leaderboard' component={Leaderboard} />
        <Stack.Screen options={{ headerShown: false }} name='Training' component={Training} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
