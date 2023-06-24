import React, { useState, useEffect, useLayoutEffect, useCallback } from "react";
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Dimensions } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import {
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { auth, database } from "../config/firebase";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import colors from "../colors";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { storage } from '../config/firebase'; // Assuming you have a separate Firebase configuration file



const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();

  const onSignOut = () => {
    signOut(auth).catch((error) => console.log(error));
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{
            marginRight: windowWidth * 0.04,
          }}
          onPress={onSignOut}
        >
          <AntDesign
            name="logout"
            size={windowWidth * 0.06}
            color={colors.gray}
            style={{ marginRight: windowWidth * 0.04 }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useLayoutEffect(() => {
    const collectionRef = collection(database, "chats");
    const q = query(collectionRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      console.log("snapshot");
      setMessages(
        snapshot.docs.map((doc) => ({
          _id: doc.id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
        }))
      );
    });
    return unsubscribe;
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );

    const { _id, createdAt, text, user } = messages[0];
    addDoc(collection(database, "chats"), {
      _id,
      createdAt,
      text,
      user,
    });
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("Community")}>
        <AntDesign
          name="arrowleft"
          size={windowWidth * 0.06}
          style={styles.backButtonIcon}
        />
      </TouchableOpacity>
      
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: auth?.currentUser?.email,
          avatar: "https://i.pravatar.cc/300",
        }}
        messagesContainerStyle={{
          backgroundColor: "#fff",
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 50,
    paddingBottom: 30,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: windowWidth * 0.04,
    marginTop: windowHeight * 0.02,
  },
  backButtonIcon: {
    marginRight: windowWidth * 0.02,
  },
  backButtonText: {
    color: "black",
    fontSize: windowWidth * 0.04,
  },
});



