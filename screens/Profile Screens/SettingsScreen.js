import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, StyleSheet, SafeAreaView, Button, TextInput, Switch} from 'react-native';
import {uniStyles} from "../../styles/uniStyles";
import Header from "../../reusable components/header";

export default function SettingsScreen({route, logout, user, profileBackgroundEnabled, setProfileBackgroundEnabled, dataChanged, setDataChanged, dbUser, profileBackgroundLink, setProfileBackgroundLink}) {

    const toggleProfileBackground = () => setProfileBackgroundEnabled((prev) => !prev)

    const signOut = async () => {
        try {
            // Add sign-out logic with your authentication service
            console.log('User signed out');
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
