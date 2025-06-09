import React, {useEffect, useState, useCallback, useRef} from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    SafeAreaView,
    Button,
    TextInput,
    ImageBackground,
    Animated,
    Image
} from 'react-native';
import {createPost, getMyPosts} from "../../index";
import {getAllTroves, getTroveCreator} from "../../RESTFunctions/TroveRESTFunctions";
import {Pressable} from "react-native-gesture-handler";
import {uiStyles} from "../../Styles/UIStyles";
import {textStyles} from "../../Styles/TextStyles";
import {WebView} from 'react-native-webview';
import Icon from 'react-native-vector-icons/Ionicons';
import {Storage} from 'aws-amplify';
import {getMyTroves} from "../../RESTFunctions/TroveRESTFunctions";
import {troveStyles} from "../../Styles/TroveStyles";

export default function BrowseTrovesScreen({navigation, user, dbUser}) {
    const [imageUrls, setImageUrls] = useState([]);
    const [error, setError] = useState(null);
    const [allTroves, setAllTroves] = useState([])
    // const [troveBannerImageUrl, setTroveBannerImageUrl]

    const fetchAllTroves = async () => {
        const allTroves = await getAllTroves();
        // console.log('My Troves from Profile: ', allTroves)
        setAllTroves(allTroves)
        // console.log('Troves Retrieved: ', allTroves)
    }

    useEffect(() => {
        fetchAllTroves()
        // const interval = setInterval(fetchAllTroves, 10000);
        //
        // // Cleanup: Clear interval when component unmounts
        // return () => clearInterval(interval);
    }, []);

    const fetchTroveCreator = async(troveId) => {
        const troveCreator = getTroveCreator()
    }

    // useEffect(() => {
    //     const fetchTroveFiles = async () => {
    //         try {
    //             // 1. List all files under 'public/uploads'
    //             const result = await Storage.list(`${dbUser.userId}/`, {level: `public`});
    //             console.log('result: ', result.results)
    //
    //             const trovePhotoKeyArray = result.results
    //             const matchingTroveImageUrl = trovePhotoKeyArray.find(key => key.key === troveImageUrl)
    //             console.log('matchingTroveImageUrl: ', matchingTroveImageUrl.key)
    //
    //             // 2. Get signed URLs for each file
    //             const signedUrl = await Storage.get(matchingTroveImageUrl.key, {level: 'public'});
    //             setTroveBannerUrl(signedUrl)
    //             console.log('troveBannerUrl: ', troveBannerUrl)
    //
    //             // console.log(urls)
    //         } catch (error) {
    //             console.error('Error listing or getting images:', error);
    //         }
    //     };
    //     fetchTroveFiles()
    // })

    return (
        <SafeAreaView style={uiStyles.safeView}>
            <View>
                {/* Header */}
                <View style={uiStyles.header}>
                    <Text style={textStyles.brand}>Troves</Text>
                    <Pressable onPress={() => navigation.navigate('Create Trove')}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text>Create Trove</Text>
                            <Icon style={{marginLeft: 10}} name="add-circle" size={25} color="#000"/>
                        </View>
                    </Pressable>
                </View>

                {/* Error message */}
                {error && (
                    <Text style={{color: 'red', margin: 10}}>Error: {error}</Text>
                )}

                {/* Images Grid */}
                <ScrollView contentContainerStyle={{flexDirection: 'row', flexWrap: 'wrap', padding: 10}}>
                    <View style={troveStyles.troveListingContainer}>
                        {allTroves ? (
                            allTroves.map((trove, index) => {
                                fetchTroveCreator(trove.userId)
                                // console.log('Trove Creator: ', troveCreator)
                                return (
                                    <Pressable
                                        key={index}
                                        style={troveStyles.troveListing}
                                        onPress={() => {
                                            navigation.navigate('TroveDetailsScreen', {trove})
                                        }}
                                    >
                                        <View>

                                            {/*<Text style={troveStyles.troveListingTitle}>{troveCreator.id}</Text>*/}
                                            <Text style={troveStyles.troveListingTitle}>{trove.troveTitle}</Text>
                                            <Text style={{marginBottom: 10}}>{trove.troveDescription}</Text>
                                            {/*<Text style={{fontSize: 10}}>*/}
                                            {/*    Date Added: {new Date(myTrove.timestamp).toLocaleDateString()}*/}
                                            {/*</Text>*/}
                                        </View>
                                    </Pressable>
                                );

                            })

                        ) : (

                            <Text>No Troves Found</Text>

                        )}
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

