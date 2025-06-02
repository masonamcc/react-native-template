import React, { useEffect, useState } from 'react';
import {View, Text, ScrollView, StyleSheet, SafeAreaView, Button} from 'react-native';
import { getAllTemplates } from '../index';

export default function ProfileScreen({ navigation, route, onLogout }) {
    const [templates, setTemplates] = useState([]);

    useEffect(() => {

    })

    return (
        <SafeAreaView style={styles.safeView}>
            {/*<Text style={styles.title}>TROVE</Text>*/}
            <ScrollView style={{ width: '100%' }}>
                <Text>Troves</Text>
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
        backgroundColor: '#ffffff'
    },
})
