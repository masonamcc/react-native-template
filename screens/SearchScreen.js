import React, {useEffect, useState} from "react";
import {LinearGradient} from "expo-linear-gradient";
import {uiStyles} from "../Styles/UIStyles";
import {SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import {textStyles} from "../Styles/TextStyles";
import {getAllTemplates, getAllUsers} from "../index";
import {sectionStyles} from "../Styles/SectionStyles";
import {gridStyles} from "../Styles/GridStyles";
import {Pressable} from "react-native-gesture-handler";

export default function SearchScreen({navigation, route, user}) {

    const [searchQuery, setSearchQuery] = useState('')
    const [searchQueryResults, setSearchQueryResults] = useState('')

    useEffect(() => {

        console.log('Searching for: ', searchQuery)

        const fetchSearchResults = async () => {
            if (searchQuery === '') {

            } else {
                const allUsers = await getAllUsers();
                const searchResults = allUsers.filter(user => user.username.includes(searchQuery.toLowerCase()));
                console.log('Found: ', searchResults);
                setSearchQueryResults(searchResults)
            }
        }

        fetchSearchResults()

        // search()
    }, [searchQuery]);


    return (
        <SafeAreaView style={styles.safeView}>
            <View style={{padding: 20, width: '100%'}}>
                {/*<Text style={textStyles.brand}>trove</Text>*/}
                <TextInput
                    style={uiStyles.searchBar}
                    placeholder='Search'
                    placeholderTextColor={'#373737'}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>

            <ScrollView style={{width: '100%', backgroundColor: '#fff'}}>

                {/*<Text>Search for anything in the world</Text>*/}

                <View>
                    {searchQueryResults.length === 0 ? (
                        <View style={{
                            width: '100%',
                            height: 50,
                            justifyContent: 'center',
                            alignItems: 'center',
                            // padding: 20,
                            display: 'flex'
                        }}>
                            <Text style={{fontWeight: 700, fontSize: 20, color: 'rgba(0,0,0,.2)'}}>
                                Begin Typing to Search
                            </Text>
                        </View>
                    ) : (
                        searchQueryResults.map((searchQueryResult, index) => (
                            <Pressable
                                key={index}
                                onPress={() => {
                                    navigation.navigate('UserProfile', {searchQueryResult})
                                }}>
                                <View key={index} style={uiStyles.searchResultContainer}>
                                    <View style={uiStyles.smallProfilePicture}/>
                                    <Text style={textStyles.searchResultUser}>
                                        @{searchQueryResult.username}
                                    </Text>
                                </View>
                            </Pressable>
                        ))
                    )}
                </View>

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
});