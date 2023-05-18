import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default class Chat extends React.Component {
    render() {
        return (
            <View style = {style.constainer}>
                <Text>Screen</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    constainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"

    }
});