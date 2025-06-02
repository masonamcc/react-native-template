import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, StyleSheet, SafeAreaView, Button, TextInput} from 'react-native';
import {uiStyles} from "../Styles/UIStyles";
import {sectionStyles} from "../Styles/SectionStyles";
import {textStyles} from "../Styles/TextStyles";
import {LinearGradient} from "expo-linear-gradient";
import {TouchableOpacity} from "react-native-gesture-handler";

export default function LoginScreen({navigation, onLogin}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = () => {
        // Validate user (Google, Firebase, your backend, etc.)
        // On success:
        onLogin();  // Navigate to Home after login
    };

    return (
        <LinearGradient
                        colors={['#ffffff', '#bbbbbb']}
        >
            <SafeAreaView style={sectionStyles.loginSection}>

                <View></View>

                <View style={sectionStyles.loginMiddle}>
                    <Text style={[textStyles.brand, {marginBottom: 10, fontSize: 50, color: '#646464'}]}>trove</Text>

                    <TextInput
                        style={uiStyles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                    />

                    <TextInput
                        style={uiStyles.input}
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                    <TouchableOpacity style={uiStyles.button} title="Log In" onPress={handleLogin}>
                        <Text>Sign Up</Text>
                    </TouchableOpacity>
                    <Text style={{marginTop: 10}}>
                        Already have an account?
                    </Text>
                    <Text style={{marginTop: 10}} onPress={handleLogin}>
                        Login
                    </Text>
                </View>

                <View>
                    <Text>Terms of Service</Text>
                </View>

            </SafeAreaView>
        </LinearGradient>
    );
};