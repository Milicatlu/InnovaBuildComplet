import React from 'react'
import { StyledText } from "../StyledText"
import { theme } from "../../theme"
import { AppBar } from "../AppBar"
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Image, TextInput, View } from "react-native"
import { StyleSheet, Dimensions, ImageBackground, TouchableHighlight } from "react-native"
import { Button } from 'react-native-paper'
import { StyledButton, StyledButton2 } from '../StyledButton'
export function Configuraciones({ navigation }) {

   return (
      <>
         <ImageBackground
            source={require("../../../assets/images/Fondo-06.jpg")}
            style={{
               paddingTop: 10,
               height: Dimensions.get("window").height + 10,
            }}
            imageStyle={{
               justifyContent: "center",
               alignItems: "center",
            }}
         >
            <AppBar />
            <StyledText
               fontSize="subheading3"
               fontWeight="bold"
               color="secondary"
               align="center"
               style={{ margin: 15 }}
            >
               AJUSTES
            </StyledText>
            <StyledText fontSize={'subheading2'} fontWeight={'bold'} style={styles.subtitulo}>Nueva Contraseña</StyledText>
            <View style={styles.datosC}>
               <View style={styles.datos}>
                  <StyledText fontSize={'subheading1'} style={styles.label}>E-mail</StyledText>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                     <TextInput style={styles.textarea}></TextInput>
                     <View style={styles.icon}>
                        <Ionicons name="md-pencil" size={24} color="#818281" />
                     </View>
                  </View>
                  <View style={{ height: 1.5, backgroundColor: '#d9d9d9', width: '100%' }}></View>
               </View>
               <View style={styles.datos}>
                  <StyledText fontSize={'subheading1'} style={styles.label}>Contraseña actual</StyledText>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}><TextInput style={styles.textarea}></TextInput>
                     <View style={styles.icon}>
                        <FontAwesome5 name="eye-slash" size={20} color={'#818281'} backgroundColor={'blue'} />
                     </View>
                     <View style={styles.icon}>
                        <Ionicons name="md-pencil" size={24} color="#818281" />
                     </View>
                  </View>
                  <View style={{ height: 1.5, backgroundColor: '#d9d9d9', width: '100%' }}></View>
               </View>
               <View style={styles.datos}>
                  <StyledText fontSize={'subheading1'} style={styles.label}>Nueva Contraseña</StyledText>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                     <TextInput style={styles.textarea}></TextInput>
                     <View style={styles.icon}>
                        <Ionicons name="md-pencil" size={24} color="#818281" />
                     </View>
                  </View>
                  <View style={{ height: 1.5, backgroundColor: '#d9d9d9', width: '100%' }}></View>
               </View>
               <View style={styles.datos}>
                  <StyledText fontSize={'subheading1'} style={styles.label}>Confirmar Contraseña</StyledText>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                     <TextInput style={styles.textarea}></TextInput>
                     <View style={styles.icon}>
                        <Ionicons name="md-pencil" size={24} color="#818281" />
                     </View>
                  </View>
                  <View style={{ height: 1.5, backgroundColor: '#d9d9d9', width: '100%' }}></View>
               </View>
               <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                  <StyledButton styleContainer={styles.lleno} styledProps={{ fontSize: 'subheading1' }}>Guardar Cambios</StyledButton>
                  <StyledButton2 styleContainer={styles.vacio} styledProps={{ fontSize: 'subheading1', color: 'secondary' }}>Cancelar</StyledButton2>
               </View>
            </View>
         </ImageBackground>
      </>
   )
}
const styles = StyleSheet.create({
   subtitulo: {
      alignSelf: 'center',
      color: '#03B6E8'
   },
   datosC: {
      height: '68%',
      width: '100%',
      position: 'absolute',
      bottom: 0,
      paddingTop: 40,
      backgroundColor: '#fff',
      borderTopEndRadius: 20,
      borderTopStartRadius: 20
   },
   datos: {
      alignSelf: 'center',
      width: '80%',
      paddingBottom: 30,
   },
   label: {
      color: 'grey'
   },
   textarea: {
      height: 40,
      fontSize: 20,
      color: 'black',
      flex: 0.95
   },
   lleno: {
      height: 50,
      backgroundColor: '#03B6E8'
   },
   icon: {
      justifyContent: 'center',
   },
   vacio: {
      height: 50,
      color: 'red'
   }
})

async function borrarItem(navigation) {
   console.log("Grrr")
   await AsyncStorage.removeItem("jwt_innova")
      .then(async () => {
         navigation.navigate("Login");
         console.log(await AsyncStorage.getItem("jwt_innova"));
      }
      ).catch((e) => { console.log(e) })
}