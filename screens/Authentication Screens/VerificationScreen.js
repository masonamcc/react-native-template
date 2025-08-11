import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, StyleSheet, SafeAreaView, Button, TextInput} from 'react-native';
import {Pressable, TouchableOpacity} from "react-native-gesture-handler";

import {createUser} from "../../index";

// import './firebase'
// import {auth} from "../firebase";
import {Auth} from 'aws-amplify';
import {uniStyles} from "../../styles/uniStyles";

export default function VerificationScreen({navigation, route, login}) {

    const [verificationCode, setVerificationCode] = useState('');

    const {email} = route.params;

    const confirmSignUp = async (email, verificationCode) => {
        try {
            await Auth.confirmSignUp(email, verificationCode);
            console.log('Confirmation success');
            navigation.navigate('Setup1', {
                email: email
            })
        } catch (err) {
            console.error('Confirmation error:', err);
        }
    };

    const resendVerificationCode = async (email) => {
        try {
            await Auth.resendSignUp(email);
            console.log('Verification code resent successfully');
        } catch (error) {
            console.log('Error resending code:', error);
        }
    };

    return (

        <SafeAreaView style={uniStyles.safeAreaView}>

            <View></View>

            <View>
                <Text style={[{fontWeight: 500, marginBottom: 12, fontSize: 25}]}>Verification</Text>
                <Text style={{marginBottom: 20}}>Please enter the verification code we sent to your email.</Text>

                <TextInput
                    style={uniStyles.input}
                    placeholder="Verification Code"
                    placeholderTextColor={'rgba(0,0,0,.5)'}
                    value={verificationCode}
                    onChangeText={setVerificationCode}
                />

                <Pressable onPress={resendVerificationCode}>
                    <Text>Resend Code</Text>
                </Pressable>

                <Pressable
                    style={uniStyles.button}
                    title="Verify"
                    onPress={() => {
                        // navigation.navigate('SignupB')
                        confirmSignUp(email, verificationCode)
                    }}>
                    <Text>Verify</Text>
                </Pressable>

            </View>

            <View>
                {/*<Text>Terms of Service</Text>*/}
            </View>

        </SafeAreaView>

    );
};