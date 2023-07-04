import { ImageBackground, StyleSheet, Text, View, Image, TouchableWithoutFeedback } from 'react-native';
import React, { useRef } from 'react';
import { PanResponder } from 'react-native';
import { Dimensions } from 'react-native';
import { useState } from 'react';

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
      left: '23%',
      right: '20.9%',
      top: '32%',
      width: 220,
      height: 44,
   },
   omitirButton: {
      backgroundColor: 'transparent',
      borderRadius: 10,
      alignItems: 'center',
      top: screenHeightPercentage - height * 0.3 * 1.58,
      justifyContent: 'center',
      width: '100%',
      height: '100%',
   },
   buttonText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 18,
   },
   siguienteButton: {
      backgroundColor: '#03B6E8',
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 0,
      width: '100%',
      height: '100%',
   },
   circleColors: {
      position: 'absolute',
      left: '48%',
      top: '95%',
   },
   circleColorsGrey: {
      position: 'absolute',
      left: '51%',
      top: '95%',
   },
   botonconteiner: {
      left: '23%',
      right: '20.9%',
      top: '32%',
      width: 220,
      height: 44,
   },
   bienvenidaT: {
      position: 'absolute',
      left: '14.67%',
      right: '14.93%',
      top: '59.48%',
      bottom: '29.06%',
      fontStyle: 'normal',
      fontSize: 20.5,
      lineHeight: 32,
      textAlign: 'center',
      letterSpacing: 0.374,
      color: '#FFFFFF',
   },
   tituloBien: {
      position: 'absolute',

      color: '#03B6E8',
      fontStyle: 'normal',
      fontSize: width * 0.055,
      lineHeight: 41,
      letterSpacing: 0.374,
      fontWeight: '60',
      fontWeight: 'bold',
      justifyContent: 'center',
      alignItems: 'center',
      top: screenHeightPercentage - height * 0.3 * -0.030,
      left: screenWidthPercentage - width * 0.80 * 0.45,
      height: height * 0.050,
      width: screenWidthPercentage * 2,
   },
   container: {
      flex: 1,
   },
   image: {
      flex: 2,
      justifyContent: 'center',
   },
   tinyLogo: {
      width: '90%',
      height: '50%',
      position: 'absolute',
      left: '4.8%',
      right: '9.87%',
      top: '5.2%',
      bottom: '43.23%'
   }
});
/*  top: screenHeightPercentage - height * 0.3 * 1.47,
        left: screenWidthPercentage - width * 0.80 * -0.92,
        height:height*0.050,
        width: screenWidthPercentage * 1.13,*/