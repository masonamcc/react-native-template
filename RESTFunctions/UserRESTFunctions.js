import {ip} from "../index";

export const updateUser = async(profileBackgroundLink, dbUser) => {
    const fetchedUser = fetch(`http://${ip}:9090/update/user/${dbUser.userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify({
            profileBackgroundLink: profileBackgroundLink
        })
    })
    const response = fetchedUser.json();
    return response
}