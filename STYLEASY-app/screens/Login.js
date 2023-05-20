import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput, Image, SafeAreaview, TouchableOpacity, StatusBar, Alert } from "react-native";
import { signInWithEmailAndPassword, signinWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
//const backImage =  required("../assests/backImage.png:");

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
            <Image source={backImage} style={styles.backImage} />
            <View style={styles.whiteSheet} />
            <SafeAreaview style={styles.form}>
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
                    <Text style={{fontWeight: 'bold', color: '#fff', fontSize: 18}}> Log In</Text>
                </TouchableOpacity>
                <View style={{marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center'}}>
                    <Text style={{color: 'gray', fontweight: '600', fontSize: 14}}> Don't have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                    <Text style={{color: '#f57c00', fontWeight: '600', fontSize: 14}}> Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaview>
        </View>
    )
}





/*export default class LoginScreen extends React.Component { 
    state = {
        name: ""
    }

    continue = () => {
        this.props.navigation.navigate("Chat", {name: this.state.name})
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ marginHorizontal: 32}}>
                    <Text style={styles.title}>Username</Text>
                    <TextInput 
                        style={styles.input} 
                        placeholder="DesignIntoCode" 
                        onChangeText={name => { 
                            this.setState({ name });
                        }} 
                        value={this.state.name}
                    />
                </View>
                <View style={{alignItems: "flex-end", marginTop: 64}}>
                    <TouchableOpacity style={styles.continue} onPress={this.continue}>
                        <Ionicons 
                            name="md-arrow-round-forward" 
                            size={24}
                            color="#FFF"
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}*/

const styles = StyleSheet.create({
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
    continue: {
        width:70, 
        height:70,
        borderRadius: 70 / 2,
        backgroundColor: "#9075E3",
        alignItems: "center",
        justifyContent: "center"
    }
}); 

