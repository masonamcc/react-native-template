import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './navigation/MainNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {

    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <NavigationContainer>
                <MainNavigator/>
            </NavigationContainer>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'start',
    },
    box: {
        width: 100,
        height: 100,
        backgroundColor: 'skyblue',
        borderRadius: 10,        // Rounded corners (optional)
        borderWidth: 2,          // Border (optional)
        borderColor: 'black',    // Border color
    },
    safeView: {
        flex: 1,
    },
});
