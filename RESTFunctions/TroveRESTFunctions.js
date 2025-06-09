import {Storage} from 'aws-amplify';
import {getAllUsers} from "../index";

export const getMyTroves = async (user) => {
    // console.log('Getting My Troves initiated... user: ', user.username, ' ', user.userId)
    const response = await fetch(`http://192.168.1.119:9090/troves/user/${user.userId}`)
    const myTroves = await response.json();
    // console.log('Getting My Troves initiated... my posts: ', myTroves)
    myTroves.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    // console.log('My Troves: ', myTroves)
    return Array.isArray(myTroves) ? myTroves : [];
}

export const getAllTroves = async() => {
    // console.log('Getting All Troves initiated...')
    const response = await fetch(`http://192.168.1.119:9090/troves`)
    const allTroves = await response.json();
    // myTroves.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    // console.log('My Troves: ', myTroves)
    return Array.isArray(allTroves) ? allTroves : [];
}

export const getTrove = async(troveId) => {
    const response = await fetch(`http://192.168.1.119:9090/trove/${troveId}`)
    const trove = await response.json();
    return trove;
}

export const createTrove = async(title, assetType, asset, description, dbUser) => {
    console.log('Creating a new trove in REST function')
    console.log(title)
    console.log(assetType)
    console.log(asset)
    console.log(description)
    console.log(dbUser)

    if (title == null || assetType == null || asset == null || description == null || dbUser == null) {
        console.log('Could not complete trove creation, missing something')
    }

    const uriToBlob = async (uri) => {
        const response = await fetch(uri);
        return await response.blob();
    };

    const blob = await uriToBlob(asset);
    const userId = dbUser.userId;
    const key = `${userId}/${Date.now()}`;

    // if ()

    await Storage.put(key, blob, {
        contentType: `${assetType}`,
    });

    let response = await fetch('http://192.168.1.119:9090/createTrove', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            troveTitle: title,
            user: {
                userId: userId
            },
            troveDescription: description,
            troveCoverFileUrl: key,
            createdAt: new Date().toISOString(),
            troveCoverFileType: `${assetType}`

        })
    });

    if (!response.ok) {
        console.log('something went wrong')
    }

    console.log('response, ', response)
    return await response.json();
}

export const deleteMyTrove = async(troveId) => {
    console.log('deleteTrove with ID: ', troveId)
    const response = await fetch(`http://192.168.1.119:9090/deleteTrove/${troveId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const reply = response.text()
    console.log('Reply from API: ', reply)
    return reply
}

export const getTroveCreator = async(creatorId) => {
    const response = await getAllUsers()
    const allUsers = response.json()
    const troveCreator = allUsers.find(user => user.id === creatorId);
    return troveCreator;
}