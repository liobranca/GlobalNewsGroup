import React from "react";
import { useState } from "react";
import { Image, Modal, Text, TouchableOpacity, View } from "react-native";
import styles from "../style/Style";
import close from "../assets/close1.png";
const Modals = () => {
  const [modelOpen, setModelOpen] = useState(false);

  return (
    <View>
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => setModelOpen(!modelOpen)}
      >
        <Text>Crear usuario</Text>
      </TouchableOpacity>
      <Modal animationType="slide" visible={modelOpen} transparent>
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(1,1,1 0.5)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{ height: "80%", width: "90%", backgroundColor: "#FFF" }}
          >
            <View
              style={{
                height: 45,
                width: "100%",
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
            >
              <TouchableOpacity onPress={() => setModelOpen(!modelOpen)}>
                <Image source={close} style={{ width: 40, height: 40 }} />
              </TouchableOpacity>
            </View>
              <View>
               
              </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Modals;
