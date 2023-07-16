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

const getChatId = (currentUserId, otherUserId) => {
  const sortedIds = [currentUserId, otherUserId].sort();
  return `${sortedIds[0]}_${sortedIds[1]}`;
};

export default function Chat({ route }) {
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");
  const navigation = useNavigation();

  const { userId, username: chatUsername } = route.params;
  const currentUserId = auth?.currentUser?.uid;
  const chatId = getChatId(currentUserId, userId);

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

  useEffect(() => {
    const chatDocRef = doc(database, "privateChats", chatId);
    const messagesCollectionRef = collection(chatDocRef, "messages");
    const q = query(messagesCollectionRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const receivedMessages = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          _id: doc.id,
          createdAt: data.createdAt.toDate(),
          text: data.text,
          user: data.user,
        };
      });

      setMessages(receivedMessages);
    });

    return unsubscribe;
  }, [chatId]);

  const onSend = useCallback(
    async (newMessages = []) => {
      const newMessage = newMessages[0];

      const chatDocRef = doc(database, "privateChats", chatId);
      const messagesCollectionRef = collection(chatDocRef, "messages");

      await addDoc(messagesCollectionRef, {
        _id: newMessage._id,
        createdAt: newMessage.createdAt,
        text: newMessage.text,
        user: newMessage.user,
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
        onSend={(newMessages) => onSend(newMessages)}
        user={{
          _id: currentUserId,
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
