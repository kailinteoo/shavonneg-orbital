import React from "react";
import { Platform, KeyboardAvoidingView, SafeAreaView } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import firebase from "../config/firebase";

export default class Chat extends React.Component {

    state = {
        message: []
    };

    get user() {
        return {
            _id: firebase.uid,
            name: this.props.navigation.state.params.name
        };
    }

    componentDidMount() {
        firebase.get(message =>
            this.setState(previous => ({
                messages: GiftedChat.append(previous.message, message)
            }))
        );
    }

    componentWillUnmount() {
        firebase.Off();
    }


    render() {
        const chat = <GiftedChat message = {this.state.messages} onSend={firebase.send} user={this.user} />;

        if (Platform.OS === "android") {
            return (
                <KeyboardAvoidingView style={{ flex:1}} behavior="padding" keyboardVerticalOffset={30} enabled>
                    {chat}
                </KeyboardAvoidingView>
            );
        }
        return <SafeAreaView style = {{ flex: 1}}>
            {chat}
        </SafeAreaView>
    }
}
