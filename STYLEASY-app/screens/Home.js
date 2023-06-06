import React, { useEffect, useLayoutEffect } from "react";
import { View, TouchableOpacity, Text, Image, StyleSheet, StatusBar, ImageBackground, Dimensions, SafeAreaView} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import colors from "../colors";
import { Entypo } from "@expo/vector-icons";
import { signOut } from 'firebase/auth';
import { AntDesign } from '@expo/vector-icons';
import { auth, database } from '../config/firebase';
const shirtImageUrl =  "https://assets.teenvogue.com/photos/63a1d9ab2a5a6a5343246ed9/4:3/w_1600%2Cc_limit/BELLA%2520AIYANA%2520LEDE.jpg"
const{width, height} = Dimensions.get('window');


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


        });
    }, [navigation]);


    return (
        <View style = {styles.container}>
            <View />
            <SafeAreaView style={styles.form}>

                <View>
                <Image
                    source={require('../assets/logo.png')}
                    style={{
                        width: "40%", 
                        height: "40%", 
                        resizeMode: 'contain',
                        alignSelf:  'center',
                    }}
                />

                <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'center'}}>
                    <Text style={{color: 'black', fontWeight: '600', fontSize: 12}}> WILL HELP YOU TO ELIMINATE ALL FASHION WOES </Text>
                </View>        

                <TouchableOpacity
                    onPress={() => navigation.navigate("LearnMore")}
                    style={styles.LearnMoreButton}
                >
                    <Text style={textstyles.LearnMore}>LEARN MORE</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate("Collection")}
                >
                    <ImageBackground source={require('../assets/collection.png')} style={styles.collectionButton}>
                    <Text style={textstyles.Collection}>COLLECTION</Text></ImageBackground>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate("FittingRoom")}
                >
                    <ImageBackground source={require('../assets/FittingRoom.png')} style={styles.FittingRoomButton}>
                    <Text style={textstyles.FittingRoom}>FITTING ROOM</Text></ImageBackground>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate("Community")}
                >
                    <ImageBackground source={require('../assets/community.png')} style={styles.CommunityButton}>
                    <Text style={textstyles.Community}>COMMUNITY</Text></ImageBackground>
                </TouchableOpacity>
            </View>
            </SafeAreaView>
            <StatusBar barStyle="light-content" />
         </View>
    );
}

    export default Home;

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: 'white',

        },
        LearnMoreButton: {
            backgroundColor: 'bisque',
            height: 35, 
            width: 120,
            borderRadius: 2, 
            justifyContent: 'center', 
            alignItems: 'center',
            marginTop: "5%",
        },
        collectionButton: {
            height: 130,
            borderRadius: 2, 
            justifyContent: 'center', 
            alignItens: 'center', 
            alignItems: 'center',
            marginTop: "5%",

        },
        FittingRoomButton: {
            backgroundColor: '#e9967a',
            height: 130,
            borderRadius: 55,
            justifyContent: 'center', 
            alignItens: 'center', 
            alignItems: 'center',
            marginTop: "5%",  
        },
        CommunityButton: {
            backgroundColor: '#e9967a',
            height: 130,
            borderRadius: 55,
            justifyContent: 'center', 
            alignItens: 'center', 
            alignItems: 'center',
            marginTop: "5%",
        },
        form: {
            flex: 1, 
            justifyContent: 'center', 
            marginHorizontal: "5%",
            marginVertical: "-50%",
        },
    });

    const textstyles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            backgroundColor: '#fdf5e6',
        },
        LearnMore: {
            marginBottom: 0, 
            marginLeft: -5
        },
        Collection: {
            marginBottom: -90, 
            marginRight: "5%", 
            color:'white', 
            fontWeight:'bold', 
            fontSize:25,
        },
        FittingRoom: {
            marginBottom: -100, 
            marginRight: "5%", 
            color:'white', 
            fontWeight:'bold', 
            fontSize:25,
        },
        Community: {
            marginBottom: -90, 
            marginRight: "5%", 
            color:'white', 
            fontWeight:'bold', 
            fontSize:25,
        },
        Header: {
            alignSelf: 'center',
        }
    });
                            