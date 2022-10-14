import React from "react"
import { TouchableOpacity, View } from "react-native"
import { Text } from "react-native-elements"
import { DeleteOutlined } from "@ant-design/icons"
import axios from "axios"
import { switchRender } from "../../store/render"
import { useDispatch } from "react-redux"
import { closeAlert, showAlert } from "react-native-customisable-alert"

function ListClient({ client, list, render }) {
  const dispatch = useDispatch()
  const handleDelete = () => {
    axios.post(
      `http://localhost:8080/api/relaciones/removeListaCliente?idClient=${client.id}&idList=${list.id}`
    )
    dispatch(switchRender(!render))
  }
  const ButtonAlert = () => {
    return showAlert({
      title: "Eliminar",
      message: "¿Desea eliminar al cliente?",
      alertType: "warning",
      btnLabel: "Confirmar",
      leftBtnLabel: "Cancelar",
      onPress: () => {
        handleDelete(), closeAlert()
      },
    })
  }

  return client.id ? (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: "25px",
      }}
    >
      {/* <Text style={{ margin: "10px", fontWeight: "bold" }}> {client.id} </Text> */}
      <Text style={{ margin: "10px" }}> {client.fullName} </Text>
      <Text style={{ margin: "10px" }}>
        <TouchableOpacity onPress={ButtonAlert}>
          <DeleteOutlined style={{ fontSize: "20px" }} />{" "}
        </TouchableOpacity>
      </Text>
    </View>
  ) : (
    <View>
      <Text>Cargando clientes</Text>
    </View>
  )
}

export default ListClient
