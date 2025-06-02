import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, StyleSheet, SafeAreaView, TextInput} from 'react-native';
import {getAllTemplates} from '../index';
import {textStyles} from '../Styles/TextStyles.js';
import {sectionStyles} from '../Styles/SectionStyles.js';
import {gridStyles} from '../Styles/GridStyles.js';
import {uiStyles} from '../Styles/UIStyles.js';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {LinearGradient} from 'expo-linear-gradient';
// import Carousel from 'react-native-reanimated-carousel';


export default function HomeScreen({navigation, route}) {
    const [templates, setTemplates] = useState([]);
    const data = [
        {id: 1, title: 'Card 1', description: 'This is the first card.'},
        {id: 2, title: 'Card 2', description: 'This is the second card.'},
        {id: 3, title: 'Card 3', description: 'This is the third card.'},
    ];

    const Card = ({title, description}) => {
        return (
            <LinearGradient
                style={uiStyles.card}
                colors={['#f4f4f4', '#cdcdcd']}
                // source={require('../images/bird.jpg')}
                // resizeMode="cover"
            >
                <Text style={textStyles.header3}>{title}</Text>
                <Text>{description}</Text>
            </LinearGradient>
        )
    }

    const DigCard = ({title, creator, description, countdown}) => {
        return (
            <LinearGradient
                style={uiStyles.digCard}
                colors={['#f4f4f4', '#cdcdcd']}
                // source={require('../images/bird.jpg')}
                // resizeMode="cover"
            >
                <View style={uiStyles.digCardHeader}>
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
                console.log('This data is called, ', dataPoint.templateTitle)
            })

            console.log("Hello from home")

            setTemplates(data);
        };


        // Call it once immediately
        fetchTemplates();

        // Set up an interval to call it every 60 seconds (60000 ms)
        // const interval = setInterval(fetchTemplates, 10000);

        // Cleanup: Clear interval when component unmounts
        // return () => clearInterval(interval);
    }, []);

    return (
        <SafeAreaView style={styles.safeView}>
            <View style={uiStyles.header}>
                <Text style={textStyles.brand}>trove</Text>
                <View>

                </View>
            </View>

            <ScrollView style={{width: '100%', backgroundColor: '#e5e5e5'}}>

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
                    {/*<View style={sectionStyles.sectionA}>*/}
                    {/*    <View style={gridStyles.grid3}>*/}
                    {/*        <Text style={[textStyles.header1, {paddingRight: 20}]}>Drops</Text>*/}
                    {/*        <Text>Check out our latest additions</Text>*/}
                    {/*    </View>*/}
                    {/*    {templates.length === 0 ? (*/}
                    {/*        <Text>No templates to show</Text>*/}
                    {/*    ) : (*/}
                    {/*        templates.slice(0, 3).map((template, index) => (*/}
                    {/*            <TouchableOpacity*/}
                    {/*                key={index}*/}
                    {/*                style={styles.post}*/}
                    {/*                onPress={() => {*/}
                    {/*                    navigation.navigate('TemplateDetails', {template});*/}

                    {/*                    console.log('Passing params: ', template)*/}
                    {/*                }}*/}
                    {/*            >*/}
                    {/*                <View key={index}>*/}
                    {/*                    <Text style={{fontWeight: 'bold', marginBottom: 10}}>{template.templateTitle}</Text>*/}
                    {/*                    <Text style={{marginBottom: 10}}>{template.templateDescription}</Text>*/}
                    {/*                    <Text style={{fontSize: 10}}>*/}
                    {/*                        Date Added: {new Date(template.timestamp).toLocaleDateString()}*/}
                    {/*                    </Text>*/}
                    {/*                </View>*/}
                    {/*            </TouchableOpacity>*/}
                    {/*        ))*/}
                    {/*    )}*/}
                    {/*    <Text>*/}
                    {/*        View All >*/}
                    {/*    </Text>*/}
                    {/*</View>*/}

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
    container: {
        // flex: 1,
        // alignItems: 'center',
        // paddingTop: 40,
        height: '100%'
    },
    title: {fontSize: 32, fontWeight: 'bold'},
    subheader: {fontSize: 20, marginTop: 10},
    box: {
        width: 100,
        height: 100,
        backgroundColor: 'skyblue',
        borderRadius: 10,        // Rounded corners (optional)
        borderWidth: 2,          // Border (optional)
        borderColor: 'black',    // Border color
    },
    safeView: {
        width: '100%',
        height: "100%",
        alignItems: 'center',
        justifyContent: 'start',
        display: "flex",
        backgroundColor: '#ffffff'
    },
    header: {
        width: '100%',
        // height: '5%',
        // backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
        display: "flex",
        // paddingLeft: 20,
        paddingTop: 10,
        paddingBottom: 10
    },

    // Titles
    header1: {
        color: 'black',
        fontSize: 20,
        fontFamily: "Inter",
        fontWeight: '600'
    },
    title1: {
        color: 'white',
        fontSize: 15,
        fontFamily: "Inter",
        fontWeight: '900'
    },
    title2: {
        color: 'blue',
        fontSize: 25,
        marginBottom: '3%',
        fontFamily: "Inter",
        fontWeight: '900'
    },

    // Header 3
    header4: {
        color: 'black',
        fontSize: 16,
        fontFamily: "Inter",
        fontWeight: '500'
    },

    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 10,
    },
    cell: {
        flex: 1,
        textAlign: 'left',
        fontSize: 16,
    },
    headerFont: {
        backgroundColor: '#f0f0f0',
    },
    headerCell: {
        fontWeight: 'bold',
    },

    card: {
        height: 200,
        width: 200,
        borderStyle: "solid",
        borderRadius: 8,
        borderColor: 'black',
        backgroundColor: 'lightgray',
        padding: 20
    },
    section: {
        backgroundColor: "white",
        // height: "30%",
        width: "100%",
        padding: 20,
    },
    sectionB: {
        backgroundColor: '#f5f5f5',
        height: "50%",
        width: "100%",
        padding: 20
    },
    sectionC: {
        backgroundColor: 'white',
        height: "50%",
        width: "100%",
        padding: 20
    },

    post: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#b6b6b6',
        borderRadius: 10,
        marginBottom: 10
    }
});
