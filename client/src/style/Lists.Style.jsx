import { StyleSheet, StatusBar } from "react-native";

const Styles = StyleSheet.create({
    container: {
        backgroundColor: "#f7fafc",
        minHeight: "100%",
        padding: 12
    },
    elementRow: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 15,
        marginVertical: 5,
        backgroundColor: "white",
        borderRadius: 10,
        padding: 10,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#dedede",
    },
    elementIcon: {
        flexGrow: 0,
    },
    elementInfoContainer: {
        flexGrow: 1,
    },
    elementTitle: {
        fontWeight: 'bold',
        fontSize: '16px',
    },
    elementDescription: {
        color: '#a0aec0',
        fontSize: '12px',
    },
});

export default Styles;
