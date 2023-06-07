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
import { SafeAreaView } from "react-native-safe-area-context";

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
            <View />

            <SafeAreaView style={styles.form}>
            <Text style={textstyles.Collection}>COLLECTION</Text>  
            <Text style={textstyles.NewlySaved}>NEWLY SAVED</Text> 
            <Text style={textstyles.CurrentFav}>CURRENTFAV</Text>


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
            </SafeAreaView>
        </View>
    );
}

    export default Collection;

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '',
        },
        NewlySavedButton: {
            height: "60%",
            width: "70%",
            borderRadius: 2,
            justifyContent: 'center', 
            alignItens: 'center', 
            alignItems: 'center',
            paddingLeft: 20,
            paddingTop: 20,
            marginHorizontal: 30, //space between the picture and the side blank space
        },
        CurrentFavButton: {
            height: "70%",
            width: "70%",
            borderRadius: 2,
            justifyContent: 'center', 
            alignItens: 'center', 
            alignItems: 'center',
            paddingLeft: 20,
            paddingTop: 20,
            marginHorizontal: 40, //space between the picture and the side blank space
            marginVertical: 40,
            marginLeft: 40,
        },

    });

    const textstyles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fdf5e6',
        },
        Collection: {
            color:'black', 
            fontWeight:'bold', 
            fontSize:40,
            alignSelf: "center", 
            paddingBottom: 24,
            alignSelf: 'center',
            marginTop: "-25%",
            marginBottom: "15%",
        },
        NewlySaved: {
            marginRight: "25%", 
            color:'black', 
            fontWeight:'bold', 
            fontSize:12,
            alignItems: "center",
            marginHorizontal: 30, //space between the word and the side blank space
            marginVertical: 10, //space between the word and the picture
            marginTop: "25%", //space between the word and the top blank space
        },
        CurrentFav: {
            marginRight: "25%", 
            color:'black', 
            fontWeight:'bold', 
            fontSize:12,
            alignItems: "center",
            marginHorizontal: 30, //space between the word and the side blank space
            marginVertical: 10, //space between the word and the picture
            marginTop: "25%", //space between the word and the top blank space
        }
    });