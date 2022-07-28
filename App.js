import React from "react";
import Login from "./screens/Login";
import HomeScreen from "./screens/Mainpage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { I18nManager } from "react-native";

const Stack = createNativeStackNavigator();

export default function App() {
  I18nManager.allowRTL(true);
  I18nManager.forceRTL(true);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
