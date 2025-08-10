import {Text, View} from "react-native";
import React from "react";

import {uniStyles} from "../Styles/uniStyles";
import Icon from 'react-native-vector-icons/Ionicons';

export default function Header({title, align}) {

    return (
        <View style={[uniStyles.header]}>
            <Text style={[uniStyles.h5, uniStyles.mb0, uniStyles.fullwidth, {textAlign: align}]}>{title}</Text>
            <View style={uniStyles.fullwidth}>
                <Icon name="menu-outline" size={25} color="#000" onPress={() => {

                }}/>
            </View>
        </View>
    )
}