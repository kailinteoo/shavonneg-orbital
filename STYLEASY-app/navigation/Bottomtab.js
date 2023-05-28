import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Home from '../screens/Home';
import Chat from '../screens/Chat';
//import FittingRoom from './scr`eens/FittingRoom'
//import Wardrobe from './screens/Wardrobe';

//const homeName = 'Home';
//const chatName = 'Chat';
//const fittingRoomName = 'Fitting Room';
//const wardrobeName = 'Wardrobe';
const Tab = createBottomTabNavigator();

//V1
/*
export default function BottomTab() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName={homeName}
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        let rn = route.name;

                        if (rn === homeName) {
                            iconName = focused ? 'home' : 'home-outline';
                        } else if (rn === chatName) {
                            iconName = focused ? 'list' : 'list-outline';
                        }

                        return <Ionicons name={iconName} size={size} color={color}/>
                    },
                })}>
                <Tab.Screen name={homeName} component={Home}/>
                <Tab.Screen name={chatName} component={Chat}/>

            </Tab.Navigator>
        </NavigationContainer> 
    );
}
*/

const Tabs = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home}/>
            <Tab.Screen name="Chat" component={Chat}/>
 

        </Tab.Navigator>
    );
}

export default Tabs;