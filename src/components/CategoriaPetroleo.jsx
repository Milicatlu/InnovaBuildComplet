import React from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { AppBar } from './AppBar';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

export function PetroleoCategoria(props) {
  return (
    <>
      <ImageBackground
        source={require('../../assets/images/Fondo-06.jpg')}
        style={styles.imagen}
      >
        <AppBar />

        <View style={styles.subcontainer}>
          <Text style={styles.titulo}>EXTRACCIÓN</Text>
          <Text style={styles.titulo}>DE PETRÓLEO</Text>

          <Text style={styles.subtitulo}>Seleccione la etapa</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              props.navigation.navigate('PetroleoMenu');
            }}>
            <Text style={styles.text}>UPSTREAM</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>MIDSTREAM</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
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
    width: responsiveWidth(55),
    height: responsiveHeight(20),
    left: responsiveWidth(55),
    bottom: responsiveHeight(10)
  },
  imagen: {
    height: responsiveHeight(115),
  },
  subcontainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  subcontainerT: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  text: {
    fontSize: responsiveFontSize(3.5),
    fontFamily: 'Lato-Bold',
    fontWeight: 'bold',
    color: 'white',
    top: responsiveHeight(1),
  },
  titulo: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: responsiveFontSize(5.3),
    fontFamily: 'Lato-Bold',
    alignSelf: 'center',
    color: '#03B6E8',
    top: responsiveHeight(2),
    fontWeight: 'bold'
  },
  subtitulo: {
    fontSize: responsiveFontSize(3),
    fontFamily: 'Lato-Bold',
    alignSelf: 'center',
    color: '#FFF',
    top: responsiveHeight(6)
  },
  button: {
    marginBottom: responsiveHeight(4),
    top: responsiveHeight(15),
    borderColor: '#03B6E8',
    borderWidth: 2,
    padding: responsiveHeight(1.5),
    width: responsiveWidth(63),
    height: responsiveHeight(11),
    borderRadius: responsiveHeight(2),
    alignItems: 'center',
  }
});
