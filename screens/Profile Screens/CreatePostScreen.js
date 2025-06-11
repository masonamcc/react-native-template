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
import {createPost, getMyPosts} from '../../index';
import {Pressable, TouchableOpacity} from "react-native-gesture-handler";
import {uiStyles} from "../../Styles/UIStyles";
import {textStyles} from "../../Styles/TextStyles";
import {WebView} from 'react-native-webview';
import Icon from 'react-native-vector-icons/Ionicons';
import {Auth} from "aws-amplify";
import {createPostStyles} from "../../Styles/CreatePostStyles";

export default function CreatePostScreen({navigation, route, onLogout, dbUser}) {
    const [inputText, setInputText] = useState('');
    const [post, setPost] = useState('')
    const [myPosts, setMyPosts] = useState([]);
    const [activeTab, setActiveTab] = useState('My Posts');
    const fadeAnim = useRef(new Animated.Value(1)).current; // starts fully visible
    const [dataChanged, setDataChanged] = useState(false);


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await Auth.currentAuthenticatedUser();
                console.log('Current user:', user.attributes.email);
            } catch (err) {
                console.log('No user signed in', err);
            }
        };

        fetchUser();

    }, []);

    const handlePost = async () => {
        console.log('Saving post: ', inputText);

        try {
            const response = await createPost(dbUser, inputText);

            setInputText('');
            setPost('');

            if (response) {
                navigation.navigate('MyProfileScreen', { dataChanged: true });
            }

            // 🔁 Trigger re-fetch through useEffect
            // setDataChanged(prev => !prev);

        } catch (error) {
            console.error('Error creating post:', error);
        }
    };


    // const fetchMyPosts = async() => {
    //     const myPosts = await getMyPosts(dbUser);
    //     setMyPosts(myPosts)
    // }

    // useEffect(() => {
    //     fetchMyPosts()
    //     // const interval = setInterval(fetchMyPosts, 5000);
    //     // return () => clearInterval(interval); // clean up on unmount
    // }, []);

    return (
        <SafeAreaView style={uiStyles.safeView}>

            <ScrollView style={{width: '100%', height: '100%'}}>

                <View style={uiStyles.createPostContainer}>

                    <View style={uiStyles.createPostHeader}>
                        <Pressable
                            onPress={() => {
                                navigation.goBack()
                            }}
                        >
                            <Text style={textStyles.header6}>Cancel</Text>
                        </Pressable>

                        <Pressable
                            style={uiStyles.buttonAccent}
                            onPress={() => {
                                handlePost()

                            }}
                        >
                            <Text style={uiStyles.buttonAccentText}>Post</Text>
                        </Pressable>
                    </View>

                    <View style={uiStyles.createPostBody}>
                        <View style={[uiStyles.smallProfilePicture]}/>

                        <TextInput style={createPostStyles.textarea}
                               multiline={true}
                               numberOfLines={20}
                               placeholder={"Speak up!"}
                               placeholderTextColor={'#c8c8c8'}
                               value={inputText}
                               onChangeText={setInputText}
                               autoCorrect={true}
                               spellCheck={true}
                               autoCapitalize="sentences" // optional
                        />

                        {/*</TextInput>*/}
                    </View>

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
        backgroundColor: 'white'
    },
});
