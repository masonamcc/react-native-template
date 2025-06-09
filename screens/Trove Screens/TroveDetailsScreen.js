import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, SafeAreaView, ScrollView} from 'react-native';
import {textStyles} from '../../Styles/TextStyles.js';
import {sectionStyles} from '../../Styles/SectionStyles.js';
import {gridStyles} from '../../Styles/GridStyles.js';
import {uiStyles} from '../../Styles/UIStyles.js';
import {troveStyles} from "../../Styles/TroveStyles";
import {Storage} from "aws-amplify";
import {Pressable} from "react-native-gesture-handler";
import {Video} from "expo-av";
import {BlurView} from "expo-blur";
import {LinearGradient} from "expo-linear-gradient";

export default function TroveDetailsScreen({navigation, route, dbUser}) {
    const {trove} = route.params;
    console.log('trove photo key: ', trove.troveCoverFileUrl)

    const [troveBannerUrl, setTroveBannerUrl] = useState('')
    // Assign the trove_banner_image_url
    const troveImageUrl = trove.troveCoverFileUrl;
    // const troveImageObjectName = troveImageUrl.replace('754/', '')
    // const troveImageObjectUrl = troveImageObjectName
    // console.log(troveImageObjectUrl)


    useEffect(() => {
        const fetchTroveFiles = async () => {
            try {
                // 1. List all files under 'public/uploads'
                const result = await Storage.list(`${dbUser.userId}/`, {level: `public`});
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
        fetchTroveFiles()
    })

    return (


        <SafeAreaView style={{flex: 1}}>
            <>
                {/*<View style={uiStyles.backgroundVideoContainer}>*/}
                {/*    <Image*/}
                {/*        source={{uri: troveBannerUrl}}*/}
                {/*        style={[StyleSheet.absoluteFill, uiStyles.backgroundVideo]}*/}
                {/*        resizeMode="cover"*/}
                {/*        shouldPlay={true}*/}
                {/*        isLooping={true}*/}
                {/*    />*/}
                {/*</View>*/}
                <View style={uiStyles.troveBackgroundVideoContainer}>
                    <Video
                        source={{uri: troveBannerUrl}}
                        style={[StyleSheet.absoluteFill, uiStyles.troveCoverUpload]}
                        resizeMode="fit"
                        shouldPlay={true}
                        isLooping={true}
                        useNativeControls={true}
                    />
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
                >
                    <View style={{flex:1}}>
                        <View style={uiStyles.troveDetailsMasterContainer}>

                        <View style={uiStyles.troveDetailsHeroContainer}>
                            <Pressable
                                onPress={() => {
                                    navigation.goBack()
                                }}
                            >
                                <Text>Back</Text>
                            </Pressable>


                            <View style={uiStyles.troveDetailsHero}>

                                <Text style={uiStyles.header1}>{trove.troveTitle}</Text>

                                <Text style={{color: 'white'}}>Created
                                    On: {new Date(trove.createdAt).toLocaleDateString()}</Text>

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
