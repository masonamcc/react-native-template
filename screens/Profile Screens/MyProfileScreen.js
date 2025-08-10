import React, {useEffect, useState, useCallback, useRef, useColorScheme} from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    SafeAreaView,
    FlatList,
    Image,
    Modal,
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
import {Auth, Storage} from "aws-amplify";
import {troveStyles} from "../../Styles/TroveStyles";
import {Video} from 'expo-av';
import {useIsFocused} from '@react-navigation/native';

import HomeScreen from "../HomeScreen";
import {useFocusEffect} from "expo-router";

import {BlurView} from "expo-blur";
import {LinearGradient} from "expo-linear-gradient";


import { MenuProvider, Menu, MenuTrigger, MenuOptions, MenuOption } from 'react-native-popup-menu';

export default function MyProfileScreen({
    navigation,
    route,
    onLogout,
    dbUser,
    profileBackgroundEnabled,
    setProfileBackgroundEnabled,
    profileBackgroundLink,
    setProfileBackgroundLink,
    dataChanged,
    setDataChanged
}) {



    // console.log('ProfileBackgroundLink: ', profileBackgroundLink)
    // const {dataChanged} = route.params || {};
    const [templates, setTemplates] = useState([]);
    const [inputText, setInputText] = useState('');
    const [post, setPost] = useState('')
    const [myPosts, setMyPosts] = useState([]);
    const [activeTab, setActiveTab] = useState('My Posts');
    const {deviceHeight} = Dimensions.get('window');
    const [pinnedPost, setPinnedPost] = useState('')
    const [troveEditMenuVisible, setTroveEditMenuVisible] = useState(false);

    const [troveCoverFiles, setTroveCoverFiles] = useState({});

    // profileBackgroundEnabled

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
        dataChanged(false)
    }

    const fetchMyPosts = async () => {
        // console.log('Profile Screen is fetching posts')
        const retrievedPost = await getMyPosts(dbUser);
        // console.log("My Posts: ", retrievedPost)
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

    useEffect(() => {
        const fetchAllTroveFiles = async () => {
            try {
                const result = await Storage.list(`${dbUser.userId}/`, { level: 'public' });
                const trovePhotoKeyArray = result.results;
                console.log('TrovePhotoKeyArray: ', trovePhotoKeyArray)

                const coverFileMap = {};

                console.log('My Troves: ', myTroves)

                for (const trove of myTroves || []) {
                    const match = trovePhotoKeyArray.find(file => file.key === trove.troveCoverFileUrl); // Assumes `trove.coverFileKey` exists
                    if (match) {
                        console.log('Match: ', match)
                        const signedUrl = await Storage.get(match.key, { level: 'public' });
                        coverFileMap[trove.id] = signedUrl;
                        console.log('Cover File Map: ', coverFileMap)
                        setTroveCoverFiles(coverFileMap);
                        console.log('Trove Cover Files: ', troveCoverFiles)
                    } else {
                        console.log('No matches')
                    }
                }

            } catch (error) {
                console.error('Error fetching trove cover files:', error);
            }
        };

        if (myTroves && dbUser) {
            fetchAllTroveFiles();
        }
    }, [myTroves, dbUser, dataChanged]);

    return (

        <SafeAreaView style={uiStyles.safeView}>


            <ScrollView style={{width: '100%', height: '100%'}}>

                <View>

                    {profileBackgroundEnabled && (
                        <>
                            <View style={uiStyles.backgroundVideoContainer}>
                                <Video
                                    source={{ uri: '' }}
                                    style={[uiStyles.backgroundVideo]}
                                    resizeMode="cover"
                                    shouldPlay={true}
                                    isLooping={true}
                                    isMuted={true}
                                />
                            </View>
                            <BlurView intensity={0} tint="dark" style={StyleSheet.absoluteFill} />
                        </>
                    )}
                    <View style={uiStyles.header}>

                        <View><Text style={uiStyles.profileUsername}>@{dbUser?.username}</Text></View>

                        <View>

                            <Pressable
                                onPress={() => {
                                    navigation.navigate('Settings', {onLogout})
                                }}
                                hitSlop={{top: 50, bottom: 50, left: 50, right: 50}}

                            >
                                <Icon name="settings-outline" size={25} color="#000"/>
                            </Pressable>
                        </View>

                    </View>

                    <View style={uiStyles.profileHeaderContainer}>
                        <View style={uiStyles.profileHeader}>

                            {/*Profile Picture*/}
                            <View style={uiStyles.profileIdentityContainer}>
                                <View style={uiStyles.profilePicture}/>
                                <View style={{flexDirection: 'column'}}>

                                    <Text style={uiStyles.profileMyName}>{dbUser?.firstName} {dbUser?.lastName}</Text>
                                    <Text style={uiStyles.profileBio}>{dbUser?.bio}</Text>
                                </View>
                            </View>

                            {/*Profile Stats*/}
                            {/*<View style={uiStyles.profileStatsContainer}>*/}

                            {/*    <View style={uiStyles.profileStat}>*/}
                            {/*        <Text>{myPosts.length}</Text>*/}
                            {/*        <Text>Posts</Text>*/}
                            {/*    </View>*/}
                            {/*    <View style={uiStyles.profileStat}>*/}
                            {/*        <Text></Text>*/}
                            {/*        <Text>Followers</Text>*/}
                            {/*    </View>*/}
                            {/*    <View style={uiStyles.profileStat}>*/}
                            {/*        <Text>{myTroves.length}</Text>*/}
                            {/*        <Text>Troves</Text>*/}

                            {/*    </View>*/}


                            {/*</View>*/}
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
                    </View>
                    {/*activeTabContent*/}
                 {/*   <View>*/}
                 
                 {/*       {activeTab === 'My Posts' &&*/}
                 
                 {/*           <View style={uiStyles.activeTabContentContainer}>*/}
                 
                 {/*               <View style={uiStyles.activeTabContentHeader}>*/}
                 {/*                   /!*<Pressable style={uiStyles.activeTabContentHeaderItem}*!/*/}
                 {/*                   /!*           onPress={() => {*!/*/}
                 {/*                   /!*               console.log('Navigate to Create Post Screen')*!/*/}
                 {/*                   /!*               navigation.navigate('CreatePostScreen')*!/*/}
                 {/*                   /!*           }}>*!/*/}
                 
                 
                 {/*                   /!*    <Text style={uiStyles.activeTabContentHeaderItemText}>Feed</Text>*!/*/}
                 
                 {/*                   /!*</Pressable>*!/*/}
                 {/*                   <View>*/}
                 
                 {/*                   </View>*/}
                 {/*                   <Pressable style={uiStyles.activeTabContentHeaderItem}*/}
                 
                 {/*                              onPress={() => {*/}
                 {/*                                  console.log('Navigate to Create Post Screen')*/}
                 {/*                                  navigation.navigate('CreatePostScreen')*/}
                 {/*                              }}>*/}
                 
                 {/*                       <Icon style={{marginRight: 10}} name="add-circle" size={25} color="#000"/>*/}
                 {/*                       <Text style={uiStyles.activeTabContentHeaderItemText}>New Post</Text>*/}
                 
                 {/*                   </Pressable>*/}
                 {/*               </View>*/}
                 
                 {/*               <View style={uiStyles.masterPostContainer}>*/}
                 {/*                   <View style={uiStyles.postFeed}>*/}
                 {/*                       {myPosts.length === 0 ? (*/}
                 {/*                           <View style={{*/}
                 {/*                               width: '100%',*/}
                 {/*                               height: 150,*/}
                 {/*                               justifyContent: 'center',*/}
                 {/*                               alignItems: 'center',*/}
                 {/*                               padding: 20,*/}
                 {/*                               display: 'flex'*/}
                 {/*                           }}>*/}
                 {/*                               <Text style={{fontWeight: 700, fontSize: 30, color: 'rgba(0,0,0,.2)'}}>No*/}
                 {/*                                   posts to*/}
                 {/*                                   show</Text>*/}
                 {/*                           </View>*/}
                 {/*                       ) : (*/}
                 {/*                           myPosts.map((post, index) => (*/}
                 
                 {/*                               <View*/}
                 {/*                                   key={index}*/}
                 {/*                                   style={uiStyles.postContainer}*/}
                 {/*                               >*/}
                 
                 {/*                                   <View style={uiStyles.smallProfilePicture}>*/}
                 
                 {/*                                   </View>*/}
                 
                 {/*                                   <View style={uiStyles.postBodyContainer}>*/}
                 {/*                                       <View style={uiStyles.postHeaderBar}>*/}
                 {/*                                           <Text*/}
                 {/*                                               style={textStyles.postUsername}>@{dbUser.username}</Text>*/}
                 
                 {/*                                           /!*Trash Can*!/*/}
                 {/*                                           <Pressable*/}
                 {/*                                               onPress={() => {*/}
                 {/*                                                   removeMyPost(post.id)*/}
                 {/*                                               }}*/}
                 {/*                                           >*/}
                 {/*                                               <Icon name='trash-outline' size={20} color='#ccc'/>*/}
                 {/*                                           </Pressable>*/}
                 {/*                                       </View>*/}
                 
                 {/*                                       <View style={uiStyles.postBody}>*/}
                 {/*                                           <Pressable style={{marginBottom: 10}}>*/}
                 {/*                                               <Text style={textStyles.postMessage}>*/}
                 {/*                                                   {post.body.length <= 200 ? (*/}
                 {/*                                                       <Text*/}
                 {/*                                                           style={uiStyles.postMessage}>{post.body}</Text>*/}
                 {/*                                                   ) : (*/}
                 {/*                                                       <Text style={uiStyles.postMessage}*/}
                 {/*                                                             onPress={() => navigation.navigate('ViewPostScreen', {post})}>*/}
                 {/*                                                           {post.body.slice(0, 200)}*/}
                 {/*                                                           <Text*/}
                 {/*                                                               style={{color: '#006dff'}}*/}
                 
                 {/*                                                           >*/}
                 {/*                                                               ...Read More*/}
                 {/*                                                           </Text>*/}
                 {/*                                                       </Text>*/}
                 {/*                                                   )}*/}
                 {/*                                               </Text>*/}
                 {/*                                           </Pressable>*/}
                 {/*                                           <View style={uiStyles.postEngagementView}>*/}
                 {/*                                               <Icon name="heart-outline" size={20} color="#f00"/>*/}
                 {/*                                               <Text>{post.likes}</Text>*/}
                 {/*                                           </View>*/}
                 {/*                                           <Text>*/}
                 {/*                                               {(() => {*/}
                 {/*                                                   const timestamp = post.timestamp;*/}
                 {/*                                                   const postDate = new Date(timestamp);*/}
                 
                 {/*                                                   if (isNaN(postDate)) {*/}
                 {/*                                                       console.error('Invalid Date:', timestamp);*/}
                 {/*                                                       return 'Invalid date';*/}
                 {/*                                                   }*/}
                 
                 {/*                                                   const now = new Date();*/}
                 {/*                                                   const isToday =*/}
                 {/*                                                       postDate.getDate() === now.getDate() &&*/}
                 {/*                                                       postDate.getMonth() === now.getMonth() &&*/}
                 {/*                                                       postDate.getFullYear() === now.getFullYear();*/}
                 
                 {/*                                                   return isToday*/}
                 {/*                                                       ? postDate.toLocaleTimeString([], {*/}
                 {/*                                                           hour: '2-digit',*/}
                 {/*                                                           minute: '2-digit'*/}
                 {/*                                                       })*/}
                 {/*                                                       : postDate.toLocaleDateString();*/}
                 {/*                                               })()}*/}
                 {/*                                           </Text>*/}
                 {/*                                       </View>*/}
                 {/*                                   </View>*/}
                 {/*                               </View>*/}
                 {/*                           ))*/}
                 {/*                       )}*/}
                 {/*                   </View>*/}
                 {/*                   /!*<View style={uiStyles.spotlightContainer}>*!/*/}
                 {/*                   /!*    <View style={uiStyles.spotlight}>*!/*/}
                 
                 {/*                   /!*    </View>*!/*/}
                 {/*                   /!*    <View style={uiStyles.spotlight}>*!/*/}
                 
                 {/*                   /!*    </View>*!/*/}
                 {/*                   /!*</View>*!/*/}
                 {/*               </View>*/}
                 
                 
                 {/*           </View>}*/}
                 
                 {/*       {activeTab === 'My Troves' &&*/}
                 
                 {/*           <View style={uiStyles.activeTabContentContainer}>*/}
                 
                 {/*               <View style={uiStyles.troveListingContainer}>*/}
                 
                 {/*                   {myTroves ? (*/}
                 
                 {/*                       <FlatList*/}
                 {/*                           data={myTroves}*/}
                 {/*                           keyExtractor={(item, index) => index.toString()}*/}
                 {/*                           numColumns={3}*/}
                 {/*                           contentContainerStyle={{padding: 0}}*/}
                 {/*                           columnWrapperStyle={{*/}
                 {/*                               backgroundColor: 'white',*/}
                 {/*                               justifyContent: 'flex-start',*/}
                 {/*                               marginBottom: 1*/}
                 {/*                           }}*/}
                 {/*                           renderItem={({item: trove, index}) => (*/}
                 {/*                               <Pressable*/}
                 {/*                                   key={index}*/}
                 {/*                                   style={uiStyles.troveListing}*/}
                 {/*                                   onPress={() => {*/}
                 {/*                                       navigation.navigate('TroveDetailsScreen', {trove});*/}
                 {/*                                   }}*/}
                 {/*                               >*/}
                 
                 {/*                                   <View style={{flexDirection: 'row', justifyContent: 'space-between', flex:1, width: '100%'}}>*/}
                 {/*                                       <Text style={{color: 'white', fontWeight: '700'}}>*/}
                 {/*                                           {trove.troveTitle}*/}
                 {/*                                       </Text>*/}
                 {/*                                       /!*<Pressable*!/*/}
                 {/*                                       /!*onPress={() => setTroveEditMenuVisible(true)}*!/*/}
                 {/*                                       /!*>*!/*/}
                 {/*                                       /!*    <Icon name="ellipsis-vertical" size={25} color="#fff" height={30}*!/*/}
                 {/*                                       /!*         width={15}/>*!/*/}
                 {/*                                       /!*</Pressable>*!/*/}
                 {/*                                   </View>*/}
                 
                 {/*                                   /!*<MenuProvider style={{backgroundColor: 'red'}}>*!/*/}
                 {/*                                   /!*    <Menu>*!/*/}
                 {/*                                   /!*        <MenuTrigger>*!/*/}
                 {/*                                   /!*            {troveEditMenuVisible}*!/*/}
                 {/*                                   /!*        </MenuTrigger>*!/*/}
                 {/*                                   /!*        <MenuOptions>*!/*/}
                 {/*                                   /!*            <MenuOption onSelect={() => alert('Option 1')} text="Option 1" />*!/*/}
                 {/*                                   /!*            <MenuOption onSelect={() => alert('Option 2')} text="Option 2" />*!/*/}
                 {/*                                   /!*        </MenuOptions>*!/*/}
                 {/*                                   /!*    </Menu>*!/*/}
                 {/*                                   /!*</MenuProvider>*!/*/}
                 
                 {/*                                   /!* Optional: Show description or timestamp *!/*/}
                 {/*                                   /!* <Text style={{marginBottom: 10}}>{trove.troveDescription.slice(0,25)}</Text> *!/*/}
                 {/*                                   /!* <Text style={{fontSize: 10}}>*/}
                 {/*  Date Added: {new Date(trove.timestamp).toLocaleDateString()}*/}
                 {/*</Text> *!/*/}
                 
                 {/*                                   <View style={uiStyles.troveListingFooter}>*/}
                 {/*                                       /!*<Pressable*!/*/}
                 {/*                                       /!*    onPress={() => {*!/*/}
                 {/*                                       /!*        console.log('Pressed Delete Trove');*!/*/}
                 {/*                                       /!*        removeMyTrove(trove.id);*!/*/}
                 {/*                                       /!*    }}*!/*/}
                 {/*                                       /!*    hitSlop={{top: 50, bottom: 50, left: 50, right: 50}}*!/*/}
                 {/*                                       /!*>*!/*/}
                 {/*                                       /!*    <Icon name='trash-outline' size={20} color='#fff'/>*!/*/}
                 {/*                                       /!*</Pressable>*!/*/}
                 {/*                                       <Icon name='time-outline' size={20} color='#fff'/>*/}
                 {/*                                   </View>*/}
                 {/*                               </Pressable>*/}
                 {/*                           )}*/}
                 {/*                       />*/}
                 
                 {/*                   ) : (*/}
                 
                 {/*                       <Text>No Troves Found</Text>*/}
                 
                 {/*                   )}*/}
                 {/*               </View></View>*/}
                 
                 
                 {/*       }*/}
                 {/*   </View>*/}


                </View>

                {/*activeTabContent*/}
                <View>

                    {activeTab === 'My Posts' &&

                        <View style={uiStyles.activeTabContentContainer}>

                            <View style={uiStyles.activeTabContentHeader}>
                                {/*<Pressable style={uiStyles.activeTabContentHeaderItem}*/}
                                {/*           onPress={() => {*/}
                                {/*               console.log('Navigate to Create Post Screen')*/}
                                {/*               navigation.navigate('CreatePostScreen')*/}
                                {/*           }}>*/}


                                {/*    <Text style={uiStyles.activeTabContentHeaderItemText}>Feed</Text>*/}

                                {/*</Pressable>*/}
                                <View>

                                </View>
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

                                                <View style={uiStyles.smallProfilePicture}>

                                                </View>

                                                <View style={uiStyles.postBodyContainer}>
                                                    <View style={uiStyles.postHeaderBar}>
                                                        <Text
                                                            style={textStyles.postUsername}>@{dbUser.username}</Text>

                                                        {/*Trash Can*/}
                                                        <Pressable
                                                            onPress={() => {
                                                                removeMyPost(post.id)
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
                                                        <Text>
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

                        <View style={uiStyles.activeTabContentContainer}>

                            <View style={uiStyles.troveListingContainer}>

                                {myTroves ? (

                                    <FlatList
                                        data={myTroves}
                                        keyExtractor={(item, index) => index.toString()}
                                        numColumns={3}
                                        contentContainerStyle={{padding: 0}}
                                        columnWrapperStyle={{
                                            backgroundColor: 'white',
                                            justifyContent: 'flex-start',
                                            marginBottom: 1
                                        }}
                                        renderItem={({item: trove}) => (
                                            <Pressable
                                                // key={index}
                                                style={uiStyles.troveListing}
                                                onPress={() => {
                                                    navigation.navigate('TroveDetailsScreen', {trove});
                                                }}
                                            >

                                                {trove.troveCoverFileType === 'image/jpeg'} return {troveCoverFiles?.[trove.id] ? (
                                                <Image
                                                    source={{ uri: troveCoverFiles[trove.id] }}
                                                    style={[uiStyles.troveListingCover, StyleSheet.absoluteFill]}
                                                    resizeMode="cover"
                                                />
                                            ) : (
                                                <Text>{trove.id}</Text>
                                            )}
                                                {trove.troveCoverFileType === 'video/mp4'} return {troveCoverFiles?.[trove.id] ? (
                                                <Video
                                                    source={{ uri: troveCoverFiles[trove.id] }}
                                                    style={[uiStyles.troveListingCover, StyleSheet.absoluteFill]}
                                                    resizeMode="cover"
                                                    shouldPlay={false}
                                                />
                                            ) : (
                                                <Text>{trove.id}</Text>
                                            )}



                                                <View style={{flexDirection: 'row', justifyContent: 'space-between', flex:1, width: '100%'}}>
                                                    <Text style={{color: 'white', fontWeight: '700'}}>
                                                        {trove.troveTitle}
                                                    </Text>
                                                </View>

                                                <View style={uiStyles.troveListingFooter}>
                                                    <Icon name='time-outline' size={20} color='#fff'/>
                                                </View>

                                            </Pressable>
                                        )}
                                    />

                                ) : (

                                    <Text>No Troves Found</Text>

                                )}
                            </View>
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
