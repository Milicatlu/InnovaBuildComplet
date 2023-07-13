import React from 'react'
import { ImageBackground, StyleSheet, Linking } from 'react-native'
import { StyledText } from './StyledText'
import { StyledButton } from './StyledButton'
import { View, Image, Text } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

export function Terminos({ navigation, props }) {
   
   //Constante para guardar el link hacia el pdf para su descarga
   const handleDownloadPDF = () => {
      const fileURL = "https://www.africau.edu/images/default/sample.pdf"
      Linking.openURL(fileURL)
   }

   return (
      <>
         <ImageBackground
            source={require("../../assets/images/Fondo-06.jpg")}
            style={{ paddingTop: responsiveHeight(1), height: responsiveHeight(105) }}
            imageStyle={{ justifyContent: "center", alignItems: "center"}}
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
               style={{ top: responsiveHeight(18), left: responsiveWidth(1), fontSize: responsiveFontSize(3) }}
            >
               <Text style={{ fontFamily: "Lato-Bold" }}>
                  Bases y condiciones
               </Text>
            </StyledText>

            <View style={styles.datosC}>
               <View style={styles.datos}>
                  <Image
                     source={require("../../assets/icons/Logo.png")}
                     style={{ width: responsiveWidth(45), height: responsiveHeight(7), top: responsiveHeight(-1), alignSelf: "center", tintColor: "#e8e8e8" }}
                  />
                  <StyledText style={{ height: responsiveHeight(2.2) }} />
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
                  <View style={{ height: responsiveHeight(1.6) }}></View>
                  <View style={{ flexDirection: "row", justifyContent: "space-between" }} >
                     <StyledButton styleContainer={styles.lleno} onPress={() => { navigation.navigate("inicio2") }}><Text style={{ fontFamily: "Lato-Bold", fontSize: responsiveFontSize(2) }}>Aceptar</Text></StyledButton>
                     <StyledButton styleContainer={styles.vacio} onPress={handleDownloadPDF} ><Text style={{ color: "#03B6E8", fontFamily: "Lato-Bold", fontSize: responsiveFontSize(2) }}>Descargar PDF</Text></StyledButton>
                  </View>
               </View>
            </View>
         </ImageBackground>
      </>
   )
}

const styles = StyleSheet.create({
   textpolitica: {
      top: responsiveHeight(14),
      left: responsiveWidth(22.8),
      height: responsiveHeight(6.5),
      fontSize: responsiveFontSize(5.5),
      fontWeight: "700",
      color: '#03B6E8',
   },
   tinyLogo: {
      position: "absolute",
      alignItems: "center",
      justifyContent: "center",
      top: responsiveHeight(6),
      left: responsiveWidth(41.4),
      height: responsiveHeight(6.5),
      width: responsiveWidth(17.9),
   },
   datosC: {
      height: responsiveHeight(70.4),
      width: responsiveWidth(100),
      position: 'absolute',
      bottom: 0,
      paddingTop: responsiveHeight(5),
      backgroundColor: '#fff',
      borderTopEndRadius: responsiveHeight(2.5),
      borderTopStartRadius:  responsiveHeight(2.5)
   },
   datos: {
      alignSelf: 'center',
      width: responsiveWidth(83.3),
   },
   label: {
      color: 'black',
      textAlign: "center",
      height: responsiveHeight(3.5),
      fontSize: responsiveFontSize(2.4),
      fontWeight: "700",
   },
   label2: {
      color:'#9e9e9e',   
        textAlign:"center",
        height:responsiveHeight(4),
        fontSize:responsiveFontSize(2.2),
        fontWeight:"700",
   },
   label3: {
      color:'#000000',   
        textAlign:"center",
        height: responsiveHeight(7.6),
        fontSize: responsiveFontSize(2),
        fontWeight:"500",
        lineHeight: responsiveHeight(3.2)
   },
   vacio: {
      height: responsiveHeight(6.25),
      width: responsiveWidth(40),
      alignSelf:"center",
      color:'red',
   },
   lleno: {
      height: responsiveHeight(6,25),
      width: responsiveWidth(40),
      alignSelf: "flex-end",
      backgroundColor: '#03B6E8',
      
   },
})