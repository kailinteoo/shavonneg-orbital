import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from "react-native";
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

  const handleResetOutfit = () => {
    setOutfit({ top: null, bottom: null, shoes: null });
  };

  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const imageSize = Math.min(windowWidth * 0.5, windowHeight * 0.2);
  const fontSize = Math.min(windowWidth * 0.04, windowHeight * 0.05);

  return (
    <View style={styles.container}>
      <Text style={[styles.headerText, { fontSize }]}>FITTING ROOM</Text>
      {outfit.top && outfit.bottom && outfit.shoes ? (
        <View style={styles.outfitContainer}>
          <View style={[styles.outfitImage, { width: imageSize, height: imageSize }]}>
            <Image source={{ uri: outfit.top }} style={styles.imageFrame} />
          </View>
          <View style={[styles.outfitImage, { width: imageSize, height: imageSize }]}>
            <Image source={{ uri: outfit.bottom }} style={styles.imageFrame} />
          </View>
          <View style={[styles.outfitImage, { width: imageSize, height: imageSize }]}>
            <Image source={{ uri: outfit.shoes }} style={styles.imageFrame} />
          </View>
        </View>
      ) : (
        <Text style={[styles.noOutfitText, { fontSize }]}>No outfit generated</Text>
      )}
      <TouchableOpacity style={styles.generateButton} onPress={handleGenerateOutfit}>
        <Text style={[styles.generateButtonText, { fontSize }]}>Generate Outfit</Text>
      </TouchableOpacity>
      {outfit.top && outfit.bottom && outfit.shoes && (
        <TouchableOpacity style={styles.resetButton} onPress={handleResetOutfit}>
          <Text style={[styles.resetButtonText, { fontSize }]}>Reset Outfit</Text>
        </TouchableOpacity>
      )}
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
    marginBottom: 10,
  },
  outfitContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  outfitImage: {
    resizeMode: "cover",
    marginVertical: 10,
    borderWidth: 2,
    borderColor: "#C3B1E1",
    borderRadius: 5,
    overflow: "hidden",
  },
  imageFrame: {
    flex: 1,
  },
  noOutfitText: {
    marginBottom: 20,
  },
  generateButton: {
    backgroundColor: "#7b68ee",
    padding: 10,
    borderRadius: 10,
  },
  generateButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  resetButton: {
    marginTop: 10,
    backgroundColor: "#ccc",
    padding: 10,
    borderRadius: 10,
  },
  resetButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
});

export default FittingRoom;
