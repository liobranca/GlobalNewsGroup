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
import SelectList from "react-native-dropdown-select-list"
import FontAwesome from "react-native-fontawesome"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import Styles from "../style/Style"
import { useNavigation } from "@react-navigation/native"
import close from "../assets/close1.png"
import { useDispatch, useSelector } from "react-redux"
import { switchRender } from "../../store/render"
import { closeAlert, showAlert } from "react-native-customisable-alert"

const Item = function ({ name, country, id, paused }) {
  const [modelOpen, setModelOpen] = useState(false)
  const [fullName, setFullName] = useState(fullName)
  const [company, setCompany] = useState(company)
  const [area, setArea] = useState(area)
  const [email, setEmail] = useState(email)

  const render = useSelector((state) => state.render)
  const dispatch = useDispatch()

  const ButtonAlert = () => {
    return showAlert({
      title: "Eliminar",
      message: "¿Desea eliminar el cliente?",
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
      .delete(`http://localhost:8080/api/clients/${id}`)
      .then((r) => console.log(r.data))
      .catch((err) => console.error("User invalid", err))
    dispatch(switchRender(!render))
  }

  const handleModifyClient = () => {
    axios.put(`http://localhost:8080/api/clients/${id}`, {
      fullName: fullName,
      email: email,
      area: area,
      company: company,
    })
    dispatch(switchRender(!render))
    setModelOpen(!modelOpen)
  }

  const handleModifyFullName = (e) => {
    setFullName(e.target.value)
  }
  const handleModifyEmail = (e) => {
    setEmail(e.target.value)
  }
  const handleModifyCompany = (e) => {
    setCompany(e.target.value)
  }
  const handleModifyArea = (e) => {
    setArea(e.target.value)
  }

  return (
    <>
      <View style={Styles.item}>
        <View style={{ flexDirection: "row", width: "100%" }}>
          <Text style={Styles.title}>{name}</Text>
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
                <Text>Nombre completo </Text>
                <TextInput
                  style={Styles.input}
                  name="name"
                  type="text"
                  value={fullName}
                  onChange={handleModifyFullName}
                />
                <Text>Area:</Text>
                <TextInput
                  style={Styles.input}
                  name="area"
                  type="text"
                  value={area}
                  onChange={handleModifyArea}
                />
                <Text>Email: </Text>
                <TextInput
                  style={Styles.input}
                  name="email"
                  type="text"
                  value={email}
                  onChange={handleModifyEmail}
                />
                <Text>Empresa:</Text>
                <TextInput
                  style={Styles.input}
                  name="empresa"
                  type="text"
                  value={company}
                  onChange={handleModifyCompany}
                />
              </SafeAreaView>
              <TouchableOpacity
                style={Styles.inputButton}
                onPress={handleModifyClient}
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

const ClientesEdit = () => {
  const [clients, setClients] = useState([])
  const render = useSelector((state) => state.render)
  const [data, setData] = useState([])
  const [selectedOffice, setSelectedOffice] = useState(false)
  const dispatch = useDispatch()
  console.log(selectedOffice)
  const handleClientes = () => {
    axios.get(`http://localhost:8080/api/clients/`).then((r) => {
      setSelectedOffice(false)
      setClients(r.data)
    })
  }
  const handleSelect = () => {
    const filtros = clients.filter((element) => {
      console.log(element.offices[0].id)
      console.log(data[0].key)
      return element.offices[0].id == selectedOffice
    })
    console.log(filtros)
    setClients(filtros)
    console.log(clients)
    dispatch(switchRender(!render))
  }
  console.log(clients)
  useEffect(() => {
    axios.get(`http://localhost:8080/api/offices/`).then((res) => {
      let newArray = res.data.map((office) => {
        return { key: office.id, value: `${office.country} (${office.name})` }
      })
      setData(newArray)
    })
  }, [render])
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/clients/`)
      .then((r) => {
        if (selectedOffice) {
          const filtros = r.data.filter((element) => {
            console.log(element.offices[0].id)
            console.log(data[0].key)
            return element.offices[0].id == selectedOffice
          })
          setClients(filtros)
        } else {
          setClients(r.data)
        }
      })
      .catch((err) => console.error("Client invalid", err))
  }, [render])

  const renderItem = ({ item }) => (
    <View>
      <Item
        country={item.fullName}
        name={item.email}
        id={item.id}
        paused={item.paused}
      />
    </View>
  )

  return (
    <SafeAreaView style={Styles.containerDelete}>
      <View style={{ alignItems: "center" }}>
        <Text style={Styles.title}>Clientes</Text>
      </View>
      <SelectList
        setSelected={setSelectedOffice}
        data={data}
        placeholder={"Flitrar por oficina"}
        arrowicon={
          <FontAwesome name="chevron-down" size={12} color={"black"} />
        }
        searchicon={<FontAwesome name="search" size={12} color={"black"} />}
        search={false}
        boxStyles={{ borderRadius: 0 }}
        onSelect={handleSelect}
      />
      <Button
        onPress={handleClientes}
        title="Ver Todos los clientes"
        color="#2596be"
        accessibilityLabel="Learn more about this purple button"
      />
      <FlatList
        data={clients.sort((a, b) => a.name - b.name)}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  )
}

export default ClientesEdit
