import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import * as firebase from 'firebase';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from './components/auth/Landing';
import RegisterScreen from './components/auth/Register';

const firebaseConfig = {
  apiKey: "AIzaSyDIf8vO7IlroUdmu12S7uTMVl6QmnB8cMw",
  authDomain: "instagram-dev-59069.firebaseapp.com",
  projectId: "instagram-dev-59069",
  storageBucket: "instagram-dev-59069.appspot.com",
  messagingSenderId: "132276455158",
  appId: "1:132276455158:web:48d97aa59e3ec7d1f20ed7"
};

if (firebase.apps.length === 0){
  firebase.initializeApp(firebaseConfig)
}

const Stack = createStackNavigator();



export class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loaded: false
    }
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) => {
      if(!user) {
        this.setState({
          loggedIn: false,
          loaded: true
        })
      } else {
        this.setState({
          loggedIn: true,
          loaded: true
        })
      }
    })
  }

  render() {
    const { loggedIn, loaded } = this.state;
    if(!loaded){
      return(
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text>Loading</Text>
        </View>
      )
    }
    if(!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false}} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
    return(
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text>User is logged in</Text>
      </View>
    )
  }
}

export default App


