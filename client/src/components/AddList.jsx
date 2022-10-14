import { useNavigation } from "@react-navigation/native"
import axios from "axios"
import React from "react"
import { useState } from "react"
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import close from "../assets/close1.png"
import create from "../assets/create.png"
import { useDispatch, useSelector } from "react-redux"
import { switchRender } from "../../store/render"

const AddList = () => {
  const [modelOpen, setModelOpen] = useState(false)
  const [text, onChangeText] = useState("Descripcion")
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const render = useSelector((state) => state.render)

  const handleSubmit = () => {
    axios
      .post(`http://localhost:8080/api/lists/create`, { description: text })
      .then((res) => res.data)
      .then(() => dispatch(switchRender(!render)))
      .catch((err) => console.error(err))

    setModelOpen(!modelOpen)
  }

  return (
    <View>
      <TouchableOpacity onPress={() => setModelOpen(!modelOpen)}>
        <Image
          source={create}
          style={{ width: 20, height: 20, marginRight: 20 }}
        />
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
            style={{ height: "30%", width: "90%", backgroundColor: "#FFF" }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: "bold",
                  margin: 15,
                }}
              >
                Crear Lista
              </Text>

              <TouchableOpacity
                style={{ margin: 5 }}
                onPress={() => setModelOpen(!modelOpen)}
              >
                <Image source={close} style={{ width: 30, height: 30 }} />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={{ marginLeft: 15, fontSize: 18, fontWeight: "300" }}>
                Agregue una descripcion
              </Text>
              <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                placeholder="Descripcion"
              />
            </View>
            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
              <TouchableOpacity
                onPress={handleSubmit}
                style={{
                  margin: 10,
                  width: "40%",
                  borderRadius: 30,
                  height: 40,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#a9b4b4",
                }}
              >
                <Text>Crear</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 10,
    borderWidth: 1,
    padding: 10,
  },
})

export default AddList
