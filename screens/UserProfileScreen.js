import React, {useEffect, useState, useCallback} from 'react';
import {View, Text, ScrollView, StyleSheet, SafeAreaView, Button, TextInput, ImageBackground} from 'react-native';
import {createPost, getMyPosts} from '../index';
import {Pressable} from "react-native-gesture-handler";
import {uiStyles} from "../Styles/UIStyles";
import {textStyles} from "../Styles/TextStyles";
import {WebView} from 'react-native-webview';
import {Ionicons} from "@expo/vector-icons";
import Icon from 'react-native-vector-icons/Ionicons';
// import Spline from '@splinetool/react-spline';

export default function UserProfileScreen({route}) {

    console.log(`Loading User's Profile`)
    const [userPost, setUserPost] = useState([]);
    const [activeTab, setActiveTab] = useState('')
    // const [posts, setPosts] = useState('')

    const userProfile = route.params.searchQueryResult;
    console.log(userProfile.username);

    const fetchMyPosts = async () => {
        console.log('userProfile: ', userProfile)
        const posts = await getMyPosts(userProfile);
        console.log(`${userProfile.username}'s posts`, posts);
        setUserPost(posts);
    };

    // const likePost = async () => {
    //     const
    // }

    useEffect(() => {

        fetchMyPosts(); // initial fetch

        const interval = setInterval(fetchMyPosts, 10000);

        return () => clearInterval(interval); // clean up on unmount
    }, []);


    return (
        <SafeAreaView style={styles.safeView}>

            <View style={uiStyles.header}>
                <Text style={textStyles.brand}>{userProfile.username}</Text>

            </View>

            <ScrollView style={{width: '100%', height: '100%'}}>

                <View style={uiStyles.profileHeader}>

                    <View style={{width: 'auto'}}>
                        <View style={{
                            width: 100,
                            height: 100,
                            borderRadius: 50,
                            backgroundColor: 'blue'
                        }}/>

                    </View>

                    <View style={uiStyles.profileStatsContainer}>

                        <View style={uiStyles.profileStat}>
                            <Text>{userPost.length}</Text>
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

                <View style={{height: 100, width: '100%', backgroundColor: 'red'}}>
                    {['Feed', 'Troves'].map((label) => (
                        <Pressable key={label} onPress={() => setActiveTab(label)}>
                            <Text style={activeTab === label && styles.activeTab}>
                                {label}
                            </Text>
                        </Pressable>
                    ))}
                </View>

                <View style={uiStyles.profileFeed}>
                    {activeTab === 'Feed' &&
                        <View style={uiStyles.postFeed}>
                            {userPost.length === 0 ? (
                                <View style={{
                                    width: '100%',
                                    height: 150,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    padding: 20,
                                    display: 'flex'
                                }}>
                                    <Text style={{fontWeight: 700, fontSize: 30, color: 'rgba(0,0,0,.2)'}}>No posts to
                                        show</Text>
                                </View>
                            ) : (
                                userPost.map((post, index) => (
                                    <View
                                        key={index}
                                        style={uiStyles.postContainer}
                                    >
                                        <View style={uiStyles.smallProfilePicture}>

                                        </View>
                                        <View style={uiStyles.postBodyContainer}>
                                            <View style={uiStyles.postHeaderBar}>
                                                <Text style={textStyles.postUsername}>{userProfile.username}</Text>

                                            </View>
                                            <Pressable>
                                                <Text style={textStyles.postMessage}>{post.body}</Text>
                                            </Pressable>
                                            <View style={uiStyles.postEngagementView}>
                                                <Icon name="heart-outline" size={20} color="#f00"

                                                />
                                                <Text>{post.likes}</Text>
                                            </View>
                                            <Text
                                                style={textStyles.detail}>{new Date(post.timestamp).toLocaleDateString()}
                                            </Text>
                                        </View>
                                    </View>
                                ))
                            )}
                        </View>}
                    {activeTab === 'Troves' && <Text>Troves</Text>}

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
