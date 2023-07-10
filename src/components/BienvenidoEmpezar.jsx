//RESPONSIVE
import { ImageBackground, StyleSheet, Text, View, Image, TouchableWithoutFeedback } from 'react-native';
import React, { useRef } from 'react';
import { PanResponder } from 'react-native';
import { Dimensions } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
const { width, height } = Dimensions.get('window');
import {
   widthPercentageToDP,
   heightPercentageToDP
} from "react-native-responsive-screen";
const screenWidthPercentage = widthPercentageToDP("50%");
const screenHeightPercentage = heightPercentageToDP("50%");

function Bienvenido({ navigation }) {
   const panResponder = useRef(
      PanResponder.create({
         onStartShouldSetPanResponder: () => true,
         onPanResponderMove: (_, gestureState) => {
            if (gestureState.dx > +100) {
               navigation.navigate('bienvenido');
            }
         },
      })
   ).current;
   return (

      <View style={styles.container} {...panResponder.panHandlers}>
         <ImageBackground source={require('../../assets/images/Fondo2.png')} resizeMode="cover" style={styles.image}>

            <Image
               style={styles.tinyLogo}
               source={require('../../assets/images/Dos.png')}
            />

            <Image
               style={styles.circleColors}
               source={require('../../assets/images/circleblue.png')}
            />
            <Image
               style={styles.circleColorsGrey}
               source={require('../../assets/images/circleshadow.png')}
            />
            <Text style={styles.tituloBien}>Gracias a nuestros satélites</Text>
            <Text style={styles.bienvenidaT}>Podrás obtener información sobre agricultura, minería, petróleo y mucho más...</Text>
            <View style={styles.botonconteiner}>
               <TouchableWithoutFeedback onPress={() => navigation.navigate('login')}>
                  <View style={styles.siguienteButton}>
                     <Text style={styles.buttonText}>EMPEZAR</Text>
                  </View>
               </TouchableWithoutFeedback>
            </View>
            <View style={styles.conteinerBotonO}>
               <TouchableWithoutFeedback onPress={() => navigation.navigate('bienvenido')}>
                  <View style={styles.omitirButton}>
                     <Text style={{ color: 'white', fontSize: width * 0.035 }}>Volver atrás</Text>
                  </View>

               </TouchableWithoutFeedback>
            </View>
         </ImageBackground>
      </View>
   )
}
export default Bienvenido;
const styles = StyleSheet.create({
   conteinerBotonO: {
      left: responsiveWidth(22.5),
      top: responsiveHeight(33.5),
      width: responsiveWidth(52.5),
      height: responsiveHeight(4),
   },
   omitirButton: {
      backgroundColor: 'transparent',
      alignItems: 'center',
      justifyContent: 'center',
      width: responsiveWidth(55),
      height:responsiveHeight(5),
   },
   buttonText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: responsiveFontSize(2.25),
   },
   siguienteButton: {
      backgroundColor: '#03B6E8',
      borderRadius: responsiveFontSize(1.5),
      alignItems: 'center',
      justifyContent: 'center',
      width: responsiveWidth(55),
      height: responsiveHeight(5.5),
   },
   circleColors: {
      position: 'absolute',
      left: responsiveWidth(47),
      bottom: responsiveHeight(5),
      width: responsiveWidth(2),
      height: responsiveHeight(1),
      borderRadius: responsiveFontSize(1),
   },
   circleColorsGrey: {
      position: 'absolute',
      left: responsiveWidth(50),
      bottom: responsiveHeight(5),
      width: responsiveWidth(2),
      height: responsiveHeight(1),
      borderRadius: responsiveFontSize(1),
   },
   botonconteiner: {
      left: responsiveWidth(24),
      top: responsiveHeight(30),
      width: responsiveWidth(52.5),
      height: responsiveHeight(5.5),
   },
   bienvenidaT: {
      position: 'absolute',
      top: responsiveHeight(60),
      left:responsiveWidth(11),
      width:responsiveWidth(80),
      fontSize: responsiveFontSize(2.6),
      lineHeight:responsiveFontSize(4),
      textAlign: 'center',
      letterSpacing: responsiveFontSize(0.06),
      color: '#FFFFFF',
   },
   tituloBien: {
      position: 'absolute',
      top:  responsiveHeight(55),
      left: responsiveHeight(3),
      width: responsiveWidth(90),
      color: '#03B6E8',
      fontStyle: 'normal',
      fontSize:responsiveFontSize(2.8),
      lineHeight:responsiveFontSize(3.5),
      letterSpacing: responsiveFontSize(0.06),
      fontWeight: 'bold',
      textAlign: 'center',
   },
   container: {
      flex: 1,
   },
   image: {
      flex: 2,
      justifyContent: 'center',
   },
   tinyLogo: {
      top: responsiveHeight(4),
      left:responsiveWidth(10),
      height: responsiveHeight(53),
      width:responsiveWidth(80),
      position: 'absolute',
   }
});
/*  top: screenHeightPercentage - height * 0.3 * 1.47,
        left: screenWidthPercentage - width * 0.80 * -0.92,
        height:height*0.050,
        width: screenWidthPercentage * 1.13,*/