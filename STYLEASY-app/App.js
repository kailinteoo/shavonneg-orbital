import { createAppContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Login from './screens/Login';
import Chat from './screens/Chat';

const AppNavigator = createStackNavigator (
  {
    Login: Login,
    Chat: Chat
  },
  {
    headerMode: "none"
  }
);

export default createAppContainer(AppNavigator);









/*import Chat from "./screens/Chat";

// SEND THE USER TO LOGINPAGE OR CHATPAGE OR WTV PAGE
const Stack = createStackNavigator();

function ChatStack () {
  return (
    <Stack.Navigator>
      <Stack.Screen name = "Chat" component = {Chat} />
    </Stack.Navigator>
  )
}

// IF YOU WANT TO ADD MORE NAVIGATION, YOU CAN ADD IT INSIDE THIS NAVIGATION CONTAINER
function RootNavigator () {
  return (
    <NavigationContainer>
      <ChatStack />
    </NavigationContainer>
  )
}

export default function App() {
  return <RootNavigator />

    /*<View style={Stylesheet.NavigationContainer}>
      <Text> Hi smartcookies </Text>
    </View>*/
    
