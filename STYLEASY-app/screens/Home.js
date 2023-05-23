import React, { useEffect } from "react";
import { View, TouchableOpacity, Text, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import colors from "../colors";
import { Entypo } from "@expo/vector-icons";
const shirtImageUrl =  "https://assets.teenvogue.com/photos/63a1d9ab2a5a6a5343246ed9/4:3/w_1600%2Cc_limit/BELLA%2520AIYANA%2520LEDE.jpg"

const Home = () => {

    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <FontAwesome name="search" size={24} color={'#ffa07a'} style={{marginLeft: 15}}/>
            ),
            headerRight: () => (
                <Image
                    source={{ uri: shirtImageUrl }}
                    style={{
                        width: 40,
                        height: 40,
                        marginRight: 15,
                    }}
                />
            ),

        });
    }, [navigation]);

    return (
        <View style = {styles.container}>
            <TouchableOpacity
                onPress={() => navigation.navigate("Chat")}
                style={styles.chatButton}
            >
                <Entypo name="chat" size={24} color={'#fdf5e6'} />
            </TouchableOpacity>
        </View>
    );
    };

    export default Home;

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            backgroundColor: '#fdf5e6',
        },
        chatButton: {
            backgroundColor: '#e9967a',
            height: 50,
            width: 50,
            borderRadius: 25,
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: '#faf0e6',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: .9,
            shadowRadius: 8,
            marginRight: 20,
            marginBottom: 50,
        }
    });

    /*
    //for bottom tabs 
    export default function Home({ navigation }) {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text
                    onPress={() => navigation.navigate('Chat')}
                    style={{ fontSize: 26, fontWeight: 'bold'}}>Chat</Text>
            </View>
        );

        return thisHome;
      }
      */
