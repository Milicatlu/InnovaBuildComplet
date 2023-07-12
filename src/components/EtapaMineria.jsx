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
import { MaterialIcons } from "@expo/vector-icons";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

import { StyledText } from "./StyledText"
import { AppBar } from "./AppBar"
import { useState } from "react"
export function EtapaMineria() {

   const [selectedValue, setSelectedValue] = useState('true');
  const [textColor, setTextColor] = useState('#ffff');
  const [color, setColor] = useState('#EB691A');
  const [color2, setColor2] = useState('#1DB6E5');
  const [color3, setColor3] = useState('#1DB6E5');
  const options = [
   { label: 'ENCENDIDO', value: 'true', activeColor: '#ffff', activeFontColor: '#ffff' },
   { label: '', value: 'false',  activeColor: '#ffff', activeFontColor: '#fff' },
 ];
 const onValueChange = (value) => {
   setSelectedValue(value);
   
   // Actualizar el color del texto basado en el valor seleccionado
   if (value === 'true') {
     setTextColor('#ffff'); // Blanco para 'true'
   } else {
     setTextColor('#ffff'); // Naranja para 'false'
   }
 };
   const [isEnabled, setIsEnabled] = useState(true);
   const togleSwitch = () => {
      setIsEnabled(previousState => !previousState)
   }
   const [showhide, setShowHide] = useState(false);

   
   return (
      <>

         <View style={styles.container}>
            <ImageBackground
               source={require("../../assets/images/Fondo-06.jpg")}
               style={styles.imagen}
            >
               <AppBar />
               <View style={styles.subcontainer}>
                  <Text style={styles.titulo}>MINERÍA</Text>
                  <StyledText
                     align="center"
                     fontSize="subheading1"
                     color="primary"
                     style={{ paddingBottom: responsiveHeight(2), fontSize: responsiveFontSize(2.7) }}
                  >
                     Bomba de la varilla
                  </StyledText>

                  <View style={styles.imagencontainer}>

                     {showhide !== true ? <ImageBackground source={require("../../assets/images/MenorGrado.png")} style={{ height:responsiveHeight(30) }} />
                        : <ImageBackground source={require("../../assets/images/MayorGrado.png")} style={{ height:responsiveHeight(30) }} />}
                  </View>
               </View>

            </ImageBackground>
            <View style={styles.contenedor}>
               <StyledText fontWeight="bold" fontSize="subheading1" style={{ marginTop: responsiveHeight(5),fontSize:responsiveFontSize(2.5), marginLeft: responsiveWidth(10), color: "#1DB6E5" }}>Datos del motor:</StyledText>
               <View style={{ alignItems: "center", marginLeft: 1 }}>
                  {showhide !== true ? <StyledText fontStyle="italic" color="terciary" style={{ marginTop: responsiveHeight(3), marginLeft: responsiveWidth(-6), width: responsiveWidth(79), fontSize: responsiveFontSize(2.2) }}>El funcionamiento del motor , se encuentra en modo apagado con una temperatura baja de 10° grados</StyledText>
                     : <StyledText fontStyle="italic" color="terciary" style={{  marginTop: responsiveHeight(3), marginLeft: responsiveWidth(-16), width: responsiveWidth(70), fontSize: responsiveFontSize(2.2) }}>El funcionamiento del motor , se encuentra en modo encendido con una temperatura mayor a 40° grados</StyledText>}
               </View>
               <View style={{ marginTop: responsiveHeight(5), marginLeft: responsiveWidth(5) }}>
                  <View style={{ flexDirection: "row" }}>
                     <StyledText fontWeight="bold" color="terciary" style={{ marginLeft: responsiveWidth(5), marginTop: responsiveHeight(0.5), fontSize:responsiveFontSize(1.9) }} >Funcionamiento del motor</StyledText>
                     <View style={styles.container2}>
                  
         <SwitchSelector style={styles.container2}
                           initial={0}
                           fontSize={responsiveFontSize(1.25)}
                           backgroundColor={color3}
                           bold={true}
                           textColor={"#FFFF"}
                           selectedColor={'#FFFF'}
                           buttonColor={"#FFFF"}
                           borderColor={"#FFF"}
                           hasPadding options={[{ label: " ENCENDIDO", value: true, activeColor: "#FFF" }, { label: "APAGADO", value: false, activeColor: "#FFF" }]}
                           valuePadding={6}
                           height={30}
                           onPress={(value) => {
                              setColor(value ? '#1DB6E5' : '#EB691A');
                              setColor3(value ?  '#EB691A' : '#1DB6E5');
                              setShowHide(value);
                            }}
                           testID="gender-switch-selector"
                           accessibilityLabel="gender-switch-selector"
                        />
    </View>
 

                  </View>
                  <View style={{ flexDirection: "row", alignItems: "stretch", marginTop: 10 }}>
                     <StyledText fontWeight="bold" color="terciary" style={{ marginLeft: 20, marginTop: 5 }} fontSize={14}>Temperatura del motor</StyledText>


                     <View style={{ marginLeft: "20%", flexDirection: "row", alignItems: "center" }}>
                        {showhide !== true ? (
                           <>
                              <Image source={require("../../assets/icons/Temperatura.png")} style={{ width: 40, height: 45 }} />
                              <StyledText style={{ fontWeight: "bold", fontSize: 20, color: "#1DB6E5" }}>10°</StyledText>
                           </>
                        ) : (
                           <>
                           <Image source={require("../../assets/images/TemperaturaAlta.png")} style={{ width: 40, height: 45 }} />  
                           <StyledText style={{ fontWeight: "bold", fontSize: 20, color: "#EB691A" }}>+40°</StyledText>
                           </>
                        )}
                     </View>
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
      paddingTop: responsiveHeight(1),
   },
   subcontainer: {
      flex: 0.9,
      padding: responsiveHeight(2),
      paddingTop: responsiveHeight(5),
      flexDirection: "column",
      marginBottom: responsiveHeight(90),
   },
   titulo: {
      alignSelf: "center",
      paddingBottom: responsiveHeight(3),
      fontSize: responsiveFontSize(5),
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

   container: {
      flex: 1,
      justifyContent: 'center',
    },
   imagencontainer: {
      flex: 0.8,
      maxHeight: responsiveHeight(50),
   },
   contenedor: {
      height:responsiveHeight(40),
      flexDirection: "column",
      borderTopLeftRadius: responsiveFontSize(3),
      borderTopRightRadius: responsiveFontSize(3),
      backgroundColor: "white",
      marginTop: responsiveHeight(-100),

   },
   container2: {
      width: responsiveWidth(33),
      height: responsiveHeight(3.5),

   },
  
}) 
/*
<View style={{backgroundColor: showhide ? '#1DB6E5' : '#EB691A'}}>
<SwitchSelector 
    style={[styles.container2, {backgroundColor: showhide ? '#1DB6E5' : '#EB691A'}]}
    initial={0}
    fontSize={12}
    bold={true}
    hasPadding 
    options={[
        { label: "Encendido", value: "true", activeColor: '#1DB6E5' }, 
        { label: "Apagado", value: "false", activeColor: '#EB691A' }
    ]}
    valuePadding={responsiveHeight(-0.02)}
    height={30}
    onPress={(value) => setShowHide(value === "true")}
    trackColor={{ false: "#EB691A", true: "#1DB6E5" }}
    testID="gender-switch-selector"
    accessibilityLabel="gender-switch-selector"
/>
</View>

*/