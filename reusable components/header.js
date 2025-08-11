import {Text, View} from "react-native";
import React from "react";
import {uniStyles} from "../styles/uniStyles";
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from "@react-navigation/native";
import {Pressable} from "react-native-gesture-handler";
import {goBack} from "expo-router/build/global-state/routing";

export default function Header({title, align, topRightFunction}) {

    const navigation = useNavigation()

    return (
        <View style={[uniStyles.header, uniStyles.px2, uniStyles.spaceBetween]}>

            <Text style={[uniStyles.h5, uniStyles.mb0, uniStyles.fontWeight700, {textAlign: align}]}>{title}</Text>
            <View>
                {topRightFunction === "menu" && (
                <Icon name="menu-outline" size={25} color="#000"/>
                )}

                {topRightFunction === "settings" && (
                    <Pressable
                        onPress={() => {
                            navigation.navigate('SettingsScreen')
                        }}
                        hitSlop={{top: 50, bottom: 50, left: 50, right: 50}}

                    >
                        <Icon name="settings-outline" size={25} color="#000"/>
                    </Pressable>

                )}

            </View>
        </View>
    )
}