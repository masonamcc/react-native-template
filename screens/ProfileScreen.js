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
                <Text style={styles.subheader}>Profile</Text>
                {templates.length === 0 ? (
                    <Text>No templates to show</Text>
                ) : (
                    templates.map((template, index) => (
                        <View key={index} style={styles.post}>
                            <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>{template.templateTitle}</Text>
                            <Text style={{ marginBottom: 10 }}>{template.templateDescription}</Text>
                            <Text style={{ fontSize: 10 }}>
                                Date Added: {new Date(template.timestamp).toLocaleDateString()}
                            </Text>
                        </View>
                    ))
                )}
                <Text style={styles.header}>News</Text>
                <Button title='Log Out' onPress={onLogout} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // alignItems: 'center',
        // paddingTop: 40,
        height: '100%'
    },
    title: { fontSize: 32, fontWeight: 'bold' },
    subheader: { fontSize: 20, marginTop: 10 },
    box: {
        width: 100,
        height: 100,
        backgroundColor: 'skyblue',
        borderRadius: 10,        // Rounded corners (optional)
        borderWidth: 2,          // Border (optional)
        borderColor: 'black',    // Border color
    },
    safeView: {
        width: '100%',
        height: "100%",
        alignItems: 'center',
        justifyContent: 'start',
        display: "flex",
        backgroundColor: 'white'
    },
    header: {
        width: '100%',
        // height: '5%',
        // backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
        display: "flex",
        // paddingLeft: 20,
        paddingTop: 10,
        paddingBottom: 10
    },

    // Titles
    header1: {
        color: 'black',
        fontSize: 20,
        fontFamily: "Inter",
        fontWeight: '600'
    },
    title1: {
        color: 'white',
        fontSize: 15,
        fontFamily: "Inter",
        fontWeight: '900'
    },
    title2: {
        color: 'blue',
        fontSize: 25,
        marginBottom: '3%',
        fontFamily: "Inter",
        fontWeight: '900'
    },

    // Header 3
    header4: {
        color: 'black',
        fontSize: 16,
        fontFamily: "Inter",
        fontWeight: '500'
    },

    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 10,
    },
    cell: {
        flex: 1,
        textAlign: 'left',
        fontSize: 16,
    },
    headerFont: {
        backgroundColor: '#f0f0f0',
    },
    headerCell: {
        fontWeight: 'bold',
    },

    card: {
        height: 200,
        width: 200,
        borderStyle: "solid",
        borderRadius: 8,
        borderColor: 'black',
        backgroundColor: 'lightgray',
        padding: 20
    },
    section: {
        backgroundColor: "white",
        // height: "30%",
        width: "100%",
        padding: 20,
    },
    sectionB: {
        backgroundColor: '#f5f5f5',
        height: "50%",
        width: "100%",
        padding: 20
    },
    sectionC: {
        backgroundColor: 'white',
        height: "50%",
        width: "100%",
        padding: 20
    },

    post: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#b6b6b6',
        borderRadius: 10,
        marginBottom: 10
    }
});
