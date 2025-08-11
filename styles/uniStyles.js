import {StyleSheet} from "react-native";


export const uniStyles = StyleSheet.create({
    centerChildren: {
        justifyContent: "center",
        alignItems: "center",
        // minHeight: '100%',
        width: "100%",
        textAlign: "center",
        height: 500
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
    safeAreaView: {
        width: '100%',
        height: "100%",
        alignItems: 'center',
        justifyContent: 'start',
        display: "flex",
        backgroundColor: '#ffffff',
    },
    header: {
        display: 'flex',
        width: '100%',
        height: 'auto',
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        top: 0,
        paddingBottom: 10,
    },
    scrollView: {
        height: "100%",
        width: "100%",
        backgroundColor: '#e5e5e5'
    },

    // Padding //
    p1: {
        padding: 10
    },
    py1: {
        paddingBlock: 10
    },
    px1: {
        paddingInline: 10
    },
    py1_5: {
        paddingBlock: 15
    },
    p2: {
        padding: 20
    },
    py2: {
        paddingBlock: 20
    },
    px2: {
        paddingInline: 20
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

    // Margin //
    mb0: {
        marginBottom: 0
    },
    mb1: {
        marginBottom: 10
    },
    mb1_5: {
        marginBottom: 15
    },
    mb2: {
        marginBottom: 20
    },

    // *** Buttons *** //
    btn: {
        paddingBlock: 10,
        paddingInline: 10,
        borderRadius: 8,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40
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
    bgBlack: {
        backgroundColor: '#000000',
    },
    bgBlue: {
        backgroundColor: '#006dff',
    },

    // Accents //
    bgAccent1: {
        backgroundColor: '#ff900c'
    },
    accent1: {
        color: '#fbb600'
    },

    // Colors //
    white: {
        color: '#ffffff'
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

    // *** Elements *** //
    inputOt: {
        height: 50,
        width: '100%',
        borderColor: 'rgba(0,0,0,.2)',
        borderWidth: 1,
        marginBottom: 10,
        borderRadius: 8,
        paddingHorizontal: 10,
        color: '#000000'
    },

    // *** Spacing *** //
    spaceBetween: {
        justifyContent: 'space-between'
    }

})