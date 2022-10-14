import axios from "axios"
import { useEffect, useState } from "react"
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  TextInput,
  Switch,
} from "react-native"
import { EditOutlined } from "@ant-design/icons"
import Styles from "../style/Style"
import { useNavigation } from "@react-navigation/native"
import { CheckBox } from "react-native-elements"
import { useDispatch, useSelector } from "react-redux"
import { switchRender } from "../../store/render"
import { closeAlert, showAlert } from "react-native-customisable-alert"

import FormStyles from "../style/Forms.Style"
import GlobalStyle from "../style/Style"

const Item = function ({
  name,
  email,
  id,
  firstname,
  lastname,
  admin,
  render,
}) {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [edit, setEdit] = useState(false)
  const [editEmail, setEditEmail] = useState(email)
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState(firstname)
  const [lastName, setLastName] = useState(lastname)
  const [adminEdit, setAdminEdit] = useState(admin)
  const handleEdit = () => {
    edit ? setEdit(false) : setEdit(true)
  }
  const sendEditUser = (data) => {
    axios
      .put(`http://localhost:8080/api/user/${id}`, data)
      .then((r) => r.data)
      .catch((err) => console.error("User invalid", err))
  }

  const toggleSwitch = () => {
    axios.put(`http://localhost:8080/api/user/${id}`, {
      admin: !admin,
    })
    dispatch(switchRender(!render))
  }

  const handleSubmit = () => {
    sendEditUser({ email, password, firstName, lastName })
    dispatch(switchRender(!render))
    setEdit(!edit)
    // navigation.navigate("UserOption");
  }

  const ButtonAlert = () => {
    return showAlert({
      title: "Editar",
      message: "¿Confirma los cambios?",
      alertType: "warning",
      leftBtnLabel: "Cancelar",
      btnLabel: "Confirmar",
      onPress: () => {
        handleSubmit(), closeAlert()
      },
    })
  }

  return (
    <View
      style={{
        ...Styles.item,
        backgroundColor: "white",
        borderRadius: 10,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#dedede",
      }}
    >
      <View style={{ flexDirection: "row", width: "100%" }}>
        <Text style={Styles.title}>{name}</Text>
        <TouchableOpacity
          onPress={handleEdit}
          style={{ position: "absolute", right: "0" }}
        >
          <EditOutlined style={Styles.icons} />
        </TouchableOpacity>
      </View>
      <Text style={Styles.subtitle}>{email}</Text>
      {edit ? (
        <View style={Styles.container}>
          <View>
            <TextInput
              style={FormStyles.text}
              defaultValue={email}
              onChangeText={(email) => setEditEmail(email)}
            />

            <TextInput
              style={FormStyles.text}
              placeholder="Contraseña nueva"
              placeholderTextColor="#A9B4B4"
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
            />
            <TextInput
              style={FormStyles.text}
              defaultValue={firstname}
              onChangeText={(firstName) => setFirstName(firstName)}
            />
            <TextInput
              style={FormStyles.text}
              defaultValue={lastname}
              onChangeText={(lastName) => setLastName(lastName)}
            />
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                marginVertical: 10,
                marginHorizontal: 5,
              }}
            >
              <Text style={{ marginRight: 10 }}>Admin:</Text>
              {admin ? <Text>Es admin</Text> : <Text>No es admin</Text>}
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={admin ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={admin}
              />
            </View>
          </View>
          <TouchableOpacity onPress={ButtonAlert} style={FormStyles.button}>
            <Text style={FormStyles.buttonText}>Editar Usuario</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text></Text>
      )}
    </View>
  )
}

const EditUser = () => {
  const [users, setUsers] = useState([])
  const render = useSelector((state) => state.render)
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/user/`)
      .then((r) => setUsers(r.data))
      .catch((err) => console.error("User invalid", err))
  }, [render])

  const renderItem = ({ item }) => (
    <View>
      <Item
        name={`${item.firstName} ${item.lastName}`}
        firstname={item.firstName}
        lastname={item.lastName}
        email={item.email}
        id={item.id}
        admin={item.admin}
        render={render}
      />
    </View>
  )

  return (
    <SafeAreaView style={{ ...GlobalStyle.container }}>
      <View style={{ alignItems: "center" }}>
        <Text style={Styles.title}>Usuarios</Text>
      </View>
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  )
}

export default EditUser
