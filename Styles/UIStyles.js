
import {StyleSheet} from "react-native";


export const uiStyles = StyleSheet.create({
    header: {
        width: '100%',
        height: 60,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-between',
        display: "flex",
        flexDirection: 'row',
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e5e5'
    },

    // Cards
    card: {
        height: '150',
        width: '50%',
        backgroundColor: '#f5f5f5',
        padding: 20,
        flex: 1,
        color: '#fff',
        borderRadius: 10
    },
    mainCard: {
        height: '150',
        width: '100%',
        backgroundColor: '#f5f5f5',
        padding: 20,
        flex: 1,
        // display: 'flex',
        color: '#fff',
        borderRadius: 10,
        flexDirection: 'column',
        justifyContent: "space-between"
    },
    cardContainer: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 16,
    },
    digCardHeader: {
        // flex: 1,
        flexDirection: 'column',
        alignItems: 'left',
        justifyContent: 'space-between',
        // backgroundColor: 'red'
    },
    input: {
        height: 50,
        width: '100%',
        borderColor: 'white',
        borderWidth: 1,
        marginBottom: 15,
        borderRadius: 8,
        paddingHorizontal: 10,
        color: '#373737'
    },
    // Buttons
    button: {
        backgroundColor: 'white',
        paddingTop: 10,
        paddingBottom: 10,
        paddingHorizontal: 25,
        borderRadius: 8,
        marginTop: 10
    },

    //Post elements
    postFeed: {
        width: '100%',
        height: 'auto',
        // backgroundColor: 'red'
    },

    postEl: {
        // flex: 1,
        padding: 20,
        width: '100%',
        borderBottomWidth: 1,
        borderColor: '#e5e5e5',
        // height: 200,
        // display: 'flex'
        // backgroundColor: 'green'
    },
    postInput: {
        height: 100,
        width: '100%',
        borderColor: '#e5e5e5',
        borderWidth: 1,
        marginBottom: 15,
        borderRadius: 8,
        paddingHorizontal: 10,
        justifyContent: 'top',
        padding: 10,
        // backgroundColor: 'blue'
    },
    postButton: {
        backgroundColor: 'black',
        paddingTop: 10,
        paddingBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 8,
        width: 'auto'
    },
    postContainer: {
        borderBottomWidth: 1,
        borderColor: '#e5e5e5',
        padding: 20,
        flexDirection: 'row',
        maxWidth: '100%',
        // gap: 20,
        flex: 1,
        // backgroundColor: 'red',
    },
    postBodyContainer: {
        // backgroundColor: 'red',
        // width: '100%'
        flex: 1
    },
    postHeaderBar: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'start'
    },
    postBody: {
        flexDirection: 'column',
        width: 'auto',
        flex: 1,
        justifyContent: 'space-between',
    },
    postEngagementView: {
        marginBottom: 10,
        flexDirection: 'row',
    },
    newTroveButton: {
        backgroundColor: 'black',
        paddingTop: 10,
        paddingBottom: 10,
        paddingHorizontal: 25,
        borderRadius: 8,
    },

    // Profile Elements
    profileHeader: {
        minHeight: 'auto',
        borderBottomWidth: 1,
        borderBottomColor: '#e5e5e5',
        flexDirection: 'row',
        padding: 20,
        width: '100%',
        // backgroundColor: 'red',
        display: 'flex',
        // gap:20
    },
    profileSubHeader: {
        // minHeight: 150,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e5e5',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    profileFeed: {
        height: '100%',
        width: '100%',
        flex: 1,
        flexDirection: 'column',
        display: 'flex',
        // backgroundColor: 'blue'
    },
    profilePosts: {
        width: '50%',
        height: '100%',
        // borderRightWidth: 1,
        // borderRightColor: '#e5e5e5',
        backgroundColor: '#fff'
    },
    profileStatsContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: "space-between",
        flex: 1
    },
    profileStat: {
        width: '30%',
        alignItems: 'center'
    },
    profilePicture: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'blue'
    },
    smallProfilePicture: {
        width: 40,
        height: 40,
        borderRadius: 50,
        backgroundColor: 'blue',
        marginRight: 20
    },
    // profileTroves: {
    //     width: '50%',
    //     height: 800,
    //     backgroundColor: '#272727',
    //     padding: 20
    // },
    searchBar: {
        backgroundColor: '#e5e5e5',
        padding: 20,
        borderRadius: 50,
        width: '100%'
    },
    searchResultContainer: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e5e5',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20
    },
    menuItem: {
        width: '100%'
    },
    horizontalNavContainer: {
        // height: 25,
        flexDirection: 'row',
        justifyContent: 'start',
        padding: 20
    },
    horizontalNavItem: {
        backgroundColor: '#e5e5e5',
        borderRadius: 50,
        padding: 10,
        paddingHorizontal: 20,
        marginRight: 20
    },
    horizontalNavItemText: {
        fontWeight: 700
    },
    safeView: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'start',
        display: "flex",
        backgroundColor: 'white'
    },
    scrollView: {
        height: '100%',
        width: '100%',
        // backgroundColor: 'red'
    }
})