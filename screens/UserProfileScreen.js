import React, {useEffect, useState, useCallback} from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    SafeAreaView,
    Button,
    TextInput,
    ImageBackground,
    Alert
} from 'react-native';
import {createPost, getMyPosts} from '../index';
import {Pressable} from "react-native-gesture-handler";
import {uiStyles} from "../styles/UIStyles";
import {textStyles} from "../styles/TextStyles";
import {WebView} from 'react-native-webview';
import {Ionicons} from "@expo/vector-icons";
import Icon from 'react-native-vector-icons/Ionicons';
import {Auth} from "aws-amplify";


import {troveStyles} from "../styles/TroveStyles";
// import Spline from '@splinetool/react-spline';

export default function UserProfileScreen({route}) {

    const userUsername = route.params.username;
    console.log('looking at username:', userUsername)

    const [templates, setTemplates] = useState([]);
    const [inputText, setInputText] = useState('');
    const [post, setPost] = useState('')
    const [userPosts, setUserPosts] = useState([]);
    const [activeTab, setActiveTab] = useState('My Posts');

    const [userTroves, setUserTroves] = useState([])
    // const [dataChanged, setDataChanged] = useState(false)

    const fetchUser = async () => {
        console.log('fetchUser triggered')
        try {
            const user = await Auth.currentAuthenticatedUser();
            // console.log('Current user:', user);
        } catch (err) {
            console.log('No user signed in', err);
        }
    };
    fetchUser();

    const fetchUserTroves = async () => {
        const myTroves = await getUserTroves(usersUsername);
        // setMyTroves(myTroves)
    }

    const fetchUserPosts = async() => {
        console.log(`Fetching @${userUsername}'s posts...`)
        const retrievedPost = await getUserPosts(userUsername);
        // const response = await retrievedPost.json()
        console.log(`@${userUsername}'s Posts: `, retrievedPost)

        setUserPosts(retrievedPost)
        // console.log('Fetch posts complete: ', myPosts)
    }
    // fetchMyPosts()



    useEffect(() => {
        fetchUserPosts();
        // const interval = setInterval(fetchUserPosts, 10000);
        //
        // // Cleanup: Clear interval when component unmounts
        // return () => clearInterval(interval);
    }, []);



    return (
        <SafeAreaView style={uiStyles.safeView}>

            <View style={uiStyles.header}>
                <Text style={textStyles.brand}>{userUsername}</Text>
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
                            <Text>{userPosts.length}</Text>
                            <Text>Posts</Text>
                        </View>
                        <View style={uiStyles.profileStat}>
                            <Text></Text>
                            <Text>Followers</Text>
                        </View>
                        <View style={uiStyles.profileStat}>
                            {/*<Text>{myTroves.length}</Text>*/}
                            <Text>Troves</Text>

                        </View>


                    </View>
                </View>

                <View style={uiStyles.horizontalNavContainer}>
                    {['My Posts', 'My Troves'].map((label) => (
                        <Pressable style={[uiStyles.horizontalNavItem, activeTab === label && { backgroundColor: 'black'},]} key={label} onPress={() => {
                            setActiveTab(label);
                            // highlightTab(label)
                        }
                        }>
                            <Text style={[uiStyles.horizontalNavItemText, activeTab === label && { color: 'white'},]}>
                                {label}
                            </Text>
                        </Pressable>
                    ))}
                </View>

                <View>

                    {activeTab === 'My Posts' &&

                        <View style={uiStyles.profileFeed}>

                            {/*<Pressable style={{flexDirection: 'row', alignItems: 'center', paddingLeft: 20}} onPress={() => {*/}
                            {/*    console.log('Navigate to Create Post Screen')*/}
                            {/*    navigation.navigate('CreatePostScreen')*/}
                            {/*}}>*/}

                            {/*    <Icon style={{marginRight: 10}} name="add-circle" size={25} color="#000" />*/}
                            {/*    <Text style={{color: 'black', fontSize: 16, fontWeight: 700}}>Post</Text>*/}

                            {/*</Pressable>*/}

                            <View>
                                <View style={uiStyles.postFeed}>
                                    {userPosts.length === 0 ? (
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
                                        userPosts.map((post, index) => (

                                            <View
                                                key={index}
                                                style={uiStyles.postContainer}
                                            >
                                                <View style={uiStyles.smallProfilePicture}>

                                                </View>

                                                <View style={uiStyles.postBodyContainer}>
                                                    <View style={uiStyles.postHeaderBar}>
                                                        <Text style={textStyles.postUsername}>{userUsername}</Text>

                                                    </View>
                                                    <View style={uiStyles.postBody}>
                                                        <Pressable>
                                                            <Text style={textStyles.postMessage}>
                                                                {post.body.length <= 200 ? (
                                                                    <Text style={textStyles.postMessage}>{post.body}</Text>
                                                                ) : (
                                                                    <Text style={textStyles.postMessage}
                                                                          onPress={() => navigation.navigate('ViewPostScreen', { post })}>
                                                                        {post.body.slice(0, 200)}
                                                                        <Text
                                                                            style={{ color: '#006dff' }}

                                                                        >
                                                                            ...Read More
                                                                        </Text>
                                                                    </Text>
                                                                )}
                                                            </Text>
                                                        </Pressable>
                                                        <View style={uiStyles.postEngagementView}>
                                                            <Icon name="heart-outline" size={20} color="#f00"/>
                                                            <Text>{post.likes}</Text>
                                                        </View>
                                                        <Text style={textStyles.detail}>
                                                            {(() => {
                                                                const timestamp = post.timestamp;
                                                                const postDate = new Date(timestamp);

                                                                if (isNaN(postDate)) {
                                                                    console.error('Invalid Date:', timestamp);
                                                                    return 'Invalid date';
                                                                }

                                                                const now = new Date();
                                                                const isToday =
                                                                    postDate.getDate() === now.getDate() &&
                                                                    postDate.getMonth() === now.getMonth() &&
                                                                    postDate.getFullYear() === now.getFullYear();

                                                                return isToday
                                                                    ? postDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                                                                    : postDate.toLocaleDateString();
                                                            })()}
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

                        <View style={troveStyles.troveListingContainer}>
                            {myTroves ? (

                                myTroves.map((trove, index) => (
                                    <Pressable
                                        key={index}
                                        style={troveStyles.troveListing}
                                    >
                                        <View>
                                            <Text style={troveStyles.troveListingTitle}>{trove.troveTitle}</Text>
                                            <Text style={{marginBottom: 10}}>{trove.troveDescription}</Text>
                                            {/*<Text style={{fontSize: 10}}>*/}
                                            {/*    Date Added: {new Date(myTrove.timestamp).toLocaleDateString()}*/}
                                            {/*</Text>*/}
                                        </View>
                                    </Pressable>
                                ))

                            ) : (

                                <Text>No Troves Found</Text>

                            )}
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
