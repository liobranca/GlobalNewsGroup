import axios from "axios"
import { useEffect, useState } from "react"
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from "react-native"
import { DeleteOutlined } from "@ant-design/icons"
import Styles from "../style/Style"
import FormStyles from "../style/Forms.Style"
import { useNavigation } from "@react-navigation/native"
import { useDispatch, useSelector } from "react-redux"
import search1 from "../assets/search.png"
import { switchRender } from "../../store/render"
import { showAlert, closeAlert } from "react-native-customisable-alert"

import GlobalStyle from "../style/Style"

const Item = function ({ description, paused, id }) {
  const render = useSelector((state) => state.render)
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const handleDelete = () => {
    axios
      .delete(`http://localhost:8080/api/lists/delete?id=${id}`)
      .then((r) => dispatch(switchRender(!render)))
      .catch((err) => console.error("id invalido", err))
  }

  const handleListItem = () => {
    navigation.navigate("SingleListItem", { id: id })
  }
  const ButtonAlert = () => {
    return showAlert({
      title: "Eliminar",
      message: "¿Desea eliminar la lista?",
      alertType: "warning",
      btnLabel: "Confirmar",
      leftBtnLabel: "Cancelar",
      onPress: () => {
        handleDelete(), closeAlert()
      },
    })
  }

  return (
    <View style={Styles.item}>
      <View style={{ flexDirection: "row", width: "100%" }}>
        <TouchableOpacity onPress={handleListItem}>
          <Text style={Styles.title}>{description}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={ButtonAlert}
          style={{ position: "absolute", right: "0" }}
        >
          <DeleteOutlined style={Styles.icons} />
        </TouchableOpacity>
      </View>
      {paused ? (
        <Text style={{ float: "right", color: "red", marginRight: "10px" }}>
          {" "}
          Pausada
        </Text>
      ) : (
        <Text style={{ float: "right", color: "green", marginRight: "10px" }}>
          {" "}
          Activa
        </Text>
      )}
    </View>
  )
}

const ListsView = () => {
  const [lists, setLists] = useState([])
  const [search, setSearch] = useState([])
  const dispatch = useDispatch()
  const render = useSelector((state) => state.render)

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/lists`)
      .then((res) => setLists(res.data))
  }, [render])

  async function handleSubmit(e) {
    console.log(e.target.value)
    setSearch(e.target.value)
    try {
      const searchResult = await axios.get(
        `http://localhost:8080/api/lists/search/${e.target.value}`
      )
      setLists(searchResult.data)
    } catch (error) {
      console.error(error)
    }
  }
  if (search === "") {
    dispatch(switchRender(!render))
    setSearch([])
  }

  const renderItem = ({ item }) => (
    <View>
      <Item description={item.description} paused={item.paused} id={item.id} />
    </View>
  )
  return (
    <SafeAreaView style={GlobalStyle.container}>
      <View style={{ alignItems: "center" }}>
        <View style={{ flex: 1, width: "100%" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TextInput
              style={{ ...FormStyles.text, backgroundColor: "#f2f2f2" }}
              value={search}
              placeholder="Search"
              placeholderTextColor="#A9B4B4"
              onChange={handleSubmit}
            />

            <TouchableOpacity
              style={{ display: "inline-block" }}
              onPress={handleSubmit}
            >
              <Image source={search1} style={{ width: 40, height: 40 }} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {lists[0] ? (
        <FlatList
          data={lists.sort((a, b) => a.description - b.description)}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text> No hay coincidencia</Text>
      )}
    </SafeAreaView>
  )
}

export default ListsView
