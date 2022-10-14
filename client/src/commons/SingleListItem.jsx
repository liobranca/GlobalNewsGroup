import axios from "axios"
import React, { useState } from "react"
import { useEffect } from "react"
import {
  Button,
  Image,
  Modal,
  SafeAreaView,
  Switch,
  TextInput,
  TouchableOpacity,
  View,
  Text,
} from "react-native"
import FontAwesome from "react-native-fontawesome"

import SelectList from "react-native-dropdown-select-list"
import Styles from "../style/Style"
import close from "../assets/close1.png"
import ListClient from "./ListClient"
import { switchRender } from "../../store/render"
import { useDispatch, useSelector } from "react-redux"

function SingleListItem({ route }) {
  const { id } = route.params
  const [list, setList] = useState([])
  const [client, setClient] = useState([])
  const [modelOpen, setModelOpen] = useState(false)
  const [text, setText] = useState("Cambiar descripción")
  const [selectedClient, setSelectedClient] = useState("")
  const [data, setData] = useState([])
  const dispatch = useDispatch()
  const render = useSelector((state) => state.render)

  const toggleSwitch = () => {
    axios.put(`http://localhost:8080/api/lists/modify?id=${id}`, {
      paused: !list.paused,
    })
    dispatch(switchRender(!render))
  }

  const handleModifyDescription = () => {
    axios.put(`http://localhost:8080/api/lists/modify?id=${id}`, {
      description: text,
    })
    dispatch(switchRender(!render))
  }

  const handleAddClient = () => {
    axios.post(
      `http://localhost:8080/api/relaciones/relacionListaCliente?idClient=${selectedClient}&idList=${list.id}`
    )
    dispatch(switchRender(!render))
  }

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/lists/singleList/${id}`)
      .then((res) => {
        setList(res.data)
        setClient(res.data.clients)
      })
    axios.get(`http://localhost:8080/api/clients/`).then((res) => {
      let newArray = res.data.map((client) => {
        return { key: client.id, value: client.fullName }
      })
      setData(newArray)
    })
  }, [render])
  return (
    <View style={{ backgroundColor: "#e2e2e2", flex: 1 }}>
      <TouchableOpacity
        style={{
          marginHorizontal: "auto",
          marginTop: 10,
          width: "80%",
          borderRadius: 30,
          height: 50,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#a9b4b4",
        }}
        onPress={() => setModelOpen(!modelOpen)}
      >
        <Text>Modificar lista</Text>
      </TouchableOpacity>
      <Modal animationType="slide" visible={modelOpen} transparent>
        <View
          style={{
            height: "85%",
            width: "95%",
            marginHorizontal: "auto",
            marginVertical: "auto",
            backgroundColor: "#FFF",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          <View
            style={{
              height: "10%",
              width: "100%",
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={() => setModelOpen(!modelOpen)}>
              <Image source={close} style={{ width: 40, height: 40 }} />
            </TouchableOpacity>
          </View>
          <View style={Styles.containerModal}>
            <SafeAreaView style={Styles.descriptionInput}>
              <TextInput
                style={Styles.input}
                onChangeText={setText}
                value={text}
              />
              <TouchableOpacity
                style={Styles.inputButton}
                onPress={handleModifyDescription}
              >
                <Text>Modificar descripción</Text>
              </TouchableOpacity>
            </SafeAreaView>
            <View style={Styles.pauseSwitch}>
              {list.paused ? (
                <Text>Despausar lista</Text>
              ) : (
                <Text>Pausar lista</Text>
              )}

              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={list.paused ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={list.paused}
              />
            </View>
            <View style={Styles.selectClient}>
              <SelectList
                setSelected={setSelectedClient}
                data={data}
                placeholder={"Seleccione al cliente"}
                arrowicon={
                  <FontAwesome name="chevron-down" size={12} color={"black"} />
                }
                searchicon={
                  <FontAwesome name="search" size={12} color={"black"} />
                }
                search={false}
                boxStyles={{ borderRadius: 0 }}
                onSelect={() => console.log(selectedClient)}
              />
              <TouchableOpacity
                style={Styles.inputButton}
                onPress={handleAddClient}
              >
                <Text>Agregar cliente</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          marginLeft: "10px",
          marginTop: "10px",
        }}
      >
        Descripción:
      </Text>
      <Text
        style={{
          marginVertical: "10px",
          marginLeft: "10px",
        }}
      >
        {list.description}
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingVertical: "10px",
          borderWidth: 1,
        }}
      >
        {/* <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: "10px" }}>
          Id
        </Text> */}

        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            marginRight: "5px",
            marginLeft: "13px",
          }}
        >
          Clientes
        </Text>

        <Text style={{ fontSize: 20, fontWeight: "bold" }}></Text>
      </View>
      {client[0] ? (
        <View>
          {client.map((cliente, i) => (
            <ListClient key={i} client={cliente} list={list} render={render} />
          ))}
        </View>
      ) : (
        <View>
          <Text style={{ margin: "10px" }}>No hay clientes</Text>
        </View>
      )}
    </View>
  )
}

export default SingleListItem
