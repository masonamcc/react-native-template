import {StatusBar} from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
// import {getAllTemplates} from './index';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './navigation/MainNavigator';
// import HomeScreen from "./screens/HomeScreen";
import { textStyles } from './styles/TextStyles.js';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {uiStyles} from "./styles/UIStyles";

export default function App() {

    return (
        <GestureHandlerRootView style={{flex: 1}}>
            {/*<SafeAreaView style={styles.safeView}>*/}
            {/*<View style={uiStyles.header}>*/}
            {/*    <Text style={textStyles.brand}>trove</Text>*/}
            {/*    <View>*/}

            {/*    </View>*/}
            {/*</View>*/}

        {/*</SafeAreaView>*/}
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
