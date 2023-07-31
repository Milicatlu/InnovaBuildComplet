//RESPONSIVE
import { ImageBackground, StyleSheet, Text, View, Image } from 'react-native';
import React, { useRef } from 'react';
import { PanResponder, TouchableWithoutFeedback } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
//funcion con su logica para poder deslizar la pantalla y cambiarla a bienvenidoempezar
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

   //manejo para dirigir a pantalla cambiocontra
   const handleOmitirPress = () => {
      navigation.navigate('cambiocontra');
   };

   return (
      <View style={styles.container} {...panResponder.panHandlers}>

         {/*Imagen de fondo */}
         <ImageBackground source={require('../../assets/images/Fondo.png')} resizeMode="cover" style={styles.image}>

            {/*Imagen ilustrativa */}
            <Image
               style={styles.tinyLogo}
               source={require('../../assets/images/Uno.png')}
            />

            
           {/*Imagen que indica en cual de las dos pantallas de inicio estas parado */}
            <Image
               style={styles.circleColors}
               source={require('../../assets/images/circleshadow.png')}
            />

            {/*Imagen que indica en cual de las dos paginas no estas en el momento */}
            <Image
               style={styles.circleColorsGrey}
               source={require('../../assets/images/circleblue.png')}
            />

            {/*Texto de bienvenida de explicación de la app*/}
            <Text style={styles.tituloBien}>¡Te damos la bienvenida!</Text>
            <View style={styles.conttext}>
               <Text style={styles.bienvenidaT}>En la aplicación vas a tener acceso a la información desde cualquier lugar</Text>
            </View>

            {/*Boton para ir a la siguiente pagina a bienvenidoempezar */}
            <View style={styles.botonContainer}>
               <TouchableWithoutFeedback onPress={() => navigation.navigate('bienvenidoempezar')}>
                  <View style={styles.siguienteButton}>
                     <Text style={styles.buttonText}>SIGUIENTE</Text>
                  </View>
               </TouchableWithoutFeedback>
            </View>

            {/*Boton para omitir la siguiente pantalla e ir directamente al inicio de sesión */}
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
// Estilos para diversos componentes y elementos
  // ...
   circleColors: {
      position: 'absolute',
      left: responsiveWidth(48),
      bottom: responsiveHeight(5),
      width: responsiveWidth(2),
      height: responsiveHeight(1),
      borderRadius: responsiveFontSize(1),
   },
   circleColorsGrey: {
      position: 'absolute',
      left: responsiveWidth(51),
      bottom: responsiveHeight(5),
      width: responsiveWidth(2),
      height: responsiveHeight(1),
      borderRadius: responsiveFontSize(1),
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
      height: responsiveHeight(55),
      width:responsiveWidth(70),
      position: 'absolute',
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
   bienvenidaT: {
      position: 'absolute',
      top: responsiveHeight(15),
      left:responsiveWidth(15),
      width:responsiveWidth(70),
      fontSize: responsiveFontSize(2.42),
      lineHeight:responsiveFontSize(4),
      textAlign: 'center',
      letterSpacing: responsiveFontSize(0.06),
      color: '#FFFFFF',
   },
   botonContainer: {
      left: responsiveWidth(24),
      top: responsiveHeight(30),
      width: responsiveWidth(52.5),
      height: responsiveHeight(5.5),
   },
   siguienteButton: {
      backgroundColor: '#03B6E8',
      borderRadius: responsiveFontSize(1.5),
      alignItems: 'center',
      justifyContent: 'center',
      height: responsiveHeight(6),
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
      fontSize: responsiveFontSize(2),
   },
   conteinerBotonO: {
      left: '23%',
      right: '20.9%',
      top: '32%',
      width: responsiveWidth(5),
      height: responsiveHeight(5),
   },
});