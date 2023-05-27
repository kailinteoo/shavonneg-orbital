import React, {
    useState,
    useEffect,
    useLayoutEffect,
    useCallback
} from "react";
import { View, TouchableOpacity, Text, Image, StyleSheet, ImageBackground} from "react-native";
import { signOut } from 'firebase/auth';
import { auth, database } from '../config/firebase';
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from '@expo/vector-icons';
import colors from "../colors";

const Collection = () => { 

    const navigation = useNavigation();

    const onSignOut = () => {
        signOut(auth).catch(error => console.log(error));
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            title:'',
            headerRight: () => (
                <TouchableOpacity
                    style={{
                        marginRight: 10
                    }}
                    onPress={onSignOut}
                >
                    <AntDesign name="logout" size={24} color={colors.black} style={{marginRight: 10}}/>
                </TouchableOpacity>
              )
            });
          }, [navigation]);      


    return (
        <View style = {styles.container}>

            <Text style={{marginRight: 60, marginBottom: 90, color:'black', fontWeight:'bold', fontSize:'40'}}>COLLECTION</Text>  
            <Text style={{marginBottom: -15, marginRight: 220, color:'black', fontWeight:'bold', fontSize:'12'}}>NEWLY SAVED</Text> 
            <Text style={{marginBottom: 5, marginRight: 30, color:'black', fontWeight:'bold', fontSize:'12'}}>CURRENT FAVORITE</Text>   
            <Text style={{marginTop: 375, marginBottom:-390, marginRight: 115, color:'black', fontWeight:'bold', fontSize:'12'}}>DAILY OUTFIT CHOICES</Text>  

            <TouchableOpacity
                onPress={() => navigation.navigate("NewlySaved")}
            >
                <ImageBackground source={require('../assets/newly.png')}  style={styles.NewlySavedButton}/>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigation.navigate("CurrentFav")}
            >
                <ImageBackground source={require('../assets/current.png')}  style={styles.CurrentFavButton}/>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigation.navigate("Daily")}
            >
                <ImageBackground source={require('../assets/daily.png')}  style={styles.DailyButton}/>
            </TouchableOpacity>

        </View>
    );
    };

    export default Collection;

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            backgroundColor: '#fdf5e6',
        },
        NewlySavedButton: {
            backgroundColor: '#e9967a',
            height: 180,
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
        CurrentFavButton: {
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
        DailyButton: {
            backgroundColor: '#e9967a',
            height: 170,
            width: 335,
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
            marginBottom: 160,
        }
    });