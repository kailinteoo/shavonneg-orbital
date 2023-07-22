import React, { useState, useEffect } from "react";
import { View, StyleSheet, Switch, Text, Dimensions, TouchableOpacity, Slider} from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { doc, getDoc } from "firebase/firestore";
import { database } from "../config/firebase";


const Settings = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const buttonWidth = Math.min(windowWidth * 0.8, 300);
  const iconSize = Math.min(windowWidth * 0.1, 30);
  const textSize = Math.min(windowWidth * 0.04, 18);

  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [brightness, setBrightness] = useState(50);
  const [fontSize, setFontSize] = useState(16);
  const [signupDate, setSignupDate] = useState(null);

  useEffect(() => {
    const loadPreferredSettings = async () => {
      try {
        const preferredTheme = await AsyncStorage.getItem('preferredTheme');
        const preferredBrightness = await AsyncStorage.getItem('preferredBrightness');
        const preferredFontSize = await AsyncStorage.getItem('preferredFontSize');
        const signupTimestamp = await AsyncStorage.getItem('signupTimestamp');

        setDarkModeEnabled(preferredTheme === 'dark');
        setBrightness(Number(preferredBrightness) || 50);
        setFontSize(Number(preferredFontSize) || 16);

        const userDocRef = doc(database, "users", "<USER_ID>"); // Replace "<USER_ID>" with the actual user ID
        const userDocSnapshot = await getDoc(userDocRef);
        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          const signupDate = new Date(userData.signupTimestamp).toLocaleString();
          setSignupDate(signupDate);
        }
      } catch (error) {
        console.log('Error loading preferred settings:', error);
      }
    };

    loadPreferredSettings();
  }, []);

  const toggleDarkMode = async (value) => {
    try {
      await AsyncStorage.setItem('preferredTheme', value ? 'dark' : 'light');
      setDarkModeEnabled(value);
    } catch (error) {
      console.log('Error saving preferred theme:', error);
    }
  };

  const handleBrightnessChange = async (newBrightness) => {
    try {
      await AsyncStorage.setItem('preferredBrightness', String(newBrightness));
      setBrightness(newBrightness);
      // Apply brightness changes to the app here
      // You can use a library like 'react-native-screen-brightness'
      // to adjust the brightness dynamically
    } catch (error) {
      console.log('Error saving preferred brightness:', error);
    }
  };

  const handleFontSizeChange = async (newFontSize) => {
    try {
      await AsyncStorage.setItem('preferredFontSize', String(newFontSize));
      setFontSize(newFontSize);
    } catch (error) {
      console.log('Error saving preferred font size:', error);
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <FontAwesome name="chevron-left" size={iconSize} color="#ffffff" />
      </TouchableOpacity>

      <View style={styles.option}>
        <Text style={[styles.optionText, { fontSize: textSize }]}>Dark Mode</Text>
        <Switch
          value={darkModeEnabled}
          onValueChange={toggleDarkMode}
        />
      </View>

      <View style={styles.option}>
        <Text style={[styles.optionText, { fontSize: textSize }]}>Brightness</Text>
        <View style={styles.sliderContainer}>
          <Slider
            style={{ flex: 1 }}
            minimumValue={0}
            maximumValue={100}
            value={brightness}
            onValueChange={handleBrightnessChange}
          />
        </View>
      </View>

      <View style={styles.option}>
        <Text style={[styles.optionText, { fontSize: textSize }]}>Font Size</Text>
        <View style={styles.fontSizeContainer}>
          <TouchableOpacity
            style={[styles.fontSizeButton, fontSize === 12 && styles.fontSizeSelected]}
            onPress={() => handleFontSizeChange(12)}
          >
            <Text style={styles.fontSizeText}>12</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.fontSizeButton, fontSize === 16 && styles.fontSizeSelected]}
            onPress={() => handleFontSizeChange(16)}
          >
            <Text style={styles.fontSizeText}>16</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.fontSizeButton, fontSize === 20 && styles.fontSizeSelected]}
            onPress={() => handleFontSizeChange(20)}
          >
            <Text style={styles.fontSizeText}>20</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.option}>
        <Text style={[styles.optionText, { fontSize: textSize }]}>Signup Date</Text>
        <Text style={styles.signupDateText}>{signupDate}</Text>
      </View>

      <View style={styles.iconContainer}>
        <FontAwesome name="cog" size={iconSize} color="#ffffff" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  optionText: {
    fontWeight: "bold",
  },
  sliderContainer: {
    flex: 1,
  },
  fontSizeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  fontSizeButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  fontSizeText: {
    fontSize: 16,
  },
  fontSizeSelected: {
    backgroundColor: "#7b68ee",
  },
  signupDateText: {
    fontSize: 16,
  },
  iconContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: "#7b68ee",
    borderRadius: 50,
    padding: 10,
    elevation: 5,
  },
});

export default Settings;





