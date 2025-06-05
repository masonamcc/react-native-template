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
    Animated
} from 'react-native';
import {createPost, getMyPosts} from "../../index";
import {Pressable} from "react-native-gesture-handler";
import {uiStyles} from "../../Styles/UIStyles";
import {textStyles} from "../../Styles/TextStyles";
import {formStyles} from "../../Styles/FormStyles";
import {WebView} from 'react-native-webview';
import Icon from 'react-native-vector-icons/Ionicons';
import { AntDesign } from '@expo/vector-icons'
// import { Storage } from 'aws-amplify';
import * as ImagePicker from 'expo-image-picker';

export default function CreateTroveScreen({navigation, user}) {

    const [troveTitle, setTroveTitle] = useState('')
    const [troveDescription, setTroveDescription] = useState('')

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
                <Pressable
                onPress={pickAndUpload}>
                    <Text>Upload</Text>
                </Pressable>
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
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}