import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, StyleSheet, SafeAreaView, Button} from 'react-native';
import {getAllTemplates} from '../index';
import {Pressable} from "react-native-gesture-handler";
import {uiStyles} from "../Styles/UIStyles";

export default function SettingsScreen({route, logout, user}) {
    // const [templates, setTemplates] = useState([]);


    return (
        <SafeAreaView style={styles.safeView}>
            {/*<Text style={styles.title}>TROVE</Text>*/}
            <ScrollView style={{width: '100%'}}>
                <Text style={styles.subheader}>settings</Text>

                <Pressable style={uiStyles.menuItem}>Test</Pressable>


                <Button title='Log Out' onPress={logout}/>

                {/*<Text style={styles.header}>News</Text>*/}
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
    }
});
