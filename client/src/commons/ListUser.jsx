import React from "react"
import { TouchableOpacity, View } from "react-native"
import { Text } from "react-native-elements"
import { DeleteOutlined } from "@ant-design/icons"
import axios from "axios"
import { useDispatch } from "react-redux"
import { switchRender } from "../../store/render"

function ListUser({ id, firstname, lastname, render, office, email }) {
  const dispatch = useDispatch()
  async function handleDelete() {
    axios.delete(
      `http://localhost:8080/api/relaciones/relacionOfficeUserDelete?idOffice=${office.id}&idUser=${id}`
    )
    dispatch(switchRender(!render))
  }
  return firstname ? (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: "25px",
      }}
    >
      <Text style={{ margin: "10px", fontWeight: "bold" }}>{email}</Text>
      <Text style={{ margin: "10px", fontWeight: "bold" }}> {firstname} </Text>
      <Text style={{ margin: "10px", fontWeight: "bold" }}> {lastname} </Text>
      <TouchableOpacity onPress={handleDelete}>
        <DeleteOutlined style={{ margin: "10px", fontWeight: "bold" }} />
      </TouchableOpacity>
    </View>
  ) : (
    <View>
      <Text>Cargando usuarios</Text>
    </View>
  )
}

export default ListUser
