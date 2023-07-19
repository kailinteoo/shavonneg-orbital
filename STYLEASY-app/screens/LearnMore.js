import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const images = [
  { id: 0, source: require('../assets/L0.png'), header: ''},
  { id: 1, source: require('../assets/L1.png'), header: 'Step 1.1: Click on "Collection"'},
  { id: 2, source: require('../assets/L2.png'), header: 'Step 1.2: Click on "Tops"'},
  { id: 3, source: require('../assets/L3.png'), header: 'Step 1.3: Upload image'},
  { id: 4, source: require('../assets/L4.png'), header: 'Step 1.4: Choose a image',},
  { id: 5, source: require('../assets/L5.png'), header: 'Step 1.5: Click on "Choose"'},
  { id: 6, source: require('../assets/L6.png'), header: 'Step 1.6: Delete image', text: 'Slide right to navigate back to "Collection" page' },
  { id: 7-1, source: require('../assets/L7-1.png'), header: ''},
  { id: 7, source: require('../assets/L7.png'), header: 'Step 2.1: Click on "Fitting Room"' },
  { id: 8, source: require('../assets/L8.png'), header: 'Step 2.2: Generate image' },
  { id: 9, source: require('../assets/L9.png'), header: 'Step 2.3: Mix and Match', text: 'Press the "Generate Outfit" to generate a new outfit' },
  { id: 10-1, source: require('../assets/L10-1.png'), header:'' },
  { id: 10, source: require('../assets/L10.png'), header: 'STEP 3.1. Sidebar > Camera'},
  { id: 11, source: require('../assets/L11.png'), header: 'STEP 3.2. Click on "Tops"', text: 'You can select any categories to save the photo to' },
  { id: 12, source: require('../assets/L12.png'), header: 'STEP 3.3. Saved in "Tops"', text: 'The photo will be saved in the categories without being stored in your phone gallery' },
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
      <View style={styles.imageContainer}>
        <Image source={item.source} style={styles.image} resizeMode="cover" />
      </View>
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
            <View style={styles.imageContainer}>
              <Image source={image.source} style={styles.image} resizeMode="cover" />
            </View>
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
    paddingTop: 50,
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
  imageContainer: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.73, // Adjust the height as per your requirement
    borderWidth: 1,
    borderColor: 'purple',
    borderRadius: 5,
    overflow: 'absolute',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    position: 'center',
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
