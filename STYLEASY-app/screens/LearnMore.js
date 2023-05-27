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
                <Text style={{marginRight: 150, marginBottom: 90, color:'black', fontWeight:'bold', fontSize:'40'}}>WHO ARE WE?</Text>  
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
        }
    });
