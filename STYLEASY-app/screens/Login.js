import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, TextInput, Image, SafeAreaView, TouchableOpacity, StatusBar, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword, updateEmail, updatePassword } from "firebase/auth";
import { auth, database } from "../config/firebase";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { collection, query, where, getDocs } from 'firebase/firestore';


const Login = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const getUserPassword = async () => {
            try {
                const usersCollectionRef = collection(database, "users");
                const querySnapshot = await where(usersCollectionRef, "email", "==", email);
                if (!querySnapshot.empty) {
                    const userData = querySnapshot.docs[0].data();
                    const newPassword = userData.password; // Assuming the password field is named 'password' in Firestore
                    setPassword(newPassword);
                }
            } catch (error) {
                console.log("Error retrieving user password from Firestore:", error);
            }
        };

        getUserPassword();
    }, []);

    const onHandleLogin = async () => {
        if (email !== "" && password !== "") {
            try {
                const usersCollectionRef = collection(database, "users"); // Assuming 'users' is the collection name in Firestore
                const q = query(usersCollectionRef, where("email", "==", email));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const userData = querySnapshot.docs[0].data();
                    const storedPassword = userData.password; // Assuming the password field is named 'password' in Firestore

                    if (password === storedPassword) {
                        console.log("Login success");

                        

                    } else {
                        Alert.alert("Login error", "Invalid email or password");
                    }
                } else {
                    Alert.alert("Login error", "Invalid email or password");
                }
            } catch (error) {
                console.log("Error retrieving user data from Firestore:", error);
            }
        }
    };

    return (
        <View style={styles.container}>
            <View />
            <SafeAreaView style={styles.form}>
                <Text style={styles.title}>Login</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter email"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    autoFocus={true}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Enter password"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                    textContentType="password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
                <TouchableOpacity style={styles.button} onPress={onHandleLogin}>
                    <View style={{ alignItems: 'center', alignSelf: 'center' }}>
                        <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}> Log In</Text>
                    </View>
                </TouchableOpacity>
                <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
                    <Text style={{ color: 'gray', fontWeight: '600', fontSize: 14 }}> Don't have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                        <Text style={{ color: '#f57c00', fontWeight: '600', fontSize: 14 }}> Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: "#7b68ee",
        alignSelf: "center",
        paddingBottom: 24,
    },
    input: {
        backgroundColor: "#e6e6fa",
        height: 58,
        marginBottom: 20,
        fontSize: 16,
        borderRadius: 10,
        padding: 12,
    },
    backImage: {
        width: "100%",
        height: 340,
        position: "absolute",
        top: 0,
        resizeMode: 'cover',
    },
    whiteSheet: {
        width: '100%',
        height: '75%',
        position: "absolute",
        bottom: 0,
        backgroundColor: '#faebd7',
        borderTopLeftRadius: 60,
    },
    form: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 30,
    },
    button: {
        backgroundColor: '#7b68ee',
        height: 58,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    continue: {
        width: 70,
        height: 70,
        borderRadius: 70 / 2,
        backgroundColor: "#fffaf0",
        alignItems: "center",
        justifyContent: "center"
    }
});

export default Login;
 











