import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  ImageBackground,
  Text,
  Image,
} from 'react-native';
import { StyledText } from '../StyledText';
import { theme } from '../../theme';
import { Link } from '@react-navigation/native';
import { AppBar } from '../AppBar';
import { useAuth } from '../../../context/AuthProvider';
import { useEffect } from 'react';
import { getUserName } from '../../lib/supabaseHandler';
import { updateUserConstant } from '../../Constants/userConstants';

const { width, height } = Dimensions.get('window');

export function SectoresMain() {
  const { user } = useAuth();

  const aguantar = async () => {
    console.log('USER-EMAIL: ', user.email)
    const response = await getUserName(user.email);
    await updateUserConstant(
      response.data[0].name,
      response.data[0].email,
      response.data[0].uuid
    );
    await console.log('response data: ', response.data[0]);
  };

  useEffect(() => {
    aguantar();
  });

  return (
    <ImageBackground
      source={require('../../../assets/images/Fondo-06.jpg')} resizeMode="cover" style={styles.image}
    
      imageStyle={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <AppBar />

      <StyledText
        fontSize="subheading3"
        color="secondary"
        align="center"
        style={styles.titulo}
      >
        APLICACIONES
      </StyledText>
      <View
        style={{
          width: Dimensions.get('window').width / 100 * 80,
          marginRight: Dimensions.get('window').width / 100 * 10,
          marginLeft: Dimensions.get('window').width / 100 * 10,

          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Link style={{ margin: 10 }} to={{ screen: 'Mineria' }}>
          <ImageBackground
            source={require('../../../assets/images/Mineria.png')}
            style={styles.container}
            imageStyle={{ borderRadius: 15 }}
          >
            <View style={styles.containerDark} />
            <StyledText
              fontSize="subheading2"
              fontWeight="bold"
              color="primary"
              align="center"
            >
              MINERIA
            </StyledText>
          </ImageBackground>
        </Link>
        <Link style={{ margin: 10 }} to={{ screen: 'PetroleoCategoria' }}>
          <ImageBackground
            source={require('../../../assets/images/Petroleo.png')}
            style={styles.container}
            imageStyle={{ borderRadius: 15 }}
          >
            <View style={styles.containerDark} />
            <StyledText
              fontSize="subheading2"
              fontWeight="bold"
              color="primary"
              align="center"
            >
              PETROLEO
            </StyledText>
          </ImageBackground>
        </Link>
        <Link style={{ margin: 10 }} to={{ screen: 'AgriculturaMenu' }}>
          <ImageBackground
            source={require('../../../assets/images/Agricultura.png')}
            style={styles.container}
            imageStyle={{ borderRadius: 15 }}
          >
            <View style={styles.containerDark} />
            <StyledText
              fontSize="subheading2"
              fontWeight="bold"
              color="primary"
              align="center"
            >
              AGRICULTURA
            </StyledText>
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
  image:{
    flex:1,
  }
,  satelitechic: {
    position: 'absolute',
    left: width * 0.60,
    top: width / 6,
    width: Dimensions.get('window').width - 150,
    height: Dimensions.get('window').height - 500,
    resizeMode: 'contain',
  },
  container: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.primaryBackgroundColor,
    height: Dimensions.get('window').height / 5,
    width: Dimensions.get('window').width / 100 * 70,
    borderRadius: 15,
  },
  containerDark: {
    borderRadius: 15,
    backgroundColor: 'rgba(0,0,0,0.27)',
    width: '100%',
    height: '100%',
    maxWidth: '100%',
    position: 'absolute',
  },
  titulo: {
    margin: 40,
    fontSize: 43,
    fontWeight: 'bold',
    fontWeight: '900',
    fontFamily: 'Lato-Bold',
  },
});