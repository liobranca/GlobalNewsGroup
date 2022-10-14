import React from "react"
import { UserAddOutlined } from "@ant-design/icons"
import { Text, TouchableOpacity, View } from "react-native"
import axios from "axios"
import { useDispatch } from "react-redux"
import { switchRender } from "../../store/render"
function ListUsers({ user, office, render }) {
  const dispatch = useDispatch()
  async function handleAdd() {
    try {
      axios.post(
        `http://localhost:8080/api/relaciones/relacionOfficeUser?idOffice=${office.id}&idUser=${user.id}`
      )
      dispatch(switchRender(!render))
    } catch {}
  }
  return (
    <View
      style={{
        width: "100%",
        height: "5%",
        flexDirection: "row",
        justifyContent: "space-around",
      }}
    >
      <Text>{user.firstName} </Text>
      <Text>{user.lastName} </Text>
      <Text>{user.email} </Text>
      <TouchableOpacity onPress={handleAdd}>
        <UserAddOutlined />
      </TouchableOpacity>
    </View>
  )
}

export default ListUsers
