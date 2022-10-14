import { useNavigation } from "@react-navigation/native"
import axios from "axios"
import React, { useEffect, useState } from "react"
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { switchRender } from "../../store/render"
import Styles from "../style/Style"

const EncuestasVista = () => {
  const [surveys, setSurveys] = useState([])
  const render = useSelector((state) => state.render)
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/survey/`)
      .then((r) => setSurveys(r.data))
      .catch((err) => console.error("User invalid", err))
  }, [render])

  const renderItem = ({ item }) => (
    <View>
      <Item
        name={item.name}
        description={item.description}
        id={item.id}
        render={render}
      />
    </View>
  )

  return (
    <SafeAreaView style={Styles.containerDelete}>
      <View style={{ alignItems: "center" }}>
        <Text style={Styles.title}>Encuestas</Text>
      </View>
      <FlatList
        data={surveys}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  )
}

export default EncuestasVista

const Item = function ({ name, description, id, render }) {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const handleDelete = () => {
    axios
      .delete(`http://localhost:8080/api/survey/removeSurvey?id=${id}`)
      .then((r) => dispatch(switchRender(!render)))
      .catch((err) => console.error("User invalid", err))
  }

  return (
    <View style={Styles.item}>
      <View style={{ flexDirection: "row", width: "100%" }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Encuesta", { id })}
        >
          <Text style={Styles.title}>{name}</Text>
        </TouchableOpacity>
      </View>
      <Text style={Styles.subtitle}>{description}</Text>
    </View>
  )
}
