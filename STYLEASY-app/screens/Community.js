import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, Dimensions } from "react-native";
import { collection, getDocs, query } from "firebase/firestore";
import { database } from "../config/firebase";
import colors from "../colors";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Community({ navigation }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersQuery = query(collection(database, "users"));
        const usersSnapshot = await getDocs(usersQuery);
        const userData = usersSnapshot.docs.map((doc) => ({
          id: doc.id,
          username: doc.data().username,
          profilePicture: doc.data().profilePicture,
        }));
        setUsers(userData);
      } catch (error) {
        console.log("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const renderUserItem = ({ item }) => {
    const { id, username, profilePicture } = item;

    const renderAvatar = () => {
      if (profilePicture) {
        return <Image source={{ uri: profilePicture }} style={styles.avatar} />;
      } else {
        const initials = username ? username.charAt(0).toUpperCase() : "";
        return (
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarInitials}>{initials}</Text>
          </View>
        );
      }
    };

    return (
      <TouchableOpacity
        style={styles.userItem}
        onPress={() =>
          navigation.navigate("Chat", {
            userId: id,
            username,
          })
        }
      >
        {renderAvatar()}
        <Text style={styles.username}>{username}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>COMMUNITY</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={renderUserItem}
        contentContainerStyle={styles.userList}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: windowHeight * 0.1,
    paddingHorizontal: windowWidth * 0.05,
  },
  title: {
    fontSize: windowWidth * 0.08,
    fontWeight: "bold",
    marginBottom: 20,
    color: colors.textPrimary,
    textAlign: "center",
  },
  userList: {
    flexGrow: 1,
  },
  userItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: windowHeight * 0.02,
  },
  avatarContainer: {
    width: windowWidth * 0.14,
    height: windowWidth * 0.14,
    borderRadius: windowWidth * 0.07,
    marginRight: windowWidth * 0.03,
    backgroundColor: "pink",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarInitials: {
    color: colors.white,
    fontSize: windowWidth * 0.06,
    fontWeight: "bold",
  },
  username: {
    fontSize: windowWidth * 0.04,
    marginLeft: windowWidth * 0.03,
    color: colors.textPrimary,
  },
  separator: {
    height: 1,
    backgroundColor: colors.lightGray,
    marginVertical: windowHeight * 0.00001,
  },
});
