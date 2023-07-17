import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions } from "react-native";
import { collection, query, getDocs } from "firebase/firestore";
import { database } from "../config/firebase";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

const Bottoms = () => {
  const navigation = useNavigation();
  const [BottomsImages, setBottomsImages] = useState([]);
  const { width, height } = Dimensions.get("window");

  useEffect(() => {
    const fetchBottomsImages = async () => {
      try {
        const BottomsCollectionRef = collection(database, "Bottoms");
        const BottomsSnapshot = await getDocs(BottomsCollectionRef);
        const BottomsImagesData = [];
        BottomsSnapshot.forEach((doc) => {
          BottomsImagesData.push(doc.data().url);
        });
        setBottomsImages(BottomsImagesData);
      } catch (error) {
        console.log("Error fetching Bottoms images:", error);
      }
    };

    fetchBottomsImages();
  }, []);

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
        <Feather name="arrow-left" size={24} color="black" />
      </TouchableOpacity>
      {BottomsImages.length > 0 ? (
        <FlatList
          data={BottomsImages}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={[styles.image, { width: width * 0.8, height: width * 0.8 }]} />
          )}
        />
      ) : (
        <Text style={styles.noImagesText}>No Bottoms images available.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 10,
    padding: 10,
  },
  image: {
    marginVertical: 10,
  },
  noImagesText: {
    fontSize: 18,
    marginTop: 20,
  },
});

export default Bottoms;