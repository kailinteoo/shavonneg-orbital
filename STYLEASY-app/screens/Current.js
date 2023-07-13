import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const CurrentScreen = ({ uploadedImages }) => {
  if (!uploadedImages) {
    uploadedImages = []; // Set uploadedImages to an empty array if it is undefined or null
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Current</Text>
      {uploadedImages.map((imageUri, index) => (
        <Image key={index} source={{ uri: imageUri }} style={styles.image} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 10,
  },
});

export default CurrentScreen;
