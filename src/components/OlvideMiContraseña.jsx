//RESPONSIVE
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Modal,
  TouchableOpacity,
  calc
} from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { StyledText } from "./StyledText";
import { Dimensions } from "react-native";
import { StyledButton } from "./StyledButton";
import { useState } from "react";
import { TouchableHighlight } from "react-native-gesture-handler";
import { supabase } from "../lib/supabase";
import { singUpEmail } from "../lib/supabaseHandler";
const { width, height } = Dimensions.get("window");
import {
  widthPercentageToDP,
  heightPercentageToDP
} from "react-native-responsive-screen";
const screenWidthPercentage = widthPercentageToDP("50%");
const screenHeightPercentage = heightPercentageToDP("50%");
import { resetPass } from '../lib/supabaseHandler'


export function OlvideMiContraseña({ navigation }) {
  const [user, setUser] = useState({
    email: ""
  });
  const [modalVisible, setModalVisible] = useState(false);
  const handleEnviar = () => {
    resetPass(navigation, user.email)
    setModalVisible(true);
  };

  return (
    <>
      <ImageBackground
        source={require("../../assets/images/Fondo-06.jpg")}
        style={{
          height: Dimensions.get("window").height + 10
        }}
        imageStyle={{
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Image
          style={styles.tinyLogo}
          source={require("../../assets/images/IsoBlanco.png")}
        />
        <Text style={styles.text}>OLVIDÉ MI CONTRASEÑA</Text>
        <View style={styles.container}>
          <Text style={styles.complete} editable={false}>
            Por favor, completá tu e-mail para restablecer tu contraseña
          </Text>
        </View>
        <View style={styles.datosC}>
          <View style={styles.datos}>
            <StyledText fontSize={"subheading1"} style={styles.label}>
              E-mail
            </StyledText>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={styles.icon}>
                <Image
                  style={styles.tiny}
                  source={require("../../assets/icons/Editar.png")}
                />
              </View>
              <TextInput
                style={styles.textarea}
                value={user.name}
                onChangeText={(text) =>
                  setUser({
                    ...user,
                    email: text
                  })
                }
              ></TextInput>
            </View>
            <View
              style={{
                top: 20,
                height: 1.5,
                backgroundColor: "#d9d9d9",
                width: "100%"
              }}
            ></View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              margin: 10,
              top: "50%"
            }}
          >
            <TouchableOpacity
              style={styles.guardarButton}
              onPress={handleEnviar}
            >
              <Text style={styles.buttonText}>Enviar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelarButton}
              onPress={() => navigation.navigate("login")}
            >
              <Text style={styles.buttonTextBlue}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>SEGUÍ LOS PASOS</Text>
              <Text style={styles.modalDescription}>
                Te enviamos un e-mail para restablecer tu contraseña
              </Text>
              <View
                style={{
                  top: 0,
                  height: 1,
                  backgroundColor: "#d9d9d9",
                  width: "108%"
                }}
              ></View>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>DE ACUERDO</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ImageBackground>
    </>
  );
}
export default OlvideMiContraseña;
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    width: "70%",
    alignItems: "center",
    elevation: 0
  },
  modalText: {
    fontSize: 20,
    color: "#03B6E8",
    fontWeight: "bold",
    marginBottom: 10
  },
  modalDescription: {
    fontSize: 16,
    color: "#58656B",
    marginBottom: 20,
    textAlign: "center"
  },
  modalButton: {
    borderRadius: 10,
    paddingVertical: 7,
    paddingHorizontal: 20
  },
  modalButtonText: {
    color: "#03B6E8",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center"
  },
  tiny: {
    position: "absolute",
    height: "10%",
    flex: 1,
    zIndex: 4,
    left: 300,
    width: 27,
    top: 10,
    height: 27
  },

  buttonTextBlue: {
    color: "#03B6E8",
    fontWeight: "bold",
    fontSize: 18
  },
  guardarButton: {
    backgroundColor: "#03B6E8",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    width: "45%",
    height: 44
  },
  cancelarButton: {
    backgroundColor: "transparent",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    width: "45%",
    height: 44,
    borderWidth: 1.5,
    borderColor: "#03B6E8"
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18
  },
  container: {
    flex: 1
  },
  text: {
    color: "#03B6E8",
    top: "20%",
    fontSize: 35,
    lineHeight: 41,
    letterSpacing: 0.374,
    fontFamily: "Lato-Bold",
    fontWeight: "bold",
    textAlign: "center"
  },
  datosC: {
    height: "100%",
    width: "100%",
    position: "absolute",
    bottom: 0,
    top: "49.9%",
    paddingTop: 30,
    backgroundColor: "#fff",
    borderTopEndRadius: 20,
    borderTopStartRadius: 20
  },
  datos: {
    alignSelf: "center",
    width: "80%",
    paddingBottom: 30
  },
  label: {
    color: "grey"
  },
  textarea: {
    height: 30,
    top: 10,
    fontSize: 20,
    color: "black",
    flex: 1
  },
  tinyLogo: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    top: screenHeightPercentage - height * 0.3 * 1.5,
    left: screenWidthPercentage - width * 0.8 * 0.09,
    height: height * 0.08,
    width: screenWidthPercentage * 0.3
  },
  complete: {
    position: "absolute",
    left: "14.67%",
    top: "37.44%",
    bottom: "50%",
    fontSize: 22.9,
    lineHeight: 30,
    textAlign: "center",
    letterSpacing: 0.4,
    color: "#FFFFFF",
    width: "100%",
    height: "30%",
    top: "65%",
    left: "0%"
  },
  container: {
    position: "absolute",
    width: "90%",
    height: "50%",
    left: screenWidthPercentage - width * 0.8 * 0.55
  },
  secondText: {
    position: "absolute",
    fontStyle: "normal",
    fontSize: 23,
    lineHeight: 32,
    textAlign: "center",
    letterSpacing: 0.374,
    color: "#FFFFFF",
    width: "100%",
    height: "30%",
    top: "75%",
    left: "0%"
  }
});