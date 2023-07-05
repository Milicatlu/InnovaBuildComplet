//RESPONSIVE Y BORRAR COSAS NO SUASASD
import {
   ImageBackground,
   Pressable,
   StyleSheet,
   View,
   TextInput,
   DrawerItem,
   DrawerItemicon,
   Text,
   Dimensions
} from "react-native"
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler"
import { StyledButton } from './StyledButton'
import { StyledText } from "./StyledText"
import { AppBar } from "./AppBar"
import { jwt } from "../helpers/Config"
import { useState, useEffect } from "react"
import { InfluxDBHelper } from "../helpers/InfluxDB"
import { StyledButtonAgri } from "./StyledButton"
import { MaterialIcons } from "@expo/vector-icons"
export function AgriculturaSilo(props) {
   const [isOpen, setIsOpen] = useState(false)
   const [temperatura, setTemperatura] = useState(0)
   const [humedad, setHumedad] = useState(0)
   const [CO2, setCO2] = useState(0)
   const [temperaturaArray, setTemperaturaArray] = useState(null)
   const [humedadArray, setHumedadArray] = useState(null)
   const [CO2Array, setCO2Array] = useState(null)
   const [reRenders, setReRenders] = useState(0)
   const [temperaturaColor, setTemperaturaColor] = useState("")
   const [CO2Color, setCO2Color] = useState("")
   const [humedadColor, setHumedadColor] = useState("")

   useEffect(() => {
      InfluxDBHelper.getLastPoint({
         tags: {
            Sector: "AGRICULTURE",
            nodeID: "1",
         },
         timeStamp: "-10d",
         field: "CO2",
         jwt: jwt,
      }).then((value) => {
         if (CO2 < 5) setCO2Color("#ce0000")
         else if (CO2 > 5 && CO2 < 8) setCO2Color("#ffde59")
         else if (CO2 > 8 && CO2 < 13) setCO2Color("#008000")
         else if (CO2 > 13 && CO2 < 18) setCO2Color("#ffde59")
         else if (CO2 > 8) setCO2Color("#ce0000")

         setCO2(value.value)
      })
      InfluxDBHelper.getLastPoint({
         tags: {
            Sector: "AGRICULTURE",
            nodeID: "1",
         },
         timeStamp: "-10d",
         field: "TEMPERATURE",
         jwt: jwt,
      }).then((value) => {
         if (temperatura < 5) setTemperaturaColor("#ce0000")
         else if (temperatura > 5 && temperatura < 10)
            setTemperaturaColor("#ffde59")
         else if (temperatura > 10 && temperatura < 22)
            setTemperaturaColor("#008000")
         else if (temperatura > 22 && temperatura < 25)
            setTemperaturaColor("#ffde59")
         else if (temperatura > 25) setTemperaturaColor("#ce0000")
         setTemperatura(value.value)
      })
      InfluxDBHelper.getLastPoint({
         tags: {
            Sector: "AGRICULTURE",
            nodeID: "1",
         },
         timeStamp: "-10d",
         field: "HUMIDITY",
         jwt: jwt,
      }).then((value) => {
         if (humedad > 18) setHumedadColor("#ce0000")
         else if (humedad < 18 && humedad > 14) setHumedadColor("#ffde59")
         else if (humedad < 14 && humedad > 10) setHumedadColor("#008000")
         else if (humedad < 10 && humedad > 7) setHumedadColor("#ffde59")
         else if (humedad < 7) setHumedadColor("#ce0000")
         setHumedad(value.value)
      })
   }, [reRenders])
   setTimeout(() => {
      setReRenders(reRenders + 1)
   }, 1000)

   const [siloBolsas, setSiloBolsas] = useState([]);

   const handleAddSiloBolsa = () => {
      setSiloBolsas([...siloBolsas, siloBolsas.length + 1])
   }

   const renderSiloBolsa = () => {
      const grupos = []
      const totalSiloBolsas = siloBolsas.length

      for (let i = 0; i < totalSiloBolsas; i += 2) {
         const grupo = siloBolsas.slice(i, i + 2)
         grupos.push(grupo)
      }

      return grupos.map((grupo, index) => (
         <View key={index} style={styles.SiloContainer}>
            {grupo.map((siloBolsa) => (
               <StyledButtonAgri style={{ color: "#FFF" }} key={siloBolsa} styleContainer={styles.vacio} onPress={() => { props.navigation.navigate("SiloMenu"); }}>
                  Silo bolsa {siloBolsa}
               </StyledButtonAgri>
            ))}

         </View>
      ))
   }




   return (
      <>
         <View style={styles.container} {...props}>
            <ImageBackground
               source={require("../../assets/images/Fondo-06.jpg")}
               style={styles.imagen}
            >
               <AppBar />
               <View style={styles.subcontainer}>
                  <StyledText
                     align="center"
                     fontSize="subheading2"
                     fontWeight="bold"
                     color="secondary"
                  >
                     AGRICULTURA
                  </StyledText>
                  <StyledText></StyledText>

                  <View>

                     <ScrollView>
                        {renderSiloBolsa()}
                     </ScrollView>

                     <TouchableOpacity style={styles.icono} onPress={handleAddSiloBolsa} >
                        <StyledButton styleContainer={styles.lleno} styledProps={{ fontSize: "subheading1" }}>
                           <MaterialIcons name="add" size={22} color={"white"} /> NUEVA SILO BOLSA</StyledButton>
                        <View style={{ marginTop: 10 }}>
                           <MaterialIcons name="create" size={18} style={styles.icono} >
                              <StyledText style={styles.texto} > Editar nombre de Bolsa</StyledText>
                           </MaterialIcons>
                        </View>
                     </TouchableOpacity>
                  </View>
               </View>
            </ImageBackground>

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
      flex: 0.8,
      padding: 20,
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
      flex: 0.8,
      flexDirection: "row",
      maxHeight: "20%",
      backgroundColor: "#fff",
      borderTopLeftRadius: 40,
      borderTopRightRadius: 40,
      marginTop: 10,
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
      fontSize: 40,
   },
   magnitud: {
      backgroundColor: "blue",
      height: 100,
   },
   text: {
      color: "#03B6E8",
      fontSize: 28,
      marginBottom: 20,
      marginTop: 10,
      alignSelf: "center",
      fontFamily: "Lato",
   },
   titulo: {
      alignSelf: "center",
      fontSize: 50,
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
      color: "#03B6E8",
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
   contenedor: {
      alignItems: "flex-start",
      flexDirection: "row",
      justifyContent: "space-around",
   },
   vacio: {
      marginBottom: 20,
      marginTop: 10,
      margin: 20,
      width: Dimensions.get("window").width / 3
   },
   lleno: {
      height: 50,
      backgroundColor: '#03B6E8',
      width: "100%",
      marginTop: 6
   },
   texto: {
      textAlign: 'center',
      marginTop: 20,
      fontSize: 18
   },
   icons: {
      flex: 0.1,
      color: "#04B6E8",
      height: "100%",
      fontSize: 40,
   },
   subsubcont: {
      flexDirection: "row",
      justifyContent: "space-between",
      margin: 10,
      height: 50,
   },
   icono: {
      marginRight: 1,
      color: "#03B6E8",
      marginTop: -10,
      textAlign: 'center',
   },
})



