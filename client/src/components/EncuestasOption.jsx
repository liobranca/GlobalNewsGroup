import { StatusBar } from "expo-status-bar"
import React from "react"
import { useSelector } from "react-redux"
import { Text, View, Image, TouchableOpacity } from "react-native"
import Styles from "../style/Style"
import { useNavigation } from "@react-navigation/native"

import GlobalStyle from "../style/Style"
import ListStyles from "../style/Lists.Style"
import Ionicons from "@expo/vector-icons/Ionicons"

const EncuestasOption = () => {
  const user = useSelector((state) => state.user)
  const navigation = useNavigation()
  if (!user.firstName) {
    return (
      <View style={Styles.container}>
        {" "}
        <Text>Por favor ingrese para poder acceder</Text>{" "}
      </View>
    )
  } else {
    return (
      <View style={GlobalStyle.container}>
        <Text style={GlobalStyle.headerText}>Panel de encuestas</Text>
        <Image
          style={GlobalStyle.headerImage}
          source={require("../assets/undraw_surveyssssss_05s5.svg")}
        />

        <TouchableOpacity
          onPress={() => navigation.navigate("Configuracion encuestas")}
          style={{ ...ListStyles.elementRow, marginTop: 20 }}
        >
          <Ionicons
            style={ListStyles.elementIcon}
            name="settings-outline"
            size={32}
            color="#7e838a"
          />
          <View style={ListStyles.elementInfoContainer}>
            <Text>Configuracion de envíos global</Text>
          </View>
          <Ionicons
            style={ListStyles.elementIcon}
            name="chevron-forward-outline"
            size={32}
            color="#7e838a"
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Crear Encuestas")}
          style={ListStyles.elementRow}
        >
          <Ionicons
            style={ListStyles.elementIcon}
            name="create-outline"
            size={32}
            color="#2e73a5"
          />
          <View style={ListStyles.elementInfoContainer}>
            <Text>Crear encuesta</Text>
          </View>
          <Ionicons
            style={ListStyles.elementIcon}
            name="chevron-forward-outline"
            size={32}
            color="#7e838a"
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Modificar Encuesta")}
          style={ListStyles.elementRow}
        >
          <Ionicons
            style={ListStyles.elementIcon}
            name="trash-outline"
            size={32}
            color="#2e73a5"
          />
          <View style={ListStyles.elementInfoContainer}>
            <Text>Editar/Eliminar encuesta</Text>
          </View>
          <Ionicons
            style={ListStyles.elementIcon}
            name="chevron-forward-outline"
            size={32}
            color="#7e838a"
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Vista de Encuestas")}
          style={ListStyles.elementRow}
        >
          <Ionicons
            style={ListStyles.elementIcon}
            name="eye-outline"
            size={32}
            color="#2e73a5"
          />
          <View style={ListStyles.elementInfoContainer}>
            <Text>Visualizacion encuestas</Text>
          </View>
          <Ionicons
            style={ListStyles.elementIcon}
            name="chevron-forward-outline"
            size={32}
            color="#7e838a"
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Envio de Encuestas")}
          style={ListStyles.elementRow}
        >
          <Ionicons
            style={ListStyles.elementIcon}
            name="send-outline"
            size={32}
            color="#2e73a5"
          />
          <View style={ListStyles.elementInfoContainer}>
            <Text>Envio de encuestas</Text>
          </View>
          <Ionicons
            style={ListStyles.elementIcon}
            name="chevron-forward-outline"
            size={32}
            color="#7e838a"
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Vista de Estadísticas")}
          style={ListStyles.elementRow}
        >
          <Ionicons
            style={ListStyles.elementIcon}
            name="bar-chart-outline"
            size={32}
            color="#2e73a5"
          />
          <View style={ListStyles.elementInfoContainer}>
            <Text>Estadísticas</Text>
          </View>
          <Ionicons
            style={ListStyles.elementIcon}
            name="chevron-forward-outline"
            size={32}
            color="#7e838a"
          />
        </TouchableOpacity>

        <StatusBar style="auto" />
      </View>
    )
  }
}

export default EncuestasOption
