import {StyleSheet} from "react-native";


export const uniStyles = StyleSheet.create({
    centerChildren: {
        justifyContent: "center",
        alignItems: "center",
        minHeight: '100%',
        width: "100%",
        textAlign: "center",
        // backgroundColor: "red",
    },
    fontSize3: {
        fontSize: 40,
        fontWeight: 700,
        color: "#cacaca"
    },

    // *** Sizing *** //
    fullwidth: {
        width: '100%'
    },
    width50: {
        width: '50%'
    },
    width75: {
        width: '75%'
    },

    // Padding //
    py1: {
        paddingBlock: 10
    },
    py1_5: {
        paddingBlock: 15
    },
    py2: {
        paddingBlock: 20
    },
    py2_5: {
        paddingBlock: 25
    },
    py3: {
        paddingBlock: 30
    },
    py3_5: {
        paddingBlock: 35
    },

    // *** Buttons *** //
    btnBlue: {
        backgroundColor: '#006dff',
        paddingBlock: 10,
        paddingInline: 10,
        borderRadius: 8,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40
        // flex: 1
    },
    btnText: {
        fontSize: 15,
        fontWeight: 700
    },



    // *** Colors *** //

    // Backgrounds //
    bgWhite: {
        backgroundColor: '#ffffff'
    },

    black: {
        backgroundColor: '#000000',
    },
    // Colors //
    white: {
        color: '#ffffff'
    },
    accent: {
        color: '#fbb600'
    },

    // *** Fonts *** //

    // Sizes //
    h1: {
        fontSize: 40,
        marginBottom: 10
    },
    h2: {
        fontSize: 35,
        marginBottom: 10
    },
    h3: {
        fontSize: 30,
        marginBottom: 10
    },
    h4: {
        fontSize: 25,
        marginBottom: 10
    },
    h5: {
        fontSize: 20,
        marginBottom: 10
    },

    // Weights //
    fontWeight400: {
        fontWeight: 400
    },
    fontWeight500: {
        fontWeight: 500
    },
    fontWeight600: {
        fontWeight: 600
    },
    fontWeight700: {
        fontWeight: 700
    },
    fontWeight800: {
        fontWeight: 800
    },



})