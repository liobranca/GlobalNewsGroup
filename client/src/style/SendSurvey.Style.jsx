import { StyleSheet } from "react-native";
import Constants from "expo-constants";

export const styles = StyleSheet.create({
  label: {
    color: "black",
    margin: 10,
    marginLeft: 0,
  },
  labelError: {
    color: "red",
    margin: 3,
  },
  button: {
    marginTop: 20,
    color: "white",
    height: 40,
    backgroundColor: "#737373",
    borderRadius: 4,
  },
  container: {
    flex: 1,
    // justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    padding: 5,
    backgroundColor: "#e2e2e2",
  },
  input: {
    backgroundColor: "white",
    borderColor: "none",
    height: 40,
    padding: 10,
    borderRadius: 4,
  },
  input_body: {
    backgroundColor: "white",
    borderColor: "none",
    textAlignVertical: "top",
    height: 120,
    padding: 10,
    borderRadius: 4,
  },
});
