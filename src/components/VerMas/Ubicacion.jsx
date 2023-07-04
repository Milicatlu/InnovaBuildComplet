import { View } from "react-native"
import React from "react"
import { WebView } from "react-native-webview"
import { StyleSheet, Text } from "react-native"
import { Button } from "react-native-paper"
import { DropdownDrag } from "../DropdownDrag"
import { ButtonsNav } from "./ButtonsNav"
export const Ubicacion = () => {
   return (
      <View style={styles.ajuste}>
         <WebView
            source={{
               html: '<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2723.019652776932!2d-57.8368518!3d-37.0795634!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x6bfbc23a3dd7db3b!2zMzfCsDA0JzQ3LjAiUyA1N8KwNTAnMDYuNyJX!5e1!3m2!1ses-419!2sar!4v1667561771303!5m2!1ses-419!2sar" width="800ph" height="600px" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
            }}
            style={styles.map}
         />

         <View>
            <Text style={styles.titulo}>Silobolsa 1 (Soja)</Text>
            <Text style={styles.parrafo}>
               La silobolsa numero 1 se encuentra en la central de Innova
               Space
            </Text>

            <Text style={styles.coordenadasDos}>Coordenadas</Text>
            <Text style={styles.coordenadas}>35° 57' 27" 60° 38' 22"</Text>

            <ButtonsNav />
         </View>
      </View>
   )
}

const styles = StyleSheet.create({
   ajuste: {
      height: "100%",
   },
   map: {
      flex: 1,
      height: "100%",
      width: "200%",
   },
   bottom: {
      backgroundColor: "white",
      borderTopLeftRadius: 40,
      borderTopRightRadius: 40,
      width: "100%",
      height: "33%",
   },
   titulo: {
      color: "#03B6E8",
      fontSize: 18,
      marginLeft: 25,
      marginTop: 10,
   },
   parrafo: {
      fontSize: 15,
      marginLeft: 25,
      marginRight: 25,
      marginTop: 5,
   },
   coordenadas: {
      fontSize: 18,
      marginLeft: 25,
      marginTop: 20,
      color: "#03B6E8",
   },
   coordenadasDos: {
      marginLeft: 25,
      marginTop: 2,
      marginBottom: 15,
   },
   botones: {},
   botonUno: {
      width: 133,
      marginLeft: 25,
      backgroundColor: "transparent",
      borderWidth: 2,
      borderColor: "#03B6E8",
      color: "white",
      borderRadius: 10,
   },
   botonDos: {
      backgroundColor: "#03B6E8",
      width: 133,
      marginLeft: 25,
      borderRadius: 10,
   },
})