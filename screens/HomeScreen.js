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

import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
// import {Auth} from "aws-amplify";
import brand from '../appConfiguration.json'


export default function HomeScreen({navigation, route, dbUser, setDbUser}) {

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await Auth.currentAuthenticatedUser();
                const userEmail = user.attributes.email
                const loggedInUser = await getUserFromDb(userEmail);
                console.log('Logged in user: ', loggedInUser)
                setDbUser(loggedInUser);
            } catch (err) {
                console.log('No user signed in', err);
            }
        };

        fetchUser();
    }, []);

    const [templates, setTemplates] = useState([]);

    const Card = ({title, description}) => {
        return (
            <LinearGradient
                style={uiStyles.card}
                colors={['#f4f4f4', '#cdcdcd']}

            >
                <Text style={textStyles.header3}>{title}</Text>
                <Text>{description}</Text>
            </LinearGradient>
        )
    }

    const DigCard = ({title, creator, description, countdown}) => {
        return (
            <LinearGradient
                style={uiStyles.mainCard}
                colors={['#f4f4f4', '#cdcdcd']}

            >
                <View style={uiStyles.mainCardHeader}>
                    <Text style={textStyles.digCardTitle}>{title}</Text>
                    <Text style={textStyles.digCardCreator}>{creator}</Text>
                </View>
                <Text>{description}</Text>
                <Text style={textStyles.digCardCountdown}>{countdown}</Text>
            </LinearGradient>
        )
    }

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
                        Vibration.vibrate(3000)
                        navigation.navigate('SearchScreen')
                    }}/>
                </View>
            </View>

            <ScrollView style={{width: '100%', height: '100%', backgroundColor: '#e5e5e5'}}>

                <ScrollView style={{width: '100%'}}>
                    <View style={sectionStyles.sectionA}>
                        <Text style={textStyles.header3Bold}>Current Dig</Text>
                        <View style={uiStyles.cardContainer}>
                            <DigCard title={'GNX'} creator={'from Kendrick Lamar'} description={'New music ft. SZA'}
                                     countdown={'5d 20h 24m 12s'}/>
                        </View>
                    </View>
                    {/*<View style={sectionStyles.sectionA}>*/}
                    {/*    <Text style={textStyles.header1}>New Troves</Text>*/}
                    {/*    <View style={uiStyles.cardContainer}>*/}
                    {/*        <Card title={'New Packs'} description={'Browse new art packs'}/>*/}
                    {/*        <Card title={'Upcoming'} description={'Get notified when the new packs drop'}/>*/}
                    {/*    </View>*/}
                    {/*</View>*/}

                    {/*Drops Section*/}
                    <View style={sectionStyles.sectionA}>
                        <View style={gridStyles.grid3}>
                            <Text style={[textStyles.header1, {paddingRight: 20}]}>Drops</Text>
                            <Text>Check out our latest additions</Text>
                        </View>
                        {templates.length === 0 ? (
                            <Text>No templates to show</Text>
                        ) : (
                            templates.slice(0, 3).map((template, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.post}
                                    onPress={() => {
                                        navigation.navigate('TemplateDetails', {template});
                                    }}
                                >
                                    <View key={index}>
                                        <Text style={{fontWeight: 'bold', marginBottom: 10}}>{template.templateTitle}</Text>
                                        <Text style={{marginBottom: 10}}>{template.templateDescription}</Text>
                                        <Text style={{fontSize: 10}}>
                                            Date Added: {new Date(template.timestamp).toLocaleDateString()}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            ))
                        )}
                        <Text>
                            View All >
                        </Text>
                    </View>

                    <View style={sectionStyles.sectionA}>
                        {/*<Text style={textStyles.header3}>Feed</Text>*/}
                        <View style={uiStyles.postEl}>
                            <TextInput
                                style={uiStyles.postInput}
                                placeholder="Something to Share?"
                                value={post}
                                onChangeText={setPost}
                                multiline={true}
                                numberOfLines={3}
                            />
                            <TouchableOpacity style={uiStyles.postButton}>
                                <Text style={{color: 'white'}}>Post</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
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
    }
});
