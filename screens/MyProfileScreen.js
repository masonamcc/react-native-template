import React, {useEffect, useState, useCallback, useRef} from 'react';
import {View, Text, ScrollView, StyleSheet, SafeAreaView, Button, TextInput, ImageBackground, Animated} from 'react-native';
import {createPost, getMyPosts} from '../index';
import {Pressable} from "react-native-gesture-handler";
import {uiStyles} from "../Styles/UIStyles";
import {textStyles} from "../Styles/TextStyles";
import {WebView} from 'react-native-webview';
import Icon from 'react-native-vector-icons/Ionicons';


export default function MyProfileScreen({navigation, route, onLogout, user}) {
    const [templates, setTemplates] = useState([]);
    const [inputText, setInputText] = useState('');
    const [post, setPost] = useState('')
    const [myPosts, setMyPosts] = useState([]);
    const [activeTab, setActiveTab] = useState('Feed');
    const fadeAnim = useRef(new Animated.Value(1)).current; // starts fully visible

    const fetchMyPosts = useCallback(async () => {
        if (!user) return;
        const posts = await getMyPosts(user);
        // console.log('My Posts: ', posts);
        setMyPosts(posts);
    }, [post]);

    useEffect(() => {
        fetchMyPosts(); // initial fetch

        const interval = setInterval(() => {
            fetchMyPosts(); // refetch every 10s
        }, 10000);

        return () => clearInterval(interval); // clean up on unmount
    }, [fetchMyPosts]);

    const SplineView = () => {

        // <script type="module" src="https://unpkg.com/@splinetool/viewer@1.9.99/build/spline-viewer.js"></script>
        // <spline-viewer url="https://prod.spline.design/5ipCRg8IIDUhAhTz/scene.splinecode"></spline-viewer>

        console.log('Loading spline')

    };

    // console.log('Profile found User: ', user)

    const handlePost = async () => {
        setPost(inputText);           // optional, if you're storing the post
        await createPost(user, inputText);  // this is what matters
        setInputText('')
        setPost('');
        const updatedPosts = await getMyPosts(user); // fetch latest posts
        setMyPosts(updatedPosts);
    }


    return (
        <SafeAreaView style={uiStyles.safeView}>

            <View style={uiStyles.header}>
                <Text style={textStyles.brand}>{user.username}</Text>
                <View>
                    <Pressable
                        onPress={() => {
                            navigation.navigate('Settings', {onLogout})
                        }}
                    >
                        <Icon name="settings-outline" size={25} color="#000"/>
                    </Pressable>
                </View>
            </View>

            <ScrollView style={{width: '100%', height: '100%'}}>

                <View style={uiStyles.profileHeader}>

                    <View style={{width: 'auto'}}>
                        <View style={uiStyles.profilePicture}/>

                    </View>

                    <View style={uiStyles.profileStatsContainer}>

                        <View style={uiStyles.profileStat}>
                            <Text>{myPosts.length}</Text>
                            <Text>Posts</Text>
                        </View>
                        <View style={uiStyles.profileStat}>
                            <Text>10</Text>
                            <Text>Followers</Text>
                        </View>
                        <View style={uiStyles.profileStat}>
                            <Text>10</Text>
                            <Text>Troves</Text>
                        </View>
                    </View>
                </View>

                <View style={uiStyles.horizontalNavContainer}>
                    {['My Posts', 'My Troves'].map((label) => (
                        <Pressable style={uiStyles.horizontalNavItem} key={label} onPress={() => {
                            setActiveTab(label);
                            // highlightTab(label)
                        }
                        }>
                            <Text style={uiStyles.horizontalNavItemText}>
                                {label}
                            </Text>
                        </Pressable>
                    ))}
                </View>

                <View>

                    {activeTab === 'My Posts' &&

                        <View style={uiStyles.profileFeed}>

                            <View style={uiStyles.postEl}>

                                <TextInput
                                    style={uiStyles.postInput}
                                    placeholder="Something to Share?"
                                    value={inputText}
                                    onChangeText={setInputText}
                                    multiline={true}
                                    numberOfLines={3}
                                />

                                <Pressable
                                    style={uiStyles.postButton}
                                    onPress={() => {
                                        handlePost()
                                        setInputText('')
                                    }}
                                >
                                    <Text style={{color: 'white'}}>Post</Text>
                                </Pressable>

                            </View>

                            <View>
                                <View style={uiStyles.postFeed}>
                                    {myPosts.length === 0 ? (
                                        <View style={{
                                            width: '100%',
                                            height: 150,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            padding: 20,
                                            display: 'flex'
                                        }}>
                                            <Text style={{fontWeight: 700, fontSize: 30, color: 'rgba(0,0,0,.2)'}}>No
                                                posts to
                                                show</Text>
                                        </View>
                                    ) : (
                                        myPosts.map((post, index) => (
                                            <View
                                                key={index}
                                                style={uiStyles.postContainer}
                                            >
                                                <View style={uiStyles.smallProfilePicture}>

                                                </View>

                                                <View style={uiStyles.postBodyContainer}>
                                                    <View style={uiStyles.postHeaderBar}>
                                                        <Text style={textStyles.postUsername}>{user.username}</Text>
                                                        <Icon name='trash-outline' size={20} color='#ccc'/>
                                                    </View>
                                                    <View style={uiStyles.postBody}>
                                                        <Pressable>
                                                            <Text style={textStyles.postMessage}>{post.body}</Text>
                                                        </Pressable>
                                                        <View style={uiStyles.postEngagementView}>
                                                            <Icon name="heart-outline" size={20} color="#f00"/>
                                                            <Text>{post.likes}</Text>
                                                        </View>
                                                        <Text
                                                            style={textStyles.detail}>{new Date(post.timestamp).toLocaleDateString()}
                                                        </Text>
                                                    </View>
                                                </View>
                                            </View>
                                        ))
                                    )}
                                </View>
                            </View>


                        </View>}

                    {activeTab === 'My Troves' &&
                        <View>
                            <Text>Troves</Text>
                        </View>
                    }
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
