import {StyleSheet} from "react-native";

export const sectionStyles = StyleSheet.create({
    sectionA: {
        backgroundColor: "white",
        height: "100%",
        width: "100%",
        padding: 20,
        marginBottom: 5
    },
    loginSection: {
        height: '100%',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1
    },
    signUp: {
        justifyContent: 'space-between',
        alignItems: 'center',
        // flex: 1,
        height: '100%',
        // width: '100%',
        // padding: 200,
        backgroundColor: '#cfcfcf'
    },

    loginMiddle: {
        width: '100%',
        // height: 350,
        padding: 50,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    setupContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        // flex: 1,
        height: '100%',
        width: '100%',
    },
    signUpMiddle: {
        width: '75%',
        height: '30%',
        // paddingVertical: 200,
        justifyContent: 'center',
        alignItems: 'center',
        // paddingVertical: 50,
        // flex: 1,
        // backgroundColor: 'green'

    }
})