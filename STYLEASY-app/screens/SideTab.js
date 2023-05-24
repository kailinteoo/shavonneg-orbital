import React from 'react';

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Home from './Home';
import ProfilePage from './ProfilePage';
import UpdateProfile from './UpdateProfile';

import {useTheme, Avatar} from 'react-native-paper';
import {View} from 'react-native-animatable';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CardListScreen from './CardListScreen';
import CardItemDetails from './CardItemDetails';

const HomeStack = createStackNavigator();
const Profile = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const SideTab = () => (
  <Tab.Navigator initialRouteName="Home" activeColor="#fff">
    <Tab.Screen
      name="Home"
      component={Home}
      options={{
        tabBarLabel: 'Home',
        tabBarColor: '#FF6347',
        tabBarIcon: ({color}) => (
          <Icon name="ios-home" color={color} size={26} />
        ),
      }}
    />
    /*
    <Tab.Screen
      name="Profile"
      component={Profile}
      options={{
        tabBarLabel: 'Profile',
        tabBarColor: '#694fad',
        tabBarIcon: ({color}) => (
          <Icon name="ios-person" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Explore"
      component={ExploreScreen}
      options={{
        tabBarLabel: 'Explore',
        tabBarColor: '#d02860',
        tabBarIcon: ({color}) => (
          <Icon name="ios-aperture" color={color} size={26} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default SideTab;

const HomeScreen = ({navigation}) => {
  const {colors} = useTheme();
  return (
    <Home.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
          shadowColor: colors.background, // iOS
          elevation: 0, // Android
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'FoodFinder',
          headerLeft: () => (
            <View style={{marginLeft: 10}}>
              <Icon.Button
                name="ios-menu"
                size={25}
                color={colors.text}
                backgroundColor={colors.background}
                onPress={() => navigation.openDrawer()}
              />
            </View>
          ),
          headerRight: () => (
            <View style={{flexDirection: 'row', marginRight: 10}}>
              <Icon.Button
                name="ios-search"
                size={25}
                color={colors.text}
                backgroundColor={colors.background}
                onPress={() => {}}
              />
              <TouchableOpacity
                style={{paddingHorizontal: 10, marginTop: 5}}
                onPress={() => {
                  navigation.navigate('Profile');
                }}>
                <Avatar.Image
                  source={{
                    uri:
                      'https://api.adorable.io/avatars/80/abott@adorable.png',
                  }}
                  size={30}
                />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <HomeStack.Screen 
        name="CardListScreen"
        component={CardListScreen}
        options={({route}) => ({
          title: route.params.title,
          headerBackTitleVisible: false
        })}
      />
      <HomeStack.Screen 
        name="CardItemDetails"
        component={CardItemDetails}
        options={({route}) => ({
          // title: route.params.title,
          headerBackTitleVisible: false,
          headerTitle: false,
          headerTransparent: true,
          headerTintColor: '#fff'
        })}
      />
    </Home.Navigator>
  );
};

const ProfilePage = ({navigation}) => {
  const {colors} = useTheme();

  return (
    <Profile.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
          shadowColor: colors.background, // iOS
          elevation: 0, // Android
        },
        headerTintColor: colors.text,
      }}>
      <Profile.Screen
        name="Profile"
        component={ProfilePage}
        options={{
          title: '',
          headerLeft: () => (
            <View style={{marginLeft: 10}}>
              <Icon.Button
                name="ios-menu"
                size={25}
                backgroundColor={colors.background}
                color={colors.text}
                onPress={() => navigation.openDrawer()}
              />
            </View>
          ),
          headerRight: () => (
            <View style={{marginRight: 10}}>
              <MaterialCommunityIcons.Button
                name="account-edit"
                size={25}
                backgroundColor={colors.background}
                color={colors.text}
                onPress={() => navigation.navigate('EditProfile')}
              />
            </View>
          ),
        }}
      />
      <Profile.Screen
        name="EditProfile"
        options={{
          title: 'Edit Profile',
        }}
        component={UpdateProfile}
      />
    </Profile.Navigator>
  );
};