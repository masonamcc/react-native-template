import React, {useEffect, useState, useCallback, useRef, useColorScheme} from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    SafeAreaView,
    FlatList,
    Image,
    Dimensions
} from 'react-native';
import {uniStyles} from "../../styles/uniStyles";
import appConfig from "../../appConfiguration.json";
import Header from "../../reusable components/header";

export default function ProfileScreen({
    navigation,
    onLogout,
    dbUser,
    profileBackgroundEnabled,
    dataChanged,
}) {
    const [myPosts, setMyPosts] = useState([]);
    const [activeTab, setActiveTab] = useState('My Posts');

    return (

        <SafeAreaView style={uniStyles.safeAreaView}>

            <Header title={"username"} topRightFunction={"settings"}/>

            <ScrollView style={uniStyles.scrollView}>

                <View style={uniStyles.centerChildren}>
                    <Text style={uniStyles.fontSize3}>Profile</Text>
                </View>

            </ScrollView>

        </SafeAreaView>


    );
}
