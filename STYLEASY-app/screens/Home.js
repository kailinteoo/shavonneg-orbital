import React, { useEffect, useLayoutEffect } from "react";
import { View, TouchableOpacity, Text, Image, StyleSheet, ImageBackground} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import colors from "../colors";
import { Entypo } from "@expo/vector-icons";
import { signOut } from 'firebase/auth';
import { AntDesign } from '@expo/vector-icons';
import { auth, database } from '../config/firebase';
const shirtImageUrl =  "https://assets.teenvogue.com/photos/63a1d9ab2a5a6a5343246ed9/4:3/w_1600%2Cc_limit/BELLA%2520AIYANA%2520LEDE.jpg"

const Home = () => {


    const navigation = useNavigation();
    const onSignOut = () => {
        signOut(auth).catch(error => console.log(error));
    };

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    style={{
                        marginRight: 10
                    }}
                    onPress={onSignOut}
                >
                   
                    <AntDesign name="logout" size={24} color={colors.black} style={{marginRight: 5}}/>
                </TouchableOpacity>
              ),

            headerLeft: () => (
                <Image
                    source={require('../assets/favicon.png')}
                    style={{
                        width: 40,
                        height: 40,
                        marginLeft: 20,
                    }}
                />
            ),

        });
    }, [navigation]);


    return (
        <View style = {styles.container}>

            <Image
                source={require('../assets/logo.png')}
                style={{
                    width: 280,
                    height: 30,
                    marginRight: 40,
                    marginBottom: 8
                }}
            />

            <Text style={{marginRight: 50, marginBottom: 70}}>will help you to eliminate all fashion woes</Text>        

            <TouchableOpacity

                onPress={() => navigation.navigate("LearnMore")}
                style={styles.LearnMoreButton}
            >
                <Text style={{marginBottom: 0, marginLeft: -5}}>LEARN MORE</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                onPress={() => navigation.navigate("Wardrobe")}
                style={styles.wardrobeButton} 
            >
                <Text style={{marginBottom: -50, marginLeft: -65, color:'white', fontWeight:'bold'}}>WARDROBE</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigation.navigate("Collection")}
                style={styles.collectionButton}
            >
                <Text style={{marginBottom: -50, marginLeft: -60, color:'white', fontWeight:'bold'}}>COLLECTION</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigation.navigate("FittingRoom")}
            >
                <ImageBackground source={require('../assets/FittingRoom.png')} style={styles.FittingRoomButton}>
                <Text style={{marginBottom: -140, marginLeft: -30, color:'white', fontWeight:'bold'}}>FITTING ROOM</Text></ImageBackground>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigation.navigate("Community")}
            >
                <ImageBackground source={require('../assets/c.png')} style={styles.CommunityButton}>
                <Text style={{marginBottom: -130, marginLeft: -220, color:'white', fontWeight:'bold'}}>COMMUNITY</Text></ImageBackground>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigation.navigate("Chat")}
                style={styles.chatButton}
            >
                <Entypo name="chat" size={24} color={'#fdf5e6'} />
            </TouchableOpacity>

        </View>
    );
    };

    export default Home;

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            backgroundColor: '#fdf5e6',
        },
        LearnMoreButton: {
            backgroundColor: 'bisque',
            height: 35,
            width: 125,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: '#faf0e6',
            shadowOffset: {
                width: 0,
                height: 10,
            },
            shadowOpacity: .9,
            shadowRadius: 8,
            marginRight: 230,
            marginBottom: 10,

        },
        wardrobeButton: {
            backgroundColor: '#e9967a',
            height: 85,
            width: 175,
            borderRadius: 2,
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: '#faf0e6',
            shadowOffset: {
                width: 0,
                height: 10,
            },
            shadowOpacity: .9,
            shadowRadius: 8,
            marginRight: 180,
            marginBottom: 10,
        },
        collectionButton: {
            backgroundColor: '#e9967a',
            height: 85,
            width: 175,
            borderRadius: 2,
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: '#faf0e6',
            shadowOffset: {
                width: 0,
                height: 0,
            },
            shadowOpacity: .9,
            shadowRadius: 8,
            marginRight: 180,
            marginBottom: -180,
        },
        FittingRoomButton: {
            backgroundColor: '#e9967a',
            height: 180,
            width: 150,
            borderRadius: 2,
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: '#faf0e6',
            shadowOffset: {
                width: 0,
                height: 0,
            },
            shadowOpacity: .9,
            shadowRadius: 8,
            marginRight: 20,
            marginBottom: 20,
        },
        CommunityButton: {
            backgroundColor: '#e9967a',
            height: 170,
            width: 335,
            borderRadius: 15,
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: '#faf0e6',
            shadowOffset: {
                width: 0,
                height: 0,
            },
            shadowOpacity: .9,
            shadowRadius: 8,
            marginRight: 20,
            marginBottom: 40,
        },
        chatButton: {
            backgroundColor: '#e9967a',
            height: 50,
            width: 50,
            borderRadius: 25,
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: '#faf0e6',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: .9,
            shadowRadius: 8,
            marginRight: 20,
            marginBottom: 50,
        }
    });

                             

    /*
    //for bottom tabs 
    export default function Home({ navigation }) {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text
                    onPress={() => navigation.navigate('Chat')}
                    style={{ fontSize: 26, fontWeight: 'bold'}}>Chat</Text>
            </View>
        );

        return thisHome;
      }
      */
