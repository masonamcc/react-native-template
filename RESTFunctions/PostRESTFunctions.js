import {ip} from '../index'


//#region User's Posts
export const getUserPosts = async (username) => {
    console.log('getMyPosts initiated...)')
    const response = await fetch(`http://${ip}:9090/posts/user/username/${username}`)
    if (!response.ok) {
        console.log('no resposne')
    }
    // console.log('have response: ', response)
    const userPosts = await response.json();
    console.log('have response: ', userPosts)
    userPosts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    // console.log('My Posts: ', myPosts)
    return Array.isArray(userPosts) ? userPosts : [];
}

//#region My Posts

// Delete Post
export const deleteMyPost = async(postId) => {
    console.log('deletePost with ID: ', postId)
    const response = await fetch(`http://${ip}:9090/deletePost/${postId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const reply = response.text()
    return reply
}