import {registerRootComponent} from 'expo';
// import './firebase';
// import 'expo-router/entry';
import App from './App';


// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriatelyn
registerRootComponent(App);
export const ip = '192.168.1.119'

function currentIP() {
    fetch('https://api.iplocation.net/?cmd=get-ip')

        .then(response => response.json())
        .then(data => {
            console.log("Public IP Address:", data);
        });
}

currentIP();

export const getAllTemplates = async () => {
    // console.log('Getting all templates')
    let response = await fetch(`http://${ip}:9090/templates`);
    let templates = await response.json();
    templates.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    // console.log(templates)
    return Array.isArray(templates) ? templates : [];

    // if (!templates || templates.length === 0) {
    //     console.log("There are no thoughts to show")
    //     // noTemplatesToShowDiv.classList.remove('is-hidden')
    // } else {
    //
    //     templates.forEach(template => {
    //         console.log("Template Found: ", template)
    //         return template
    //     })
    //
    // }
}

export const getAllTroves = async () => {
    console.log('Getting all Troves')
    let response = await fetch(`http://${ip}:9090/troves`);
    let troves = await response.json();
    troves.sort((a, b) => new Date(b.troveCreatedTimestamp) - new Date(a.troveCreatedTimestamp));
    console.log(troves)
    return Array.isArray(troves) ? troves : [];
}

export const getAllUsers = async () => {
    const users = await fetch(`http://${ip}:9090/users`)
    const allUsers = await users.json();
    return Array.isArray(allUsers) ? allUsers : []
}

export const searchAllUsers = async () => {
    const users = await fetch(`http://${ip}:9090/users/search`)
    const allUsers = await users.json();
    return Array.isArray(allUsers) ? allUsers : []
}

export const getUserFromDb = async (email) => {
    console.log('Getting user form database: ', email)
    console.log(`http://${ip}:9090/createUser`)
    const users = await fetch(`http://${ip}:9090/users`)
    const allUsers = await users.json();
    return allUsers.find(user => user.email === email)
}

export const getUserFromDbById = async (userId) => {
    const users = await fetch(`http://${ip}:9090/users`)
    const allUsers = await users.json();
    return allUsers.find(user => user.userId === userId)
}

export const createUser = async (username, password) => {
    console.log('Initiating createUser function')
    // First check to see if the user exists
    const allUsers = await getAllUsers()
    const searchedUser = allUsers.find(user => user.username === username);
    if (searchedUser) {
        console.log('User already exists')
    }


    // console.log('Creating New User with username: ', username, ' and password: ', password);
    // let response = await fetch('http://${ip}:9090/createUser', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //         password: password,
    //         username: username,
    //         firstName: null,
    //         lastName: null,
    //         email: null
    //     })
    // })
    // const text = await response.json();
    // console.log('Raw response text:', text);
    //
    // try {
    //     const user = JSON.parse(text);
    //     console.log('jsonparse: ', user)
    //     return Array.isArray(user) ? user : [];
    // } catch (err) {
    //     console.error('Failed to parse JSON:', err);
    //     return [];
    // }
}



// Posts
export const createPost = async (user, post) => {
    console.log('Creating a new post');

    const response = await fetch(`http://${ip}:9090/createPost`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user: {
                userId: user.userId,
            },
            body: post,
            title: null,
            timestamp: new Date().toISOString(),
        }),
    });

    if (!response.ok) {
        throw new Error('Failed to create post');
    }

    const text = await response.text(); // Optional
    console.log('Server response:', text);
    return text;
};

export const getMyPosts = async (user) => {
    // console.log('getMyPosts initiated... user: ', user.username, ' ', user.userId)
    const response = await fetch(`http://${ip}:9090/posts/user/${user.userId}`)
    const myPosts = await response.json();
    // console.log('getMyPosts initiated... my posts: ', myPosts)
    myPosts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    // console.log('My Posts: ', myPosts)
    return Array.isArray(myPosts) ? myPosts : [];
}