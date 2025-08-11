import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, StyleSheet, SafeAreaView, Button, TextInput} from 'react-native';
import {uiStyles} from "../../styles/UIStyles";
import {sectionStyles} from "../../styles/SectionStyles";
import {textStyles} from "../../styles/TextStyles";
import {LinearGradient} from "expo-linear-gradient";
import {Pressable, TouchableOpacity} from "react-native-gesture-handler";

import {createUser} from "../../index";

// import './firebase'
// import {auth} from "../firebase";
import {Auth} from 'aws-amplify';

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

        <SafeAreaView style={sectionStyles.loginSection}>

            <View></View>

            <View style={sectionStyles.signUpMiddle}>
                <Text style={[{fontWeight: 500, marginBottom: 12, fontSize: 25}]}>Verification</Text>
                <Text style={{marginBottom: 20}}>Please enter the verification code we sent to your email.</Text>

                <TextInput
                    style={uiStyles.input}
                    placeholder="Verification Code"
                    placeholderTextColor={'rgba(0,0,0,.5)'}
                    value={verificationCode}
                    onChangeText={setVerificationCode}
                />

                <Pressable onPress={resendVerificationCode}>
                    <Text>Resend Code</Text>
                </Pressable>

                <Pressable
                    style={uiStyles.button}
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