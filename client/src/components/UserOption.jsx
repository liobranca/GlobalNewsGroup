import { StatusBar } from "expo-status-bar";
import React from "react";
import { useSelector } from "react-redux";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import GlobalStyle from "../style/Style";
import ListStyles from "../style/Lists.Style";
import Ionicons from '@expo/vector-icons/Ionicons';

const UserOption = () => {
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
          Panel de usuarios
        </Text>
        <Image
          style={GlobalStyle.headerImage}
          source={require("../assets/undraw_connected_re_lmq.svg")}
        />
   
        <TouchableOpacity style={{ ...ListStyles.elementRow, marginTop: 20 }} onPress={() => navigation.navigate("FormUser")}>
          <Ionicons style={ListStyles.elementIcon} name="person-add-outline" size={32} color="#2e73a5" />
          <View style={ListStyles.elementInfoContainer}>
            <Text style={ListStyles.elementTitle}>Crear de usuario</Text>
          </View>
          <Ionicons style={ListStyles.elementIcon} name="chevron-forward-outline" size={32} color="#7e838a" />
        </TouchableOpacity>

        <TouchableOpacity style={ListStyles.elementRow} onPress={() => navigation.navigate("EditUser")}>
          <Ionicons style={ListStyles.elementIcon} name="pencil-outline" size={32} color="#2e73a5" />
          <View style={ListStyles.elementInfoContainer}>
            <Text style={ListStyles.elementTitle}>Editar usuario</Text>
          </View>
          <Ionicons style={ListStyles.elementIcon} name="chevron-forward-outline" size={32} color="#7e838a" />
        </TouchableOpacity>

        <TouchableOpacity style={ListStyles.elementRow} onPress={() => navigation.navigate("DeleteUser")}>
          <Ionicons style={ListStyles.elementIcon} name="trash-outline" size={32} color="#2e73a5" />
          <View style={ListStyles.elementInfoContainer}>
            <Text style={ListStyles.elementTitle}>Eliminar usuario</Text>
          </View>
          <Ionicons style={ListStyles.elementIcon} name="chevron-forward-outline" size={32} color="#7e838a" />
        </TouchableOpacity>

        <StatusBar style="auto" />
      </View>
    );
  }
};

export default UserOption;