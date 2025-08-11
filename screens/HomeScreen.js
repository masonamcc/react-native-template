import React, {use, useEffect, useState} from 'react';
import {View, Text, ScrollView, StyleSheet, SafeAreaView, TextInput, Button, Vibration} from 'react-native';
import {getAllTemplates, getUserFromDb} from '../index';
import '../styles/uniStyles'


import appConfig from '../appConfiguration.json'
import {uniStyles} from "../styles/uniStyles";
import {StatusBar} from "expo-status-bar";
import Header from "../reusable components/header";


export default function HomeScreen({navigation, route, dbUser, setDbUser}) {

    const [templates, setTemplates] = useState([]);

    const [post, setPost] = useState('')

    useEffect(() => {
        // Function to fetch data
        const fetchTemplates = async () => {
            const data = await getAllTemplates();
            data.forEach(dataPoint => {
                // console.log('This data is called, ', dataPoint.templateTitle)
            })

            setTemplates(data);

        };

        // Call it once immediately
        fetchTemplates();

        // Set up an interval to call it every 60 seconds (60000 ms)
        const interval = setInterval(fetchTemplates, 10000);

        // Cleanup: Clear interval when component unmounts
        return () => clearInterval(interval);
    }, []);

    return (
        <SafeAreaView style={uniStyles.safeAreaView}>
            <Header title={appConfig.appName} topRightFunction={"menu"}/>

            <StatusBar barStyle="dark-content" backgroundColor="#fff" />

            <ScrollView style={uniStyles.scrollView}>
                <View style={uniStyles.centerChildren}>
                    <Text style={uniStyles.fontSize3}>Home</Text>
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
        backgroundColor: '#ffffff'
    },
    post: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#b6b6b6',
        borderRadius: 10,
        marginBottom: 10
    },
    centerChildren: {
        justifyContent: "center",
        alignItems: "center",
        height: "100px",
        width: "100px",
        textAlign: "center",
        background: "red",
        padding: "2rem"
    }
});
