//RESPONSIVE
import {
   ImageBackground,
   Pressable,
   StyleSheet,
   TouchableOpacity,
   View,
   Text,
   Image,
   Switch
} from "react-native"
import SwitchSelector from "react-native-switch-selector";

import { StyledText } from "./StyledText"
import { AppBar } from "./AppBar"
import { useState } from "react"
export function EtapaPetroleo() {
   const options = [
      { label: "01:00", value: "1" },
      { label: "01:30", value: "1.5" },
      { label: "02:00", value: "2" }
   ];

   const [isEnabled, setIsEnabled] = useState(true);
   const togleSwitch = () => {
      setIsEnabled(previousState => !previousState)
   }

   const [showhide, setShowHide] = useState(false);
   const [showhide2, setShowHide2] = useState(false);
   return (
      <>

         <View style={styles.container}>
            <ImageBackground
               source={require("../../assets/images/Fondo-06.jpg")}
               style={styles.imagen}
            >
               <AppBar />
               <View style={styles.subcontainer}>
                  <Text style={styles.titulo}>Petroleo</Text>
                  <StyledText
                     align="center"
                     fontSize="subheading1"
                     fontWeight="bold"
                     color="primary"
                     style={{ paddingBottom: 40, fontSize: 22 }}
                  >
                     Etapa de Petroleo
                  </StyledText>

                  <View style={styles.imagencontainer}>
                     {showhide !== true ? <ImageBackground source={require("../../assets/images/MenorGrado.png")} style={{ height: "90%" }} /> : <ImageBackground source={require("../../assets/images/MayorGrado.png")} style={{ height: "90%" }} />}


                  </View>
               </View>

            </ImageBackground>
            <View style={styles.contenedor}>
               <StyledText fontWeight="bold" fontSize="subheading1" style={{ marginTop: 20, marginLeft: 30, color: "#1DB6E5" }}   >Datos del motor:</StyledText>
               <View style={{ alignItems: "center", marginLeft: 20 }}>
                  {showhide !== true ? <StyledText fontStyle="italic" color="terciary" style={{ marginTop: 20, marginLeft: -50, width: 296, fontSize: 16 }} >El funcionamiento del motor , se encuentra en modo apagado con una baja temperatura de 10º grados</StyledText> :
                     <StyledText fontStyle="italic" color="terciary" style={{ marginTop: 20, marginLeft: -50, width: 296, fontSize: 16 }}>El funcionamiento del motor , se encuentra en modo encendido con una temperatura alta de 26º grados</StyledText>}
               </View>
               <View style={{ marginTop: 20, marginLeft: 10 }}>
                  <View style={{ flexDirection: "row", alignItems: "stretch" }}>
                     <StyledText fontWeight="bold" color="terciary" style={{ marginLeft: 20, marginTop: 5 }} fontSize={14}>Funcionamiento del motor</StyledText>
                     <View style={{ marginLeft: 20 }}>
                        <SwitchSelector style={styles.container2}
                           initial={0}
                           fontSize={12}
                           backgroundColor={'#000000'}
                           bold={true}
                           textColor={"#FFFF"}
                           selectedColor={'#FFFF'}
                           buttonColor={"#FFFF"}
                           borderColor={"#FFF"}
                           hasPadding options={[{ label: "Encendido", value: true, activeColor: "#1DB6E5" }, { label: "Apagado", value: false, activeColor: "#EB691A" }]}
                           valuePadding={3}
                           height={30}
                           onPress={(value) => setShowHide(value)}
                           trackColor={{ false: "red", true: "blue" }}
                           testID="gender-switch-selector"
                           accessibilityLabel="gender-switch-selector"
                        />
                     </View>
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "stretch", marginTop: 10 }}>
                     <StyledText fontWeight="bold" color="terciary" style={{ marginLeft: 20, marginTop: 5 }} fontSize={14} >Caudal de extraccion</StyledText>
                     <View style={{ marginLeft: 54 }}>
                        <SwitchSelector style={styles.container2}
                           initial={0}
                           fontSize={12}
                           backgroundColor={'#000000'}
                           bold={true}
                           textColor={"#FFFF"}
                           selectedColor={'#FFFF'}
                           buttonColor={"#FFFF"}
                           borderColor={"#FFF"}
                           hasPadding options={[{ label: "Encendido", value: true, activeColor: "#1DB6E5" }, { label: "Apagado", value: true, activeColor: "#EB691A" }]}
                           valuePadding={3}
                           onPress={(value) => setShowHide2(value)}
                           height={30}
                           trackColor={{ false: "red", true: "blue" }}
                           testID="gender-switch-selector"
                           accessibilityLabel="gender-switch-selector"
                        />
                     </View >
                  </View>
                  <View style={{ marginTop: 20 }} />
               </View>
            </View>

         </View>
      </>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   imagen: {
      flex: 1,
      flexDirection: "column",
      paddingTop: 10,
   },
   subcontainer: {
      flex: 0.9,
      padding: 40,
      paddingTop: 20,
      flexDirection: "column",
      marginBottom: 10,
   },
   SiloContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
   },
   nuevaBolsa: {
      width: "100%",
      height: 30,
      backgroundColor: "#03B6E8",
      color: "#fff",
      borderRadius: 15,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 10,
      fontSize: 18,
   },
   infobolsaC: {
      flex: 10,
      flexDirection: "row",
      maxHeight: "20%",
      padding: 13,
      backgroundColor: "#fff",
      borderTopLeftRadius: 35,
      borderTopRightRadius: 35,
      marginTop: 10,
      marginBottom: 10,
      maxWidth: "150%",
   },
   infobolsa: {
      flex: 1,
      justifyContent: "space-between",
      alignItems: "center",

   },
   valor: {
      flex: 0.9,
      justifyContent: "center",
      alignItems: "center",
   },
   color: {
      width: "100%",
      flex: 0.1,
      backgroundColor: "red",
   },
   valorN: {
      fontSize: 35,
   },
   text: {
      color: "#03B6E8",
      fontSize: 28,
      marginBottom: 20,
      marginTop: 10,
      alignSelf: "center",
      fontFamily: "Lato-Bold",
   },
   titulo: {
      alignSelf: "center",
      fontSize: 40,
      fontWeight: "bold",
      color: "#03B6E8",

   },
   editarnombre: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "center",
      marginTop: 10,
   },
   textedit: {
      flex: 0.87,
      color: "#04B6E8",
      fontSize: 18,
      fontFamily: "Roboto",
      justifyContent: "center",
      alignItems: "center",
   },
   icons: {
      color: "#04B6E8",
      margin: 10,
      fontSize: 32,
   },
   imagen2: {
      flex: 1,
      flexDirection: "column",
      padding: 20,
      paddingTop: 10,
   },
   btn: {
      backgroundColor: "#04B6E8",
      color: "#fff",
      borderRadius: 15,
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
   },
   magnitud: {
      flex: 5,
      fontSize: 15,
      textAlign: "center",
      marginTop: 20
   },

   imagencontainer: {
      flex: 0.8,
      maxHeight: "100%",
   },
   contenedor: {
      flexDirection: "column",
      borderTopLeftRadius: 35,
      borderTopRightRadius: 35,
      backgroundColor: "white",
      marginTop: -100

   },

   lleno: {
      backgroundColor: "rgb(3,182,232)",
   },

   container2: {
      width: 140,
      height: 10,

   },
   option1: {
      backgroundColor: 'blue', // Estilo para la opción 'Encendido'
   },
   option2: {
      backgroundColor: 'red', // Estilo para la opción 'Apagado'
   },
})