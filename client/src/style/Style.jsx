import { StyleSheet, StatusBar } from "react-native"

const backgroundColor = "#f7fafc"

const Styles = StyleSheet.create({
  lineStyle: {
    borderWidth: 0.3,
    borderColor: "#dfe1e5",
    margin: 10,
    width: "80%",
  },
  container: {
    backgroundColor: "#f7fafc",
    minHeight: "100%",
    width: "100%",
    padding: 12
  },
  headerImage: {
    width: 210,
    height: 200,
    alignSelf: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: '20px',
    textAlign: "left",
    fontWeight: "bold",
  },
  userContainer: {
    width: "100%",
    height: "95%",
    justifyContent: "center",
    alignItems: "center",
  },
  containerSurvey: {
    height: "130%",
    backgroundColor: "#e2e2e2",
    marginTop: StatusBar.currentHeight || 0,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  TextInput: {
    padding: 10,
    paddingStart: 30,
    height: 50,
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: "auto",
    borderRadius: 30,
    backgroundColor: "#f3f3f3",
    width: 300,
  },
  TextInput2: {
    padding: 10,
    paddingStart: 30,
    height: 50,
    borderRadius: 30,
    backgroundColor: "#f3f3f3",
    width: 300,
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
    marginTop: 30,
  },

  btn: {
    marginVertical: 10,
    marginHorizontal: "auto",
    width: "80%",
    borderRadius: 30,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#a9b4b4",
  },

  loginBtn: {
    marginVertical: 5,
    width: "80%",
    borderRadius: 30,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#a9b4b4",
  },
  containerViews: {
    // height: "100%",
    backgroundColor: "#e2e2e2",
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },

  statiticsKey: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: "7px",
  },
  statiticsValue: {
    fontSize: 18,
    fontWeight: 100,
    textDecorationLine: "none",
    marginLeft: "7px",
  },

  containerModal: {
    //  flex: 1,
    height: "90%",
    width: "95%",
    marginHorizontal: "auto",
    marginVertical: "auto",
    alignItems: "center",
    justifyContent: "center",
  },
  imageNavbar: {
    width: 70,
    height: 45,
  },
  singleListItem: {
    width: "100%",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  singleItem: {
    width: "100%",
    justifyContent: "space-around",
    flex: 1,
    flexDirection: "row",
  },

  viewUser: {
    width: "100%",
    height: "100%",
  },

  image: {
    marginBottom: 40,
    width: 300,
    height: 200,
  },

  TextInput2: {
    padding: 10,
    paddingStart: 30,
    height: 50,
    borderRadius: 30,
    backgroundColor: "#f3f3f3",
    width: 300,
  },

  forgot_button: {
    alignSelf: "flex-end",
    width: "100%",
    color: "#0052cc",
    fontWeight: "bold",
    height: 30,
    marginBottom: 10,
    marginTop: 10,
  },

  btn: {
    marginVertical: 10,
    marginHorizontal: "auto",
    width: "80%",
    borderRadius: 30,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#a9b4b4",
  },

  loginBtn: {
    color: "white",
    marginVertical: 1,
    width: "70%",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0065ff",
  },
  button_question: {
    height: 30,
    marginBottom: 30,
    marginTop: 30,
    backgroundColor: "#a9b4b4",
  },
  imageUser: {
    marginTop: 20,
    marginBottom: 20,
    width: 150,
    height: 150,
    borderRadius: 70,
  },
  navBar: {
    width: "100%",
    height: "5%",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  h1: {
    fontSize: 30,
    fontWeight: "900",
  },
  email: {
    width: "auto",
    height: "50%",
  },
  loginOut: {
    width: "auto",
    marginBottom: 10,
    marginTop: 10,
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#a9b4b4",
  },

  descriptionInput: {
    height: "35%",
    width: "95%",
    justifyContent: "center",
  },
  inputButton: {
    width: "auto",
    padding: 10,
    marginHorizontal: "auto",
    marginVertical: 5,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#a9b4b4",
  },
  input: {
    height: "50%",
    width: "100%",
    marginHorizontal: "auto",
    alignContent: "flex-start",
    borderWidth: 1,
    paddingLeft: 10,
  },
  pauseSwitch: {
    width: "95%",
    height: "10%",
    justifyContent: "center",
    alignItems: "center",
  },
  selectClient: {
    width: "95%",
    height: "55%",
    justifyContent: "center",
  },

  containerDelete: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },

  item: {
    backgroundColor: "#e2e2e2",
    padding: 10,
    marginVertical: 6,
    marginHorizontal: 10,
  },
  subtitle: {
    fontSize: 16,
  },
  icons: {
    fontSize: 25,
    alignItems: "left",
  },
  false: {
    float: "right",
    color: "red",
    marginRight: "10px",
    fontSize: 25,
    position: "relative",
    right: "0",
  },
  true: {
    float: "right",
    color: "green",
    marginRight: "10px",
    fontSize: 25,
    position: "absolute",
    right: "1",
  },

  TextInputQuestion: {
    marginLeft: 30,
    padding: 10,
    paddingStart: 50,
    height: 50,
    marginTop: 10,
    borderRadius: 30,
    backgroundColor: "#f3f3f3",
    width: 300,
  },
})

export default Styles
