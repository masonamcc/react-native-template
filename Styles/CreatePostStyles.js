import {StyleSheet} from "react-native";

export const createPostStyles = StyleSheet.create({
    postContainer: {
        alignItems: 'left',
        justifyContent: 'left',
        flex: 1,
        padding: 20
    },
    postHeader: {
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        flex: 1,
        flexDirection: 'row',
        marginBottom: 10
    },
    textarea: {
        height: 200,
        width: '100%',
        borderColor: 'rgba(0,0,0,0)',
        borderWidth: 1,
        // marginBottom: 15,
        borderRadius: 8,
        // paddingHorizontal: 10,
        color: '#373737',
        fontSize: 20,
        // backgroundColor: 'red',
        flex: 1
        // justifyContent: 'left'
    },
    postBody: {
        flexDirection: 'row',
        // backgroundColor: 'green',
        // flex: 1,
        justifyContent: 'start',
        width: '100%',
        // padding: 10

    }

})