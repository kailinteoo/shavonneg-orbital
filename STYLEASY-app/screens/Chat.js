import React, { useState, useEffect, useLayoutEffect, useCallback } from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import {
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot,
  doc,
  getDoc,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { auth, database } from "../config/firebase";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import colors from "../colors";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Chat({ route }) {
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");
  const navigation = useNavigation();

  const { userId, username: chatUsername } = route.params;
  const chatId = `${auth?.currentUser?.uid}_${userId}`;

  const onSignOut = () => {
    signOut(auth).catch((error) => console.log(error));
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: chatUsername,
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

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const userDocRef = doc(database, "users", userId);
        const userDocSnapshot = await getDoc(userDocRef);
        const userData = userDocSnapshot.data();
        if (userData) {
          setUsername(userData.username);
        }
      } catch (error) {
        console.log("Error fetching username:", error);
      }
    };

    fetchUsername();
  }, [userId]);

  useLayoutEffect(() => {
    const chatDocRef = doc(database, "privateChats", chatId);
    const messagesCollectionRef = collection(chatDocRef, "messages");
    const q = query(messagesCollectionRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
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
  }, [chatId]);

  const onSend = useCallback(
    (messages = []) => {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages)
      );

      const { _id, createdAt, text, user } = messages[0];
      const chatDocRef = doc(database, "privateChats", chatId);
      const messagesCollectionRef = collection(chatDocRef, "messages");

      addDoc(messagesCollectionRef, {
        _id,
        createdAt,
        text,
        user,
      });
    },
    [chatId]
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("Community")}
      >
        <AntDesign
          name="arrowleft"
          size={windowWidth * 0.06}
          style={styles.backButtonIcon}
        />
      </TouchableOpacity>

      <View style={styles.usernameContainer}>
        <Text style={styles.usernameText}>{chatUsername}</Text>
      </View>

      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: auth?.currentUser?.uid,
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
  usernameContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  usernameText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
