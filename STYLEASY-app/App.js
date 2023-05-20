import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Chat from "./screens/Chat";
import Login from "./screens/Login"
import Signup from "./screens/Signup"


// SEND THE USER TO LOGINPAGE OR CHATPAGE OR WTV PAGE
const Stack = createStackNavigator();

function LoginStack () {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name = "Signup" component = {Signup} />
      <Stack.Screen name = "Login" component = {Login} />
    </Stack.Navigator>
  )
}


// IF YOU WANT TO ADD MORE NAVIGATION, YOU CAN ADD IT INSIDE THIS NAVIGATION CONTAINER
function RootNavigator () {
  return (
    <NavigationContainer>
      <LoginStack />
    </NavigationContainer>
  )
}

export default function App() {
  return <RootNavigator />

}
