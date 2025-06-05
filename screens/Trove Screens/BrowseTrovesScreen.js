import React, {useEffect, useState, useCallback, useRef} from 'react';
import {View, Text, ScrollView, StyleSheet, SafeAreaView, Button, TextInput, ImageBackground, Animated} from 'react-native';
import {createPost, getMyPosts} from "../../index";
import {Pressable} from "react-native-gesture-handler";
import {uiStyles} from "../../Styles/UIStyles";
import {textStyles} from "../../Styles/TextStyles";
import {WebView} from 'react-native-webview';
import Icon from 'react-native-vector-icons/Ionicons';

export default function BrowseTrovesScreen({navigation, user}) {
    return (
        <SafeAreaView style={uiStyles.safeView}>
            <View>
                <View style={uiStyles.header}>
                    <Text style={textStyles.brand}>Troves</Text>
                    <View>
                        <Pressable
                            onPress={() => {
                                navigation.navigate('Create Trove')
                            }}
                        >
                            <View style={{justifyContent: 'end', flexDirection: 'row', alignItems: 'center'}}>
                                <Text>Create Trove</Text>
                                <Icon style={{marginLeft: 10}} name="add-circle" size={25} color="#000"
                                />
                            </View>
                        </Pressable>
                    </View>
                </View>
                {/*<Text>*/}
                {/*    Browse Trove*/}
                {/*</Text>*/}
            </View>
        </SafeAreaView>
    )
}

