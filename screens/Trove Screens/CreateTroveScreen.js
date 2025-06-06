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
import {createPost, getMyPosts} from "../../index";
import {Pressable} from "react-native-gesture-handler";
import {uiStyles} from "../../Styles/UIStyles";
import {textStyles} from "../../Styles/TextStyles";
import {formStyles} from "../../Styles/FormStyles";
import {WebView} from 'react-native-webview';
import Icon from 'react-native-vector-icons/Ionicons';
import {AntDesign} from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker';
import image from "react-native-web/src/exports/Image";
import { Storage } from 'aws-amplify';

export default function CreateTroveScreen({navigation, user}) {

    const [troveTitle, setTroveTitle] = useState('')
    const [troveDescription, setTroveDescription] = useState('')
    const [image, setImage] = useState(null);
    const [imageUrls, setImageUrls] = useState([])

    const pickAndUpload = async () => {
        const result = await ImagePicker.launchImageLibraryAsync();
        if (!result.canceled) {
            const asset = result.assets[0];
            const response = await fetch(asset.uri);
            const blob = await response.blob();

            await Storage.put(`uploads/${Date.now()}_${asset.fileName || 'image.jpg'}`, blob, {
                contentType: 'image/jpeg',
            });

            console.log('Upload successful');
        }
    };

    const pickImage = async () => {
        console.log('Image picker started')

        // Ask for permission
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permissionResult.granted) {
            alert('Permission to access camera roll is required!');
            return;
        }

        // Open image picker
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [16, 9],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            console.log('Photo: ', image)
        }
    };

    const createTrove = async () => {

        try {
            console.log('Saving Trove')

            const response = await fetch(image);
            console.log('Response, ', response);

            const blob = await response.blob()
            console.log('Blob, ', blob);

            const key = `uploads/${Date.now()}_image.jpg`;

            const result = Storage.put(key, blob, {
                contentType: 'image/jpeg',
            });

            console.log('Image saved, ', result.key)
        } catch (error) {
            console.error('❌ Error uploading image:', error);
        }

    }

    const fetchPhotos = async () => {
        console.log('fetching photos')
        try {
            const files = await Storage.list('uploads/'); // Get file metadata

            const signedUrls = await Promise.all(
                files.map(async (file) => {
                    const url = await Storage.get(file.key); // Get a signed URL
                    return url;
                })
            );

            console.log('Image URLs:', signedUrls);

            // Optionally set to state to show in UI
            setImageUrls(signedUrls);

        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

    useEffect(() => {
        fetchPhotos()
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
                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                    <Pressable
                        onPress={pickImage
                        }>
                        <Text>Upload</Text>
                    </Pressable>
                    {image && <Image source={{uri: image}} style={{width: 320, height: 180, marginTop: 20}}/>}
                </View>
                <View style={formStyles.formContainer}>
                    <Text style={formStyles.formLabel}>Trove Title</Text>
                    <TextInput
                        style={formStyles.inputLarge}
                        placeholder='Title'
                        placeholderTextColor={'#373737'}
                        value={troveTitle}
                        onChangeText={setTroveTitle}
                    />
                    <Text style={formStyles.formLabel}>Trove Description</Text>
                    <TextInput
                        style={formStyles.inputMedium}
                        placeholder='Description'
                        placeholderTextColor={'#373737'}
                        value={troveDescription}
                        onChangeText={setTroveDescription}
                        multiline={true}
                        numberOfLines={5}
                    />
                    <Pressable
                        onPress={createTrove}
                    >
                        <Text>Create</Text>
                    </Pressable>
                </View>
                {imageUrls.map((url, index) => (
                    <Image
                        key={index}
                        source={{ uri: url }}
                        style={{ width: 200, height: 200, margin: 10 }}
                    />
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}