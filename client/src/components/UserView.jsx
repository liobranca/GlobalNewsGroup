import { useNavigation } from "@react-navigation/native"
import React from "react"
import { Text, View, Image, TouchableOpacity } from "react-native"
import Styles from "../style/Style"
import { useDispatch, useSelector } from "react-redux"
import { sendLogOutRequest } from "../../store/user"

const UserView = () => {
  const user = useSelector((state) => state.user)
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const handleLogOut = () => {
    dispatch(sendLogOutRequest())
    navigation.navigate("Login")
  }
  const handleLists = () => {
    navigation.navigate("Listas")
  }

  return (
    <View style={Styles.viewUser}>
      <View style={Styles.navBar}>
        {user.email ? (
          <>
            <Text style={Styles.email}>{user.email}</Text>

            <TouchableOpacity onPress={handleLogOut} style={Styles.loginOut}>
              <Text>Logout</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text></Text>
        )}
      </View>

      <View style={Styles.userContainer}>
        {user.firstName ? (
          <>
            <Image
              style={Styles.imageUser}
              source={require("../assets/user.jpg")}
            />
            <Text style={Styles.h1}>¡Bienvenido!</Text>
            <Text>
              {user.firstName} {user.lastName}
            </Text>
            <TouchableOpacity style={Styles.loginBtn}>
              <Text>Crear encuesta</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLists} style={Styles.loginBtn}>
              <Text>Ver listas de distribución</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text></Text>
        )}
      </View>
    </View>
  )
}

export default UserView
