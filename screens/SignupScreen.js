import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, StyleSheet, SafeAreaView, Button, TextInput} from 'react-native';
import {uiStyles} from "../Styles/UIStyles";
import {sectionStyles} from "../Styles/SectionStyles";
import {textStyles} from "../Styles/TextStyles";
import {LinearGradient} from "expo-linear-gradient";
import {TouchableOpacity} from "react-native-gesture-handler";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, initializeAuth} from "firebase/auth";
import {app, auth, db, storage} from "../firebase";
import {createUser} from "../index";
import OnboardingScreen1 from "./OnboardingScreen1";
// import './firebase'
// import {auth} from "../firebase";

export default function SignupScreen({navigation, onLogin}) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');


    const createNewUser = async (username, password) => {
            const user = await createUser(username, password);
            console.log('User: ', user)
    }

    return (
        <LinearGradient
            colors={['#505050', '#000000']}
        >
            <SafeAreaView style={sectionStyles.loginSection}>

                <View></View>

                <View style={sectionStyles.loginMiddle}>
                    <Text style={[{fontWeight: 500, marginBottom: 10, fontSize: 25, color: '#ffffff'}]}>Sign Up</Text>

                    <TextInput
                        style={uiStyles.input}
                        placeholder="Choose a Username"
                        placeholderTextColor={'rgba(255,255,255,.5)'}
                        value={username}
                        onChangeText={setUsername}
                    />

                    <TextInput
                        style={uiStyles.input}
                        placeholder="Choose a Password"
                        placeholderTextColor={'rgba(255,255,255,.5)'}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />

                    <TextInput
                        style={uiStyles.input}
                        placeholder="Confirm Your Password"
                        placeholderTextColor={'rgba(255,255,255,.5)'}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry
                    />

                    <TouchableOpacity
                        style={uiStyles.button}
                        title="Signup"
                        onPress={() => {
                            // navigation.navigate('SignupB')
                            console.log('Create Account button pressed')
                            if (username === '' || password === '') {
                                console.log('Username and/or password cannot be null')
                            } else if ((username && password && confirmPassword) && password === confirmPassword) {
                                console.log('Creating new account for: ', username)
                                createNewUser(username, password);
                                navigation.navigate('Onboarding1')
                                // onLogin

                            } else if (password != confirmPassword) {
                                console.log('Passwords do not match')
                            }
                        }}>
                        <Text>Create Account</Text>
                    </TouchableOpacity>

                    <Text style={{marginTop: 10, color: 'white'}}
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
        </LinearGradient>
    );
};