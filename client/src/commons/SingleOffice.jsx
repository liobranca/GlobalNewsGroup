import axios from "axios"
import React from "react"
import { useState } from "react"
import { useEffect } from "react"
import { View, Text, TouchableOpacity, Modal, Image } from "react-native"
import ListUser from "./ListUser"
import close from "../assets/close1.png"
import ListUsers from "./ListUsers"
import { useSelector } from "react-redux"
import Styles from "../style/Style"
import { DeleteOutlined } from "@ant-design/icons"

const SingleOffice = ({ route }) => {
  const { id } = route.params
  const [modelOpen, setModelOpen] = useState(false)
  const [office, setOffice] = useState({})
  const [users, setUsers] = useState([])
  const [includedUsers, setIncludedUsers] = useState({})

  const render = useSelector((state) => state.render)

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/offices/single?id=${id}`)
      .then((res) => {
        setOffice(res.data)
        setIncludedUsers(res.data.users)
      })
    axios.get(`http://localhost:8080/api/user/`).then((res) => {
      setUsers(res.data)
    })
  }, [render])

  return (
    <>
      <TouchableOpacity
        onPress={() => setModelOpen(!modelOpen)}
        style={Styles.btn}
      >
        <Text>Agregar usuario a la oficina</Text>
      </TouchableOpacity>
      <Modal animationType="slide" visible={modelOpen} transparent>
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(1,1,1 0.5)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{ height: "80%", width: "90%", backgroundColor: "#FFF" }}
          >
            <View
              style={{
                height: 45,
                width: "100%",
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
            >
              <TouchableOpacity onPress={() => setModelOpen(!modelOpen)}>
                <Image source={close} style={{ width: 40, height: 40 }} />
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: "100%",
                height: "5%",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <Text
                style={{
                  width: "25%",
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Nombre{" "}
              </Text>
              <Text
                style={{
                  width: "25%",
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Apellido{" "}
              </Text>
              <Text
                style={{
                  width: "25%",
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Email{" "}
              </Text>
              <Text
                style={{
                  width: "25%",
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                "Boton"{" "}
              </Text>
            </View>
            {users[0] ? (
              users.map((user, i) => (
                <ListUsers
                  key={i}
                  office={office}
                  user={user}
                  render={render}
                ></ListUsers>
              ))
            ) : (
              <>
                <Text>No hay usuarios </Text>
              </>
            )}
          </View>
        </View>
      </Modal>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingVertical: "10px",
          borderWidth: 1,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: "10px" }}>
          Email
        </Text>

        <Text style={{ fontSize: 20, fontWeight: "bold", marginRight: "5px" }}>
          Nombre
        </Text>

        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Apellido</Text>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginRight: "10px" }}>
          <DeleteOutlined />
        </Text>
      </View>
      {includedUsers[0] ? (
        <View>
          {includedUsers.map((user, i) => (
            <ListUser
              key={i}
              office={office}
              id={user.id}
              email={user.email}
              firstname={user.firstName}
              lastname={user.lastName}
              render={render}
            />
          ))}
        </View>
      ) : (
        <View>
          <Text style={{ margin: "10px" }}>No hay usuarios</Text>
        </View>
      )}
    </>
  )
}

export default SingleOffice
