import {StyleSheet} from "react-native";

export const troveStyles = StyleSheet.create({
    troveCreationContainer: {
        alignItems: 'left',
        justifyContent: 'left',
        flex: 1,
        padding: 20
    },
    troveListingContainer: {
        // backgroundColor: 'red',
        height: '100%',
        padding: 20
    },
    troveListing: {
        height: 100,
        width: '100%',
        // backgroundColor: 'blue',
        marginBottom: 10,
        borderColor: '#e5e5e5',
        borderWidth: 1,
        borderRadius: 20,
        padding: 20
    },
    troveListingTitle: {
        fontSize: 20,
        fontWeight: 700
    },
    troveCoverUpload: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%',
        aspectRatio: 9/16,
        // padding: 100,
        backgroundColor: '#e5e5e5',
        borderRadius: 25
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
    }



})