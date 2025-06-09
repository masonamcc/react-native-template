import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, StyleSheet, SafeAreaView, Button, TextInput} from 'react-native';
import {uiStyles} from "../../Styles/UIStyles";
import {sectionStyles} from "../../Styles/SectionStyles";
import {textStyles} from "../../Styles/TextStyles";
import {LinearGradient} from "expo-linear-gradient";
import {TouchableOpacity} from "react-native-gesture-handler";
import {signInWithEmailAndPassword, createUserWithEmailAndPassword, initializeAuth} from "firebase/auth";
import {app, auth, db, storage} from "../../firebase";
import {createUser} from "../../index";
import Setup1Username from "../Setup Screens/Setup1Username";
// import './firebase'
// import {auth} from "../firebase";
import {Auth} from 'aws-amplify';

export default function SignupScreen({navigation, onLogin}) {

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('')

    // const createNewUser = async (username, password) => {
    //         const user = await createUser(username, password);
    //         console.log('User: ', user)
    // }

    const signUp = async (email, password) => {
        try {
            await Auth.signUp({
                username: email,
                password,
                attributes: {
                    email, // Required for email-based auth
                },
            });
            console.log('Sign up success');

            navigation.navigate('Verification', {email})
        } catch (err) {
            console.error('Error signing up:', err);
            setErrorMessage(err.message)
        }
    };

    return (
        <SafeAreaView style={sectionStyles.signUp}>

            <View></View>

            <View style={sectionStyles.signUpMiddle}>

                <Text style={[{fontWeight: 500, marginBottom: 10, fontSize: 25, color: '#000'}]}>Sign up for <Text style={textStyles.brandAccent}>trove</Text></Text>

                <TextInput
                    style={uiStyles.input}
                    placeholder="Enter your email"
                    // placeholderTextColor={'rgba(255,255,255,.5)'}
                    value={email}
                    onChangeText={(input) => setEmail(input.toLowerCase().trim())}
                />

                <TextInput
                    style={uiStyles.input}
                    placeholder="Choose a Password"
                    // placeholderTextColor={'rgba(255,255,255,.5)'}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                <TextInput
                    style={uiStyles.input}
                    placeholder="Confirm Your Password"
                    // placeholderTextColor={'rgba(255,255,255,.5)'}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                />

                {errorMessage ? (
                    <Text style={{color: 'red', marginBottom: 10}}>{errorMessage}</Text>
                ) : null}

                <TouchableOpacity
                    style={uiStyles.buttonAccent}
                    title="Signup"
                    onPress={() => {
                        // navigation.navigate('SignupB')
                        console.log('Create Account button pressed')
                        if (email === '' || password === '') {
                            console.log('Username and/or password cannot be null')
                        } else if ((email && password && confirmPassword) && password === confirmPassword) {
                            // console.log('Creating new account for: ', username)
                            signUp(email, password);
                            // onLogin

                        } else if (password !== confirmPassword) {
                            setErrorMessage('Passwords do not match')
                            console.log('Passwords do not match')
                        }
                    }}>
                    <Text style={{color: 'white'}}>Create Account</Text>
                </TouchableOpacity>

                <Text style={{marginTop: 10, color: 'black'}}
                      onPress={() => {
                          navigation.navigate('Login')
                      }}>
                    Remember your login?
                </Text>
            </View>

            <View>
                <Text>Terms of Service</Text>
            </View>

        </SafeAreaView>

    );
};