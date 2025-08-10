import React, {useEffect, useState, useRef} from 'react';
import {View, Text, ScrollView, StyleSheet, SafeAreaView, Button, TextInput} from 'react-native';
import {uiStyles} from "../../Styles/UIStyles";
import {sectionStyles} from "../../Styles/SectionStyles";
import {textStyles} from "../../Styles/TextStyles";
import {LinearGradient} from "expo-linear-gradient";
import {Pressable, TouchableOpacity} from "react-native-gesture-handler";
import {createUser, getAllUsers} from "../../index";
import {Auth} from "aws-amplify";

import {Swiper, SwiperSlide} from 'react-native-swiper';

export default function Setup1Username({navigation, route}) {

    const { email } = route.params;

    const [awsUser, setAwsUser] = useState('')
    const [username, setUsername] = useState('')
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [bio, setBio] = useState('');
    const [noticeMessage, setNoticeMessage] = useState('')
    const [isAvailable, setIsAvailable] = useState(null);

    useEffect(() => {

        const fetchAwsUser = async () => {
            try {
                const user = await Auth.currentAuthenticatedUser();
                console.log('Current user:', user);
                setAwsUser(user);
            } catch (err) {
                console.log('No user signed in', err);
            }
        };

        fetchAwsUser();

    }, []);

    useEffect(() => {
        console.log('userEffect triggering')

        const queryUsername = async () => {
            console.log('Checking username')
            if (username.length === 0) {
                setNoticeMessage('')
            } else {
                console.log('username is not empty')
                const allUsers = await getAllUsers();
                console.log('All users are, ', allUsers)
                const userSearched = allUsers.filter(user => user.username === username.toLowerCase());
                console.log('Users Searched: ', userSearched)
                if (userSearched.length > 0) {
                    setIsAvailable(false)
                    setNoticeMessage('Username is taken');
                } else {
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
                        <Text style={{marginBottom: 20}}>Choose a username</Text>

                        <TextInput
                            style={uiStyles.input}
                            placeholder="myawesomename"
                            placeholderTextColor={'rgba(0,0,0,.5)'}
                            value={username}
                            onChangeText={(input) => setUsername(input.toLowerCase().trim())}
                            maxLength={15}
                            textAlign={'center'}
                        />

                        <View style={{width: '100%', height: 50, justifyContent: 'center', alignItems: 'center'}}>
                            {isAvailable ? (
                                <Text style={{color: 'green'}}>{noticeMessage}</Text>
                            ) : (
                                <Text style={{color: 'red'}}>{noticeMessage}</Text>
                            )}
                        </View>

                        <Pressable
                            style={uiStyles.buttonAccent}
                            title="Confirm Username"
                            onPress={() => {
                                if (isAvailable === true) {
                                    navigation.navigate('Setup2', {
                                        email: email,
                                        username: username
                                    })
                                }
                            }}>
                            <Text style={{color: 'white'}}>Confirm Username</Text>
                        </Pressable>

                    </View>

                </View>

                <View>
                </View>

            </View>

        </SafeAreaView>
    );
};