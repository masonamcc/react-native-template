import React, {useEffect, useState, useRef} from 'react';
import {View, Text, StyleSheet, Image, SafeAreaView, ScrollView} from 'react-native';

import {textStyles} from '../../Styles/TextStyles.js';
import {uiStyles} from '../../Styles/UIStyles.js';
import {Storage} from "aws-amplify";

import {Pressable} from "react-native-gesture-handler";
import {Video} from "expo-av";
import {BlurView} from "expo-blur";
import {LinearGradient} from "expo-linear-gradient";
import Icon from 'react-native-vector-icons/Ionicons';
import {getTrove} from "../../RESTFunctions/TroveRESTFunctions";
import {getUserFromDbById} from "../../index";

export default function TroveDetailsScreen({navigation, route, dbUser}) {
    const {trove} = route.params;
    console.log('trove photo key: ', trove.troveCoverFileUrl)
    console.log('Trove cover file type: ', trove.troveCoverFileType)
    console.log('Trove Object: ', trove)
    const [troveOwnerId, setTroveOwnerId] = useState('')
    const [isMyTrove, setIsMyTrove] = useState(false);

    // Determine if the trove we're viewing is ours or someone else's.
    const determineTroveOwner = async () => {
        console.log('Determining Trove Owner')
        // Declare the trove ID
        const troveId = trove.id
        //Lookup the trove ID in the DB
        const fetchTrove = await getTrove(trove.id)
        console.log('Trove fetched: ', fetchTrove);
        setTroveOwnerId(fetchTrove.user.userId)
        console.log('Trove Owner: ', troveOwnerId);
        console.log('Me: ', dbUser)
        if (troveOwnerId === dbUser.userId) {
            setIsMyTrove(true)
        } else {
            setIsMyTrove(false)
        }
    }

    const [troveBannerUrl, setTroveBannerUrl] = useState('')
    // Assign the trove_banner_image_url
    const troveImageUrl = trove.troveCoverFileUrl;
    // const troveImageObjectName = troveImageUrl.replace('754/', '')
    // const troveImageObjectUrl = troveImageObjectName
    // console.log(troveImageObjectUrl)
    const troveCoverFileType = trove.troveCoverFileType
    const troveCoverRef = useRef(null)

    useEffect(() => {
        const fetchTroveFiles = async () => {
            try {
                // 1. List all files under 'public/uploads'
                const result = await Storage.list(`${troveOwnerId}/`, {level: `public`});
                console.log('result: ', result.results)

                const trovePhotoKeyArray = result.results
                const matchingTroveImageUrl = trovePhotoKeyArray.find(key => key.key === troveImageUrl)
                console.log('matchingTroveImageUrl: ', matchingTroveImageUrl.key)

                // 2. Get signed URLs for each file
                const signedUrl = await Storage.get(matchingTroveImageUrl.key, {level: 'public'});
                setTroveBannerUrl(signedUrl)
                console.log('troveBannerUrl: ', troveBannerUrl)

                // console.log(urls)
            } catch (error) {
                console.error('Error listing or getting images:', error);
            }
        };
        determineTroveOwner()
        fetchTroveFiles()
    })

    const handleFullscreen = async () => {
        console.log('Handle Fullscreen started')
        if (troveCoverRef.current) {
            await troveCoverRef.current.presentFullscreenPlayer();

        }
    };

    const renderCover = () => {
        if (troveCoverFileType === 'image/jpeg') return <Image
            ref={troveCoverRef}
            source={{uri: troveBannerUrl}}
            style={[StyleSheet.absoluteFill, uiStyles.backgroundVideo]}
            resizeMode="cover"
            shouldPlay={true}
            isLooping={true}
        />;
        if (troveCoverFileType === 'video/mp4') return <Video
            ref={troveCoverRef}
            source={{uri: troveBannerUrl}}
            style={[StyleSheet.absoluteFill, uiStyles.troveCoverUpload]}
            resizeMode="cover"
            shouldPlay={true}
            isLooping={true}
            // useNativeControls={true}
        />
    }

    return (


        <SafeAreaView style={{flex: 1}}>
            <>
                <View style={uiStyles.backgroundVideoContainer}>

                </View>
                <View style={uiStyles.troveBackgroundVideoContainer}>
                    {renderCover()}
                </View>
                <BlurView intensity={0} tint="dark" style={StyleSheet.absoluteFill}/>
            </>
            {/*{troveBannerUrl ? (*/}
            {/*    <Image source={{uri: troveBannerUrl}} style={uiStyles.troveCoverUpload}></Image>*/}
            {/*    //*/}
            {/*) : (*/}
            {/*    <Text>No Image</Text>*/}
            {/*)}*/}
            {/*<Image src={}></Image>*/}
            <ScrollView style={uiStyles.troveScrollView}>

                <LinearGradient
                    colors={['transparent', '#000']}
                    locations={[0.8, 1]} // 'transparent' starts at 20%, '#000' starts at 100%
                >
                    <View style={{flex: 1}}>
                        <View style={uiStyles.troveDetailsMasterContainer}>


                            <View style={uiStyles.troveDetailsHeroContainer}>


                                <Pressable
                                    onPress={() => {
                                        navigation.goBack()
                                    }}
                                    hitSlop={{top: 50, bottom: 50, left: 50, right: 50}}
                                    style={{marginBottom: 10}}
                                >
                                    <Icon name='arrow-back-circle' size={30} color='#fff'/>
                                </Pressable>


                                <View style={uiStyles.troveDetailsHero}>

                                    <Text style={uiStyles.header1}>{trove.troveTitle}</Text>

                                    <View style={uiStyles.troveDetailsHeroFooter}>
                                        <Text style={{color: 'white', fontSize: 20}}>
                                            From <Text style={{fontWeight: 800}}>@{trove.user.username}</Text>
                                            {/*Created On: {new Date(trove.createdAt).toLocaleDateString()}*/}
                                        </Text>
                                        <Pressable style={uiStyles.troveFullscreenToggle}
                                                   onPress={handleFullscreen}
                                                   hitSlop={{top: 50, bottom: 50, left: 50, right: 50}}>
                                            <Icon name='expand' size={30} color='#fff'/>

                                        </Pressable>
                                    </View>

                                </View>

                            </View>

                        </View>
                    </View>
                </LinearGradient>

                <View style={{height: 300}}>
                    <View style={uiStyles.troveDetailsContentContainer}>
                        <Text style={textStyles.description}>{trove.troveDescription}</Text>
                    </View>

                    <View style={{height: 500, backgroundColor: 'white'}}>

                    </View>
                </View>


            </ScrollView>
            {/* Add more details here */}
        </SafeAreaView>
    )
        ;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff'
    },
    title: {fontSize: 24, fontWeight: 'bold', marginBottom: 10}
});
