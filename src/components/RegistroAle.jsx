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
import { AppBar } from "./AppBar";
import { useState } from "react";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { TouchableHighlight } from "react-native-gesture-handler";
import { supabase } from "../lib/supabase";
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
   const [isPasswordVisible, setIsPasswordVisible] = useState(false);
   const [isPasswordVisibleDown, setIsPasswordVisibleDown] = useState(false);

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
               <StyledText fontSize={responsiveFontSize(0)} style={styles.label}>
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
               <StyledText fontSize={responsiveFontSize(0)} style={styles.label}>
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
               <StyledText fontSize={responsiveFontSize(0)} style={styles.label}>
                  Contraseña
               </StyledText>
               <View
                  style={{ flexDirection: "row", justifyContent: "space-between" }}
               >
                  <TextInput
                     secureTextEntry={!isPasswordVisible}
                     style={styles.textarea}
                     value={user.password}
                     onChangeText={(text) =>
                        setUser({
                           ...user,
                           password: text
                        })
                     }
                  ></TextInput>
                  <TouchableOpacity onPress={() => setIsPasswordVisible(prevState => !prevState)}>
                     <Image source={isPasswordVisible 
                     ? require('../../assets/icons/Ver.png') 
                     : require('../../assets/images/NoVerGrey.png')} style={styles.nover} />
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
                     secureTextEntry={!isPasswordVisibleDown}
                     style={styles.textarea}
                     value={confirmPass}
                     //onChange={verifyPassword}
                     onChangeText={(text) => setConfirmPass(text)}
                  ></TextInput>
                  <TouchableOpacity onPress={() => setIsPasswordVisibleDown(prevState => !prevState)}>
                     <Image source={isPasswordVisibleDown 
                     ? require('../../assets/icons/Ver.png') 
                     : require('../../assets/images/NoVerGrey.png')
                  } style={styles.nover} />
                  </TouchableOpacity>
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
      left: responsiveWidth(2),
      top: responsiveHeight(2),
      width: responsiveWidth(2),
      height:responsiveHeight(2),
   },
   nover: {
      top:responsiveHeight(1),
      width: responsiveWidth(7),
      height:responsiveHeight(3.5),
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
      borderRadius: responsiveFontSize(2),
      padding: responsiveWidth(2),
      width: responsiveWidth(80), 
      alignItems: "center",
   },
   modalTextM: {
      fontSize: responsiveFontSize(3),
      color: "#03B6E8",
      marginTop: 10,
      fontWeight: "bold"
   },
   modalDescription: {
      fontSize: responsiveFontSize(2),
      color: "#58656B",
      marginTop: 5,
      width: "80%",
      textAlign: "center"
   },
   modalButton: {
      alignItems: "center",
      justifyContent: "center",
      width:responsiveWidth(40),
      marginTop: width * 0.03,
      height:responsiveHeight(4)
,   },

   modalButtonText: {
      color: "#03B6E8",
      fontSize: 15,
      fontWeight: "bold",
      textAlign: "center"
   },
   modalButtonTextO: {
      color: "#EB691A",
      fontSize: responsiveFontSize(4),
      fontWeight: "bold",
      textAlign: "center"
   },

   buttonTextBlue: {
      color: "#03B6E8",
      fontWeight: "bold",
      fontSize:responsiveFontSize(2),
   },
   guardarButton: {
      backgroundColor: "#03B6E8",
      borderRadius: responsiveFontSize(1),
      alignItems: "center",
      justifyContent: "center",
      width: responsiveWidth(40),
      height: responsiveHeight(6),
   },
   cancelarButton: {
      backgroundColor: "transparent",
      borderRadius: responsiveFontSize(1),
      alignItems: "center",
      justifyContent: "center",
      width: responsiveWidth(40),
      height: responsiveHeight(6),
      borderWidth:responsiveFontSize(0.3),
      borderColor: "#03B6E8"
   },
   buttonText: {
      color: "white",
      fontWeight: "bold",
      fontSize:responsiveFontSize(2),
   },
   container: {
      flex: 1
   },
   text: {
      color: "#03B6E8",
      fontSize: responsiveFontSize(5),
      lineHeight: responsiveHeight(8),
      letterSpacing: responsiveFontSize(0.2),
      top: responsiveHeight(17),
      left: responsiveWidth(22),
      fontFamily: "Lato-Bold",
      fontWeight: "bold"
   },
   datosC: {
      height: responsiveHeight(55),
      width: responsiveWidth(100),
      bottom: responsiveHeight(18),
      backgroundColor: '#fff',
      paddingTop: responsiveHeight(4),
      borderTopEndRadius: responsiveFontSize(2.5),
      borderTopStartRadius: responsiveFontSize(2.5)
   },
   datos: {
      alignSelf: "center",
      width: responsiveWidth(80),
      paddingBottom:responsiveHeight(1.5),
   },
   label: {
      color: "#878789",
      fontFamily: "Lato-Regular"
   },
   textarea: {
      height: responsiveHeight(5),
      fontSize: responsiveFontSize(2),
      color: "black",
      fontWeight: "bold",
      flex: 1
   },
   tinyLogo: {
      alignItems: "center",
      justifyContent: "center",
      width:responsiveWidth(30),
      height: responsiveHeight(10),
      top:responsiveHeight(12.5),
      left: responsiveWidth(35)
   },
   complete: {
      fontStyle: "normal",
      fontSize: responsiveFontSize(2.9),
      lineHeight: responsiveFontSize(2),
      textAlign: "center",
      letterSpacing: responsiveFontSize(0),
      color: "#FFFFFF",
      height: responsiveHeight(10),
      left: responsiveWidth(0.2),
      fontFamily: "Lato-Regular",
      top: responsiveHeight(17),
   },
   container: {
      width: "100%",
      height: "50%"
   },
   secondText: {
      fontStyle: "normal",
    
      fontFamily: "Lato-Regular",
      textAlign: "center",
      color: "#FFFFFF",
      fontSize: responsiveFontSize(2.9),
      lineHeight: responsiveFontSize(2),
      textAlign: "center",
      letterSpacing: responsiveFontSize(0),
      color: "#FFFFFF",
      height: responsiveHeight(10),
      left: responsiveWidth(0.2),
      fontFamily: "Lato-Regular",
      top: responsiveHeight(12),
   }
});
