import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet, StatusBar, ImageBackground, SafeAreaView, ScrollView, useWindowDimensions } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth, database } from '../config/firebase';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import colors from '../colors';
import AsyncStorage from '@react-native-async-storage/async-storage';


const LearnMore = () => {
  const navigation = useNavigation();
  const onSignOut = () => {
    signOut(auth).catch((error) => console.log(error));
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{
            marginRight: 10,
          }}
          onPress={onSignOut}
        >
          <AntDesign name="logout" size={24} color={colors.black} style={{ marginRight: 10 }} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const { width: windowWidth, height: windowHeight } = useWindowDimensions();

  const labelFontSize = windowWidth * 0.03;

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.form}>
        <ScrollView>
          <Text style={[styles.HeaderOne, { fontSize: labelFontSize }]}>Who Are We</Text>
          <View style={styles.gap} />
          <Text style={[styles.HeaderTwo, { fontSize: labelFontSize }]}>
            We are a team of two software engineers, working together to make our app come to life. We made this app in hopes that we can make
            styling clothes an easy and brainless process, reducing the time needed to try different outfit combinations to find the best fit
            for the occasion.
          </Text>
          <View style={styles.gap} />
          <Text style={[styles.HeaderThree, { fontSize: labelFontSize }]}>How to use our app?</Text>
          <View style={styles.gap} />
          <Text style={[styles.HeaderFour, { fontSize: labelFontSize }]}>Our app consists of three major components</Text>
          <View style={styles.gap} />
          <Text style={[styles.HeaderFive, { fontSize: labelFontSize }]}>1. Collection</Text>
          <Text style={[styles.HeaderTwo, { fontSize: labelFontSize }]}>
            Inside your wardrobe, you will be able to view your entire inventory of clothes, as well as look at your saved outfits to refer
            them for future use.
          </Text>
          <View style={styles.gap} />
          <Text style={[styles.HeaderFive, { fontSize: labelFontSize }]}>2. Fitting Room</Text>
          <Text style={[styles.HeaderTwo, { fontSize: labelFontSize }]}>Here, we let you personalise your outfits without having to try them on!</Text>
          <View style={styles.gap} />
          <Text style={[styles.HeaderFive, { fontSize: labelFontSize }]}>3. Community </Text>
          <Text style={[styles.HeaderTwo, { fontSize: labelFontSize }]}>
            Our app lets you talk to your friends, family, or even like-minded users of our app to bring together a community of fashion
            enthusiasts.
          </Text>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fdf5e6',
  },
  HeaderOne: {
    color: 'black',
    fontWeight: 'bold',
    alignSelf: "center",
  },
  HeaderTwo: {
    textAlign: 'justify',
    color: 'black',
    fontSize: 12,
  },
  HeaderThree: {
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
    fontSize: 30,
  },
  HeaderFour: {
    textAlign: 'justify',
    color: 'black',
    fontWeight: 'bold',
    fontSize: 12,
    alignSelf: "center",
  },
  HeaderFive: {
    textAlign: 'justify',
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 60,
    marginVertical: 50,
  },
  gap: {
    height: 30, // Adjust the height as needed
  },
});

export default LearnMore;

