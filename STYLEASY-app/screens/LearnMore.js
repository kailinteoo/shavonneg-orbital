import React, {
    useState,
    useEffect,
    useLayoutEffect,
    useCallback
} from "react";
import { View, TouchableOpacity, Text, Image, StyleSheet, ImageBackground, ScrollView} from "react-native";
import { signOut } from 'firebase/auth';
import { auth, database } from '../config/firebase';
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from '@expo/vector-icons';
import colors from "../colors";

const LearnMore = () => {

    const navigation = useNavigation();
    const onSignOut = () => {
        signOut(auth).catch(error => console.log(error));
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    style={{
                        marginRight: 10
                    }}
                    onPress={onSignOut}
                >
                    <AntDesign name="logout" size={24} color={colors.black} style={{marginRight: 10}}/>
                </TouchableOpacity>
              )
            });
          }, [navigation]);     
          
          return (
            <View style = {styles.container}>
                <ScrollView>
                    <Text style={styles.HeaderOne}>Who Are We</Text>  
                    <Text style={styles.HeaderTwo}>We are STYLEASY who hope to make the process of choosing an outfit quick, create a place where we can keep track of all our clothing items, and integrate a sense of community by connecting like-minded individuals who have similar fashion preferences.
 </Text>  
                </ScrollView>
            </View>
    );
};

export default LearnMore;

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            backgroundColor: '#fdf5e6',
        },
        HeaderOne: {
            marginTop: 20, 
            marginLeft: 60,
            color:'black', 
            fontWeight: 'bold', 
            fontSize:30,
        },
        HeaderTwo: {
            textAlign: 'justify',
            marginTop: 20,
            marginRight: 30,
            color:'black',
            fontSize:12,
            width: 300,

        }
    });
