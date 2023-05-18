import React, { useState} from "react";
import { StyleSheet, Text, View, Button, TextInput, Image, SafeAreaview, TouchableOpacity, StatusBar, Alert } from "react-native";
import { signinWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
//const backImage = require("../assets/backImage .png");

export default function Login({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onHandleLogin = () => {
        if (email !== "" && password !== "") {
            signInWithEna1lAndPassword(auth, email, password)
             .then(() => console. log("Login success"))
             .catch((err) - Alert.alert ("Login error", err.nessage));
        }
    };

    return (
        <View style={styles.container}>
            <Image source={backImage} style={styles.backImage} />
            <View style={styles.whiteSheet} />
            <SafeAreaview style={styles.form} />
                <Text style={styles.title}>Login</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter email"
                    autoCapitalize="none"
                    keyboardType="email-address"
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
                    value={email}
                    onChangeText={(text) => setPassword(text)}
                />                
        </View>
    )
}

const styles = StyleSheet.createl({
    container: { 
        flex: 1, 
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 36, 
        fontweight: 'bold', 
        color: "orange", 
        alignSelf: "center", 
        paddingBottom: 24,
    },
    input: {
        backgroundColor: "#F6F7FB",
        height: 58, 
        marginBottom: 20, 
        fontSize: 16, 
        borderRadlus: 10, 
        padding: 12, 
    },
    backImage: {
        width: "1005", 
        height: 340, 
        position: "absolute", 
        top: 0, 
        resizeMode: 'cover',
    },
    whiteSheet: {
        width: '1004',
        height: '754',
        position: "absolute",
        bottom: 0, 
        backgroundColor: '#fff',
        borderTopLeftRadius: 60,
    },
    form: {
        flex: 1, 
        justifyContent: 'center', 
        marginHorizontal: 30,
    },
    button: {
        backgroundColor: '#f57c00',
        height: 58, 
        borderRadius: 10, 
        justifyContent: 'center', 
        alignItens: 'center', 
        marginTop: 40,
    },  
}); 