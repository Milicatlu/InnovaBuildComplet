//RESPONSIVE
import {
   ImageBackground,
   Pressable,
   StyleSheet,
   TouchableOpacity,
   View,
   Text,
   Modal
} from "react-native"
import SwitchSelector from "react-native-switch-selector";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { LineChart } from "react-native-chart-kit";
import { StyledText } from "./StyledText";
import { AppBar } from "./AppBar"
import { useState } from "react"
import { ScrollView } from "react-native-gesture-handler";

export function EtapaPetroleo() {
      // Datos de los meses

   const meses = ["1h.", "2h.", "3h.", "4h.", "5h.", "6h.", "7h.", "8h."];
      // Estados para manejar el cambio de colores y la visibilidad del modal

   const [parametro1, setParametro1] = useState(meses)
   const [color, setColor] = useState('#EB691A');
   const [color2, setColor2] = useState('#1DB6E5');
   const [color3, setColor3] = useState('#1DB6E5');


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
               {/* se declaran los text y styledtext para declarar los titulos */}
               <View style={styles.subcontainer}>
                  <Text style={styles.titulo}>
                  Petroleo
                  </Text>
                  <StyledText
                     align="center"
                     fontSize="subheading1"
                     fontWeight="bold"
                     color="primary"
                     style={{ paddingBottom: 40, fontSize: 22 }}
                  >
                     Etapa de: Upstream
                  </StyledText>

                  <View style={styles.imagencontainer}>
                     {/*en esta parte se crea un scrollview que muestra la temperatura del motor junto con un grafico que muesstra como fue variando la temperatura del motor */}
                     <ScrollView >
                     <View>
                     {showhide !== true ? <ImageBackground source={require("../../assets/images/MayorGrado.png")} style={{ height:responsiveHeight(30) }} />
                     : <ImageBackground source={require("../../assets/images/MenorGrado.png")} style={{ height:responsiveHeight(30) }} />}

                     {/*Se declaran los numeros que marcan las temperaturas maximas e minimas del motor */}
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

                     {/*Aca se crea el grafico que  muestra como fue cambiando el valor de la temperatura del motor durante el transcurso de las ultimas horas */}
                     <View style={styles.item}>
                                <StyledText style={{ textAlign: "center", color: "#FFF" }}>Flujo de temperatura del motor</StyledText>
                                <LineChart data={{
                                    labels: parametro1,
                                    datasets: [
                                        { data: [25, 17, 20, 11, 19, 29, 7, 10, 9] }
                                    ]
                                }}
                                    width={responsiveWidth(80)}
                                    height={responsiveHeight(25)}
                                    yAxisSuffix='°'
                                    yAxisInterval={1}
                                    chartConfig={{
                                        backgroundGradientFrom: "rgba(0, 0, 0, 0)",
                                        backgroundGradientTo: "rgba(0, 0, 0, 0)",
                                        decimalPlaces: 2,
                                        color: (opacity = 0) => color,
                                        labelColor: (opacity = 0) => `#FFF`,
                                        style: {
                                            borderRadius: 16,
                                            textColor:"red"
                                        },
                                        propsForDots: {
                                            r: "4",
                                            strokeWidth: "1",
                                            stroke: color
                                        },
                                    }}
                                    bezier
                                    style={{
                                        marginVertical: 8,

                                    }}
                                />
                            </View>
                     </ScrollView>
                  </View>
               </View>
               
            {/*aca se crea el menu para poder controlar el funcionamiento del motor y el caudal de extrccion de la misma */}
            </ImageBackground>
            <View style={styles.contenedor}>
               <StyledText fontWeight="bold" fontSize="subheading1" style={{ marginTop: 20, marginLeft: 30, color: "#1DB6E5" }}   >Datos del motor:</StyledText>
               <View style={{ alignItems: "center", marginLeft: 20 }}>
                  {showhide !== true ? <StyledText fontStyle="italic" color="terciary" style={{ marginTop: 20, marginLeft: -50, width: 296, fontSize: 16 }}>El funcionamiento del motor , se encuentra en modo encendido con una temperatura cercana a los 40° grados</StyledText>
                     : <StyledText fontStyle="italic" color="terciary" style={{ marginTop: 20, marginLeft: -50, width: 296, fontSize: 16 }}>El funcionamiento del motor , se encuentra en modo apagado con una temperatura cercana a los  10° grados</StyledText>}
               </View>
               <View style={{ marginTop: 20, marginLeft: 10 }}>
                  <View style={{ flexDirection: "row" }}>
                     <StyledText fontWeight="bold" color="terciary" style={{ marginLeft: 20, marginTop: 5 }} fontSize={14}>Funcionamiento del motor</StyledText>

                     {/*Aca se crean los SwitchSelector para poder controlar los caudales de extraccion y el funcionamiento del motor */}
                     <View style={{ marginLeft: 20 }}>
                        <SwitchSelector style={styles.container2}
                           initial={0}
                           fontSize={12}
                           backgroundColor={color3}
                           bold={true}
                           textColor={"#FFFF"}
                           selectedColor={'#FFFF'}
                           buttonColor={"#FFFF"}
                           borderColor={"#FFF"}
                           hasPadding options={[{ label: "Encendido", value: true, activeColor: "#FFF" }, { label: "Apagado", value: false, activeColor: "#FFF" }]}
                           valuePadding={3}
                           height={30}
                           onPress={(value) => {
                              setColor(value ? '#1DB6E5' : '#EB691A');
                              setColor3(value ?  '#EB691A' : '#1DB6E5');
                              setShowHide(value);
                            }}
                            
                           trackColor={{ false: "red", true: "blue" }}
                           testID="gender-switch-selector"
                           accessibilityLabel="gender-switch-selector"
                        />
                     </View>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                  <StyledText fontWeight="bold" color="terciary" style={{ marginLeft: 20, marginTop: 5 }} fontSize={14}>Caudal de extraccion         </StyledText>
                     <View style={{ marginLeft: 20 }}>
                        <SwitchSelector style={styles.container2}
                           initial={0}
                           fontSize={12}
                           backgroundColor={color2}
                           bold={true}
                           textColor={"#FFFF"}
                           selectedColor={'#FFFF'}
                           buttonColor={"#FFFF"}
                           borderColor={"#FFF"}
                           hasPadding options={[{ label: "Encendido", value: true, activeColor: "#FFF" }, { label: "Apagado", value: false, activeColor: "#FFF" }]}
                           valuePadding={3}
                           height={30}
                           onPress={(value) => {
                              setColor2(value ?  '#EB691A' : '#1DB6E5');
                            }}
                            
                           trackColor={{ false: "red", true: "blue" }}
                           testID="gender-switch-selector"
                           accessibilityLabel="gender-switch-selector"
                        />
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
      padding: responsiveWidth(10),
      paddingTop: responsiveHeight(6),
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
      height: 0,
      backgroundColor: "#03B6E8",
      color: "#fff",
      borderRadius: responsiveWidth(4),
      justifyContent: "center",
      alignItems: "center",
      marginTop: responsiveHeight(1),
      fontSize: responsiveFontSize(2),
  },
  infobolsaC: {
      flex: 10,
      flexDirection: "row",
      maxHeight: "20%",
      padding: responsiveWidth(3),
      backgroundColor: "#fff",
      borderTopLeftRadius: responsiveWidth(16),
      borderTopRightRadius: responsiveWidth(16),
      marginTop: responsiveHeight(1),
      marginBottom: responsiveHeight(1.2),
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
      fontSize: responsiveFontSize(4),
  },
  text: {
      color: "#03B6E8",
      fontSize: responsiveFontSize(3.5),
      marginBottom: responsiveHeight(2),
      marginTop: responsiveHeight(1),
      alignSelf: "center",
      fontFamily: "Lato-Bold",
  },
     // Estilos para el título de la página

  titulo: {
      alignSelf: "center",
      fontSize: responsiveFontSize(5),
      fontWeight: "bold",
      color: "#03B6E8",
  },
  editarnombre: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "center",
      marginTop: responsiveHeight(1),
  },
  textedit: {
      flex: 0.87,
      color: "#04B6E8",
      fontSize: responsiveFontSize(2),
      fontFamily: "Roboto",
      justifyContent: "center",
      alignItems: "center",
  },
  icons: {
      color: "#04B6E8",
      margin: responsiveWidth(2),
      fontSize: responsiveFontSize(3),
  },
  imagen2: {
      flex: 1,
      flexDirection: "column",
      padding: responsiveWidth(5),
      paddingTop: responsiveHeight(1),
  },
  btn: {
      backgroundColor: "#04B6E8",
      color: "#fff",
      borderRadius: responsiveWidth(4),
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
  },
  magnitud: {
      flex: 5,
      fontSize: responsiveFontSize(1.5),
      textAlign: "center",
      marginTop: responsiveHeight(0.4),
  },

  imagencontainer: {
      flex: 0.8,
      maxHeight: responsiveHeight(40),
      left: responsiveWidth(0.5),
      alignContent: "center",
  },
  contenedor: {
      flexDirection: "column",
      borderTopLeftRadius: responsiveFontSize(3),
      borderTopRightRadius: responsiveFontSize(3),
      backgroundColor: "white",
      marginTop: responsiveHeight(-100),
  },

  lleno: {
      backgroundColor: "rgb(3,182,232)",
  },
   // Estilos para el contenedor secundario

  container2: {
      width: responsiveWidth(35),
      height: responsiveHeight(5),
  },
     // Estilos para la etiqueta de porcentaje "0º"

   porcent:{
      fontSize: responsiveFontSize(2.5),
      right: responsiveWidth(34.7),
      bottom: responsiveHeight(4)      
   },
      // Estilos para la etiqueta de porcentaje "35º"

   porcent2:{
      fontSize: responsiveFontSize(2.5),
      left: responsiveWidth(33.5),
      bottom: responsiveHeight(8)
   },
})









