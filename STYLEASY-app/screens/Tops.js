import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { collection, query, getDocs } from "firebase/firestore";
import { database } from "../config/firebase";

const Current = () => {
  const [currentImages, setCurrentImages] = useState([]);

  useEffect(() => {
    const fetchCurrentImages = async () => {
      try {
        const currentCollectionRef = collection(database, "current");
        const currentSnapshot = await getDocs(currentCollectionRef);
        const currentImagesData = [];
        currentSnapshot.forEach((doc) => {
          currentImagesData.push(doc.data().url);
        });
        setCurrentImages(currentImagesData);
      } catch (error) {
        console.log("Error fetching current images:", error);
      }
    };

    fetchCurrentImages();
  }, []);

  return (
    <View style={styles.container}>
      {currentImages.length > 0 ? (
        <FlatList
          data={currentImages}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={styles.image} />
          )}
        />
      ) : (
        <Text>No current images available.</Text>
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
  image: {
    width: 200,
    height: 200,
    marginVertical: 10,
  },
});

export default Current;
