// CommunityScreen.js

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const chats = [
  { id: 1, name: 'Chat 1' },
  { id: 2, name: 'Chat 2' },
  { id: 3, name: 'Chat 3' }
];

const CommunityScreen = () => {
  const navigation = useNavigation();

  const navigateToChat = (chatId) => {
    navigation.navigate('Chat', { chatId });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat List</Text>
      {chats.map((chat) => (
        <TouchableOpacity
          key={chat.id}
          style={styles.chatItem}
          onPress={() => navigateToChat(chat.id)}
        >
          <Text style={styles.chatItemText}>{chat.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40, // Added to align the content to the top
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    fontFamily: "Helvetica",
  },
  chatItem: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#e6e6fa',
    borderRadius: 8,
    width: '100%', // Make the button span the entire width
  },
  chatItemText: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: "Helvetica",
  },
});

export default CommunityScreen;
