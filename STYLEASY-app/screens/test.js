import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ImagePickerExample() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Permission to access camera roll is required!');
        }
      }
    })();
  }, []);

  const pickImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);


    if (!result.canceled) {
        const selectedImages = result.selected.map((asset) => asset.uri);
        setImages((prevImages) => [...prevImages, ...selectedImages]);
      }      
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick images from camera roll" onPress={pickImages} />
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
        {images.map((image, index) => (
          <Image key={index} source={{ uri: image }} style={{ width: 100, height: 100, margin: 5 }} />
        ))}
      </View>
    </View>
  );
}
