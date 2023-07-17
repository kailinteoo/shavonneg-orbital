import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions } from "react-native";
import { collection, query, getDocs } from "firebase/firestore";
import { database } from "../config/firebase";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

const Shoes = () => {
  const navigation = useNavigation();
  const [ShoesImages, setShoesImages] = useState([]);
  const { width, height } = Dimensions.get("window");

  useEffect(() => {
    const fetchShoesImages = async () => {
      try {
        const ShoesCollectionRef = collection(database, "Shoes");
        const ShoesSnapshot = await getDocs(ShoesCollectionRef);
        const ShoesImagesData = [];
        ShoesSnapshot.forEach((doc) => {
          ShoesImagesData.push(doc.data().url);
        });
        setShoesImages(ShoesImagesData);
      } catch (error) {
        console.log("Error fetching Shoes images:", error);
      }
    };

    fetchShoesImages();
  }, []);

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
        <Feather name="arrow-left" size={24} color="black" />
      </TouchableOpacity>
      {ShoesImages.length > 0 ? (
        <FlatList
          data={ShoesImages}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={[styles.image, { width: width * 0.8, height: width * 0.8 }]} />
          )}
        />
      ) : (
        <Text style={styles.noImagesText}>No Shoes images available.</Text>
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

export default Shoes;
