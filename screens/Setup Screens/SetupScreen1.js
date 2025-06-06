import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, StyleSheet, SafeAreaView, Button, TextInput} from 'react-native';
import {uiStyles} from "../../Styles/UIStyles";
import {sectionStyles} from "../../Styles/SectionStyles";
import {textStyles} from "../../Styles/TextStyles";
import {LinearGradient} from "expo-linear-gradient";
import {Pressable, TouchableOpacity} from "react-native-gesture-handler";
import {signInWithEmailAndPassword, createUserWithEmailAndPassword, initializeAuth} from "firebase/auth";
import {app, auth, db, storage} from "../../firebase";
import {createUser, getAllUsers} from "../../index";
import {Auth} from "aws-amplify";
// import './firebase'
// import {auth} from "../firebase";

export default function SetupScreen1({navigation}) {

    const [user, setUser] = useState('');
    const [username, setUsername] = useState('')
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [bio, setBio] = useState('');
    const [noticeMessage, setNoticeMessage] = useState('')
    const [isAvailable, setIsAvailable] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await Auth.currentAuthenticatedUser();
                console.log('Current user:', user);
                setUser(user);
            } catch (err) {
                console.log('No user signed in', err);
            }
        };

        fetchUser();
    }, []);

    useEffect(() => {

        const queryUsername = async () => {
            if (username === '') {

            } else {
                const allUsers = await getAllUsers();
                const userSearched = allUsers.filter(user => user.username === username.toLowerCase());
                // const userSearched = allUsers.find(user => user.username === username);
                console.log('Found user: ', userSearched)
                if (userSearched.length > 0) {
                    console.log('Username is taken');
                    setIsAvailable(false)
                    setNoticeMessage('Username is taken');
                } else {
                    console.log('Username is available');
                    setNoticeMessage('Username is available')
                    setIsAvailable(true)
                }
            }
        }

        queryUsername()

    }, [username]);


    return (
        <SafeAreaView style={sectionStyles.loginSection}>

            <View></View>

            <View style={sectionStyles.loginMiddle}>

                <Text style={{ fontWeight: '500', marginBottom: 10, fontSize: 25, color: '#424242' }}>
                    Welcome to <Text style={{ color: '#85bf18', fontWeight: '700' }}>trove</Text>
                </Text>

                <Text style={{marginBottom: 20}}>Let's pick a username</Text>

                <TextInput
                    style={uiStyles.input}
                    placeholder="Choose a Username"
                    placeholderTextColor={'rgba(0,0,0,.5)'}
                    value={username}
                    onChangeText={(input) => setUsername(input.toLowerCase().trim())}
                    maxLength={15}
                />

                <View style={{width: '100%', justifyContent: 'center', flex:1, alignItems: 'center'}}>
                    {isAvailable ? (
                    <Text style={{color: 'green'}}>{noticeMessage}</Text>
                ) : (
                    <Text style={{color: 'red'}}>{noticeMessage}</Text>
                )}
                </View>

                <Pressable
                    style={uiStyles.button}
                    title="Confirm Username"
                    onPress={() => {
                        // navigation.navigate('SignupB')
                        console.log('Create Account button pressed')
                        if (password === confirmPassword) {
                            createNewUser(username, password);
                            onLogin
                        } else {
                            console.log('Passwords do not match')
                        }

                    }}>
                    <Text>Confirm Username</Text>
                </Pressable>

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
    );
};