import React, { createContext, useContext, useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { onAuthStateChanged } from "firebase/auth";

import Chat from "./screens/Chat";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Home from "./screens/Home";
import FittingRoom from "./screens/FittingRoom";
import Collection from "./screens/Collection";
import Community from "./screens/Community";
import LearnMore from "./screens/LearnMore";
import Profile from "./screens/Profile";
import { auth } from "./config/firebase";
;


// SEND THE USER TO LOGINPAGE OR CHATPAGE OR WTV PAGE
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator(); 
const AuthenticatedUserContext = createContext({});

const AuthenticatedUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <AuthenticatedUserContext.Provider value={{user, setUser}}>
      {children}
    </AuthenticatedUserContext.Provider>
  )
}

function ChatStack () {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}
    initialRouteName="Home">
      <Stack.Screen name = "Home" component = {Home} />
      <Stack.Screen name = "FittingRoom" component = {FittingRoom} />
      <Stack.Screen name = "Collection" component = {Collection} />
      <Stack.Screen name = "Community" component = {Community} />
      <Stack.Screen name = "LearnMore" component = {LearnMore} />
      <Stack.Screen name = "Update Profile" component = {UpdateProfile} />
    </Stack.Navigator>
  )
}

function AuthStack () {
  return (
    <Stack.Navigator defaultScreenOptions={Login} screenOptions={{ headerShown: false }}>
      <Stack.Screen name = "Login" component = {Login} />
      <Stack.Screen name = "Signup" component = {Signup} />
    </Stack.Navigator>
  )
}

function DrawerNavigator() {
  const { user } = useContext(AuthenticatedUserContext);

  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home} />
      <Stack.Screen name = "FittingRoom" component = {FittingRoom} />
      <Stack.Screen name = "Collection" component = {Collection} />
      <Stack.Screen name = "Community" component = {Community} />
      <Stack.Screen name = "LearnMore" component = {LearnMore} />
      <Stack.Screen name = "My Profile" component = {Profile} />
    </Drawer.Navigator>
  );
}

// IF YOU WANT TO ADD MORE NAVIGATION, YOU CAN ADD IT INSIDE THIS NAVIGATION CONTAINER
function RootNavigator () {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth,
      async authenticatedUser => {
        authenticatedUser ? setUser(authenticatedUser) : setUser(null);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, [user]);
  if(loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  return (
    <NavigationContainer>
      { user ? <DrawerNavigator /> : <AuthStack />}
    </NavigationContainer>
  )

}

export default function App() {
  return (
    <AuthenticatedUserProvider>
      <RootNavigator />  
    </AuthenticatedUserProvider>
  )

}
