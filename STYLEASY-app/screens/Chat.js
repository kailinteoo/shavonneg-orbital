//VERSION 2
import React from "react";
import { Platform, KeyboardAvoidingView, SafeAreaView } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import Fire from "../config/Fire";

export default class Chat extends React.Component {

    state = {
        message: []
    };

    get user() {
        return {
            _id: Fire.uid,
            name: this.props.navigation.state.params.name
        };
    }

    componentDidMount() {
        Fire.get(message =>
            this.setState(previous => ({
                messages: GiftedChat.append(previous.message, message)
            }))
        );
    }

    componentWillUnmount() {
        Fire.Off();
    }


    render() {
        const chat = <GiftedChat message = {this.state.messages} onSend={Fire.send} user={this.user} />;

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

//VERSION 1
/*
import React from "react";
import { GiftedChat } from "react-native-gifted-chat";

export default function Chat() {
    return (
        <GiftedChat />
    )
}*/
