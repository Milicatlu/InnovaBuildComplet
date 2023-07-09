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
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';
import { useAuth } from '../../context/AuthProvider';
const { width, height } = Dimensions.get('window');
const screenWidthPercentage = widthPercentageToDP('50%');
const screenHeightPercentage = heightPercentageToDP('50%');


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
   subsubButtom: {

   },
   subcontText: {
      color: '#04B6E8',
      fontSize: width * 0.055,
      fontWeight: 'bold',
      fontFamily: 'Lato-Regular',
      width: width * 3,
      top: screenHeightPercentage - height * 0.3 * 1.80,
      left: screenWidthPercentage - width * 0.535 * -1.35,
   },
   fuentebottom: {
      color: '#fff',
      fontSize: 15,
   },
   ingresar: {
      fontSize: width * 0.04,
      color: '#fff',
      fontWeight: 'bold',
   },
   fotito: {
      width: screenWidthPercentage + 20,
      height: height * 0.3,
      top: screenHeightPercentage - height * 0.3 * 1.85,
      left: screenWidthPercentage - width * 0.535 * 0.91,
      tintColor: 'white',
   },
   textcomplet: {
      fontSize: width * 0.05,
      top: screenHeightPercentage - height * 0.3 * 1.70,
      left: screenWidthPercentage - width * 0.535 * -1.35,
      fontWeight: '600',
      width: width * 0.6,
      textAlign: 'center',
      textAlignVertical: 'center',
      lineHeight: width * 0.07,
      letterSpacing: width * 0.0019,
      color: 'white',
   },
   container: {
      flex: 1,
   },
   subsubcont: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: height * 0.015,
      top: screenHeightPercentage - height * 0.3 * 1.60,
      left: screenWidthPercentage - width * 0.80 * -0.875,
      width: screenWidthPercentage * 1.2,
   },

   TextView: {
      backgroundColor: '#C6C6C8',
      justifyContent: 'flex-end',
      flex: 0.92,
      height: height * 0.045,
      borderRadius: 8,
      paddingLeft: width * 0.02,
      alignItems: 'center',
   },
   icons: {
      height: height * 0.040,
      width: width * 0.12,
   },
   btn: {
      top: screenHeightPercentage - height * 0.3 * 1.47,
      left: screenWidthPercentage - width * 0.80 * -0.92,
      backgroundColor: '#03B6E8',
      color: '#fff',
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      height: height * 0.050,
      width: screenWidthPercentage * 1.13,
   },

   RNC: {
      flexDirection: 'row',
      color: '#fff',
      fontSize: 6,
      top: screenHeightPercentage - height * 0.3 * 1.35,
      left: screenWidthPercentage - width * 0.80 * -0.93,
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