//RESPONSIVE
import { ImageBackground, StyleSheet, View, Text } from "react-native"
import SwitchSelector from "react-native-switch-selector";
import { StyledText } from "./StyledText"
import { AppBar } from "./AppBar"
import { useState } from "react"
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

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
                  <Text style={styles.titulo}>Petróleo</Text>
                  <StyledText
                     align="center"
                     fontSize="subheading1"
                     fontWeight="bold"
                     color="primary"
                     style={{ paddingBottom: 40, fontSize: 22 }}
                  >
                     Etapa de Petróleo
                  </StyledText>

                  <View style={styles.imagencontainer}>
                     {showhide !== true ? <ImageBackground source={require("../../assets/images/MenorGrado.png")} style={styles.imagen2} /> : <ImageBackground source={require("../../assets/images/MayorGrado.png")} style={styles.imagen2} />}
                     <StyledText
                     align="center"
                     fontSize="subheading1"
                     fontWeight="bold"
                     color="primary"
                     style={styles.porcent}
                  >
                     0º
                  </StyledText>
                  <StyledText
                     align="center"
                     fontSize="subheading1"
                     fontWeight="bold"
                     color="primary"
                     style={styles.porcent2}
                  >
                     35º
                  </StyledText>
                  </View>
               </View>

            </ImageBackground>
            <View style={styles.contenedor}>
               <StyledText fontWeight="bold" fontSize="subheading1" style={{ marginTop: responsiveHeight(5), marginLeft: responsiveWidth(10), color: "#1DB6E5" , ontSize:responsiveFontSize(2.5),}}>Datos del motor:</StyledText>
               <View style={{ alignItems: "center", marginLeft: 1 }}>
                  {showhide !== true ? <StyledText fontStyle="italic" color="terciary" style={{ marginTop: responsiveHeight(3),  marginLeft: responsiveWidth(-6), width: responsiveWidth(75), fontSize: responsiveFontSize(2.2) }} >El funcionamiento del motor , se encuentra en modo apagado con una baja temperatura de 10º grados.</StyledText> :
                     <StyledText fontStyle="italic" color="terciary" style={{ marginTop: responsiveHeight(3), marginLeft: responsiveWidth(-16), width: responsiveWidth(70), fontSize: responsiveFontSize(2.2) }}>El funcionamiento del motor , se encuentra en modo encendido con una temperatura alta de 26º grados</StyledText>}
               </View>
               <View style={{  marginTop: responsiveHeight(5), marginLeft: responsiveWidth(5) }}>
                  <View style={{ flexDirection: "row", alignItems: "stretch" }}>
                     <StyledText fontWeight="bold" color="terciary" style={{  marginLeft: responsiveWidth(5), marginTop: responsiveHeight(0.5), fontSize:responsiveFontSize(1.9)  }} >Funcionamiento del motor</StyledText>
                     <View style={{ marginLeft:responsiveWidth(5)}}>
                        <SwitchSelector style={styles.container2}
                           initial={0}
                           fontSize={12}
                           backgroundColor={'#FFFF'}
                           bold={true}
                           textColor={"#FFFF"}
                           selectedColor={'#FFFF'}
                           buttonColor={"#FFFF"}
                           borderColor={"#000000"}
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
                           backgroundColor={'#FFFF'}
                           bold={true}
                           textColor={"#FFFF"}
                           selectedColor={'#FFFF'}
                           buttonColor={"#FFFF"}
                           borderColor={"#000000"}
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
   imagen2: {
      alignItems: "center",
      justifyContent: "center",
      height: responsiveHeight(30),
   },
   imagencontainer: {
      flex: 0.8,
      height: responsiveHeight(15),
   },
   contenedor: {
      height:responsiveHeight(40),
      flexDirection: "column",
      borderTopLeftRadius: responsiveFontSize(3),
      borderTopRightRadius: responsiveFontSize(3),
      backgroundColor: "#fff",
      marginTop: responsiveHeight(-100),
   },
   container2: {
      width: responsiveWidth(30),
      height: responsiveHeight(5),
   },
   porcent:{
      fontSize: responsiveFontSize(3),
      right: responsiveWidth(33)
   },
   porcent2:{
      fontSize: responsiveFontSize(3),
      left: responsiveWidth(33)
      
   }
})