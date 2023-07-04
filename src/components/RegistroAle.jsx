import {
   ImageBackground,
   Pressable,
   StyleSheet,
   Text,
   TextInput,
   View,
   Image,
   TouchableOpacity,
   Modal, Dimensions,
   calc
} from "react-native";
import { StyledText } from "./StyledText";
import { StyledButton } from "./StyledButton";
import { useState } from "react";
import { TouchableHighlight } from "react-native-gesture-handler";
import { supabase } from "../lib/supabase";
import { singUpEmail } from "../hooks/useSingln";

const { width, height } = Dimensions.get("window");
import {
   widthPercentageToDP,
   heightPercentageToDP
} from "react-native-responsive-screen";
const screenWidthPercentage = widthPercentageToDP("50%");
const screenHeightPercentage = heightPercentageToDP("50%");

export function RegistroAle({ navigation }) {
   const [user, setUser] = useState({
      name: "",
      email: "",
      password: ""
   });
   const [confirmPass, setConfirmPass] = useState("");
   const [modalVisibleBoton, setModalVisibleBoton] = useState(false);

   async function singUpWithAnEmail() {
      if (user.password == confirmPass) {
         singUpEmail(user.name, user.email, user.password);
      } else {
         alert("Tus contraseñas son diferentes!");
      }
   }
   const handleEnviar = () => {
      singUpWithAnEmail();
      setModalVisibleBoton(true);
   };

   return (

      <ImageBackground
         source={require("../../assets/images/Fondo-06.jpg")}
         resizeMode="cover"
         style={styles.image}

      >
         <Image
            style={styles.tinyLogo}
            source={require("../../assets/images/IsoBlanco.png")}
         />
         <TextInput style={styles.text} editable={false}>
            BIENVENIDO
         </TextInput>
         <View style={styles.container}>
            <TextInput style={styles.complete} editable={false}>
               Por favor, completá tus
            </TextInput>
            <TextInput style={styles.secondText} editable={false}>
               datos para registrarte
            </TextInput>
         </View>

         <View style={styles.datosC}>
            <View style={styles.datos}>
               <StyledText fontSize={height * 0.04} style={styles.label}>
                  Nombre completo
               </StyledText>
               <View
                  style={{ flexDirection: "row", justifyContent: "space-between" }}
               >
                  <TextInput
                     style={styles.textarea}
                     value={user.name}
                     onChangeText={(text) =>
                        setUser({
                           ...user,
                           name: text
                        })
                     }
                  ></TextInput>
                  <TouchableHighlight></TouchableHighlight>
               </View>
               <View
                  style={{
                     height: height * 0.0007,
                     backgroundColor: "#878789",
                     width: "100%"
                  }}
               ></View>
            </View>
            <View style={styles.datos}>
               <StyledText fontSize={height * 0.04} style={styles.label}>
                  E-mail
               </StyledText>
               <View
                  style={{ flexDirection: "row", justifyContent: "space-between" }}
               >
                  <TextInput
                     style={styles.textarea}
                     value={user.email}
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
                     height: height * 0.0007,
                     backgroundColor: "#878789",
                     width: "100%"
                  }}
               ></View>
            </View>
            <View style={styles.datos}>
               <StyledText fontSize={height * 0.1} style={styles.label}>
                  Contraseña
               </StyledText>
               <View
                  style={{ flexDirection: "row", justifyContent: "space-between" }}
               >
                  <TextInput
                     style={styles.textarea}
                     value={user.password}
                     onChangeText={(text) =>
                        setUser({
                           ...user,
                           password: text
                        })
                     }
                  ></TextInput>
                  <TouchableOpacity onPress={"hola"}>
                     <Image
                        source={require("../../assets/images/NoVerGrey.png")}
                        style={styles.nover2}
                     />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={"hola"}>
                     <Image
                        source={require("../../assets/images/NoVerGrey.png")}
                        style={styles.nover}
                     />
                  </TouchableOpacity>
               </View>
               <View
                  style={{
                     height: height * 0.0009,
                     backgroundColor: "#878789",
                     width: "100%"
                  }}
               ></View>
            </View>
            <View style={styles.datos}>
               <StyledText fontSize={height * 0.025} style={styles.label}>
                  Confirmar contraseña
               </StyledText>
               <View
                  style={{ flexDirection: "row", justifyContent: "space-between" }}
               >
                  <TextInput
                     style={styles.textarea}
                     value={confirmPass}
                     //onChange={verifyPassword}
                     onChangeText={(text) => setConfirmPass(text)}
                  ></TextInput>
               </View>
               <View
                  style={{
                     height: height * 0.0007,
                     backgroundColor: "#878789",
                     width: "100%"
                  }}
               ></View>
            </View>
            <View
               style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  marginHorizontal: width * 0.060,
                  top: height * 0.04
               }}
            >
               <TouchableOpacity
                  style={styles.guardarButton}
                  onPress={handleEnviar}
               >
                  <Text style={styles.buttonText}>Registrarme</Text>
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
            visible={modalVisibleBoton}
            onRequestClose={() => {
               setModalVisible(false);
            }}
         >
            <View style={styles.modalContainer}>
               <View style={styles.modalViewM}>
                  <Text style={styles.modalTextM}>SEGUÍ LOS PASOS</Text>
                  <Text style={styles.modalDescription}>
                     Te enviamos un e-mail para restablecer tu contraseña
                  </Text>
                  <View
                     style={{
                        top: 10,
                        height: 1.2,
                        backgroundColor: "#d9d9d9",
                        width: "108%"
                     }}
                  ></View>
                  <View
                     style={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                        margin: 10
                     }}
                  >
                     <TouchableOpacity
                        style={styles.modalButton}
                        onPress={() => setModalVisibleBoton(false)}
                     >
                        <Text style={styles.modalButtonText}>DE ACUERDO</Text>
                     </TouchableOpacity>
                  </View>
               </View>
            </View>
         </Modal>
      </ImageBackground>

   );
}
export default RegistroAle;
const styles = StyleSheet.create({
   nover2: {
      left: screenWidthPercentage - width * 0.8 * 0.55,
      top: screenHeightPercentage - height * 0.8 * 0.51,
      width: screenWidthPercentage - width * 0.8 * 0.55,
      height: screenHeightPercentage - height * 0.8 * 0.58,
   },
   nover: {
      top: screenHeightPercentage - height * 0.8 * 0.62,
      width: screenWidthPercentage - width * 0.8 * 0.55,
      height: screenHeightPercentage - height * 0.8 * 0.58,
   },
   image: {
      flex: 1,
   },
   modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)"
   },
   modalViewM: {
      backgroundColor: "white",
      borderRadius: 20,
      padding: 10,
      width: Dimensions.get("window").width - 110,
      alignItems: "center",
      elevation: 0
   },
   modalTextM: {
      fontSize: Dimensions.get("window").width - 375,
      color: "#03B6E8",
      marginTop: 10,
      fontWeight: "bold"
   },
   modalDescription: {
      fontSize: 16,
      color: "#58656B",
      marginTop: 5,
      width: "80%",
      textAlign: "center"
   },
   modalButton: {
      alignItems: "center",
      justifyContent: "center",
      width: width * 0.35,
      marginTop: width * 0.03,
      height: height * 0.025
   },

   modalButtonText: {
      color: "#03B6E8",
      fontSize: 15,
      fontWeight: "bold",
      textAlign: "center"
   },
   modalButtonTextO: {
      color: "#EB691A",
      fontSize: 15,
      fontWeight: "bold",
      textAlign: "center"
   },

   buttonTextBlue: {
      color: "#03B6E8",
      fontWeight: "bold",
      fontSize: height * 0.02
   },
   guardarButton: {
      backgroundColor: "#03B6E8",
      borderRadius: width * 0.03,
      alignItems: "center",
      justifyContent: "center",
      width: width * 0.38,
      height: height * 0.056
   },
   cancelarButton: {
      backgroundColor: "transparent",
      borderRadius: width * 0.03,
      alignItems: "center",
      justifyContent: "center",
      width: width * 0.38,
      height: height * 0.056,
      borderWidth: width * 0.006,
      borderColor: "#03B6E8"
   },
   buttonText: {
      color: "white",
      fontWeight: "bold",
      fontSize: height * 0.02
   },
   container: {
      flex: 1
   },
   text: {
      color: "#03B6E8",
      fontSize: width * 0.09,
      lineHeight: width * 0.1,
      letterSpacing: width * 0.0010,
      top: screenHeightPercentage - height * 0.3 * 1.10,
      left: screenWidthPercentage - width * 0.8 * 0.31,
      fontFamily: "Lato-Bold",
      fontWeight: "bold"
   },
   datosC: {
      height: height * 100,
      width: width * 1,
      bottom: 0,
      top: height * -0.18,
      backgroundColor: '#fff',
      paddingTop: height * 0.02,
      borderTopEndRadius: height * 0.025,
      borderTopStartRadius: height * 0.025
   },
   datos: {
      alignSelf: "center",
      width: width * 0.8,
      paddingBottom: height * 0.015
   },
   label: {
      color: "#878789",
      fontFamily: "Lato-Regular"
   },
   textarea: {
      height: height * 0.05,
      fontSize: width * 0.04,
      color: "black",
      fontWeight: "bold",
      flex: 1
   },
   tinyLogo: {
      alignItems: "center",
      justifyContent: "center",
      width: height * 0.15,
      height: height * 0.11,
      top: screenHeightPercentage - height * 0.3 * 1.26,
      left: screenWidthPercentage - width * 0.8 * 0.2
   },
   complete: {
      fontStyle: "normal",
      fontSize: width * 0.05,
      lineHeight: width * 0.02,
      textAlign: "center",
      letterSpacing: width * 0.002,
      color: "#FFFFFF",
      height: height * 0.11,
      left: screenWidthPercentage - width * 0.8 * 0.62,
      fontFamily: "Lato-Regular",
      top: height * 0.17,
   },
   container: {
      width: "100%",
      height: "50%"
   },
   secondText: {
      fontStyle: "normal",
      fontSize: width * 0.05,
      lineHeight: width * 0.02,
      fontFamily: "Lato-Regular",
      textAlign: "center",
      letterSpacing: width * 0.002,
      color: "#FFFFFF",
      height: height * 0.11,
      top: height * 0.10,
      left: screenWidthPercentage - width * 0.8 * 0.62,
   }
});
