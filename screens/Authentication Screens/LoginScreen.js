import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, StyleSheet, SafeAreaView, Button, TextInput} from 'react-native';
import {LinearGradient} from "expo-linear-gradient";
import {Pressable, TouchableOpacity} from "react-native-gesture-handler";
import {getAllUsers} from '../../index'
import {Auth} from 'aws-amplify';

// Imports the configuration file
import appConfig from '../../appConfiguration.json'

// Import styles
import {uniStyles} from "../../styles/uniStyles";

export default function LoginScreen({navigation, onLogin}) {

    // const [username, setUsername] = useState('');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('')
    const [dbUser, setDbUser] = useState('');

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
    };

    const signIn = async (email, password) => {
        try {
            const user = await Auth.signIn(email, password);
            console.log('Signed in', user.attributes.email);
            onLogin()
        } catch (err) {
            console.log('Err object: ', err.message)
            if (err.message === 'User does not exist.') {
                setErrorMessage("We can't find a user with that email.")
            } else if (err.message === 'Incorrect username or password.') {
                setErrorMessage("Incorrect username or password.")
            }
            console.error('Sign in error:', err);
        }
    };

    return (
        <LinearGradient
            style={{height: '100%'}}
            colors={['#ffffff', '#ffffff']}
        >
            <SafeAreaView style={uniStyles.safeAreaView}>

                <View style={[uniStyles.centeredScreen, uniStyles.flex, uniStyles.width75]}>

                    <View></View>

                    <View style={[uniStyles.centered]}>

                        <Text style={[uniStyles.h2, uniStyles.fontWeight700, uniStyles.textCentered]}>
                            {appConfig.appName}
                        </Text>
                        <Text style={[styles.tagline, uniStyles.textCentered]}>
                            {appConfig.tagline}
                        </Text>

                        <View style={[uniStyles.py1, uniStyles.fullwidth]}>
                            <TextInput
                                style={uniStyles.input}
                                placeholder="Email"
                                placeholderTextColor={'#373737'}
                                value={email}
                                onChangeText={(input) => setEmail(input.toLowerCase().trim())}
                            />

                            <TextInput
                                style={uniStyles.input}
                                placeholder="Password"
                                placeholderTextColor={'#373737'}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                            />
                        </View>

                        {errorMessage ? (
                            <Text style={{ color: 'red', marginBottom: 10 }}>{errorMessage}</Text>
                        ) : <></>}

                        <Pressable
                            style={[uniStyles.btn, uniStyles.bgBlue, uniStyles.fullwidth]}
                            onPress={() => {
                                signIn(email, password)}}
                        >

                            <Text style={[uniStyles.btnText, uniStyles.white]}>Login</Text>
                        </Pressable>

                        <Pressable
                            style={[uniStyles.btn, uniStyles.bgBlue, uniStyles.fullwidth]}
                            title="Signup"
                            onPress={() => {
                                navigation.navigate('SignupStack')
                            }}>
                            <Text style={[uniStyles.btnText, uniStyles.white]}>Create an Account</Text>
                        </Pressable>
                    </View>
                    <View>
                        <Text
                            onPress={() => {
                                navigation.navigate('DocumentStack')
                            }}>
                            Terms of Service
                        </Text>
                    </View>
                </View>





            </SafeAreaView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    brandName: {
        fontSize: 30,
        fontWeight: 700,
        marginBottom: 10
    },
    tagline: {
        fontSize: 15,
        fontWeight: 500,
        marginBottom: 10
    }
})