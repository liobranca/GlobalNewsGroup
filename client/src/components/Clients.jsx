import { StatusBar } from "expo-status-bar";
import React from "react";
import { useSelector } from "react-redux";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import GlobalStyle from "../style/Style";
import ListStyles from "../style/Lists.Style";
import Ionicons from '@expo/vector-icons/Ionicons';

const Clients = () => {
  const user = useSelector((state) => state.user);
  const navigation = useNavigation();
  if (!user.firstName) {
    return (
      <View style={GlobalStyle.container}>
        {" "}
        <Text>Por favor ingrese para poder acceder</Text>{" "}
      </View>
    );
  } else {
    return (
      <View style={GlobalStyle.container}>

        <Text style={GlobalStyle.headerText}>
          Panel de clientes
        </Text>
        <Image
          style={GlobalStyle.headerImage}
          source={require("../assets/undraw_interview_re_e5jn.svg")}
        />

        <TouchableOpacity style={{ ...ListStyles.elementRow, marginTop: 20 }} onPress={() => navigation.navigate("Crear clientes")}>
          <Ionicons style={ListStyles.elementIcon} name="create-outline" size={32} color="#2e73a5" />
          <View style={ListStyles.elementInfoContainer}>
            <Text style={ListStyles.elementTitle}>Agregar clientes</Text>
          </View>
          <Ionicons style={ListStyles.elementIcon} name="chevron-forward-outline" size={32} color="#7e838a" />
        </TouchableOpacity>

        <TouchableOpacity style={ListStyles.elementRow} onPress={() => navigation.navigate("Editar clientes")}>
          <Ionicons style={ListStyles.elementIcon} name="pencil-outline" size={32} color="#2e73a5" />
          <View style={ListStyles.elementInfoContainer}>
            <Text style={ListStyles.elementTitle}>Editar/Eliminar clientes</Text>
          </View>
          <Ionicons style={ListStyles.elementIcon} name="chevron-forward-outline" size={32} color="#7e838a" />
        </TouchableOpacity>

      </View>
    );
  }
};
export default Clients