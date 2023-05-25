import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput, Image, SafeAreaView, TouchableOpacity, StatusBar, Alert } from "react-native";
import { signInWithEmailAndPassword, signinWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";


export default function Login({ navigation }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onHandleLogin = () => {
        if (email !== "" && password !== "") {
            signInWithEmailAndPassword(auth, email, password)
                .then(() => console.log("Login success"))
                .catch((err) => Alert.alert("Login error", err.message));
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
                <View style={{alignItems: 'center', alignSelf: 'center'}}>
                    <Text style={{fontWeight: 'bold', color: '#fff', fontSize: 18}}> Log In</Text>
                </View>

                </TouchableOpacity>
                <View style={{marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center'}}>
                    <Text style={{color: 'gray', fontWeight: '600', fontSize: 14}}> Don't have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                    <Text style={{color: '#f57c00', fontWeight: '600', fontSize: 14}}> Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: "#fdf5e6",
    },
    title: {
        fontSize: 36, 
        fontWeight: 'bold', 
        color: "#e9967a", 
        alignSelf: "center", 
        paddingBottom: 24,
    },
    input: {
        backgroundColor: "#fffaf0",
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
        backgroundColor: '#e9967a',
        height: 58, 
        borderRadius: 10, 
        justifyContent: 'center', 
        alignItens: 'center', 
        marginTop: 40,
    },  
    continue: {
        width:70, 
        height:70,
        borderRadius: 70 / 2,
        backgroundColor: "#fffaf0",
        alignItems: "center",
        justifyContent: "center"
    }
}); 

