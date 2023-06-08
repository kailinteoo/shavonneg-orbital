import React, { useState, useEffect, useLayoutEffect, useCallback } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from "react-native";
import { signOut } from "firebase/auth";
import { auth, database } from "../config/firebase";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import colors from "../colors";
import { SafeAreaView } from "react-native-safe-area-context";

const Collection = () => {
  const navigation = useNavigation();
  const { width, height } = Dimensions.get("window");

  const onSignOut = () => {
    signOut(auth).catch((error) => console.log(error));
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "",
      headerRight: () => (
        <TouchableOpacity
          style={{
            marginRight: width * 0.03, // Adjust the margin based on the screen width
          }}
          onPress={onSignOut}
        >
          <AntDesign name="logout" size={24} color={colors.black} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, width]);

  const buttonSize = width * 0.4; // Adjust the button size based on the screen width
  const textSize = width * 0.1; // Adjust the text size based on the screen width
  const marginTopPercentage = 0.01; // Adjust the desired percentage for the gap above the text
  const marginTop = height * marginTopPercentage; // Calculate the margin-top based on the screen height

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
          <Image source={require('../assets/current.png')} style={styles.buttonImage} />
        </TouchableOpacity>

        <View style={styles.buttonGap} />

        <TouchableOpacity style={[styles.NewlySaved, { width: buttonSize, height: buttonSize }]}>
          <Image source={require('../assets/newly.png')} style={styles.buttonImage} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={[styles.Daily, { width: width * 0.82, height: buttonSize }]}>
        <Image source={require('../assets/daily.png')} style={styles.buttonImage} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  collectionText: {
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: -80,
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
});

export default Collection;
