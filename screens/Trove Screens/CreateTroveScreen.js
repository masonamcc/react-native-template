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
    Image,
    Animated
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {createPost, getMyPosts} from "../../index";
import {Pressable} from "react-native-gesture-handler";

import {uiStyles} from "../../Styles/UIStyles";
import {textStyles} from "../../Styles/TextStyles";
import {formStyles} from "../../Styles/FormStyles";
import {troveStyles} from "../../Styles/TroveStyles";

import {WebView} from 'react-native-webview';
import Icon from 'react-native-vector-icons/Ionicons';
import {AntDesign} from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker';
import image from "react-native-web/src/exports/Image";
import {Storage} from 'aws-amplify';
import {createTrove} from "../../RESTFunctions/TroveRESTFunctions";
import {Video} from "expo-av";


export default function CreateTroveScreen({navigation, user, dbUser, dataChanged, setDataChanged}) {

    const [troveTitle, setTroveTitle] = useState('')
    const [troveDescription, setTroveDescription] = useState('')
    const [image, setImage] = useState(null);
    const [video, setVideo] = useState(null)
    const [assetFile, setAssetFile] = useState(null)
    const [assetType, setAssetType] = useState('')
    const [imageUrls, setImageUrls] = useState([])
    const [publicationDate, setTrovePublicationDate] = useState('')
    const [troveIsActive, setTroveIsActive] = useState(false)
    const [troveReleaseDate, setTroveReleaseDate] = useState('');

    const [showPicker, setShowPicker] = useState(true);
    const [date, setDate] = useState(new Date());

    console.log('Create New Trove Screen: ', dbUser)

    const pickAndUpload = async () => {
        const result = await ImagePicker.launchImageLibraryAsync();
        if (!result.canceled) {
            const asset = result.assets[0];
            const response = await fetch(asset.uri);
            const blob = await response.blob();

            await Storage.put(`uploads/${Date.now()}_${asset.fileName || 'image.jpg'}`, blob, {
                contentType: 'mp4',
            });

            console.log('Upload successful');
        }
    };

    const pickImage = async () => {
        console.log('Image picker started')
        setAssetFile(null)
        setVideo(null)
        setImage(null)

        // Ask for permission
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permissionResult.granted) {
            alert('Permission to access camera roll is required!');
            return;
        }

        // Open image picker
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [9, 16],
            quality: 1,
            cropping: true, // enables cropping UI
            freeStyleCropEnabled: true, // optional: user can resize crop box
        });

        // if (!result.canceled) {
        //     setImage(result.assets[0].uri);
        //     console.log('Photo: ', image)
        // }

        const asset = result.assets[0];
        console.log('Asset is', asset)
        const assetUri = asset.uri

        if (asset.type === 'image') {
            console.log('You chose an image');
            setImage(assetUri)
            setAssetFile(assetUri)
            setAssetType('image/jpeg')
        } else if (asset.type === 'video') {
            console.log('You chose a video');
            setVideo(assetUri)
            console.log('Video is', assetUri)
            setAssetFile(assetUri)
            setAssetType('video/mp4')
        }
    };

    const uriToBlob = async (uri) => {
        const response = await fetch(uri);
        return await response.blob();
    };

    const addNewTrove = async () => {
        const newTrove = await createTrove(troveTitle, assetType, assetFile, troveDescription, dbUser)
        const newTroveResponse = await newTrove.json()
        console.log('Response from API: ', newTrove)
        if (newTrove.ok) {
            navigation.goBack(setDataChanged(true))
        }
        // console.log(newTroveResponse)

        // try {
        //     const blob = await uriToBlob(image);
        //     const key = `${dbUser.userId}/${Date.now()}`;
        //
        //     const response = await createTrove(troveTitle, troveDescription, dbUser.userId);
        //
        //     await Storage.put(key, blob, {
        //         contentType: 'image/jpeg',
        //     });
        //
        //     console.log('Upload successful');
        //
        //     console.log('Response, ', response);
        // } catch (error) {
        //     console.error('❌ Error uploading image:', error);
        // }
    }

    useEffect(() => {
        // fetchPhotos()
    })

    return (
        <SafeAreaView style={uiStyles.safeView}>
            {/*<View style={uiStyles.header}>*/}
            {/*    <Text style={textStyles.brand}>Create Trove</Text>*/}
            {/*    <View>*/}
            {/*        /!*<Pressable*!/*/}
            {/*        /!*    *!/*/}
            {/*        /!*>*!/*/}
            {/*        /!*    <Icon name="add-circle" size={25} color="#000"*!/*/}
            {/*        /!*    />*!/*/}
            {/*        /!*</Pressable>*!/*/}
            {/*    </View>*/}
            {/*</View>*/}
            <ScrollView style={uiStyles.scrollView}>

                {/*<View style={troveStyles.troveSectionHeader}>*/}
                {/*    <Text style={troveStyles.troveSectionHeaderText}>How should we present your trove?</Text>*/}
                {/*</View>*/}

                <View style={uiStyles.twoColumns}>

                    <View style={uiStyles.columnHalfLeft}>

                        {(image || video) ? (
                            <>
                                {image && (
                                    <Image source={{ uri: image }} style={uiStyles.troveCoverUpload} />
                                )}
                                {video && (
                                    <Video
                                        source={{ uri: video }}
                                        style={uiStyles.troveCoverUpload}
                                        shouldPlay
                                        isLooping
                                        resizeMode="cover"
                                        isMuted={false}
                                        rate={1.0}
                                        volume={1.0}
                                        useNativeControls
                                    />
                                )}
                                <View style={{ width: 120 }}>
                                    <Pressable style={uiStyles.button} onPress={pickImage}>
                                        <Text>Change</Text>
                                    </Pressable>
                                </View>
                            </>
                        ) : (
                            <Pressable style={uiStyles.troveCoverUpload} onPress={pickImage}>
                                <Text style={{ fontSize: 20, fontWeight: '700', color: '#8a8a8a', marginBottom: 10 }}>
                                    Trove Banner
                                </Text>
                                <Text style={{ fontSize: 15, fontWeight: '500', color: '#8a8a8a', marginBottom: 10 }}>
                                    Tap to upload
                                </Text>
                                <Text style={{ fontSize: 15, fontWeight: '500', color: '#bdbdbd' }}>
                                    Trove Banners are displayed in 9:16
                                </Text>
                            </Pressable>
                        )}


                    </View>

                    <View style={uiStyles.columnHalf}>
                        {/*Title*/}
                        {/*<Text style={formStyles.formLabel}>Trove Title</Text>*/}
                        <TextInput
                            style={formStyles.inputLarge}
                            placeholder='Title'
                            placeholderTextColor={'#373737'}
                            value={troveTitle}
                            onChangeText={setTroveTitle}
                        />

                        {/*Description*/}
                        {/*<Text style={formStyles.formLabel}>Trove Description</Text>*/}
                        <TextInput
                            style={uiStyles.troveDescriptionInput}
                            autoCorrect={true}
                            spellCheck={true}
                            autoCapitalize="sentences" // optional
                            placeholder='Description'
                            placeholderTextColor={'#373737'}
                            value={troveDescription}
                            onChangeText={setTroveDescription}
                            multiline={true}
                            numberOfLines={5}
                        />

                    </View>

                </View>



                {/*// Release Information*/}
                <View style={troveStyles.troveSectionHeader}>
                    <Text style={troveStyles.troveSectionHeaderText}>Release Information</Text>
                    <Text>Sepcify how you'd like this trove to be released</Text>

                </View>
                {/*<Pressable onPress={() => setShowPicker(true)}>*/}
                {/*    <TextInput*/}
                {/*        value={date.toLocaleString()} // or format with dayjs*/}
                {/*        editable={false} // prevents typing*/}
                {/*        pointerEvents="none"*/}
                {/*    />*/}
                {/*</Pressable>*/}

                <DateTimePicker
                    value={date}
                    mode="datetime"
                    display="default"
                    onChange={(event, selectedDate) => {
                        if (selectedDate) setDate(selectedDate);
                    }}
                />

                <Pressable
                    style={uiStyles.buttonAccent}
                    onPress={() => {
                        addNewTrove()

                    }}
                >
                    <Text style={uiStyles.buttonAccentText}>Create Trove</Text>
                </Pressable>

                {/*{imageUrls.map((url, index) => (*/}
                {/*    <Image*/}
                {/*        key={index}*/}
                {/*        source={{uri: url}}*/}
                {/*        style={{width: 200, height: 200, margin: 10}}*/}
                {/*    />*/}
                {/*))}*/}
            </ScrollView>
        </SafeAreaView>
    )
}