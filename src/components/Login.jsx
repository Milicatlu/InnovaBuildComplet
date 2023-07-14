import React, { useState } from 'react';
import {
   StyleSheet,
   Text,
   TextInput,
   View,
   TouchableOpacity,
   ImageBackground,
   Pressable,
   Image,
   KeyboardAvoidingView,
   Dimensions,
} from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';
import { useAuth } from '../../context/AuthProvider';
const screenWidthPercentage = widthPercentageToDP('50%');



export function Login({ navigation }) {
   const { login } = useAuth();
   const [isPasswordVisible, setPasswordVisibility] = useState(false);
     const handlePasswordVisibility = () => {
      setPasswordVisibility(!isPasswordVisible);
   }
   const [user, setUser] = useState({
      email: 'innovaspaceprueba@gmail.com',
      password: '12345678Aa',
      backgroundColor1: '#C6C6C8',
      backgroundColor2: '#C6C6C8',
   });
 
   const handleLogin = async (email, password) => {
      try {
         const {
            data: { user, session },
            error,
         } = await login(email, password);
         if (user && session) navigation.navigate('terminos');
      } catch (error) {
         console.log(error);
      }
   };

   return (

      <ImageBackground
         source={require('../../assets/images/BackgroundFondo.png')}
         resizeMode="cover"
         style={styles.image}
      >
         <Image style={styles.fotito} source={require('../../assets/images/LogoNombre.png')} />
         <View>
            <Text style={styles.subcontText}>¡Te damos la bienvenida!</Text>
            <View style={styles.completardatos}>
               <Text style={styles.textcomplet}>Por favor, completá tus datos para ingresar</Text>
            </View>

            <View style={styles.subsubcont}>
               <Image style={styles.icons} source={require('../../assets/images/Mail2.png')} />
               <TextInput
                  style={[
                     styles.TextView,
                     { backgroundColor: user.backgroundColor1 },
                     { width: screenWidthPercentage * 0.7 },
                  ]}
                  placeholder="E-mail"
                  placeholderTextColor="#A9A9A9"
                  onChangeText={(text) =>
                     setUser({
                        ...user,
                        email: text,
                        backgroundColor1: 'white',
                     })
                  }
                  value={user.email}
               />
            </View>

            <View style={styles.subsubcont}>
               <TouchableOpacity onPress={handlePasswordVisibility}>
                  <Image
                     style={styles.icons}
                     source={isPasswordVisible
                        ? require('../../assets/images/Ojo.png')
                        : require('../../assets/images/Nover.png')
                     }
                  />
               </TouchableOpacity>
               <TextInput
                  style={[
                     styles.TextView,
                     { backgroundColor: user.backgroundColor2 },
                     { width: screenWidthPercentage * 0.5 },
                  ]}
                  onChangeText={((text) =>
                     setUser({
                        ...user,
                        password: text
                     }))}
                  secureTextEntry={!isPasswordVisible}
                  placeholder="Password"
               >12345678Aa</TextInput>

            </View>


            <Pressable
               style={[
                  styles.btn,
                  {
                     textAlign: 'center',
                     textAlignVertical: 'center',
                  },
               ]}
               onPress={() => handleLogin(user.email, user.password)}
            >
               <Text style={styles.ingresar}>CONTINUAR</Text>
            </Pressable>

            <View style={styles.RNC}>
               <TouchableOpacity onPress={() => navigation.navigate('regis')}>
                  <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 15 }}>
                     Registrarme
                  </Text>
               </TouchableOpacity>
               <TouchableOpacity>
                  <Text style={styles.fuentebottom} onPress={() => navigation.navigate('contraseña')}>
                     {' '} Olvidé mi contraseña
                  </Text>
               </TouchableOpacity>
            </View>
         </View>
      </ImageBackground>

   );
}



const styles = StyleSheet.create({
  
   subcontText: {
      color: '#04B6E8',
      fontSize:responsiveFontSize(3),
      fontWeight: 'bold',
      fontFamily: 'Lato-Regular',
      width:responsiveWidth(300),
      bottom:responsiveHeight(3),
      borderBottomLeftRadius: responsiveHeight(2),
      left: responsiveWidth(115),
   },
   fuentebottom: {
      color: '#fff',
      fontSize: responsiveFontSize(1.8),
   },
   ingresar: {
      fontSize: responsiveHeight(2.5),
      color: '#fff',
      fontWeight: 'bold',
   },
   fotito: {
      width: responsiveWidth(60),
      height:responsiveHeight(30),
      bottom: responsiveHeight(8),
      left: responsiveWidth(0),
      tintColor: 'white',
   },
   textcomplet: {
      fontSize:responsiveFontSize(2.6),
      top: responsiveHeight(1),
      left:responsiveWidth(121),
      fontWeight: responsiveFontSize(5),
      width: responsiveWidth(60),
      textAlign: 'center',
      textAlignVertical: 'center',
      lineHeight: responsiveFontSize(4.2),
      letterSpacing: responsiveFontSize(0.1),
      color: 'white',
   },
   container: {
      flex: 1,
   },
   subsubcont: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical:responsiveHeight(1.5),
      top:responsiveHeight(5),
      left:responsiveWidth(121),
      width: responsiveWidth(60),
   },

   TextView: {
      backgroundColor: '#C6C6C8',
      justifyContent: 'flex-end',
      flex: 0.92,
      height:responsiveHeight(4.5),
      borderRadius: responsiveFontSize(1.1),
      paddingLeft: responsiveWidth(2),
      alignItems: 'center',
   },
   icons: {
      height: responsiveHeight(4),
      width: responsiveWidth(12.5),
   },
   btn: {
      top:responsiveHeight(10),
      left:responsiveWidth(124),
      backgroundColor: '#03B6E8',
      color: '#fff',
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      height: responsiveHeight(6),
      width: responsiveWidth(57),
   },

   RNC: {
      flexDirection: 'row',
      color: '#fff',
      fontSize: 6,
      top: responsiveHeight(13.5),
      left:responsiveWidth(127),
   },
   image: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
   },
});

export default Login;
/* <View style={styles.subsubcont}>
               <Image style={styles.icons} source={require('../../assets/images/Ojo.png')} />
               <TextInput
                  style={[
                     styles.TextView,
                     { backgroundColor: user.backgroundColor2 },
                     { width: screenWidthPercentage * 0.5 },
                  ]}
                  placeholder="Contraseña"
                  placeholderTextColor="#A9A9A9"
                  onChangeText={(text) =>
                     setUser({
                        ...user,
                        password: text,
                        backgroundColor2: 'white',
                     })
                  }
                  value={user.password}
               />
            </View>*/ 