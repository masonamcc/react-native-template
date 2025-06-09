import React, {useEffect, useState, useCallback, useRef, useColorScheme} from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    SafeAreaView,
    Button,
    TextInput,
    ImageBackground,
    Animated,
    Alert, Dimensions
} from 'react-native';
import {createPost, getMyPosts} from '../../index';
import {Pressable, TouchableOpacity} from "react-native-gesture-handler";
import {uiStyles} from "../../Styles/UIStyles";
import {textStyles} from "../../Styles/TextStyles";
import {WebView} from 'react-native-webview';
import Icon from 'react-native-vector-icons/Ionicons';
import {Auth} from "aws-amplify";
import {deleteMyTrove, getMyTroves} from "../../RESTFunctions/TroveRESTFunctions";
import {troveStyles} from "../../Styles/TroveStyles";
import {Video} from 'expo-av';
import {useIsFocused} from '@react-navigation/native';
import StingerTransition from "../../Stingers/Stinger_Flame";
import HomeScreen from "../HomeScreen";
import {useFocusEffect} from "expo-router";
import {deleteMyPost} from "../../RESTFunctions/PostRESTFunctions";
import {BlurView} from "expo-blur";
import {LinearGradient} from "expo-linear-gradient";
import {fetchPexelsSearch} from "../../RESTFunctions/PexelsRESTFunctions";
// import {useFocusEffect} from "expo-router";

export default function MyProfileScreen({
                                            navigation,
                                            route,
                                            onLogout,
                                            dbUser,
                                            profileBackgroundEnabled,
                                            setProfileBackgroundEnabled
                                        }) {

    const {dataChanged} = route.params || {};
    const [templates, setTemplates] = useState([]);
    const [inputText, setInputText] = useState('');
    const [post, setPost] = useState('')
    const [myPosts, setMyPosts] = useState([]);
    const [activeTab, setActiveTab] = useState('My Posts');
    const {deviceHeight} = Dimensions.get('window');
    const [pinnedPost, setPinnedPost] = useState('')
    // const [profileBackgroundEnabled, setProfileBackgroundEnabled] = useState(false)

    const [myTroves, setMyTroves] = useState([])
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

    const fetchMyTroves = async () => {
        const myTroves = await getMyTroves(dbUser);
        console.log('Troves: ', myTroves)
        setMyTroves(myTroves)
    }

    const fetchMyPosts = async () => {
        // console.log('Profile Screen is fetching posts')
        const retrievedPost = await getMyPosts(dbUser);

        setMyPosts(retrievedPost)
        // console.log('Fetch posts complete: ', myPosts)
    }
    // fetchMyPosts()

    const removeMyPost = async (postId) => {
        console.log('Removing post triggered')
        await deleteMyPost(postId);
        await fetchMyPosts()
        dataChanged(false)
    }

    const removeMyTrove = async (troveId) => {
        console.log('Removing post triggered')
        await deleteMyTrove(troveId);
        await fetchMyTroves()
        dataChanged(false)
    }

    useEffect(() => {
        fetchMyPosts();
        fetchMyTroves();
    }, [dataChanged]);

    const confirmRemovePost = (postId) => {
        Alert.alert(
            "Delete Post",
            "Are you sure you want to delete this post?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => removeMyPost(postId)  // only delete if confirmed
                }
            ]
        );
    };

    return (

        <SafeAreaView style={uiStyles.safeView}>

            {profileBackgroundEnabled && (
                <><View style={uiStyles.backgroundVideoContainer}>
                    <Video
                        source={{uri: 'https://videos.pexels.com/video-files/10994871/10994871-hd_1080_1920_25fps.mp4'}}
                        style={[uiStyles.backgroundVideo]}
                        resizeMode="cover"
                        shouldPlay={true}
                        isLooping={true}
                    />
                </View>
                    <BlurView intensity={20} tint="dark" style={StyleSheet.absoluteFill}/></>
            )}

            <View style={uiStyles.header}>

                <View></View>

                <View>
                    <Pressable
                        onPress={() => {
                            navigation.navigate('Settings', {onLogout})
                        }}
                        hitSlop={{top: 50, bottom: 50, left: 50, right: 50}}

                    >
                        <Icon name="settings-outline" size={25} color="#fff"/>
                    </Pressable>
                </View>

            </View>


            <ScrollView style={{width: '100%', height: '100%'}}>

                <View style={uiStyles.profileHeaderContainer}>
                    <View style={uiStyles.profileHeader}>

                        {/*Profile Picture*/}
                        <View style={uiStyles.profileIdentityContainer}>
                            <View style={uiStyles.profilePicture}/>
                            <View style={{flexDirection: 'column'}}>
                                <Text style={uiStyles.profileUsername}>@{dbUser.username}</Text>
                                <Text style={uiStyles.profileMyName}>{dbUser.firstName} {dbUser.lastName}</Text>
                                <Text style={uiStyles.profileBio}>{dbUser.bio}</Text>
                            </View>
                        </View>

                        {/*Profile Stats*/}
                        <View style={uiStyles.profileStatsContainer}>

                            <View style={uiStyles.profileStat}>
                                <Text>{myPosts.length}</Text>
                                <Text>Posts</Text>
                            </View>
                            <View style={uiStyles.profileStat}>
                                <Text></Text>
                                <Text>Followers</Text>
                            </View>
                            <View style={uiStyles.profileStat}>
                                <Text>{myTroves.length}</Text>
                                <Text>Troves</Text>

                            </View>


                        </View>
                    </View>
                </View>

                <View style={uiStyles.horizontalNavContainer}>
                    {['My Posts', 'My Troves'].map((label) => (
                        <Pressable
                            style={[uiStyles.horizontalNavItem, activeTab === label && {backgroundColor: 'white'},]}
                            key={label} onPress={() => {
                            setActiveTab(label);
                            // highlightTab(label)
                        }
                        }>
                            <Text
                                style={[uiStyles.horizontalNavItemText, activeTab === label && {color: 'black'},]}>
                                {label}
                            </Text>
                        </Pressable>
                    ))}
                </View>

                <View>

                    {activeTab === 'My Posts' &&

                        <View style={uiStyles.activeTabContentContainer}>

                            <View style={uiStyles.activeTabContentHeader}>
                                <Pressable style={uiStyles.activeTabContentHeaderItem}
                                           onPress={() => {
                                               console.log('Navigate to Create Post Screen')
                                               navigation.navigate('CreatePostScreen')
                                           }}>


                                    <Text style={uiStyles.activeTabContentHeaderItemText}>Feed</Text>

                                </Pressable>
                                <Pressable style={uiStyles.activeTabContentHeaderItem}

                                           onPress={() => {
                                               console.log('Navigate to Create Post Screen')
                                               navigation.navigate('CreatePostScreen')
                                           }}>

                                    <Icon style={{marginRight: 10}} name="add-circle" size={25} color="#000"/>
                                    <Text style={uiStyles.activeTabContentHeaderItemText}>New Post</Text>

                                </Pressable>
                            </View>

                            <View style={uiStyles.masterPostContainer}>
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
                                                {/*<View style={uiStyles.smallProfilePicture}>*/}

                                                {/*</View>*/}

                                                <View style={uiStyles.postBodyContainer}>
                                                    <View style={uiStyles.postHeaderBar}>
                                                        <Text
                                                            style={textStyles.postUsername}>@{dbUser.username}</Text>
                                                        <Pressable
                                                            onPress={() => {
                                                                confirmRemovePost(post.id)
                                                            }}
                                                        >
                                                            <Icon name='trash-outline' size={20} color='#ccc'/>
                                                        </Pressable>
                                                    </View>
                                                    <View style={uiStyles.postBody}>
                                                        <Pressable style={{marginBottom: 10}}>
                                                            <Text style={textStyles.postMessage}>
                                                                {post.body.length <= 200 ? (
                                                                    <Text
                                                                        style={uiStyles.postMessage}>{post.body}</Text>
                                                                ) : (
                                                                    <Text style={uiStyles.postMessage}
                                                                          onPress={() => navigation.navigate('ViewPostScreen', {post})}>
                                                                        {post.body.slice(0, 200)}
                                                                        <Text
                                                                            style={{color: '#006dff'}}

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
                                                                    ? postDate.toLocaleTimeString([], {
                                                                        hour: '2-digit',
                                                                        minute: '2-digit'
                                                                    })
                                                                    : postDate.toLocaleDateString();
                                                            })()}
                                                        </Text>
                                                    </View>
                                                </View>
                                            </View>
                                        ))
                                    )}
                                </View>
                                {/*<View style={uiStyles.spotlightContainer}>*/}
                                {/*    <View style={uiStyles.spotlight}>*/}

                                {/*    </View>*/}
                                {/*    <View style={uiStyles.spotlight}>*/}

                                {/*    </View>*/}
                                {/*</View>*/}
                            </View>


                        </View>}

                    {activeTab === 'My Troves' &&

                        <View style={troveStyles.troveListingContainer}>
                            {myTroves ? (

                                myTroves.map((trove, index) => (
                                    <Pressable
                                        key={index}
                                        style={troveStyles.troveListing}
                                        onPress={() => {
                                            navigation.navigate('TroveDetailsScreen', {trove})
                                        }}
                                    >
                                        <View>
                                            <Text style={troveStyles.troveListingTitle}>{trove.troveTitle}</Text>
                                            <Text style={{marginBottom: 10}}>{trove.troveDescription}</Text>
                                            {/*<Text style={{fontSize: 10}}>*/}
                                            {/*    Date Added: {new Date(myTrove.timestamp).toLocaleDateString()}*/}
                                            {/*</Text>*/}
                                            <Pressable
                                                onPress={() => {
                                                    console.log('Pressed Delete Trove')
                                                    removeMyTrove(trove.id)
                                                }}
                                                hitSlop={{top: 50, bottom: 50, left: 50, right: 50}}
                                            >
                                                <Icon name='trash-outline' size={20} color='#ccc'/>
                                            </Pressable>
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
