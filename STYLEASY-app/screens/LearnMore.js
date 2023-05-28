import React, {
    useState,
    useEffect,
    useLayoutEffect,
    useCallback
} from "react";
import { View, TouchableOpacity, Text, Image, StyleSheet, ImageBackground, ScrollView} from "react-native";
import { signOut } from 'firebase/auth';
import { auth, database } from '../config/firebase';
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from '@expo/vector-icons';
import colors from "../colors";

const LearnMore = () => {

    const navigation = useNavigation();
    const onSignOut = () => {
        signOut(auth).catch(error => console.log(error));
    };

    useLayoutEffect(() => {
        navigation.setOptions({
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
                <ScrollView>
                    <Text style={styles.HeaderOne}>Who Are We</Text>  
                    <Text style={styles.HeaderTwo}>We are a team of two software engineers, working together to make our app come to life. We made this app in hopes that we can make styling clothes an easy and brainless process, reducing the time needed to try different outfit combinations to find the best fit for the occasion.</Text>  
                    <Text style={styles.HeaderThree}>How to use our app?</Text>
                    <Text style={styles.HeaderFour}>Our app consists of three major components</Text>
                    <Text style={styles.HeaderFive}>1. Wardrobe</Text>
                    <Text style={styles.HeaderTwo}>Inside your wardrobe, you will be able to view your entire inventory of clothes, as well as look at your saved outfits to refer them for future use.</Text>
                    <Text style={styles.HeaderFive}>2. Fitting Room</Text>
                    <Text style={styles.HeaderTwo}>Here, we let you personalise your outfits without having to try them on!</Text>
                    <Text style={styles.HeaderFive}>3. Community </Text>
                    <Text style={styles.HeaderTwo}>Our app lets you talk to your friends, family, or even like-minded users of our app to bring together a community of fashion enthusiasts.</Text>
                </ScrollView>
            </View>
    );
};

export default LearnMore;

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            backgroundColor: '#fdf5e6',
        },
        HeaderOne: {
            marginTop: 55, 
            marginLeft: 60,
            color:'black', 
            fontWeight: 'bold', 
            fontSize:30,
        },
        HeaderTwo: {
            textAlign: 'justify',
            marginTop: 10,
            marginRight: 30,
            color:'black',
            fontSize:12,
            width: 300,
        },
        HeaderThree: {
            textAlign: 'center',
            marginTop: 40,
            marginRight: 40,
            color:'black',
            fontWeight: 'bold', 
            fontSize:30,
            width: 300,
        },
        HeaderFour: {
            textAlign: 'justify',
            marginTop: 10,
            marginLeft: 8,
            color:'black',
            fontWeight: 'bold', 
            fontSize:12,
            width: 300,
        },
        HeaderFive: {
            textAlign: 'justify',
            marginTop: 20,
            marginLeft: 20,
            color:'black',
            fontWeight: 'bold', 
            fontSize:20,
            width: 300,
        },
    });
