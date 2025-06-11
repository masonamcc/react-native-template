import {Dimensions, StyleSheet} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";

const screenHeight = Dimensions.get('window').height;
import safeAreaView from "react-native";


export const uiStyles = StyleSheet.create({
    header: {
        width: '100%',
        height: 'auto',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        top: 0,
        paddingBottom: 20,
        paddingHorizontal: 20
    },
    header1: {
        fontSize: 35,
        fontWeight: 700,
        color: 'white',
        marginBottom: 10
    },
    profileTopGradient: {
        height: '100%',
        width: '100%',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    profileUsername: {
        fontWeight: 700,
        // fontStyle: "italic",
        fontSize: 20,
        color: 'black'
    },
    profileMyName: {
        fontWeight: 500,
        // fontStyle: "italic",
        fontSize: 16,
        color: 'white',
        marginVertical: 10
    },
    profileBio: {
        fontWeight: 300,
        // fontStyle: "italic",
        fontSize: 16,
        color: 'white'
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
        borderColor: 'rgba(0,0,0,.2)',
        borderWidth: 1,
        marginBottom: 15,
        borderRadius: 8,
        paddingHorizontal: 10,
        color: '#000000'
    },
    genericInput: {
        height: 50,
        width: '100%',
        borderColor: 'rgba(0,0,0,.2)',
        borderWidth: 1,
        marginBottom: 15,
        borderRadius: 8,
        paddingHorizontal: 10,
        color: '#000000'
    },
    textarea: {
        height: 100,
        width: '100%',
        borderColor: 'rgba(0,0,0,.2)',
        borderWidth: 1,
        marginBottom: 15,
        borderRadius: 8,
        paddingHorizontal: 10,
        color: '#373737',
        padding: 20
        // justifyContent: 'left'
    },
    // Buttons
    button: {
        backgroundColor: '#e5e5e5',
        paddingTop: 10,
        paddingBottom: 10,
        paddingHorizontal: 25,
        borderRadius: 8,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center'
        // flex: 1

    },
    buttonAccent: {
        backgroundColor: '#0079ff',
        paddingTop: 10,
        paddingBottom: 10,
        paddingHorizontal: 25,
        borderRadius: 50,
        // marginTop: 10,
        // width: 200,
        alignItems: 'center'
    },
    buttonAccentText: {
        color: '#fff',
        fontWeight: 700,
        fontSize: 16
    },

    // Contains all posts
    masterPostContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        height: 'auto',
    },
    //Post elements
    postFeed: {
        width: '100%',
        height: 'auto',
    },
    spotlightContainer: {
        width: '25%',
        justifyContent: 'column'

    },
    spotlight: {
        width: '100%',
        aspectRatio: 9 / 16,
        marginRight: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        marginBottom: 10
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

    // The individual post containers
    postContainer: {
        marginBottom: 10,
        flexDirection: 'row',
        height: 'auto',
    },

    // Containing all elements of the post
    postBodyContainer: {
        height: 'auto',
        flex: 1
    },

    // The header of the post
    postHeaderBar: {
        height: 'auto',
        // width: '100%',
        flexDirection: 'row',
        // flex: 1,
        justifyContent: 'space-between',
        alignItems: 'start',
    },

    // The mess
    postBody: {
        flexDirection: 'column',
        width: 'auto',
        height: 'auto',
        // flex: 1,
        // justifyContent: 'space-between',
        marginTop: 10,
    },

    // Create Post
    createPostContainer: {
        paddingHorizontal: 20
    },

    createPostHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    createPostBody: {
        flexDirection: 'row',
        width: 'auto',
        flex: 1,
        justifyContent: 'space-between',
        marginTop: 10,
        // backgroundColor: 'red'
    },


    // The footer of the post
    postFooter: {},
    postEngagementView: {
        marginBottom: 10,
        flexDirection: 'row',
    },

    postMessage: {
        fontWeight: 400,
        fontSize: 16,
        color: '#000',
        paddingVertical: 10,
        width: '95%',
        marginBottom: 10
        // flex: 1
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
        minHeight: 80,
        // backgroundColor: 'red',

        flexDirection: 'column',
        paddingHorizontal: 20,
        paddingTop: 20,
        width: '100%',

        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'

    },
    profileHeaderContainer: {
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
    },
    profileIdentityContainer: {
        flexDirection: 'row',
        width: '100%'
        // justifyContent: center
    },
    profileStatsContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: "space-between",
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 50,
        padding: 10
    },
    profileSubHeader: {
        // minHeight: 150,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e5e5',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    activeTabContentContainer: {
        height: 'auto',
        width: '100%',
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        display: 'flex',
        // backgroundColor: 'red',
        paddingBottom: 100,
        paddingTop: 3
    },
    activeTabContentHeader: {
        // height: 'auto',
        width: '100%',
        // flex: 1,
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'space-between',
        padding: 20,
        gap: 10,
        // backgroundColor: 'red'
    },
    activeTabContentHeaderItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderWidth: 1,
        borderColor: '#e5e5e5',
        borderRadius: 50,
        padding: 10,
        paddingHorizontal: 20
    },
    activeTabContentHeaderItemText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 700
    },
    profilePosts: {
        width: '50%',
        height: '100%',
        // borderRightWidth: 1,
        // borderRightColor: '#e5e5e5',
        backgroundColor: '#fff'
    },

    profileStat: {
        width: '30%',
        alignItems: 'center'
    },
    profilePicture: {
        width: 100,
        // height: 100,
        aspectRatio: 1,
        borderRadius: 200,
        marginBottom: 20,
        backgroundColor: 'white',
        marginRight: 20,
        borderWidth: 1
    },
    smallProfilePicture: {
        width: 30,
        height: 30,
        borderRadius: 50,
        backgroundColor: 'black',
        marginRight: 10
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
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'start',
        padding: 20,
        // backgroundColor: 'orange'
    },
    horizontalNavItem: {
        backgroundColor: 'rgba(0,0,0,.5)',
        borderRadius: 50,
        padding: 10,
        paddingHorizontal: 20,
        marginRight: 20
    },
    horizontalNavItemText: {
        fontWeight: 700,
        color: 'white',
        fontSize: 16
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
    },
    chooseUsernameContainer: {
        // flex: 1,
        width: '100%',
        height: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    backgroundVideoContainer: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        zIndex: -1,
        top: 0,
        backgroundColor: 'white'
    },
    backgroundVideo: {
        height: '100%',
        width: '100%',
        backgroundColor: 'white'
    },
    profileBackgroundVideoPreview: {
        height: 200,
        aspectRatio: 9 / 16,
        borderWidth: 1,
        borderColor: '#e5e5e5',
        zIndex: -1,
    },
    toggleContainer: {
        borderWidth: 1,
        borderColor: '#b5b5b5',
        borderRadius: 20,
        // padding: 4, // optional: gives breathing room
        alignSelf: 'flex-start', // or 'center' depending on layout
        // width: 100,

    },


    // Menu Item Styles
    menuItemContainer: {
        justifyContent: "space-between",
        flexDirection: 'row',
        width: '100%',
        borderTopWidth: 1,
        borderColor: '#e5e5e5',
        padding: 20
    },
    menuItemContainerInput: {
        justifyContent: "space-between",
        flexDirection: 'column',
        width: '100%',
        borderTopWidth: 1,
        borderColor: '#e5e5e5',
        padding: 20
    },
    menuItemText: {
        width: '75%'
    },
    menuItemTitle: {
        fontSize: 16,
        fontWeight: 700,
        marginBottom: 10
    },
    menuItemDescription: {
        color: '#9a9a9a',
        fontSize: 14,
        marginBottom: 10
    },

    // Columns

    twoColumns: {
        maxWidth: 600,
        // backgroundColor: 'red',
        flexDirection: 'row',
        justifyContent: "flex-start",
        padding: 20,
        flex: 1,
        // gap: 10
    },
    columnHalfLeft: {
        // flex: 1,
        // backgroundColor: 'blue',
        width: '50%',
        marginRight: 10
    },
    columnHalf: {
        width: 'auto',
        // backgroundColor: 'green',
        flex: 1,
        // width: 'auto'
        height: '100%',
        gap: 10
    },

    // Contains my troves
    troveListingContainer: {
        backgroundColor: 'white',
        // height: '100%',
        width: '99%',
        // padding: 20,
        flex: 1,
        flexDirection: 'row',
        padding: 1,
        justifyContent: 'center'
    },
    troveListing: {
        // height: 200,
        maxWidth: '33%',
        aspectRatio: 9/16,
        backgroundColor: 'blue',
        marginRight: 1,
        // alignItems: 'bottom',
        // marginBottom: 10,
        // borderColor: '#e5e5e5',
        borderWidth: 1,
        // borderRadius: 10,
        padding: 10,
        flex: 1,
        justifyContent: 'flex-end'
    },
    troveListingCover: {
        // height: '100%',
        flex: 1,
        // top:10
        // backgroundColor: 'red',
        position: 'absolute'
    },
    troveListingFooter: {
        flexDirection: 'row',
        justifyContent: "flex-end"
    },
    troveListingTitle: {
        fontSize: 12,
        fontWeight: 700
    },
    troveBannerImagePreview: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        // height: 200,
        // padding: 100,
        backgroundColor: '#e5e5e5',
        borderRadius: 25,
        aspectRatio: 16 / 9,
    },
    troveSectionHeader: {
        alignItems: 'center',
        width: '100%',
        justifyContent: 'center',
        marginBottom: 20
    },
    troveSectionHeaderText: {
        fontSize: 25,
        fontWeight: 700,
    },
    troveScrollView: {
        height: screenHeight
    },
    troveBackgroundVideoContainer: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        zIndex: -1,
        // flex: 1,
        // top: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    troveCoverUpload: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        aspectRatio: 9 / 16,
        // padding: 100,
        backgroundColor: '#e5e5e5',
        // borderRadius: 25
    },
    troveDescriptionInput: {
        height: 'auto',
        width: '100%',
        borderColor: 'white',
        borderWidth: 1,
        // marginBottom: 15,
        borderRadius: 20,
        padding: 20,
        flex: 1,
        // paddingHorizontal: 10,
        color: '#373737',
        backgroundColor: '#f1f1f1',
        fontSize: 16
    },
    troveDetailsMasterContainer: {
        height: screenHeight * .75,
        width: '100%',
        // alignItems: 'center'
        flex: 1,
        justifyContent: 'flex-end',
        // backgroundColor: 'green'
    },
    troveDetailsHeroContainer: {
        // alignItems: 'center',
        height: '100%',
        // backgroundColor: 'green',
        padding: 20,
        justifyContent: 'flex-end',
        // flex: 1
    },
    troveDetailsHero: {
        // width: '80%',
        // height: '100%',
        // padding: 20,
        // backgroundColor: 'blue',
        justifyContent: 'center'
    },
    troveDetailsHeroFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // alignItems: 'center'
    },
    troveDetailsContentContainer: {
        justifyContent: 'center',
        minHeight: 150,
        padding: 20,
        backgroundColor: 'white'
    },

    troveFullscreenToggle: {
        // backgroundColor: 'red',
        height: 'auto'
    }
})