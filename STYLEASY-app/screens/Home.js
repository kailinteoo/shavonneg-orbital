import React, { useEffect, useLayoutEffect } from "react";
import { View, TouchableOpacity, Text, Image, StyleSheet, StatusBar, ImageBackground, Dimensions, SafeAreaView} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import colors from "../colors";
import { Entypo } from "@expo/vector-icons";
import { signOut } from 'firebase/auth';
import { AntDesign } from '@expo/vector-icons';
import { auth, database } from '../config/firebase';



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

    // Get the device screen dimensions
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    // Calculate the logo size based on the screen dimensions
    const logoSize = Math.min(windowWidth * 0.3, windowHeight * 0.3);

    // Calculate the button width based on the screen dimensions
    const buttonWidth = windowWidth * 0.8;

    // Calculate the font size for the label based on the screen width
    const labelFontSize = windowWidth * 0.03;

    // Calculate the font size for the button text based on the screen width
    const textFontSize = windowWidth * 0.05;
    const textHeight = windowHeight * 0.12;

    // Calculate the margin bottom based on the screen height
    const marginBottom = windowHeight * 0.1; // Adjust the percentage as desired


    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <Image source={require('../assets/logo1.png')} style={[styles.logo, {width: logoSize, height:logoSize}]} />
                <Text style={[styles.label, { fontSize: labelFontSize }]}>WILL HELP YOU TO ELIMINATE ALL FASHION WOES</Text>
            </View>

            <View style={styles.middleContainer}>
                <TouchableOpacity style={styles.LearnMoreButton} onPress={() => navigation.navigate("LearnMore")}>
                    <Text style={styles.LearnMoreButtonText}>HOW TO USE THE APP</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.bottomContainer}>
                <TouchableOpacity style={[styles.Button, {width: buttonWidth, height: windowHeight * 0.17}]} onPress={() => navigation.navigate("Collection")}>
                    <ImageBackground source={require('../assets/collection.png')} style={styles.buttonBackground}>
                        <Text style={[styles.buttonText, { fontSize: textFontSize, marginTop: textHeight }]}>COLLECTION</Text>
                    </ImageBackground>
                </TouchableOpacity>

                <View style={styles.gap} />

                <TouchableOpacity style={[styles.Button, {width: buttonWidth, height: windowHeight * 0.17}]} onPress={() => navigation.navigate("FittingRoom")}>
                    <ImageBackground source={require('../assets/FittingRoom.png')} style={styles.buttonBackground}>
                        <Text style={[styles.buttonText, { fontSize: textFontSize, marginTop: textHeight }]}>FITTING ROOM</Text>
                    </ImageBackground>
                </TouchableOpacity>

                <View style={styles.gap} />

                <TouchableOpacity style={[styles.Button, {width: buttonWidth, height: windowHeight * 0.17}]} onPress={() => navigation.navigate("Community")}>
                    <ImageBackground source={require('../assets/community.png')} style={styles.buttonBackground}>
                        <Text style={[styles.buttonText, { fontSize: textFontSize, marginTop: textHeight }]}>COMMUNITY</Text>
                    </ImageBackground>
                </TouchableOpacity>
            </View>
        </View>
    );
};


    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
            backgroundColor: 'white',
          },
          topContainer: {
            alignItems: 'center',
            marginBottom: 25,
          },
          logo: {
            resizeMode: 'contain',
            alignItems: 'center', 
            alignSelf: 'center'
          },
          label: {
            fontWeight: 'bold',
            marginTop: 30,
            textAlign: "center",
          },
          middleContainer: {
            alignItems: "flex-start",
            alignSelf: "center",
            marginBottom: 15,
          },
          LearnMoreButton: {
            paddingHorizontal: 5,
            paddingVertical: 5,
            borderRadius: 5,
            backgroundColor: 'bisque',
          },
          LearnMoreButtonText: {
            color: 'black',
            fontWeight: 'bold',
          },
          bottomContainer: {
            alignItems: 'stretch',

          },
          Button: {
            borderRadius: 5,
            justifyContent: 'center',
          },
          buttonBackground: {
            flex: 1,
            resizeMode: 'cover',
            justifyContent: 'center',
          },
          buttonText: {
            color: 'white',
            fontWeight: 'bold',
            alignSelf: "center",
          },
          gap: {
            height: 20, // Adjust the height as needed
          },
        });
        
        
        export default Home;                    