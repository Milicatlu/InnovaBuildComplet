import { View,Text,ImageBackground,StyleSheet,TouchableOpacity,Dimensions,Image} from "react-native"
import { AppBar } from "./AppBar"

const { height, width,} = Dimensions.get("window")
export function PetroleoCategoria(props) {
   return (
      <>
         <ImageBackground
            source={require("../../assets/images/Fondo-06.jpg")}
            style={styles.imagen}
         >
            <AppBar />

            <View style={styles.subcontainer}>
               <Text style={styles.titulo}>EXTRACCION</Text>
               <Text style={styles.titulo}>DE PETROLEO</Text>

               <Text style={styles.subtitulo}>Seleccione la etapa</Text>



               <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                     props.navigation.navigate("PetroleoMenu")
                  }}>
                  <Text style={styles.text}>UPSTREAM</Text>
               </TouchableOpacity>

               <TouchableOpacity
                  style={styles.button}>
                  <Text style={styles.text}>MIDSTREAM</Text>
               </TouchableOpacity>

               <TouchableOpacity
                  style={styles.button}>
                  <Text style={styles.text}>DOWNSTREAM</Text>
               </TouchableOpacity>
            </View>
            <Image
               source={require('../../assets/images/SateliteHd.png')}
               style={styles.sate}
            />

         </ImageBackground>
      </>
   )
}

const styles = StyleSheet.create({
   sate: {
      width: width / 1.5,
      height: height / 4,
      left: width / 2.2,
      bottom: height / 20
   },

   imagen: {
      height: height + height / 15,
   },
   subcontainer: {
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "center",
   },
   subcontainerT: {
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "center",
   },
   text: {
      fontSize: 26,
      fontFamily: "Lato-Bold",
      fontWeight: "bold",
      color: "white"
   },
   titulo: {
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 40,
      fontFamily: "Lato-Bold",
      alignSelf: "center",
      color: "#03B6E8",
      top: height / 30,
      fontWeight: "bold"
   },
   subtitulo: {
      fontSize: 20,
      fontFamily: "Lato-Bold",
      alignSelf: "center",
      color: "#FFF",
      top: height / 14
   },
   button: {
      marginBottom: height / 20,
      top: height / 7,
      borderColor: "#03B6E8",
      borderWidth: 2,
      padding: height / 40,
      width: width / 1.7,
      borderRadius: height / 60,
      alignItems: "center"
   }
})