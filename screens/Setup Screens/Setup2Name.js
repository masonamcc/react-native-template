import React, {useEffect, useState, useRef} from 'react';
import {View, Text, ScrollView, StyleSheet, SafeAreaView, Button, TextInput} from 'react-native';
import {uiStyles} from "../../Styles/UIStyles";
import {sectionStyles} from "../../Styles/SectionStyles";
import {textStyles} from "../../Styles/TextStyles";
import {LinearGradient} from "expo-linear-gradient";
import {Pressable, TouchableOpacity} from "react-native-gesture-handler";
import {createUser, getAllUsers} from "../../index";
import {Auth} from "aws-amplify";

export default function Setup2Name({navigation, route}) {

    const { email, username } = route.params;

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await Auth.currentAuthenticatedUser();
                console.log('Current user:', user);
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
        <SafeAreaView style={sectionStyles.signUp}>

            <View style={sectionStyles.setupContainer}>
                <View><Text style={{fontWeight: '500', marginBottom: 10, fontSize: 25, color: '#424242'}}>
                    Welcome to <Text style={{color: '#85bf18', fontWeight: '700'}}>trove</Text>
                </Text></View>

                <View style={[sectionStyles.signUpMiddle]}>

                    <View style={uiStyles.chooseUsernameContainer}>
                        <Text style={{marginBottom: 20}}>Got a name?</Text>

                        <TextInput
                            style={uiStyles.input}
                            placeholder="First Name (Optional)"
                            placeholderTextColor={'rgba(0,0,0,.5)'}
                            value={firstName}
                            onChangeText={setFirstName}
                            maxLength={25}
                            textAlign={'center'}
                        />

                        <TextInput
                            style={uiStyles.input}
                            placeholder="Last Name (Optional)"
                            placeholderTextColor={'rgba(0,0,0,.5)'}
                            value={lastName}
                            onChangeText={setLastName}
                            maxLength={20}
                            textAlign={'center'}
                        />

                        <Pressable
                            style={uiStyles.buttonAccent}
                            title="Continue"
                            onPress={() => {
                                navigation.navigate('Setup3', {
                                    email: email,
                                    username: username,
                                    firstName: firstName,
                                    lastName: lastName,
                                })
                            }}>

                            <Text style={{color: 'white'}}>Continue</Text>

                        </Pressable>

                    </View>

                </View>

                <View>
                </View>
            </View>

        </SafeAreaView>
    );
};