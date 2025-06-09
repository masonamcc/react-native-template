import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import TemplateDetailsScreen from "../screens/TemplateDetailsScreen";
import SettingsScreen from '../screens/Profile Screens/SettingsScreen';
import LoginScreen from '../screens/Authentication Screens/LoginScreen';
import SignupScreen from '../screens/Authentication Screens/SignupScreen';
import MyProfileScreen from "../screens/Profile Screens/MyProfileScreen";
import MyTrovesScreen from "../screens/TrovesScreen";

import {StyleSheet} from "react-native";
import {Ionicons} from '@expo/vector-icons';

import SearchScreen from "../screens/SearchScreen";

import UserProfileScreen from "../screens/UserProfileScreen"
import CreateTroveScreen from "../screens/Trove Screens/CreateTroveScreen";
import BrowseTrovesScreen from "../screens/Trove Screens/BrowseTrovesScreen"

import VerificationScreen from "../screens/Authentication Screens/VerificationScreen";
import CreatePostScreen from "../screens/Profile Screens/CreatePostScreen";

// SignUp Stack Screens
import Setup1Username from "../screens/Setup Screens/Setup1Username";
import Setup2Name from "../screens/Setup Screens/Setup2Name";
import Setup3Bio from "../screens/Setup Screens/Setup3Bio";
import SetupFinal from "../screens/Setup Screens/SetupFinal";
import TroveDetailsScreen from "../screens/Trove Screens/TroveDetailsScreen";

// import SettingsScreen from '../screens/SettingsScreen';
const RootStack = createStackNavigator();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack({dbUser, setDbUser}) {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" options={{headerShown: false}}>
                {(props) => <HomeScreen {...props} dbUser={dbUser} setDbUser={setDbUser}/>}
            </Stack.Screen>
            <Stack.Screen name="SearchScreen" options={{
                title: 'Search',
                headerBackTitle: ''
            }}>
                {(props) => <SearchScreen {...props} dbUser={dbUser}/>}
            </Stack.Screen>
            <Stack.Screen name="UserProfile" component={UserProfileScreen} options={{headerShown: false}}/>
            <Stack.Screen name="TemplateDetails" component={TemplateDetailsScreen} options={{
                title: '',
                headerBackTitle: 'Back'
            }}/>
        </Stack.Navigator>
    );
}

function ProfileStack({dbUser, setDbUser, logout}) {
    const [profileBackgroundEnabled, setProfileBackgroundEnabled] = useState(true);
    return (
        <Stack.Navigator>

            <Stack.Screen name="MyProfileScreen" options={{headerShown: false}}>
                {(props) => <MyProfileScreen {...props} dbUser={dbUser} profileBackgroundEnabled={profileBackgroundEnabled}
                                             setProfileBackgroundEnabled={setProfileBackgroundEnabled}/>}
            </Stack.Screen>

            <Stack.Screen name="CreatePostScreen" options={{headerShown: false}}>
                {(props) => <CreatePostScreen {...props} dbUser={dbUser}/>}
            </Stack.Screen>

            <Stack.Screen name="Settings" options={{
                title: '',
                headerBackTitle: 'Back'
            }}>
                {(props) => <SettingsScreen {...props} dbUser={dbUser} logout={logout} profileBackgroundEnabled={profileBackgroundEnabled}
                                            setProfileBackgroundEnabled={setProfileBackgroundEnabled}/>}
            </Stack.Screen>
            <Stack.Screen name={'TroveDetailsScreen'} options={{headerShown: false}}>
                {(props) => <TroveDetailsScreen {...props} dbUser={dbUser}/>}
            </Stack.Screen>

        </Stack.Navigator>
    )
}

function TrovesStack({user, dbUser}) {
    return (
        <Stack.Navigator>
            <Stack.Screen name='BrowseTroves' options={{headerShown: false}}>
                {(props) => <BrowseTrovesScreen {...props} dbUser={dbUser}/>}
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
                {(props) => <CreateTroveScreen {...props} dbUser={dbUser}/>}
            </Stack.Screen>
            <Stack.Screen name={'TroveDetailsScreen'} options={{headerShown: false}}>
                {(props) => <TroveDetailsScreen {...props} dbUser={dbUser}/>}
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

function SignupStack({createAccount, user, login}) {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Signup" component={SignupScreen} options={{
                headerShown: false,
                title: '',
                headerBackTitle: 'Back'
            }}/>
            <Stack.Screen name="Verification" options={{headerShown: false}}>
                {(props) => <VerificationScreen {...props} login={login}/>}
            </Stack.Screen>
            <Stack.Screen name="Setup1" component={Setup1Username} options={{
                headerShown: false,
            }}/>
            <Stack.Screen name="Setup2" component={Setup2Name} options={{
                headerShown: false,
            }}/>
            <Stack.Screen name="Setup3" component={Setup3Bio} options={{
                headerShown: false,
            }}/>
            <Stack.Screen name="SetupFinal" options={{
                headerShown: false,
            }}>
                {(props) => <SetupFinal {...props} login={login}/>}
            </Stack.Screen>
        </Stack.Navigator>
    )
}

function MainTabs({user, onLogout}) {
    // let MyTrovesScreen;
    const [dbUser, setDbUser] = useState(null);
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
            tabBarStyle: {
                backgroundColor: 'black',
                position: 'absolute', // Optional: useful for layering
                elevation: 0,         // Android
                shadowOpacity: 0,     // iOS
                borderTopWidth: 1,
                borderColor: '#e5e5e5'// Removes top border
            },
        })}>
            <Tab.Screen name="Home" options={{headerShown: false}}>
                {(props) => <HomeStack {...props} user={user} dbUser={dbUser} setDbUser={setDbUser}/>}
            </Tab.Screen>
            <Tab.Screen name="Profile" options={{headerShown: false}}>
                {(props) => <ProfileStack {...props} dbUser={dbUser} logout={onLogout} />}
            </Tab.Screen>
            <Tab.Screen name="Troves" options={{headerShown: false}}>
                {(props) => <TrovesStack {...props} dbUser={dbUser}/>}
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
                    <RootStack.Screen name="SignupStack">
                        {(props) => <SignupStack {...props}

                                                 createAccount={(user) => {
                                                     console.log('Beginning Signup Stack');
                                                     // setIsLoggedIn(true);
                                                 }}

                                                 login={(user) => {
                                                     console.log('Logging user in from Navigator');
                                                     // setUser(user);      // Save the user here
                                                     setIsLoggedIn(true);        // Trigger tab navigation
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
        backgroundColor: 'black',
        width: 100
    }
});
