import { ImageBackground, StyleSheet, Text, View, Image } from 'react-native';
import React, { useRef } from 'react';
import { PanResponder, TouchableWithoutFeedback } from 'react-native';
const { width, height } = Dimensions.get('window');
import { useState } from 'react';

import { Dimensions } from 'react-native';
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
            if (gestureState.dx < -100) {
               navigation.navigate('bienvenidoempezar');
            }
         },
      })
   ).current;

   const handleOmitirPress = () => {
      navigation.navigate('login');
   };
   return (
      <View style={styles.container} {...panResponder.panHandlers}>
         <ImageBackground source={require('../../assets/images/Fondo.png')} resizeMode="cover" style={styles.image}>
            <Image
               style={styles.tinyLogo}
               source={require('../../assets/images/Uno.png')}
            />
            <Image
               style={styles.circleColors}
               source={require('../../assets/images/circleshadow.png')}
            />
            <Image
               style={styles.circleColorsGrey}
               source={require('../../assets/images/circleblue.png')}
            />
            <Text style={styles.tituloBien}>¡Te damos la bienvenida!</Text>
            <View style={styles.conttext}>
               <Text style={styles.bienvenidaT}>En la aplicación vas a tener acceso a la información desde cualquier lugar</Text>
            </View>
            <View style={styles.botonContainer}>
               <TouchableWithoutFeedback onPress={() => navigation.navigate('bienvenidoempezar')}>
                  <View style={styles.siguienteButton}>
                     <Text style={styles.buttonText}>SIGUIENTE</Text>
                  </View>
               </TouchableWithoutFeedback>
            </View>
            <View style={styles.conteinerBotonO}>
               <TouchableWithoutFeedback onPress={handleOmitirPress}>
                  <View style={styles.omitirButton}>
                     <Text style={{ color: 'white', fontSize: 18 }}  >Omitir</Text>
                  </View>
               </TouchableWithoutFeedback>
            </View>

         </ImageBackground>
      </View>
   );
}
export default Bienvenido;
const styles = StyleSheet.create({

   circleColors: {
      position: 'absolute',

      left: width * 0.475,
      bottom: width * 0.09,

   },
   circleColorsGrey: {
      position: 'absolute',
      left: width * 0.505,
      bottom: width * 0.09,
   },
   container: {
      flex: 1,
   },
   image: {
      flex: 2,
      justifyContent: 'center',
   },
   tinyLogo: {
      top: screenHeightPercentage - height * 0.3 * 1.55,
      left: screenWidthPercentage - width * 0.80 * 0.50,
      height: height * 0.55,
      width: screenWidthPercentage * 1.5,

      position: 'absolute',

   },
   tituloBien: {
      position: 'absolute',
      top: screenHeightPercentage - height * 0.3 * -0.1,
      left: screenWidthPercentage - width * 0.80 * 0.40,
      width: Dimensions.get('window').width - 70,
      height: Dimensions.get('window').height - 490,
      color: '#03B6E8',
      fontStyle: 'normal',
      fontSize: width * 0.056,
      lineHeight: 41,
      letterSpacing: 0.374,
      fontWeight: 'bold',
      justifyContent: 'center',
      alignItems: 'center',
   },
   bienvenidaT: {
      position: 'absolute',
      top: screenHeightPercentage - height * 0.3 * 1.19,
      left: screenWidthPercentage - width * 0.80 * 0.435,
      width: screenHeightPercentage - width * 0.80 * 0.399,
      fontSize: 20,
      lineHeight: 32,
      textAlign: 'center',
      letterSpacing: 0.374,
      color: '#FFFFFF',
   },
   botonContainer: {
      left: '23%',
      right: '20.9%',
      top: '31%',
      width: 220,
      height: 44,
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
   omitirButton: {
      backgroundColor: 'transparent',
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 0,
      width: '100%',
      height: '100%',
   },
   buttonText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 18,
   },
   conteinerBotonO: {
      left: '23%',
      right: '20.9%',
      top: '32%',
      width: 220,
      height: 44,
   },
});