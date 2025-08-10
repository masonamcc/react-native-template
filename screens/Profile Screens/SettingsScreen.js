import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, StyleSheet, SafeAreaView, Button, TextInput, Switch} from 'react-native';
import {getAllTemplates} from '../../index';
import {Pressable} from "react-native-gesture-handler";
import {uiStyles} from "../../Styles/UIStyles";
import {Auth} from 'aws-amplify';
import {Video} from "expo-av";
import {updateUser} from "../../RESTFunctions/UserRESTFunctions";

export default function SettingsScreen({route, logout, user, profileBackgroundEnabled, setProfileBackgroundEnabled, dataChanged, setDataChanged, dbUser, profileBackgroundLink, setProfileBackgroundLink}) {
    // const [templates, setTemplates] = useState([]);

    // const [profileBackgroundLink, setProfileBackgroundLink] = useState('')
    const toggleProfileBackground = () => setProfileBackgroundEnabled((prev) => !prev)

    const signOut = async () => {
        try {
            await Auth.signOut();
            console.log('User signed out');
            // Optionally navigate to login screen or reset user state
        } catch (error) {
            console.error('Error signing out: ', error);
        }
    };

    const handleGoogleDriveLink = (input) => {
        const linkArray = input.split("/");
        console.log('Link Array: ', linkArray)
        const fileId = linkArray[5];
        console.log('FileId: ', fileId)
        const fixedUri = `https://drive.google.com/uc?export=download&id=${fileId}`
        return fixedUri;
    }

    return (
        <SafeAreaView style={styles.safeView}>
            {/*<Text style={styles.title}>TROVE</Text>*/}
            <ScrollView style={{width: '100%'}}>

                <View style={uiStyles.menuItemContainerInput}>
                    <Text style={uiStyles.menuItemTitle}>Set Profile Background</Text>
                    <Text style={uiStyles.menuItemTitle}>Google Drive Link</Text>
                    <Text style={uiStyles.menuItemDescription}>Ensure that the Google Drive file you'd like to save as your background has General Access set to "Anyone with the link"</Text>
                    <TextInput style={uiStyles.genericInput}
                               placeholder={'Google Drive Link'}
                               placeholderTextColor={'#9a9a9a'}
                               value={profileBackgroundLink}
                               onChangeText={(input) => {
                                   setProfileBackgroundLink(handleGoogleDriveLink(input))

                               }}
                    />

                    {profileBackgroundLink && (
                        <Video
                            source={{uri: profileBackgroundLink}}
                            style={uiStyles.profileBackgroundVideoPreview}
                            resizeMode="fit"
                            shouldPlay={true}
                            isLooping={true}
                        />
                    )}
                </View>

                {/*<Pressable*/}
                {/*    style={uiStyles.button}*/}
                {/*    onPress={() => {*/}
                {/*        setProfileBackgroundEnabled(!profileBackgroundEnabled);*/}
                {/*    }}*/}
                {/*>*/}
                {/*    <Text>Toggle Profile Background</Text>*/}
                {/*</Pressable>*/}

                {/*Toggle Profile Background*/}
                <View style={uiStyles.menuItemContainer}>
                    <View style={uiStyles.menuItemText}>
                        <Text style={uiStyles.menuItemTitle}>
                            Toggle Profile Background
                        </Text>
                        <Text style={uiStyles.menuItemDescription}>
                            Enable or disable backgrounds on your profile
                        </Text>
                    </View>
                    <View style={uiStyles.toggleContainer}>
                        <Switch
                            trackColor={{false: '#767577', true: '#efefef'}}
                            thumbColor={profileBackgroundEnabled ? '#00d829' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleProfileBackground}
                            value={profileBackgroundEnabled}
                        />
                    </View>
                </View>

                {/*Upload Profile Background*/}
                <View style={uiStyles.menuItemContainer}>
                    <View style={uiStyles.menuItemText}>
                        <Text style={uiStyles.menuItemTitle}>
                            Change Profile Background
                        </Text>
                        <Text style={uiStyles.menuItemDescription}>
                            Enable or disable backgrounds on your profile
                        </Text>
                    </View>
                    <View style={uiStyles.toggleContainer}>
                        {/*<Switch*/}
                        {/*    trackColor={{false: '#767577', true: '#efefef'}}*/}
                        {/*    thumbColor={profileBackgroundEnabled ? '#00d829' : '#f4f3f4'}*/}
                        {/*    ios_backgroundColor="#3e3e3e"*/}
                        {/*    onValueChange={toggleProfileBackground}*/}
                        {/*    value={profileBackgroundEnabled}*/}
                        {/*/>*/}
                    </View>
                </View>

                {/*Log Out*/}
                <View style={uiStyles.menuItemContainer}>
                    <Pressable style={uiStyles.menuItem} onPress={() => {
                        logout()
                        signOut
                    }}>
                        <Text style={{color: 'red', fontWeight: 500}}>Log Out</Text>
                    </Pressable>
                </View>


                {/*<Pressable style={uiStyles.menuItem} onPress={() => {*/}
                {/*                logout()*/}
                {/*                signOut*/}
                {/*    }}>*/}
                {/*    <Text>Log Out</Text>*/}
                {/*</Pressable>*/}


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
        backgroundColor: 'white'
    }
});
