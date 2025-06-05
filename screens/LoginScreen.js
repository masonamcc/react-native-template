import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, StyleSheet, SafeAreaView, Button, TextInput} from 'react-native';
import {uiStyles} from "../Styles/UIStyles";
import {sectionStyles} from "../Styles/SectionStyles";
import {textStyles} from "../Styles/TextStyles";
import {LinearGradient} from "expo-linear-gradient";
import {TouchableOpacity} from "react-native-gesture-handler";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, initializeAuth} from "firebase/auth";
import {app, auth, db, storage} from "../firebase";
import {getAllUsers} from '../index'
// import './firebase'
// import {auth} from "../firebase";

export default function LoginScreen({navigation, onLogin}) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('')

    const handleLogin = async (usernameInput, password) => {
       try {
           if (usernameInput && password) {
               console.log('Initiating handleLogin...')
               console.log('Initiating handleLogin... Username Entered: ', usernameInput);
               console.log('Initiating handleLogin... Password Entered: ', password);
               console.log('Initiating handleLogin... Getting all users')
               let response = await getAllUsers()
               // let loginResults = await response.text();
               if (response) {
                   console.log('Initiating handleLogin... All Users have been found: ', response);
                   console.log('Initiating handleLogin... Searching for: ', usernameInput);
                   let targetUser = response.find((credential) => credential.username === usernameInput);

                   if (targetUser) {
                       console.log('Initiating handleLogin... User exists: ', targetUser)
                       if (password === targetUser.password) {
                           console.log('passwords match');
                           // navigation.navigate("Home", { user: targetUser})
                           onLogin(targetUser);
                       }
                   }
               }
           } else {
               setErrorMessage('Please enter both username and password')
           }

       } catch (error) {
           console.log(error)
       }

        // onLogin();  // Navigate to Home after login
    };

    return (
        <LinearGradient
            style={{height: '100%'}}
            colors={['#ffffff', '#bbbbbb']}
        >
            <SafeAreaView style={sectionStyles.loginSection}>

                <View></View>

                <View style={sectionStyles.loginMiddle}>
                    <Text style={[textStyles.brand, {marginBottom: 10, fontSize: 50, color: '#646464'}]}>trove</Text>

                    <TextInput
                        style={uiStyles.input}
                        placeholder="Username"
                        placeholderTextColor={'#373737'}
                        value={username}
                        onChangeText={setUsername}
                    />

                    <TextInput
                        style={uiStyles.input}
                        placeholder="Password"
                        placeholderTextColor={'#373737'}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />

                    {errorMessage ? (
                        <Text style={{ color: 'red', marginBottom: 10 }}>{errorMessage}</Text>
                    ) : null}

                    <Text style={{marginTop: 10}} onPress={() => {
                        handleLogin(username, password)}}>
                        Login
                    </Text>

                    <Text style={{marginTop: 10}}>
                        Already have an account?
                    </Text>

                    <TouchableOpacity
                        style={uiStyles.button}
                        title="Signup"
                        onPress={() => {
                            navigation.navigate('Signup')
                            console.log('Sign Up button pressed')
                        }}>
                        <Text>Sign Up</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <Text>Terms of Service</Text>
                </View>

            </SafeAreaView>
        </LinearGradient>
    );
};