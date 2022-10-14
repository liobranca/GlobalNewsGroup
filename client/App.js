import { Provider } from "react-redux"
import { store, persistor } from "./store/store"
import MainStack from "./navigation/MainStack"
import { PersistGate } from "redux-persist/integration/react"
import { Text } from "react-native"
import CustomisableAlert from "react-native-customisable-alert"
import React from "react"

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        <MainStack />
        <CustomisableAlert titleStyle={{ fontSize: 18, fontWeight: "bold" }} />
      </PersistGate>
    </Provider>
  )
}
