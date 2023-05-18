import React from "react";
// import { Stylesheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Chat from "./screens/Chat";

// SEND THE USER TO LOGINPAGE OR CHATPAGE OR WTV PAGE
const Stack = createStackNavigator();

function ChatStack () {
  return (
    <Stack.Navigator>
      <Stack.Screen name = "Chat" component = {Chat} />
    </Stack.Navigator>
  )
}

// IF YOU WANT TO ADD MORE NAVIGATION, YOU CAN ADD IT INSIDE THIS NAVIGATION CONTAINER
function RootNavigator () {
  return (
    <NavigationContainer>
      <ChatStack />
    </NavigationContainer>
  )
}

export default function App() {
  return <RootNavigator />

    /*<View style={Stylesheet.NavigationContainer}>
      <Text> Hi smartcookies </Text>
    </View>*/
    
}