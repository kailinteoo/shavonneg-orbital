import React, {
    useState,
    useEffect,
    useLayoutEffect,
    useCallback
} from "react";
import { TouchableOpacity, Text } from "react-native";
import { signOut } from 'firebase/auth';
import { auth, database } from '../config/firebase';
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from '@expo/vector-icons';
import colors from "../colors";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function FittingRoom() {
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
}