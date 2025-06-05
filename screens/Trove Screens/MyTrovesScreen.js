import React, {useEffect, useState, useCallback, useRef} from 'react';
import {View, Text, ScrollView, StyleSheet, SafeAreaView, Button, TextInput, ImageBackground, Animated} from 'react-native';
import {createPost, getMyPosts} from "../../index";
import {Pressable} from "react-native-gesture-handler";
import {uiStyles} from "../../Styles/UIStyles";
import {textStyles} from "../../Styles/TextStyles";
import {WebView} from 'react-native-webview';
import Icon from 'react-native-vector-icons/Ionicons';


export default function MyTrovesScreen({navigation, user}) {
    return (
        <View>
            <Text>
                MY Troves
            </Text>
        </View>
    )
}