// Users
import {ip} from "./index"

export const createDbUser = async (email, username, bio, firstName, lastName) => {
    console.log('Creating dbUser...')

    let response = await fetch(`http://${ip}:9090/createUser`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            firstName: firstName,
            lastName: lastName,
            email: email,
            bio: bio
        })
    })
    console.log('response from createDBUser: ', response)
    return await response.json(); // ✅ return parsed JSON, not a string
}