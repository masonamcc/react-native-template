import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {textStyles} from '../Styles/TextStyles.js';
import {sectionStyles} from '../Styles/SectionStyles.js';
import {gridStyles} from '../Styles/GridStyles.js';
import {uiStyles} from '../Styles/UIStyles.js';

export default function TemplateDetailsScreen({ route }) {
    const { template } = route.params;

    return (
        <View style={styles.container}>
            <Text style={textStyles.header2}>{template.templateTitle}</Text>
            <Text style={textStyles.description}>{template.templateDescription}</Text>
            <Text style={textStyles.detail}>Added: {new Date(template.timestamp).toLocaleDateString()}</Text>
            {/* Add more details here */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff'
    },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 }
});
