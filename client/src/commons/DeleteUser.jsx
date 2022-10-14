import axios from "axios"
import { useEffect, useState } from "react"
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import Styles from "../style/Style"
import { useNavigation } from "@react-navigation/native"
import { showAlert, closeAlert } from "react-native-customisable-alert"

import GlobalStyle from "../style/Style"

const Item = function ({ name, email, id, setRefresh }) {
  const navigation = useNavigation()
  const handleDelete = () => {
    axios
      .delete(`http://localhost:8080/api/user/${id}`)
      .then((r) => setRefresh(r.data))
      .catch((err) => console.error("User invalid", err))
  }
  const ButtonAlert = () => {
    return showAlert({
      title: "Eliminar",
      message: "¿Desea eliminar el usuario?",
      alertType: "warning",
      btnLabel: "Confirmar",
      leftBtnLabel: "Cancelar",
      onPress: () => {
        handleDelete(), closeAlert()
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
          onPress={ButtonAlert}
          style={{ position: "absolute", right: "0" }}
        >
          <DeleteOutlined style={Styles.icons} />
        </TouchableOpacity>
      </View>
      <Text style={Styles.subtitle}>{email}</Text>
    </View>
  )
}

const DeleteUser = () => {
  const [refresh, setRefresh] = useState(false)
  const [users, setUsers] = useState([])
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/user`)
      .then((r) => setUsers(r.data))
      .catch((err) => console.error("User invalid", err))
  }, [refresh])

  const renderItem = ({ item }) => (
    <View>
      <Item
        name={item.firstName + "  " + item.lastName}
        email={item.email}
        id={item.id}
        setRefresh={setRefresh}
      />
    </View>
  )

  return (
    <SafeAreaView style={{ ...GlobalStyle.container }}>
      <View style={{ alignItems: "center" }}>
        <Text style={Styles.title}>Eliminacion de usuarios</Text>
      </View>
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  )
}

export default DeleteUser
