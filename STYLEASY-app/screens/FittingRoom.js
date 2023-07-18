import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { auth, database } from "../config/firebase";
import { Feather } from "@expo/vector-icons";

const FittingRoom = () => {
  const [topsImages, setTopsImages] = useState([]);
  const [bottomsImages, setBottomsImages] = useState([]);
  const [shoesImages, setShoesImages] = useState([]);
  const [outfit, setOutfit] = useState({ top: null, bottom: null, shoes: null });

  useEffect(() => {
    const fetchImages = async (collectionName, setImages) => {
      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          const userImagesCollectionRef = collection(
            database,
            "users",
            currentUser.uid,
            collectionName
          );
          const userImagesSnapshot = await getDocs(userImagesCollectionRef);
          const imagesData = [];
          userImagesSnapshot.forEach((doc) => {
            imagesData.push({ id: doc.id, url: doc.data().url });
          });
          setImages(imagesData);
        }
      } catch (error) {
        console.log(`Error fetching ${collectionName} images:`, error);
      }
    };

    fetchImages("tops", setTopsImages);
    fetchImages("bottoms", setBottomsImages);
    fetchImages("shoes", setShoesImages);
  }, []);

  const handleGenerateOutfit = () => {
    const randomTop = getRandomImage(topsImages);
    const randomBottom = getRandomImage(bottomsImages);
    const randomShoes = getRandomImage(shoesImages);

    setOutfit({ top: randomTop, bottom: randomBottom, shoes: randomShoes });
  };

  const getRandomImage = (images) => {
    if (images.length > 0) {
      const randomIndex = Math.floor(Math.random() * images.length);
      return images[randomIndex].url;
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>FITTING ROOM</Text>
      <View style={styles.outfitContainer}>
        <Image source={{ uri: outfit.top }} style={styles.outfitImage} />
        <Image source={{ uri: outfit.bottom }} style={styles.outfitImage} />
        <Image source={{ uri: outfit.shoes }} style={styles.outfitImage} />
      </View>
      <TouchableOpacity style={styles.generateButton} onPress={handleGenerateOutfit}>
        <Text style={styles.generateButtonText}>Generate Outfit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 20,
  },
  outfitContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  outfitImage: {
    width: 200,
    height: 200,
    resizeMode: "cover",
    marginVertical: 10,
  },
  generateButton: {
    backgroundColor: "#7b68ee",
    padding: 10,
    borderRadius: 10,
  },
  generateButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default FittingRoom;
