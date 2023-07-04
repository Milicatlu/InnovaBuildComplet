import React, { Component } from 'react';
import { View, Dimensions, ImageBackground, Pressable, StyleSheet, TouchableOpacity, Text, Image, } from 'react-native'
import { LineChart } from 'react-native-chart-kit'

import { jwt } from "../helpers/Config"
import { StyledButton2, StyledButton } from "./StyledButton"
import { StyledText } from "./StyledText"
import { AppBar } from "./AppBar"
import { DropdownDrag } from "./DropdownDrag"
// import AsyncStorage from "@react-native-async-storage/async-storage"
import { useState, useEffect } from "react"
import { GraficoAgricultura } from "./Grafico"
import { InfluxDBHelper } from "../helpers/InfluxDB"
import { BotonGrafico } from './StyledButton';






export function Grafico2() {
   function cambiarMeses() {
      setParametro1(meses);
   }
   function cambiarDias() {
      setParametro1(dias);
   }
   function cambiarHoras() {
      setParametro1(horas);
   }
   const meses = ["En.", "Feb.", "Mar.", "Abr.", "May.", "Jun.", "Jul.", "Ag.", "Sept.", "Oct.", "Nov.", "Dic."];
   const dias = ["Lun", "Mar.", "Mier.", "Juev.", "Vier.", "Sab.", "Dom."];
   const horas = ["1h.", "2h.", "3h.", "4h.", "5h.", "6h.", "7h.", "9h.", "10h.", "11h.", "12h."];

   const [parametro1, setParametro1] = useState(meses)
   return (
      <>
         <ImageBackground
            source={require("../../assets/images/Fondo-06.jpg")}
            style={styles.imagen}
            imageStyle={{ justifyContent: "center", alignItems: "center" }}
         >
            <AppBar />
            <View>
               <StyledText style={styles.titulo.Hum}>Humedad</StyledText>
               <LineChart
                  data={{
                     labels: parametro1,
                     datasets: [
                        {
                           data: [
                              Math.random() * 100,
                              Math.random() * 100,
                              Math.random() * 100,
                              Math.random() * 100,
                              Math.random() * 100,
                              Math.random() * 100,
                              Math.random() * 100,
                              Math.random() * 100,
                              Math.random() * 100,
                              Math.random() * 100,
                              Math.random() * 100,
                              Math.random() * 100,

                           ],
                        },
                     ],
                  }}
                  width={Dimensions.get('window').width}
                  height={170}
                  yAxisSuffix='%'
                  yAxisInterval={1}
                  chartConfig={{
                     backgroundColor: "#FFF",
                     backgroundGradientFrom: "#FFF",
                     backgroundGradientTo: "#FFF",
                     decimalPlaces: 2,
                     color: (opacity = 0) => `#1DB6E5`,
                     labelColor: (opacity = 0) => `rgba(0,0,0, ${opacity})`,
                     style: {
                        borderRadius: 16
                     },
                     propsForDots: {
                        r: '6',
                        strokeWidth: "2",
                        stroke: "#1DB6E5"
                     },
                  }}
                  bezier
                  style={{
                     marginVertical: 8,
                     borderRadius: 16
                  }}

               />
               <StyledText style={styles.titulo.CO2} >CO2</StyledText>
               <LineChart
                  data={{
                     labels: parametro1,
                     datasets: [
                        {
                           data: [
                              Math.random() * 100,
                              Math.random() * 100,
                              Math.random() * 100,
                              Math.random() * 100,
                              Math.random() * 100,
                              Math.random() * 100,
                              Math.random() * 100,
                              Math.random() * 100,
                              Math.random() * 100,
                              Math.random() * 100,
                              Math.random() * 100,
                              Math.random() * 100,
                           ],
                        },
                     ],
                  }}
                  width={Dimensions.get('window').width}
                  height={170}
                  yAxisSuffix='%'
                  yAxisInterval={1}
                  chartConfig={{
                     backgroundColor: "#FFF",
                     backgroundGradientFrom: "#FFF",
                     backgroundGradientTo: "#FFF",
                     decimalPlaces: 2,
                     color: (opacity = 0) => `#EB691A`,
                     labelColor: (opacity = 0) => `rgba(0,0,0, ${opacity})`,
                     style: {
                        borderRadius: 16
                     },
                     propsForDots: {
                        r: '6',
                        strokeWidth: "2",
                        stroke: "#EB691A"
                     },
                  }}
                  bezier
                  style={{
                     marginVertical: 8,
                     borderRadius: 16
                  }}
               />
               <StyledText style={styles.titulo.Temp} >Temperatura</StyledText>
               <LineChart
                  data={{
                     labels: parametro1,
                     datasets: [
                        {
                           data: [
                              Math.random() * (50 - (-25) + 1) + (-25),
                              Math.random() * (50 - (-25) + 1) + (-25),
                              Math.random() * (50 - (-25) + 1) + (-25),
                              Math.random() * (50 - (-25) + 1) + (-25),
                              Math.random() * (50 - (-25) + 1) + (-25),
                              Math.random() * (50 - (-25) + 1) + (-25),
                              Math.random() * (50 - (-25) + 1) + (-25),
                              Math.random() * (50 - (-25) + 1) + (-25),
                              Math.random() * (50 - (-25) + 1) + (-25),
                              Math.random() * (50 - (-25) + 1) + (-25),
                              Math.random() * (50 - (-25) + 1) + (-25),
                              Math.random() * (50 - (-25) + 1) + (-25),
                              Math.random() * (50 - (-25) + 1) + (-25),
                           ],
                        },],
                  }}
                  width={Dimensions.get('window').width}
                  height={170}
                  yAxisSuffix='°'
                  yAxisInterval={1}
                  chartConfig={{
                     backgroundColor: "#FFF",
                     backgroundGradientFrom: "#FFF",
                     backgroundGradientTo: "#FFF",
                     decimalPlaces: 2,
                     color: (opacity = 0) => `#CCA500`,
                     labelColor: (opacity = 0) => `rgba(0,0,0, ${opacity})`,
                     style: {
                        borderRadius: 16
                     },
                     propsForDots: {
                        r: '6',
                        strokeWidth: "2",
                        stroke: "#CCA500"
                     },
                  }}
                  bezier
                  style={{
                     marginVertical: 8,
                     borderRadius: 16
                  }}
               />

               <View style={styles.contenedor}>
                  <BotonGrafico onPress={cambiarMeses}>Meses</BotonGrafico>
                  <BotonGrafico onPress={cambiarDias}>Dias</BotonGrafico>
                  <BotonGrafico onPress={cambiarHoras}>Horas</BotonGrafico>


               </View>
            </View>
         </ImageBackground>
      </>
   )
}

const styles = StyleSheet.create({
   imagen: {
      paddingTop: 10,
      height: Dimensions.get("window").height + Dimensions.get("window").height / 20
   },
   titulo: {
      Temp: {
         color: "#CCA500",
         fontSize: 20,
         textAlign: "center",
         fontWeight: "bold",
      },
      CO2: {
         color: "#EB691A",
         fontSize: 20,
         textAlign: "center",
         fontWeight: "bold",
      },
      Hum: {
         fontSize: 20,
         textAlign: "center",
         fontWeight: "bold",
         color: "#03B6E8"
      },
   },
   contenedor: {
      alignItems: "flex-start",
      flexDirection: "row",
      justifyContent: "space-around",

   },
})
