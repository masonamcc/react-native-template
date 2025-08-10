import React, {useEffect, useState, useRef} from 'react';
import {View, Text, ScrollView, StyleSheet, SafeAreaView, Button, TextInput} from 'react-native';
import {uiStyles} from "../../Styles/UIStyles";
import {sectionStyles} from "../../Styles/SectionStyles";
import {textStyles} from "../../Styles/TextStyles";
import {LinearGradient} from "expo-linear-gradient";
import {Pressable, TouchableOpacity} from "react-native-gesture-handler";

import {createUser, getAllUsers} from "../../index";
import {Auth} from "aws-amplify";
import {createDbUser} from "../../TroveREST";

export default function SetupScreen2({navigation, route, login}) {

    // const [bio, setBio] = useState('');

    useEffect(() => {

    }, []);


    return (
        <SafeAreaView style={sectionStyles.signUp}>

            <View style={sectionStyles.setupContainer}>
                <View>
                    <Text style={{fontWeight: '500', fontSize: 25, color: '#424242'}}>
                        Thank you for joining <Text style={{color: '#85bf18', fontWeight: '700'}}>trove</Text>
                    </Text>
                </View>

                <View style={[sectionStyles.signUpMiddle]}>

                    <Pressable style={uiStyles.buttonAccent}
                               onPress={() => {
                                   login()
                               }}
                    >
                        <Text style={{color: 'white'}}>Let's Go!</Text>
                    </Pressable>

                    <View style={uiStyles.chooseUsernameContainer}>


                    </View>

                </View>

                <View>
                </View>
            </View>

        </SafeAreaView>
    );
};