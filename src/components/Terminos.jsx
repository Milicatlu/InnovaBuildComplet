import React from 'react'
import { ImageBackground, StyleSheet, Dimensions, Linking } from 'react-native'
import { StyledText } from './StyledText'
import { StyledButton } from './StyledButton'
import { View, Image, Text } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
const { height, width, fontScale, scale } = Dimensions.get("window")
import {
   widthPercentageToDP,
   heightPercentageToDP
} from "react-native-responsive-screen";
const screenWidthPercentage = widthPercentageToDP("50%");
const screenHeightPercentage = heightPercentageToDP("50%");
export function Terminos({ navigation, props }) {
   const handleDownloadPDF = () => {
      const fileURL = "https://www.africau.edu/images/default/sample.pdf"
      Linking.openURL(fileURL)
   }

   return (
      <>
         <ImageBackground
            source={require("../../assets/images/Fondo-06.jpg")}
            style={{
               paddingTop: 10,
               height: height + height / 20
            }}
            imageStyle={{
               justifyContent: "center",
               alignItems: "center"
            }}
         >
            <Image
               style={styles.tinyLogo}
               source={require("../../assets/images/IsoBlanco.png")}
            />
            <Text style={styles.textpolitica}>
               POLÍTICAS
            </Text>

            <StyledText
               color="#FFF"
               align="center"
               style={{ top: width * 0.36, left: width * 0.01, margin: scale + 0, fontSize: fontScale * 20 }}
            >
               <Text style={{ fontFamily: "Lato-Bold" }}>
                  Bases y condiciones
               </Text>
            </StyledText>

            <View style={styles.datosC}>
               <View style={styles.datos}>
                  <Image
                     source={require("../../assets/icons/Logo.png")}
                     style={{ width: width / 2.2, height: height / 14, top: width * -0.02, alignSelf: "center", tintColor: "#e8e8e8" }}
                  />
                  <StyledText style={{ height: height / 45 }} />
                  <StyledText style={styles.label}><Text style={{ fontFamily: "Lato-Bold" }}>Te contamos las condiciones y</Text></StyledText>
                  <StyledText style={styles.label}><Text style={{ fontFamily: "Lato-Bold" }}>nuestra politica de privacidad</Text></StyledText>
                  <StyledText></StyledText>
                  <StyledText style={styles.label2}><Text style={{ color: "#03B6E8", fontFamily: "Lato-Bold" }}>Las actualizaciones claves</Text><Text style={{ fontFamily: "Lato-Bold" }}> incluyen</Text></StyledText>
                  <StyledText style={styles.label2}><Text style={{ fontFamily: "Lato-Bold" }}>informacion sobre lo siguiente:</Text></StyledText>
                  <StyledText></StyledText>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                     <ScrollView>
                        <StyledText style={styles.label3}><Text style={{ fontFamily: "Lato-Regular" }}>•  El servicio que brindara Innova Space qui dolorem impsum qui dolorem impsum</Text></StyledText>
                        <StyledText style={styles.label3}><Text style={{ fontFamily: "Lato-Regular" }}>•  El servicio que brindara Innova Space qui dolorem impsum qui dolorem impsum</Text></StyledText>
                        <StyledText></StyledText>
                     </ScrollView>
                  </View>
                  <View style={{ height: height / 60 }}></View>
                  <View style={{ flexDirection: "row", justifyContent: "space-between" }} >
                     <StyledButton styleContainer={styles.lleno} onPress={() => { navigation.navigate("inicio") }}><Text style={{ fontFamily: "Lato-Bold", fontSize: width * 0.04 }}>Aceptar</Text></StyledButton>
                     <StyledButton styleContainer={styles.vacio} onPress={handleDownloadPDF} ><Text style={{ color: "#03B6E8", fontFamily: "Lato-Bold", fontSize: width * 0.04 }}>Descargar PDF</Text></StyledButton>
                  </View>
               </View>
            </View>
         </ImageBackground>
      </>
   )
}

const styles = StyleSheet.create({
   textpolitica: {
      top: screenHeightPercentage - height * 0.3 * 1.20,
      left: screenWidthPercentage - width * 0.80 * 0.33,
      height: height * 0.065,
      fontSize: width * 0.11,
      fontWeight: 'bold',
      color: '#03B6E8',
   },
   tinyLogo: {
      position: "absolute",
      alignItems: "center",
      justifyContent: "center",
      top: screenHeightPercentage - height * 0.3 * 1.47,
      left: screenWidthPercentage - width * 0.80 * 0.10,
      height: height * 0.065,
      width: screenWidthPercentage * 0.35,
   },
   datosC: {
      height: height / 1.42,
      width: width,
      position: 'absolute',
      bottom: 0,
      paddingTop: height / 20,
      backgroundColor: '#fff',
      borderTopEndRadius: height / 40,
      borderTopStartRadius: height / 40
   },
   datos: {
      alignSelf: 'center',
      width: width / 1.2,
   },
   label: {
      color: 'black',
      textAlign: "center",
      height: height / 28,
      fontSize: fontScale * 21,
      fontWeight: "700",
   },
   label2: {
      color: '#9e9e9e',
      textAlign: "center",
      height: height / 25,
      fontSize: fontScale * 20,
      fontWeight: "700",
   },
   label3: {
      color: '#000000',
      textAlign: "center",
      height: height / 13,
      fontSize: fontScale * 17,
      fontWeight: "500",
      lineHeight: height / 33
   },
   vacio: {
      height: height / 16,
      width: width / 2.5,
      alignSelf: "center",
      bottom: height / 300,
   },
   lleno: {
      height: height / 16,
      width: width / 2.5,
      alignSelf: "flex-end",
      backgroundColor: '#03B6E8',
      bottom: height / 300,
   },
})