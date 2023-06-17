import React, { useState, useEffect, useLayoutEffect, useCallback } from "react";
import { TouchableOpacity, Text, View, Button, StyleSheet, Image } from "react-native";
import { signOut } from 'firebase/auth';
import { auth, database } from '../config/firebase';
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from '@expo/vector-icons';
import colors from "../colors";
import AsyncStorage from '@react-native-async-storage/async-storage';


const Community = () => {
  const navigation = useNavigation();

  const onSignOut = () => {
    signOut(auth).catch(error => console.log(error));
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{
            marginRight: 10
          }}
          onPress={onSignOut}
        >
          <AntDesign name="logout" size={24} color={colors.black} style={{ marginRight: 10 }} />
        </TouchableOpacity>
      )
    });
  }, [navigation]);

  const handleChatPress = (username) => {
    navigation.navigate('Chat', { username });
  };

  const users = [
    {
      username: "John Doe",
      profilePicture: require("../assets/community.png"),
      lastMessage: "Hello there!"
    },
    {
      username: "Jane Smith",
      profilePicture: require("../assets/community.png"),
      lastMessage: "How are you?"
    },
    {
      username: "Bob Johnson",
      profilePicture: require("../assets/community.png"),
      lastMessage: "I'm excited for the event!"
    }
  ];

  return (
    <View style={styles.container}>
      {users.map((user, index) => (
        <TouchableOpacity
          key={index}
          style={styles.chatButton}
          onPress={() => handleChatPress(user.username)}
        >
          <Image source={user.profilePicture} style={styles.profilePicture} />
          <View style={styles.chatContent}>
            <Text style={styles.username}>{user.username}</Text>
            <Text style={styles.lastMessage}>{user.lastMessage}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Community;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray
  },
  profilePicture: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12
  },
  chatContent: {
    flex: 1,
    justifyContent: 'center'
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  lastMessage: {
    color: colors.gray
  }
});



