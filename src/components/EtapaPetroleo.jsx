//RESPONSIVE
import {
   ImageBackground,
   Pressable,
   StyleSheet,
   TouchableOpacity,
   View,
   Text,
} from "react-native"
import SwitchSelector from "react-native-switch-selector";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { LineChart } from "react-native-chart-kit";
import { StyledText } from "./StyledText";
import { AppBar } from "./AppBar"
import { useState } from "react"
import { ScrollView } from "react-native-gesture-handler";
export function EtapaPetroleo() {
   const meses = ["1h.", "2h.", "3h.", "4h.", "5h.", "6h.", "7h.", "8h."];
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
               <View style={styles.subcontainer}>
                  <Text style={styles.titulo}>
                  PETRÓLEO
                  </Text>
                  <StyledText
                     align="center"
                     fontSize="subheading1"
                     color="primary"
                     style={{ paddingBottom: responsiveHeight(2), fontSize: responsiveFontSize(2.7) }}
                  >
                     Etapa de: Upstream
                  </StyledText>
                  <View style={styles.imagencontainer}>
                    
                     <View>
                     {showhide !== true ? <ImageBackground source={require("../../assets/images/MayorGrado.png")} style={{ height:responsiveHeight(30) }} />
                     : <ImageBackground source={require("../../assets/images/MenorGrado.png")} style={{ height:responsiveHeight(30) }} />}
                     </View>
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
                     <ScrollView >
                     <View style={styles.item}>
                                <StyledText style={{ textAlign: "center", color: "#FFF" }}>Flujo de temperatura del motor</StyledText>
                                <LineChart data={{
                                    labels: parametro1,
                                    datasets: [
                                        { data: [25, 17, 20, 11, 19, 29, 7, 10, 9] }
                                    ]
                                }}
                                    width={315}
                                    height={170}
                                    yAxisSuffix='°'
                                    yAxisInterval={1}
                                    chartConfig={{
                                        backgroundColor: "red",
                                        backgroundGradientFrom: color,
                                        backgroundGradientTo: "rgba(0, 0, 0, 0)",
                                        decimalPlaces: 2,
                                        color: (opacity = 0) => `#CCA500`,
                                        labelColor: (opacity = 0) => `rgba(0,0,0, ${opacity})`,
                                        style: {
                                            borderRadius: 16
                                        },
                                        propsForDots: {
                                            r: "4",
                                            strokeWidth: "1",
                                            stroke: "#CCA500"
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
            </ImageBackground>
            <View style={styles.contenedor}>
               <StyledText fontWeight="bold" fontSize="subheading1" style={{ marginTop: 20, marginLeft: 30, color: "#1DB6E5" }}   >Datos del motor:</StyledText>
               <View style={{ alignItems: "center", marginLeft: 20 }}>
                  {showhide !== true ? <StyledText fontStyle="italic" color="terciary" style={{ marginTop: 20, marginLeft: -50, width: 296, fontSize: 16 }}>El funcionamiento del motor , se encuentra en modo apagado con una temperatura baja de 10° grados</StyledText>
                     : <StyledText fontStyle="italic" color="terciary" style={{ marginTop: 20, marginLeft: -50, width: 296, fontSize: 16 }}>El funcionamiento del motor , se encuentra en modo encendido con una temperatura mayor a 40° grados</StyledText>}
               </View>
               <View style={{ marginTop: 20, marginLeft: 10 }}>
                  <View style={{ flexDirection: "row" }}>
                     <StyledText fontWeight="bold" color="terciary" style={{ marginLeft: 20, marginTop: 5 }} fontSize={14}>Funcionamiento del motor</StyledText>
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
      fontSize: responsiveFontSize(4.5),
      fontWeight: "bold",
      color: "#03B6E8",
      paddingBottom: responsiveHeight(3)
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
      marginTop: 2
   },
   imagencontainer: {
      flex: 0.8,
      maxHeight: responsiveHeight(50),
      left:"0.5%",
      alignContent:"center",
   },
   contenedor: {
      height:responsiveHeight(40),
      flexDirection: "column",
      borderTopLeftRadius: responsiveFontSize(3),
      borderTopRightRadius: responsiveFontSize(3),
      backgroundColor: "#fff",
      marginTop: responsiveHeight(-100),
   },
   lleno: {
      backgroundColor: "rgb(3,182,232)",
   },
   container2: {
      width: responsiveWidth(35),
      height: responsiveHeight(5),
   },
   porcent:{
      fontSize: responsiveFontSize(3),
      right: responsiveWidth(33),
      bottom: responsiveHeight(3.9)      
   },
   porcent2:{
      fontSize: responsiveFontSize(3),
      left: responsiveWidth(33),
      bottom: responsiveHeight(8)
   }
})