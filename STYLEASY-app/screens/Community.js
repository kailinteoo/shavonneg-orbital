import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import { signOut } from "firebase/auth";
import { auth, database } from "../config/firebase";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import colors from "../colors";
import {
  collection,
  getDocs,
  doc,
  onSnapshot,
  getDoc,
} from "firebase/firestore";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Community = () => {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");

  const onSignOut = () => {
    signOut(auth).catch((error) => console.log(error));
  };

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          style={{
            marginLeft: 10,
          }}
          onPress={() => navigation.goBack()}
        >
          <AntDesign
            name="arrowleft"
            size={24}
            color={colors.black}
            style={{ marginLeft: 10 }}
          />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          style={{
            marginRight: 10,
          }}
          onPress={onSignOut}
        >
          <AntDesign
            name="logout"
            size={24}
            color={colors.black}
            style={{ marginRight: 10 }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const handleChatPress = (user) => {
    navigation.navigate("Chat", { user });
  };

  const getInitials = (name) => {
    const splitName = name.toUpperCase().split(" ");
    if (splitName.length === 1) {
      return splitName[0].charAt(0);
    } else {
      return (
        splitName[0].charAt(0) + splitName[splitName.length - 1].charAt(0)
      );
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(database, "users"));
        const userList = querySnapshot.docs.map((doc) => doc.data());
        setUsers(userList);
        const user = auth.currentUser;
        const userId = user.uid;
        const userDocRef = doc(database, "users", userId);
        const userDocSnapshot = await getDoc(userDocRef);
        const userData = userDocSnapshot.data();
        if (userData) {
          setUsername(userData.username);
        }
      } catch (error) {
        console.log("Error fetching users:", error);
      }
    };

    const unsubscribe = onSnapshot(collection(database, "users"), () => {
      fetchUsers();
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("Home")}
      >
        <AntDesign
          name="arrowleft"
          size={windowWidth * 0.06}
          style={styles.backButtonIcon}
        />
      </TouchableOpacity>
      <Text style={styles.communityText}>COMMUNITY</Text>
      <View style={styles.allUsersContainer}>
        <Text style={styles.allUsersText}>CHATS</Text>
      </View>

      {users.map((user, index) => (
        <TouchableOpacity
          key={index}
          style={styles.chatButton}
          onPress={() => handleChatPress(user)}
        >
          <View style={styles.profilePicture}>
            {user.profilePicture ? (
              <Image
                source={{ uri: user.profilePicture }}
                style={styles.profilePictureImage}
              />
            ) : (
              <Text style={styles.initials}>{getInitials(user.username)}</Text>
            )}
          </View>
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
    paddingTop: 50,
  },
  communityText: {
    textAlign: "center",
    fontSize: windowWidth * 0.1,
    fontWeight: "bold",
    marginBottom: 50,
  },
  allUsersContainer: {
    marginLeft: 20,
    marginBottom: 10,
  },
  allUsersText: {
    fontSize: 16,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  chatButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
  },
  profilePicture: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: "pink",
    justifyContent: "center",
    alignItems: "center",
  },
  profilePictureImage: {
    width: 40,
    height:40,
    borderRadius: 20,
  },
  initials: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    textTransform: "uppercase",
  },
  chatContent: {
    flex: 1,
    justifyContent: "center",
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
  },
  lastMessage: {
    color: colors.gray,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: windowWidth * 0.02,
    marginTop: windowHeight * 0.02,
    marginBottom: windowHeight * 0.02,
  },
  backButtonIcon: {
    marginRight: windowWidth * 0.02,
  },
  backButtonText: {
    color: "black",
    fontSize: windowWidth * 0.05,
  },
});















