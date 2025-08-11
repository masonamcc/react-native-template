import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, StyleSheet, SafeAreaView, Button, TextInput, Switch} from 'react-native';
import {Auth} from 'aws-amplify';
import {uniStyles} from "../../styles/uniStyles";
import Header from "../../components/header";

export default function SettingsScreen({route, logout, user, profileBackgroundEnabled, setProfileBackgroundEnabled, dataChanged, setDataChanged, dbUser, profileBackgroundLink, setProfileBackgroundLink}) {

    const toggleProfileBackground = () => setProfileBackgroundEnabled((prev) => !prev)

    const signOut = async () => {
        try {
            await Auth.signOut();
            console.log('User signed out');
            // Optionally navigate to login screen or reset user state
        } catch (error) {
            console.error('Error signing out: ', error);
        }
    };

    return (
        <SafeAreaView style={uniStyles.safeAreaView}>

            <ScrollView style={uniStyles.scrollView}>
                <View style={uniStyles.centerChildren}>
                    <Text style={uniStyles.fontSize3}>Settings</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeView: {
        width: '100%',
        height: "100%",
        alignItems: 'center',
        justifyContent: 'start',
        display: "flex",
        backgroundColor: 'white'
    }
});
