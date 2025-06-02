import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import TemplateDetailsScreen from "../screens/TemplateDetailsScreen";
import SettingsScreen from '../screens/SettingsScreen';
import LoginScreen from '../screens/LoginScreen';
import {StyleSheet} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import ProfileScreen from "../screens/ProfileScreen";
import MyTrovesScreen from "../screens/MyTrovesScreen";


// import SettingsScreen from '../screens/SettingsScreen';
const RootStack = createStackNavigator();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="TemplateDetails" component={TemplateDetailsScreen} options={{
                title: '',
                headerBackTitle: 'Back'
            }}/>
        </Stack.Navigator>
    );
}

function MainTabs({onLogout}) {
    // let MyTrovesScreen;
    return (
        <Tab.Navigator style={styles.container} screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Home') {
                    iconName = focused ? 'home' : 'home-outline'; // Ionicons home icon
                } else if (route.name === 'Settings') {
                    iconName = focused ? 'settings' : 'settings-outline'; // Example
                } else if (route.name === 'Profile') {
                    iconName = focused ? 'person-circle' : 'person-circle-outline';
                } else if (route.name === 'My Troves') {
                    iconName = focused ? 'diamond-outline' : 'diamond-outline';
                }

                return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'tomato', // Active icon color
            tabBarInactiveTintColor: 'gray', // Inactive icon color
        })}>
            <Tab.Screen name="Home" component={HomeStack} options={{ headerShown: false }}/>
            <Tab.Screen name="Settings" component={SettingsScreen} />
            <Tab.Screen
                name="Profile"
                // component={ProfileScreen}
                children={(props) => <ProfileScreen {...props} onLogout={onLogout} />}
                />
            {/*<Tab.Screen name="Profile" component={ProfileScreen} />*/}
            <Tab.Screen name="My Troves" component={MyTrovesScreen} />
        </Tab.Navigator>
    );
}

export default function MainNavigator() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Simulate auth check
        setTimeout(() => {
            setIsLoggedIn(false); // Change to true for testing bypass
        }, 1000);
    }, []);

    return (
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
            {isLoggedIn ? (
                <RootStack.Screen name="MainTabs">
                    {(props) => <MainTabs {...props} onLogout={() => setIsLoggedIn(false)} />}
                </RootStack.Screen>
            ) : (
                <RootStack.Screen name="Login">
                    {(props) => <LoginScreen {...props} onLogin={() => setIsLoggedIn(true)} />}
                </RootStack.Screen>
            )}
        </RootStack.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        width: 100
    }
});
