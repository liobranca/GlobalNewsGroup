import { StatusBar } from "expo-status-bar"
import React, { useEffect, useState } from "react"
import { Text, View, Image, TextInput, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"
import Styles from "../style/Style"
import FormStyles from "../style/Forms.Style"
import axios from "axios"
import FontAwesome from "react-native-fontawesome"
import SelectList from "react-native-dropdown-select-list"

const ClientesCreate = () => {
  const [fullName, setNombre] = useState("")
  const [company, setEmpresa] = useState("")
  const [area, setArea] = useState("")
  const [email, setEmail] = useState("")
  const [data, setData] = useState([])
  const [selectedOffice, setSelectedOffice] = useState("")

  const navigation = useNavigation()
  const handleSubmit = () => {
    axios
      .post(`http://localhost:8080/api/clients/`, {
        fullName,
        company,
        area,
        email,
      })
      .then((resultado) => {
        axios.post(
          `http://localhost:8080/api/relaciones/relacionClienteOficina?idOffice=${selectedOffice}&idClient=${resultado.data.id}`
        )
      })
    navigation.navigate("Clients")
  }
  useEffect(() => {
    axios.get(`http://localhost:8080/api/offices/`).then((res) => {
      let newArray = res.data.map((office) => {
        return { key: office.id, value: office.country + `( ${office.name})` }
      })
      setData(newArray)
    })
  }, [])

  return (
    <View style={Styles.container}>
      <View>
        <TextInput
          style={FormStyles.text}
          placeholder="Nombre completo"
          placeholderTextColor="#A9B4B4"
          onChangeText={(nombre) => setNombre(nombre)}
        />

        <TextInput
          style={FormStyles.text}
          placeholder="Empresa"
          placeholderTextColor="#A9B4B4"
          onChangeText={(empresa) => setEmpresa(empresa)}
        />
        <TextInput
          style={FormStyles.text}
          placeholder="Area"
          placeholderTextColor="#A9B4B4"
          onChangeText={(area) => setArea(area)}
        />
        <TextInput
          style={FormStyles.text}
          placeholder="Email"
          placeholderTextColor="#A9B4B4"
          onChangeText={(email) => setEmail(email)}
        />
        <SelectList
          setSelected={setSelectedOffice}
          data={data}
          placeholder={"Seleccione oficina"}
          arrowicon={
            <FontAwesome name="chevron-down" size={12} color={"black"} />
          }
          searchicon={<FontAwesome name="search" size={12} color={"black"} />}
          search={false}
          boxStyles={{ borderRadius: 0 }}
          onSelect={() => console.log(selectedOffice)}
        />
      </View>
      <TouchableOpacity
        onPress={handleSubmit}
        style={{ ...FormStyles.button, marginTop: 20 }}
      >
        <Text style={FormStyles.buttonText}>Crear Cliente</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  )
}

export default ClientesCreate
