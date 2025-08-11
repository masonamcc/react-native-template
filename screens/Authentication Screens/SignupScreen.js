import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, StyleSheet, SafeAreaView, Button, TextInput} from 'react-native';
import {uiStyles} from "../../styles/UIStyles";
import {sectionStyles} from "../../styles/SectionStyles";
import {LinearGradient} from "expo-linear-gradient";
import {Pressable, TouchableOpacity} from "react-native-gesture-handler";
import {Auth} from 'aws-amplify';
import appConfig from '../../appConfiguration.json'
import {uniStyles} from "../../styles/uniStyles";

export default function SignupScreen({navigation, onLogin}) {

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('')

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
        <LinearGradient
            style={{height: '100%'}}
            colors={['#ffffff', '#ffffff']}
        >
            <SafeAreaView style={sectionStyles.loginSection}>

                <View></View>

                <View style={sectionStyles.signUpMiddle}>

                    <Text style={[uniStyles.h3, uniStyles.fontWeight700]}>Create an Account</Text>

                    <View style={[uniStyles.py1, uniStyles.fullwidth]}>
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
                    </View>

                    {errorMessage ? (
                        <Text style={{color: 'red', marginBottom: 10}}>{errorMessage}</Text>
                    ) : null}

                    <Pressable
                        style={[uniStyles.btn, uniStyles.bgBlue, uniStyles.width75]}
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
                        <Text style={[uniStyles.btnText, uniStyles.white]}>Create Account</Text>
                    </Pressable>

                    <Text style={{marginTop: 10, color: 'black'}}
                          onPress={() => {
                              navigation.navigate('Login')
                          }}>
                        Login instead
                    </Text>
                </View>

                <View>

                </View>

            </SafeAreaView>
        </LinearGradient>

    );
};