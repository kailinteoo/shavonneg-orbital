import React, {
    useState,
    useEffect,
    useLayoutEffect,
    useCallback
} from "react";
import { TouchableOpacity, View, SafeAreaView, Button, StyleSheet, Text } from "react-native";
import { signOut } from 'firebase/auth';
import { auth, database } from '../config/firebase';
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from '@expo/vector-icons';
import colors from "../colors";

export default function Profile() {
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
                    <AntDesign name="logout" size={24} color={colors.gray} style={{marginRight: 10}}/>
                </TouchableOpacity>
              )
            });
          }, [navigation]);      
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.userInfo}>
                <View>
                    <Text style={[styles.caption, {
              marginTop:20,
              marginBottom: 1,
            }]}>Username</Text>
                    <Text style={[styles.title, {
              marginTop:15,
              marginBottom: 5,
            }]}>@username</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '',
    },
    userInfo: {
        paddingHorizontal: 30, 
        marginBottom: 25, 
    }, 
    title: {
        fontsize: 24,
        fontweight: 'bold', 
    },
    caption: {
        fontSize: 14, 
        lineHeight: 14, 
        fontweight: '500',
    },
    row: {
        flexDirection: 'row',
        marginBottom: '10',
    },
    infoBoxWrapper: {
        width: '50%', 
        alignItems: 'center',
        justifyContent: 'center',
    },
});