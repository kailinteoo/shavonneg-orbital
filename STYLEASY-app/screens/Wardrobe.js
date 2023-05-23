import React, {
    useState,
    useEffect,
    useLayoutEffect,
    useCallback
} from "react";
import { auth, database } from '../config/firebase';
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, Text } from "react-native";