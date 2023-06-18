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

            <Text style={textstyles.Collection}>COLLECTION</Text>  
            <Text style={textstyles.NewlySaved}>NEWLY SAVED</Text> 
            <Text style={textstyles.CurrentFav}>CURRENT FAVORITE</Text>   
            <Text style={textstyles.Daily}>DAILY OUTFIT CHOICES</Text>  

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
            backgroundColor: '',
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

<<<<<<< Updated upstream
    const textstyles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            backgroundColor: '#fdf5e6',
        },
        Collection: {
            marginRight: 60, 
            marginBottom: 90, 
            color:'black', 
            fontWeight:'bold', 
            fontSize:40
        },
        NewlySaved: {
            marginBottom: -15, 
            marginRight: 220, 
            color:'black', 
            fontWeight:'bold', 
            fontSize:12
        },
        CurrentFav: {
            marginBottom: 5, 
            marginRight: 30, 
            color:'black', 
            fontWeight: 'bold', 
            fontSize:12
        },
        Daily: {
            marginTop: 375, 
            marginBottom:-390, 
            marginRight: 115, 
            color:'black', 
            fontWeight:'bold', 
            fontSize:12
        }
    });
=======
  // Get the device screen dimensions
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const buttonSize = width * 0.4; // Adjust the button size based on the screen width
  const textSize = width * 0.1; // Adjust the text size based on the screen width
  const marginTopPercentage = 0.01; // Adjust the desired percentage for the gap above the text
  const marginTop = height * marginTopPercentage; // Calculate the margin-top based on the screen height
  const textFontSize = windowWidth * 0.04;
  const textHeight = windowHeight * 0.12;

  return (
    <SafeAreaView style={styles.container}>
    <View style={{ marginTop }}>
      <Text style={[styles.collectionText, { fontSize: textSize }]}>
        COLLECTION
      </Text>
    </View>

      <View style={styles.gap} />

      <View style={styles.buttonsContainer}>
      <TouchableOpacity style={[styles.CurrentFav, { width: buttonSize, height: buttonSize }]}>
          <ImageBackground source={require('../assets/current.png')} style={styles.buttonImage}></ImageBackground>
          <Text style={[styles.buttonText, { fontSize: textFontSize, marginTop: textHeight }]}>CURRENT FAV</Text>
        </TouchableOpacity>

        <View style={styles.buttonGap} />

        <TouchableOpacity style={[styles.NewlySaved, { width: buttonSize, height: buttonSize }]}>
          <ImageBackground source={require('../assets/newly.png')} style={styles.buttonImage}></ImageBackground>
          <Text style={[styles.buttonText, { fontSize: textFontSize, marginTop: textHeight }]}>NEWLY SAVED</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={[styles.Daily, { width: width * 0.82, height: buttonSize }]}>
        <ImageBackground source={require('../assets/daily.png')} style={styles.buttonImage}></ImageBackground>
        <Text style={[styles.buttonText, { fontSize: textFontSize, marginTop: textHeight }]}>DAILY OUTFIT</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "start",
    alignItems: "center",
    padding: 20,
  },
  collectionText: {
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: -50,
  },
  buttonsContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  NewlySaved: {
    marginRight: 10,
  },
  CurrentFav: {},
  Daily: {},
  buttonImage: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: "cover",
  },
  buttonGap: {
    width: 10,
  },
  gap: {
    height: 80, // Adjust the height as needed
  },
  buttonText: {
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
    color: "black",
    fontWeight: "bold",
    fontSize: 15, // Adjust the font size as needed
  },
});

export default Collection;
>>>>>>> Stashed changes
