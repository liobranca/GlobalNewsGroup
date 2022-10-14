import axios from "axios"
import { useEffect, useState } from "react"
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
  Image,
  Switch,
} from "react-native"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import Styles from "../style/Style"
import { useNavigation } from "@react-navigation/native"
import close from "../assets/close1.png"
import { useDispatch, useSelector } from "react-redux"
import { switchRender } from "../../store/render"
import { closeAlert, showAlert } from "react-native-customisable-alert"

import GlobalStyle from "../style/Style"

const Item = function ({ name, country, id, paused }) {
  const [modelOpen, setModelOpen] = useState(false)
  const [officeName, setOfficeName] = useState(name)
  const [officeCountry, setOfficeCountry] = useState(country)
  const render = useSelector((state) => state.render)
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const ButtonAlert = () => {
    return showAlert({
      title: "Eliminar",
      message: "¿Desea eliminar la oficina?",
      alertType: "warning",
      btnLabel: "Confirmar",
      leftBtnLabel: "Cancelar",
      onPress: () => {
        handleDelete(), closeAlert()
      },
    })
  }
  const handleDelete = () => {
    axios
      .delete(`http://localhost:8080/api/offices/${id}`)
      .then((r) => console.log(r.data))
      .catch((err) => console.error("User invalid", err))
    dispatch(switchRender(!render))
  }

  const toggleSwitch = () => {
    axios.put(`http://localhost:8080/api/offices/${id}`, {
      paused: !paused,
    })
    dispatch(switchRender(!render))
  }
  const handleModifyOffice = () => {
    axios.put(`http://localhost:8080/api/offices/${id}`, {
      name: officeName,
      country: officeCountry,
    })
    dispatch(switchRender(!render))
    setModelOpen(!modelOpen)
  }

  const handleModifyOfficeName = (e) => {
    setOfficeName(e.target.value)
  }
  const handleModifyOfficeCountry = (e) => {
    setOfficeCountry(e.target.value)
  }

  return (
    <>
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
          <TouchableOpacity
            onPress={() => navigation.navigate("SingleOffice", { id })}
          >
            <Text style={Styles.title}>{name}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setModelOpen(!modelOpen)}
            style={{ position: "absolute", right: "35px" }}
          >
            <EditOutlined style={Styles.icons} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={ButtonAlert}
            style={{ position: "absolute", right: "0px" }}
          >
            <DeleteOutlined style={Styles.icons} />
          </TouchableOpacity>
        </View>
        <Text style={Styles.subtitle}>{country}</Text>
      </View>
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
            <View style={Styles.containerModal}>
              <SafeAreaView style={Styles.descriptionInput}>
                <Text>Nombre de la oficina: </Text>
                <TextInput
                  style={Styles.input}
                  name="name"
                  type="text"
                  value={officeName}
                  onChange={handleModifyOfficeName}
                />
                <Text>Pais: </Text>
                <TextInput
                  style={Styles.input}
                  name="country"
                  type="text"
                  value={officeCountry}
                  onChange={handleModifyOfficeCountry}
                />
              </SafeAreaView>
              <View style={Styles.pauseSwitch}>
                {paused ? <Text>Inactiva</Text> : <Text>Activa</Text>}

                <Switch
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  thumbColor={paused ? "#f5dd4b" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={paused}
                />
              </View>
              <TouchableOpacity
                style={Styles.inputButton}
                onPress={handleModifyOffice}
              >
                <Text>Confirmar cambios</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  )
}

const DeleteOffice = () => {
  const [offices, setOffices] = useState([])
  const render = useSelector((state) => state.render)
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/offices`)
      .then((r) => {
        console.log(r)
        setOffices(r.data)
      })
      .catch((err) => console.error("User invalid", err))
  }, [render])
  const renderItem = ({ item }) => (
    <View>
      <Item
        country={item.country}
        name={item.name}
        id={item.id}
        paused={item.paused}
      />
    </View>
  )

  return (
    <SafeAreaView style={{ ...GlobalStyle.container }}>
      <View style={{ alignItems: "center" }}>
        <Text style={Styles.title}>Oficinas</Text>
      </View>
      <FlatList
        data={offices.sort((a, b) => a.name - b.name)}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  )
}

export default DeleteOffice
