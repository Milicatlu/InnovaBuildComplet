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
  import { useState, useEffect } from "react";
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
  
  export function CambioDeContraseña({ navigation }) {
    //Estado que guarda la contraseña
    const [password, setPassword] = useState("")
    //Estado que guarda la confirmacion de la contraseña
    const [confirmPass, setConfirmPass] = useState("");
    //Estado que maneja el modal
    const [modalVisible, setModalVisible] = useState(false);
    //Estado que maneja si las contraseñas son iguales o no, para en caso de que sea falso mostrar una notificacion pertinente al usuario
    const [condition, setCondition] = useState(true)
    //Estado que maneja si el boton para confirmar los cambios pueda ser pulsado por el usuario o no
    const [disable, setDisable] = useState(false)
    //Funcoin para mostrar el modal
    const handleEnviar = () => setModalVisible(true);
  
    //Ordenes que se ejecutan al entrar a la pantalla
    useEffect(()=>{
      if (password == confirmPass) {
        setCondition(true);
        setDisable(false)
      } else {
        setCondition(false);
        setDisable(true)
      }
    },[password, confirmPass])

    //Funcion para establecer la confirmacion de la contraseña y comparar las mismas
    const handleChangeConfirmPass =  text => {
       setConfirmPass(text);
      //handleCompare(); No implementado
    };
    //Funcion para establecer la contraseña y comparar las mismas
    const handleChangePassword =  text => {
       setPassword(text);
      //handleCompare(); No implementado
    };
  
    return (
      
        <ImageBackground
          source={require("../../assets/images/Fondo-06.jpg")}
          resizeMode="cover" style={styles.image}
         
        >
          <Image
            style={styles.tinyLogo}
            source={require("../../assets/images/IsoBlanco.png")}
          />
          <Text style={styles.text}>RECUPERAR CONTRASEÑA</Text>
          <View style={styles.container}>
            <Text style={styles.complete} editable={false}>
              Por favor, completá los campos para restablecer tu contraseña
            </Text>
          </View>
          <View style={styles.datosC}>
            <View style={styles.datos}>
              <StyledText fontSize={"subheading1"} style={styles.label}>
              Nueva contraseña
              </StyledText>
              <View
                style={{ flexDirection: "row", justifyContent: "space-between" ,width:Dimensions.get('window').width *0.7,}}
              >
                <View style={styles.icon}>
                  <Image
                    style={styles.tiny}
                    source={require("../../assets/icons/Editar.png")}
                  />
                </View>
                <TextInput
                  style={styles.textarea}
                  value={password}
                  onChangeText={(text)=>setPassword(text)}
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
            <View style={styles.datos}>
              <StyledText fontSize={"subheading1"} style={styles.label}>
                Confirmar contraseña
              </StyledText>
              <View
                style={{ flexDirection: "row", justifyContent: "space-between" , width:Dimensions.get('window').width *0.7,}}
              >
                <View style={styles.icon}>
                  <Image
                    style={styles.tiny}
                    source={require("../../assets/icons/Editar.png")}
                  />
                </View>
                <TextInput
                  style={styles.textarea}
                  value={confirmPass}
                  onChangeText={(text)=>setConfirmPass(text)}
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
            {condition ?  <></>: <StyledText fontSize={"parrafo"} style={styles.label2}>
              ¡Las contraseñas no son iguales!
              </StyledText>}
            
            
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                margin: 10,
                top:Dimensions.get('window').width *0.35,
              }}
            >
              <TouchableOpacity
                style={styles.guardarButton}
                onPress={handleEnviar}
                disabled={disable}
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
            {/*MODAL*/}
            <View style={styles.modalContainer}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>CAMBIO DE CONTRASEÑA</Text>
                <Text style={styles.modalDescription}>
                  Contraseña restablecida
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
                  <Text style={styles.modalButtonText}>ACEPTAR</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </ImageBackground>
      
    );
  }
  // Estilos para diversos componentes y elementos
  const styles = StyleSheet.create({
    image:{
      flex:1,
    },
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
      fontSize: Dimensions.get('window').width *0.07,
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
      color: "grey",
    },
    label2:{
      color: "red",
    },
    textarea: {
      height: 30,
      top: 10,
      fontSize: 25,
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