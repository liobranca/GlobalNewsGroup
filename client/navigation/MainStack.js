import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"
import UserView from "../src/components/UserView"
import AdmindView from "../src/components/AdmindView"
import UserOption from "../src/components/UserOption"
import FormUser from "../src/commons/FormUser"
import Login from "../src/components/Login"
import ListsView from "../src/components/ListsView"
import SingleListItem from "../src/commons/SingleListItem"
import AddList from "../src/components/AddList"
import { SafeAreaProvider } from "react-native-safe-area-context"
import DeleteUser from "../src/commons/DeleteUser"
import FormOffice from "../src/commons/FormOffice"
import OfficeOption from "../src/components/OfficeOption"
import DeleteOffice from "../src/commons/DeleteOffice"
import SingleOffice from "../src/commons/SingleOffice"
import EditUser from "../src/commons/EditUser"
import EncuestasOption from "../src/components/EncuestasOption"
import Encuestas from "../src/commons/Encuestas"
import EncuestasVista from "../src/components/EncuestasVista"
import SingleSurvey from "../src/commons/SingleSurvey"
import EditSurvey from "../src/commons/EditSurvey"
import SendSurvey from "../src/commons/SendSurvey"
import Clients from "../src/components/Clients"
import ClientesEdit from "../src/commons/ClientesEdit"
import ClientesCreate from "../src/commons/ClientesCreate"
import ConfigSurvey from "../src/commons/ConfigSurvey"
import StatisticsSurvey from "../src/components/ StatisticsSurvey"
import StatisticSurvey from "../src/commons/StatisticSurvey"

const Stack = createNativeStackNavigator()

const MainStack = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Clients" component={Clients} options={{ title: 'Clientes' }} />
          <Stack.Screen name="Crear Encuestas" component={Encuestas} />
          <Stack.Screen name="Encuestas" component={EncuestasOption} />
          <Stack.Screen name="DeleteUser" component={DeleteUser} />
          <Stack.Screen name="Office" component={DeleteOffice} />
          <Stack.Screen name="EditUser" component={EditUser} />
          <Stack.Screen name="UserView" component={UserView} />
          <Stack.Screen name="AdmindView" component={AdmindView} options={{ title: 'Inicio' }} />
          <Stack.Screen name="UserOption" component={UserOption} options={{ title: 'Opciones de usuarios' }} />
          <Stack.Screen name="FormUser" component={FormUser} options={{ title: 'Crear usuario' }} />
          <Stack.Screen name="OfficeOption" component={OfficeOption} options={{ title: 'Opciones de oficina' }} />
          <Stack.Screen name="FormOffice" component={FormOffice} options={{ title: 'Crear Oficina' }} />
          <Stack.Screen name="Listas" component={ListsView} options={{ headerRight: () => <AddList />, title: 'Listas de distribución' }} />
          <Stack.Screen name="SingleListItem" component={SingleListItem} />
          <Stack.Screen name="SingleOffice" component={SingleOffice} />
          <Stack.Screen name="Vista de Encuestas" component={EncuestasVista} />
          <Stack.Screen name="Encuesta" component={SingleSurvey} />
          <Stack.Screen name="Modificar Encuesta" component={EditSurvey} />
          <Stack.Screen name="Envio de Encuestas" component={SendSurvey} />
          <Stack.Screen name="Editar clientes" component={ClientesEdit} />
          <Stack.Screen name="Crear clientes" component={ClientesCreate} />
          <Stack.Screen name="Configuracion encuestas" component={ConfigSurvey} />
          <Stack.Screen name="Vista de Estadísticas"  component={StatisticsSurvey} />
          <Stack.Screen name="Estadísticas" component={StatisticSurvey} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

export default MainStack
