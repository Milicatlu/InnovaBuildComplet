import React, { useEffect } from 'react';
import { View, StyleSheet, ImageBackground, Image, Text } from 'react-native';
import { Link } from '@react-navigation/native';
import { AppBar } from '../AppBar';
import { useAuth } from '../../../context/AuthProvider';
import { getUserName } from '../../lib/supabaseHandler';
import { updateUserConstant } from '../../Constants/userConstants';
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import { StyledText } from '../StyledText';
import { theme } from '../../theme';
import { supabase } from '../../lib/supabase';

export function SectoresMain() {
  const { user } = useAuth();

  const aguantar = async () => {
    const responsse = await supabase.auth.getSession();
    try {
      const response = await getUserName(user.email);
      await updateUserConstant(
        response.data[0].name,
        response.data[0].email,
        response.data[0].uuid
      );
      await console.log('response data: ', response.data[0]);
    } catch (error) {
      const response = await getUserName(responsse.data.session.user.email);    
      await updateUserConstant(
        response.data[0].name,
        response.data[0].email,
        response.data[0].uuid
      );
    }
  };

  useEffect(() => {
    aguantar();
  });

  return (
    <ImageBackground
      source={require('../../../assets/images/Fondo-06.jpg')}
      resizeMode="cover"
      style={styles.image}
    >
      <AppBar />

      <StyledText
        fontSize={responsiveHeight(5)}
        color="secondary"
        align="center"
        style={styles.titulo}
      >
        APLICACIONES
      </StyledText>
      <View style={styles.containerWrapper}>
        <Link style={styles.link} to={{ screen: 'Mineria' }}>
          <ImageBackground
            source={require('../../../assets/images/Mineria.png')}
            style={styles.container}
            imageStyle={styles.containerImage}
          >
            <View style={styles.containerDark} />
            <Text
              style={styles.text}
            >
              MINERÍA
            </Text>
          </ImageBackground>
        </Link>
        <Link style={styles.link} to={{ screen: 'PetroleoCategoria' }}>
          <ImageBackground
            source={require('../../../assets/images/Petroleo.png')}
            style={[styles.container, styles.containerLarge]}
            imageStyle={styles.containerImage}
          >
            <View style={styles.containerDark} />
            <Text
              style={styles.textLarge}
            >
              PETRÓLEO
            </Text>
          </ImageBackground>
        </Link>
        <Link style={styles.link} to={{ screen: 'AgriculturaMenu' }}>
          <ImageBackground
            source={require('../../../assets/images/Agricultura.png')}
            style={styles.container}
            imageStyle={styles.containerImage}
          >
            <View style={styles.containerDark} />
            <Text
              style={styles.text}
            >
              AGRICULTURA
            </Text>
          </ImageBackground>
        </Link>
      </View>
      <Image
        source={require('../../../assets/images/SateliteHd.png')}
        style={styles.satelitechic}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
  satelitechic: {
    position: 'absolute',
    left: responsiveWidth(55),
    top: responsiveWidth(18),
    width: responsiveWidth(65),
    height: responsiveHeight(35),
    resizeMode: 'contain',
  },
  containerWrapper: {
    width: responsiveWidth(80),
    marginRight: responsiveWidth(10),
    marginLeft: responsiveWidth(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    marginVertical: responsiveHeight(2),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.primaryBackgroundColor,
    height: responsiveHeight(22),
    width: responsiveWidth(70),
    borderRadius: 15,
  },
  containerImage: {
    borderRadius: 15,
  },
  containerDark: {
    position: 'absolute',
    borderRadius: 15,
    backgroundColor: 'rgba(0,0,0,0.27)',
    width: responsiveWidth(70),
    height: responsiveHeight(22),
  },
  titulo: {
    marginVertical: responsiveHeight(4),
    fontSize: responsiveHeight(5),
    fontWeight: 'bold',
    fontFamily: 'Lato-Bold',
  },
  link: {
    marginVertical: responsiveHeight(2),
  },
  text: {
    fontSize: responsiveHeight(3.5),
    fontWeight: 'bold',
    color: theme.colors.primary,
    textAlign: 'center',
    marginTop: responsiveHeight(1),
  },
  textLarge: {
    fontSize: responsiveHeight(3.5),
    fontWeight: 'bold',
    color: theme.colors.primary,
    textAlign: 'center',
    marginTop: responsiveHeight(2),
  },
});