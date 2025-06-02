
import {StyleSheet} from "react-native";


export const uiStyles = StyleSheet.create({
    header: {
        width: '100%',
        // height: '5%',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-between',
        display: "flex",
        flexDirection: 'row',
        paddingBottom: 10,
        paddingLeft: 20,
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
    digCard: {
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
        color: 'white'
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
        padding: 10
    },
    button: {
        backgroundColor: 'white',
        paddingTop: 10,
        paddingBottom: 10,
        paddingHorizontal: 25,
        borderRadius: 8,
        marginTop: 10
    },
    postEl: {
        flex: 1
    },
    postButton: {
        backgroundColor: 'black',
        paddingTop: 10,
        paddingBottom: 10,
        paddingHorizontal: 25,
        borderRadius: 8,
    }
})