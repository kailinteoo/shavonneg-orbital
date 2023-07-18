import React, { createContext, useContext, useEffect, useState } from "react";
import { View, ActivityIndicator, StyleSheet, ScrollView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator, DrawerItemList } from "@react-navigation/drawer";
import { onAuthStateChanged } from "firebase/auth";
import { Ionicons } from '@expo/vector-icons';

import Chat from "./screens/Chat";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Home from "./screens/Home";
import FittingRoom from "./screens/FittingRoom";
import Collection from "./screens/Collection";
import Community from "./screens/Community";
import LearnMore from "./screens/LearnMore";
import Profile from "./screens/Profile";
import Camera from "./screens/Camera";
import UpdateProfile from "./screens/UpdateProfile";
import Tops from "./screens/Tops";
import Bottoms from "./screens/Bottoms";
import Shoes from "./screens/Shoes";
import Settings from "./screens/Settings";
import { auth } from "./config/firebase";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const AuthenticatedUserContext = createContext({});

const AuthenticatedUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <AuthenticatedUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
}


function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
}

function CommunityStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Community" component={Community} />
      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  );
}

function CollectionStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Collection" component={Collection} />
      <Stack.Screen name="Tops" component={Tops} />
      <Stack.Screen name="Shoes" component={Shoes} />
      <Stack.Screen name="Bottoms" component={Bottoms} />
    </Stack.Navigator>
  );
}

function RootNavigator() {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authenticatedUser) => {
      authenticatedUser ? setUser(authenticatedUser) : setUser(null);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? (
        <Drawer.Navigator
          screenOptions={{
            headerShown: false,
          }}
          drawerContentOptions={{
            // You can customize the styling of the drawer items here
            // For example, you can set the activeTintColor and inactiveTintColor
            activeTintColor: '#7b68ee',
            inactiveTintColor: '#000',
          }}
          drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
          <Drawer.Screen
            name="Home"
            component={Home}
            options={{
              drawerIcon: ({ focused, color, size }) => (
                <Ionicons
                  name={focused ? 'home' : 'home-outline'}
                  size={size}
                  color={color}
                  style={styles.drawerIcon}
                />
              ),
            }}
          />
          {/* ...Other screens */}
        </Drawer.Navigator>
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
}


export default function App() {
  return (
    <AuthenticatedUserProvider>
      <RootNavigator />
    </AuthenticatedUserProvider>
  );
}

const CustomDrawerContent = (props) => {
  return (
    <ScrollView style={styles.drawerContent} {...props}>
      <DrawerItemList {...props} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    backgroundColor: '#d1c4e9', // Light purple background color
    paddingTop: 50,
  },
  drawerLabel: {
    color: '#4a148c', // Darker purple font color
    marginLeft: -16,
    fontWeight: 'bold',
  },
  drawerIcon: {
    marginRight: 10,
  },
  }
);
