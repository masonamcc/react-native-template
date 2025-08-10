import {StyleSheet} from "react-native";

export const gridStyles = StyleSheet.create({
    grid3: {
        width: "100%",
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 20
        // paddingVertical: 10
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr'
    }
})