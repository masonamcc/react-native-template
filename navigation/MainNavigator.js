import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import TemplateDetailsScreen from "../screens/TemplateDetailsScreen";
import SettingsScreen from '../screens/SettingsScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import MyProfileScreen from "../screens/MyProfileScreen";
import MyTrovesScreen from "../screens/TrovesScreen";

import {StyleSheet} from "react-native";
import {Ionicons} from '@expo/vector-icons';
import OnboardingScreen1 from "../screens/OnboardingScreen1";
import SearchScreen from "../screens/SearchScreen";

import UserProfileScreen from "../screens/UserProfileScreen"
import CreateTroveScreen from "../screens/Trove Screens/CreateTroveScreen";
import BrowseTrovesScreen from "../screens/Trove Screens/BrowseTrovesScreen"

// import SettingsScreen from '../screens/SettingsScreen';
const RootStack = createStackNavigator();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack({user}) {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" options={{headerShown: false}}>
                {(props) => <HomeScreen {...props} user={user}/>}
            </Stack.Screen>
            <Stack.Screen name="SearchScreen" options={{
                title: 'Search',
                headerBackTitle: ''
            }}>
                {(props) => <SearchScreen {...props} user={user}/>}
            </Stack.Screen>
            <Stack.Screen name="UserProfile" component={UserProfileScreen} options={{headerShown: false}} />
            <Stack.Screen name="TemplateDetails" component={TemplateDetailsScreen} options={{
                title: '',
                headerBackTitle: 'Back'
            }}/>
        </Stack.Navigator>
    );
}

function ProfileStack({user, logout}) {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Profile" options={{headerShown: false}}>
                {(props) => <MyProfileScreen {...props} user={user}/>}
            </Stack.Screen>

            <Stack.Screen name="Settings" options={{
                title: '',
                headerBackTitle: 'Back'
            }}>
                {(props) => <SettingsScreen {...props} user={user} logout={logout}/>}
            </Stack.Screen>
        </Stack.Navigator>
    )
}

function TrovesStack({user}) {
    return (
        <Stack.Navigator>
            <Stack.Screen name='BrowseTroves' options={{headerShown: false}}>
                {(props) => <BrowseTrovesScreen {...props} user={user}/>}
            </Stack.Screen>
            <Stack.Screen name='My Troves' options={{headerShown: false}}>
                {(props) => <MyTrovesScreen {...props} user={user}/>}
            </Stack.Screen>
            <Stack.Screen name='Create Trove' options={{
                title: 'Create Trove',
                headerBackTitle: '',
                headerTitleAlign: 'left',
                headerPressColor: 'black'
            }}>
                {(props) => <CreateTroveScreen {...props} user={user}/>}
            </Stack.Screen>
        </Stack.Navigator>
    )
}

function LoginStack({onLogin}) {
    // let SignupScreen;
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" options={{headerShown: false}}>
                {(props) => <LoginScreen {...props} login={onLogin}/>}
            </Stack.Screen>
        </Stack.Navigator>
    )
}

function SignupStack({createAccount, user}) {
    return (
        <Stack.Navigator>
            {/*<Stack.Screen name="Signup" component={LoginScreen} options={{headerShown: false}}/>*/}
            <Stack.Screen name="Signup" component={SignupScreen} options={{
                headerShown: false,
                title: '',
                headerBackTitle: 'Back'
            }}/>
            <Stack.Screen name="Onboarding1" component={OnboardingScreen1} options={{
                headerShown: false,
                title: '',
                headerBackTitle: 'Back'
            }}/>
        </Stack.Navigator>
    )
}

function MainTabs({user, onLogout}) {
    // let MyTrovesScreen;
    return (
        <Tab.Navigator style={styles.container} screenOptions={({route}) => ({
            headerShown: false,
            tabBarIcon: ({focused, color, size}) => {
                let iconName;

                if (route.name === 'Home') {
                    iconName = focused ? 'home' : 'home-outline'; // Ionicons home icon
                } else if (route.name === 'Settings') {
                    iconName = focused ? 'settings' : 'settings-outline'; // Example
                } else if (route.name === 'Profile') {
                    iconName = focused ? 'person-circle' : 'person-circle-outline';
                } else if (route.name === 'Troves') {
                    iconName = focused ? 'diamond-outline' : 'diamond-outline';
                }

                return <Ionicons name={iconName} size={size} color={color}/>;
            },
            tabBarActiveTintColor: 'tomato', // Active icon color
            tabBarInactiveTintColor: 'gray', // Inactive icon color
        })}>
            <Tab.Screen name="Home" options={{headerShown: false}}>
                {(props) => <HomeStack {...props} user={user}/>}
            </Tab.Screen>
            <Tab.Screen name="Profile" options={{headerShown: false}}>
                {(props) => <ProfileStack {...props} user={user} logout={onLogout}/>}
            </Tab.Screen>
            <Tab.Screen name="Troves" options={{ headerShown: false}}>
                {(props) => <TrovesStack {...props} user={user}/>}
            </Tab.Screen>
        </Tab.Navigator>
    );
}

export default function MainNavigator() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Simulate auth check
        setTimeout(() => {
            setIsLoggedIn(false); // Change to true for testing bypass
        }, 1000);
    }, []);

    return (
        <RootStack.Navigator screenOptions={{headerShown: false, animated: 'fade'}}>
            {isLoggedIn ? (
                <RootStack.Screen name="MainTabs">
                    {(props) => <MainTabs {...props} user={user} onLogout={() => setIsLoggedIn(false)}/>}
                </RootStack.Screen>
            ) : (
                <>
                    <RootStack.Screen name="Login">
                        {(props) => <LoginScreen {...props}
                                                onLogin={(user) => {
                                                    console.log('Hello from Main Navigator');
                                                    setUser(user);      // Save the user here
                                                    setIsLoggedIn(true);        // Trigger tab navigation
                                                }}
                        />}
                    </RootStack.Screen>
                    <RootStack.Screen name="Signup">
                        {(props) => <SignupStack {...props}
                                                 createAccount={(user) => {
                                                     console.log('Beginning Signup Stack');
                                                     // setIsLoggedIn(true);
                                                 }}
                        />}
                    </RootStack.Screen>
                </>
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
