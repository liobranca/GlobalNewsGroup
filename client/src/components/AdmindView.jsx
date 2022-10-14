import { StatusBar } from "expo-status-bar";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { sendLogOutRequest } from "../../store/user";
import Ionicons from '@expo/vector-icons/Ionicons';

// Import Styles
import Styles from "../style/AdminView.Style";
import GlobalStyle from "../style/Style";
import ListStyles from "../style/Lists.Style";

const AdminView = () => {
  const user = useSelector((state) => state.user);
  const navigation = useNavigation();
  const dispatch = useDispatch()

  const handleLogOut = () => {
    dispatch(sendLogOutRequest());
    navigation.navigate("Login");
  }

  if (!user.firstName) {
    return (
      <View style={Styles.container}>
        <TouchableOpacity style={Styles.loginOut}>
          <Text>Logout</Text>
        </TouchableOpacity>
        <Text>Por favor ingrese para poder acceder</Text>
      </View>
    );
  } else {
    return (
      <View style={GlobalStyle.container}>
        <View style={Styles.header}>
          <Text style={Styles.welcome}>
            {"Bienvenido " + user.firstName}
          </Text>
        </View>

        <Image
          style={Styles.logo}
          source={require("../assets/logo1.png")}
        />

        <TouchableOpacity style={{ ...ListStyles.elementRow, marginTop: 20 }} onPress={() => navigation.navigate("UserOption")}>
          <Ionicons style={ListStyles.elementIcon} name="person-outline" size={32} color="#2e73a5" />
          <View style={ListStyles.elementInfoContainer}>
            <Text style={ListStyles.elementTitle}>Opciones de usuario</Text>
            <Text style={ListStyles.elementDescription}>Administre sus usuarios</Text>
          </View>
          <Ionicons style={ListStyles.elementIcon} name="chevron-forward-outline" size={32} color="#7e838a" />
        </TouchableOpacity>

        <TouchableOpacity style={ListStyles.elementRow} onPress={() => navigation.navigate("OfficeOption")}>
          <Ionicons style={ListStyles.elementIcon} name="people-outline" size={32} color="#2e73a5" />
          <View style={ListStyles.elementInfoContainer}>
            <Text style={ListStyles.elementTitle}>Opciones de oficina</Text>
            <Text style={ListStyles.elementDescription}>Administre sus sedes</Text>
          </View>
          <Ionicons style={ListStyles.elementIcon} name="chevron-forward-outline" size={32} color="#7e838a" />
        </TouchableOpacity>

        <TouchableOpacity style={ListStyles.elementRow} onPress={() => navigation.navigate("Listas")}>
          <Ionicons style={ListStyles.elementIcon} name="list-outline" size={32} color="#2e73a5" />
          <View style={ListStyles.elementInfoContainer}>
            <Text style={ListStyles.elementTitle}>Listas de distribucion</Text>
            <Text style={ListStyles.elementDescription}>Modifique listas de correos</Text>
          </View>
          <Ionicons style={ListStyles.elementIcon} name="chevron-forward-outline" size={32} color="#7e838a" />
        </TouchableOpacity>

        <TouchableOpacity style={ListStyles.elementRow} onPress={() => navigation.navigate("Encuestas")}>
          <Ionicons style={ListStyles.elementIcon} name="checkbox-outline" size={32} color="#2e73a5" />
          <View style={ListStyles.elementInfoContainer}>
            <Text style={ListStyles.elementTitle}>Encuestas</Text>
            <Text style={ListStyles.elementDescription}>Administre sus encuestas</Text>
          </View>
          <Ionicons style={ListStyles.elementIcon} name="chevron-forward-outline" size={32} color="#7e838a" />
        </TouchableOpacity>

        <TouchableOpacity style={ListStyles.elementRow} onPress={() => navigation.navigate("Clients")}>
          <Ionicons style={ListStyles.elementIcon} name="settings-outline" size={32} color="#2e73a5" />
          <View style={ListStyles.elementInfoContainer}>
            <Text style={ListStyles.elementTitle}>Clientes</Text>
            <Text style={ListStyles.elementDescription}>Modifique su listado de clientes</Text>
          </View>
          <Ionicons style={ListStyles.elementIcon} name="chevron-forward-outline" size={32} color="#7e838a" />
        </TouchableOpacity>

        <TouchableOpacity style={ListStyles.elementRow} onPress={handleLogOut}>
          <Ionicons style={ListStyles.elementIcon} name="log-out-outline" size={32} color="#2e73a5" />
          <View style={ListStyles.elementInfoContainer}>
            <Text style={ListStyles.elementTitle}>Salir</Text>
          </View>
        </TouchableOpacity>
        <StatusBar style="auto" />
      </View>
    );
  }
};

export default AdminView;
