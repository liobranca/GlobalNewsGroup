import { StatusBar } from "expo-status-bar";
import React from "react";
import { useSelector } from "react-redux";
import { Text, View, Image, TouchableOpacity } from "react-native";
import Styles from "../style/Style";
import { useNavigation } from "@react-navigation/native";

import GlobalStyle from "../style/Style";
import ListStyles from "../style/Lists.Style";
import Ionicons from '@expo/vector-icons/Ionicons';

const OfficeOption = () => {
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
          Panel de oficinas
        </Text>
        <Image
          style={GlobalStyle.headerImage}
          source={require("../assets/undraw_memory_storage_reh0.svg")}
        />

        <TouchableOpacity style={{ ...ListStyles.elementRow, marginTop: 20 }} onPress={() => navigation.navigate("FormOffice")}>
          <Ionicons style={ListStyles.elementIcon} name="create-outline" size={32} color="#2e73a5" />
          <View style={ListStyles.elementInfoContainer}>
            <Text style={ListStyles.elementTitle}>Crear oficina</Text>
          </View>
          <Ionicons style={ListStyles.elementIcon} name="chevron-forward-outline" size={32} color="#7e838a" />
        </TouchableOpacity>

        <TouchableOpacity style={ListStyles.elementRow} onPress={() => navigation.navigate("Office")}>
          <Ionicons style={ListStyles.elementIcon} name="list-outline" size={32} color="#2e73a5" />
          <View style={ListStyles.elementInfoContainer}>
            <Text style={ListStyles.elementTitle}>Lista de oficinas</Text>
          </View>
          <Ionicons style={ListStyles.elementIcon} name="chevron-forward-outline" size={32} color="#7e838a" />
        </TouchableOpacity>
   
        
        <StatusBar style="auto" />
        
      </View>
    );
  }
};

export default OfficeOption;