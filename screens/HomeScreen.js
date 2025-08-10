import React, {use, useEffect, useState} from 'react';
import {View, Text, ScrollView, StyleSheet, SafeAreaView, TextInput, Button, Vibration} from 'react-native';
import {getAllTemplates, getUserFromDb} from '../index';
import {textStyles} from '../Styles/TextStyles.js';
import {sectionStyles} from '../Styles/SectionStyles.js';
import {gridStyles} from '../Styles/GridStyles.js';
import {uiStyles} from '../Styles/UIStyles.js';
import {troveStyles} from "../Styles/TroveStyles";
import {TouchableOpacity} from 'react-native-gesture-handler';
import {LinearGradient} from 'expo-linear-gradient';
import '../Styles/uniStyles'

import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import brand from '../appConfiguration.json'
import {uniStyles} from "../Styles/uniStyles";


export default function HomeScreen({navigation, route, dbUser, setDbUser}) {

    // useEffect(() => {
    //     const fetchUser = async () => {
    //         try {
    //             const user = await Auth.currentAuthenticatedUser();
    //             const userEmail = user.attributes.email
    //             const loggedInUser = await getUserFromDb(userEmail);
    //             console.log('Logged in user: ', loggedInUser)
    //             setDbUser(loggedInUser);
    //         } catch (err) {
    //             console.log('No user signed in', err);
    //         }
    //     };
    //
    //     fetchUser();
    // }, []);

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
        <SafeAreaView style={styles.safeView}>
            <View style={uiStyles.header}>
                <Text style={textStyles.brand}>{brand.appName}</Text>
                <View style={{padding: 10}}>
                    <Icon  name="menu-outline" size={25} color="#000" onPress={() => {
                        navigation.navigate('SearchScreen')
                    }}/>
                </View>
            </View>

            <ScrollView style={{width: '100%', height: '100%', display: "flex", backgroundColor: '#e5e5e5'}}>
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
