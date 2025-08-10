import React, {useEffect, useState, useRef} from 'react';
import {View, Text, ScrollView, StyleSheet, SafeAreaView, Button, TextInput} from 'react-native';
import {uiStyles} from "../../Styles/UIStyles";
import {sectionStyles} from "../../Styles/SectionStyles";
import {textStyles} from "../../Styles/TextStyles";
import {LinearGradient} from "expo-linear-gradient";
import {Pressable, TouchableOpacity} from "react-native-gesture-handler";

import {createUser, getAllUsers} from "../../index";
import {Auth} from "aws-amplify";
import {createDbUser} from "../../TroveREST";

export default function SetupScreen2({navigation, route}) {

    const {email, username, firstName, lastName} = route.params;

    const [bio, setBio] = useState('');

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

    const addDbUser = async (email, username, bio, firstName, lastName) => {
        console.log(`Adding user to DB: email:${email}, username:${username}, firstName: ${firstName}, lastName: ${lastName}, bio: ${bio}`)
        const newDbUser = await createDbUser(email, username, bio, firstName, lastName);
        console.log('Checking user: ', newDbUser)
        if (newDbUser) {
            console.log('Response: ', newDbUser);
            login(newDbUser)
        }
    }

    return (
        <SafeAreaView style={sectionStyles.signUp}>

            <View style={sectionStyles.setupContainer}>

                <View>
                    <Text style={{fontWeight: '500', marginBottom: 10, fontSize: 25, color: '#424242'}}>
                        Welcome to <Text style={{color: '#85bf18', fontWeight: '700'}}>trove</Text>
                    </Text>
                </View>

                <View style={[sectionStyles.signUpMiddle]}>

                    <View style={uiStyles.chooseUsernameContainer}>
                        <Text style={{marginBottom: 20}}>Setup a Bio</Text>

                        <TextInput
                            style={uiStyles.textarea}
                            placeholder="Bio"
                            placeholderTextColor={'rgba(0,0,0,.5)'}
                            value={bio}
                            onChangeText={setBio}
                            multiline={true}
                            numberOfLines={6}
                            maxLength={200}
                            textAlign={'left'}
                        />

                        <Pressable
                            style={uiStyles.buttonAccent}
                            title="Continue"
                            onPress={() => {
                                addDbUser(email, username, bio, firstName, lastName)
                                navigation.navigate('SetupFinal')
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