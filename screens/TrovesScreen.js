import React, { useEffect, useState } from 'react';
import {View, Text, ScrollView, StyleSheet, SafeAreaView, Button} from 'react-native';
import {getAllTemplates, getAllTroves} from '../index';
import {uiStyles} from "../Styles/UIStyles";

export default function TrovesScreen({ navigation, route, onLogout }) {
    // const [templates, setTemplates] = useState([]);

    useEffect(() => {

        console.log('Use Effects started')

        const fetchTroves = async() => {
            const troves = await getAllTroves();
            if (troves.length === 0) {
                console.log('No Troves Found')
            } else {
                troves.forEach(troveItem => {
                    console.log('Trove found: ', troveItem)
                })
            }

        }

        fetchTroves();

    }, []);

    return (
        <SafeAreaView style={styles.safeView}>
            {/*<Text style={styles.title}>TROVE</Text>*/}
            <ScrollView style={{ width: '100%' }}>
                <View style={uiStyles.mainCard}>
                    <Text>New Trove</Text>
                </View>
                <Text>Hello</Text>
                <Button title={'+ New Trove'} style={uiStyles.newTroveButton}/>
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
