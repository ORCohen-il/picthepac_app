import React from "react";
import WelcomeScreen from "./screens/WelcomeScreen";
import HomeScreen from "./screens/Mainpage";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { I18nManager } from 'react-native';


const Stack = createNativeStackNavigator();

export default function App() {
  I18nManager.forceRTL(true);


  return (
    <NavigationContainer >
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="WelcomeScreen">
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
