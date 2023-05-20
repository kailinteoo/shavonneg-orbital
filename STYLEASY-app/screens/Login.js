import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput, Image, SafeAreaview, TouchableOpacity, StatusBar, Alert } from "react-native";
import { signinWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
//const backImage = require("../assets/backImage .png");
import {Ionicons} from '@expo/vector-icons'


export default class LoginScreen extends React.Component { 
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
}

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
    continue: {
        width:70, 
        height:70,
        borderRadius: 70 / 2,
        backgroundColor: "#9075E3",
        alignItems: "center",
        justifyContent: "center"
    }
}); 

