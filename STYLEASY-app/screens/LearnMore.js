import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import { useNavigation } from '@react-navigation/native';

const images = [
  { id: 1, source: require('../assets/current.png'), header: 'Step 1: Take a picture', text: 'Take a picture of your clothes and save it to your collection!' },
  { id: 2, source: require('../assets/current.png'), header: 'Step 2: Make an outfit', text: 'Choose the clothes you want to match and make an outfit.' },
  { id: 3, source: require('../assets/current.png'), header: 'Step 3: Save to collection', text: 'Save your favourites into your collection!' },
];

const App = () => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <Image source={item.source} style={styles.image} />
      <Text style={styles.header}>{item.header}</Text>
      <Text style={styles.text}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Swiper
        showsButtons={false}
        autoplay={true}
        dotStyle={styles.dot}
        activeDotStyle={styles.activeDot}
      >
        {images.map((image) => (
          <View key={image.id} style={styles.slide}>
            <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
              <Text style={styles.backButtonText}>BACK</Text>
            </TouchableOpacity>
            <Image source={image.source} style={styles.image} />
            <Text style={styles.header}>{image.header}</Text>
            <Text style={styles.text}>{image.text}</Text>
          </View>
        ))}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'blue',
  },
  image: {
    width: '100%',
    height: '70%',
    resizeMode: 'cover',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 20,
  },
  dot: {
    backgroundColor: '#999',
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 3,
  },
  activeDot: {
    backgroundColor: '#333',
    width: 12,
    height: 12,
    borderRadius: 6,
    margin: 3,
  },
});

export default App;
