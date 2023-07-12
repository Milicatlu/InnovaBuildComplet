import React, { useRef, useState } from "react";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer"
import { Image, View, Text, Animated } from "react-native"
import { userConstant } from "../Constants/userConstants";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import {singOut} from '../hooks/useSingOut.jsx'
import { useNavigation, CommonActions } from "@react-navigation/native";
export function CustomDrawerContent(props) {
   //Estado para controlar la visibilidad del modal
   const [opcionVisible, setOpcionVisible] = useState(false);

   //Referencia para la animacion de la altura del contenedor
   const animatedContainerHeight = useRef(new Animated.Value(200)).current;

   // Funcion para alternal la visibilidad del modal
   const toggleOpcionVisible = () => {
      setOpcionVisible(!opcionVisible)
   }

   const navegacion = useNavigation()

   //Animacion de la altura del contenedor
   Animated.timing(animatedContainerHeight, {
      toValue: opcionVisible ? 200 : 200,
      duration: 800,
      useNativeDriver: false,
   }).start();

   return (
      <DrawerContentScrollView  {...props}>
         <View style={{
            flexDirection: "column",
            alignItems: "center",
            marginTop:responsiveHeight(4.1),
         }}>

            <Image
               style={{ width: responsiveWidth(33), height: responsiveHeight(16) }}
               source={require("../../assets/images/Iso-12.png")}
            />
            <Text style={{
               fontSize: responsiveFontSize(3),
               fontWeight: "bold", color: "#03B6E8",
               height: responsiveHeight(5)
            }}>

               {userConstant.name}
            </Text>
         </View>

         <DrawerItem
            style={{
               width: responsiveWidth(59),
               alignSelf: "flex-start",
               height: responsiveHeight(4.5)
            }}
            icon={() => (
               <Image
                  source={require("../../assets/icons/Home.png")}
                  style={{
                     width: responsiveWidth(8.3),
                     height: responsiveHeight(4.1),
                     alignSelf: "auto",
                     marginLeft: responsiveWidth(1)
                  }}
               />
            )}
            labelStyle={{
               fontSize: responsiveFontSize(2.7),
               color: "black",
               width: responsiveWidth(34.7),
               alignSelf: "flex-end",
               fontFamily: "Lato-Bold"
            }}
            label="Inicio"
            onPress={() => {
               props.navigation.navigate("Inicio")
            }}
         />

         <DrawerItem
            style={{
               width: responsiveWidth(58.8),
               height: responsiveHeight(5),
               alignSelf: "flex-start"
            }}
            icon={() => (
               <Image
                  source={require("../../assets/icons/Petroleo_Icon.png")}
                  style={{
                     width: responsiveWidth(10),
                     height: responsiveHeight(4.7)
                  }}
               />
            )}
            labelStyle={{
               fontSize: responsiveFontSize(2.7),
               color: "black", 
               width: responsiveWidth(34.4),
               alignSelf: "flex-end",
               fontFamily: "Lato-Bold"
            }}
            label="Petróleo"
            onPress={() => {
               props.navigation.navigate("PetroleoCategoria")
            }}
         />

         <DrawerItem
            style={{
               width: responsiveWidth(58.8),
               height: responsiveHeight(5.3),
               alignSelf: "flex-start"
            }}
            icon={() => (
               <Image
                  source={require("../../assets/icons/Agricultura_Icon.png")}
                  style={{
                     width: responsiveWidth(10),
                     height: responsiveHeight(4.7)
                  }}
               />
            )}
            labelStyle={{
               fontSize: responsiveFontSize(2.7),
               color: "black",
               width: responsiveWidth(34.4),
               alignSelf: "flex-end",
               fontFamily: "Lato-Bold"
            }}
            label="Agricultura"
            onPress={() => {
               props.navigation.navigate("AgriculturaMenu")
            }}
         />

         <DrawerItem
            style={{
               width: responsiveWidth(58),
               height: responsiveHeight(6.6),
               alignSelf: "flex-start"
            }}
            icon={() => (
               <Image
                  source={require("../../assets/icons/Mineria_Icon.png")}
                  style={{
                     width: responsiveWidth(10),
                     height: responsiveHeight(4.7)
                  }}
               />
            )}
            labelStyle={{
               fontSize: responsiveFontSize(2.7),
               color: "black",
               width: responsiveWidth(33.3),
               alignSelf: "flex-end",
               fontFamily: "Lato-Bold"
            }}
            label="Minería"
            onPress={() => {
               props.navigation.navigate("Mineria")
            }}
         />

         <View style={{
            height: 1,
            backgroundColor: "#d9d9d9",
            width: responsiveWidth(58.5),
            alignSelf: "center"
         }} />

         <DrawerItem
            style={{
               width: responsiveWidth(58.5),
               alignSelf: "flex-start",
               height: responsiveHeight(4.8)
            }}
            icon={() => (
               <Image
                  source={require("../../assets/icons/Perfil.png")}
                  style={{
                     width: responsiveWidth(9.2),
                     height: responsiveHeight(4.5),
                     marginLeft: responsiveWidth(0.3)
                  }}
               />
            )}
            labelStyle={{
               fontSize: responsiveFontSize(2.7),
               color: "black",
               width: responsiveWidth(34),
               alignSelf: "flex-end",
               fontFamily: "Lato-Bold"
            }}
            label="Perfil"
            onPress={() => {
               props.navigation.navigate("Perfil")
            }}
         />

         <DrawerItem
            style={{
               width: responsiveWidth(58),
               alignSelf: "flex-start"
            }}
            icon={() => (
               <Image
                  source={require("../../assets/icons/Ajustes.png")}
                  style={{
                     width: responsiveWidth(10),
                     height: responsiveHeight(4.5),
                     tintColor: opcionVisible ? "#03B6E8" : "#737373"
                  }}
               />
            )}
            labelStyle={{
               fontSize: responsiveFontSize(2.7),
               color: "black",
               width: responsiveWidth(33.3),
               alignSelf: "flex-end",
               fontFamily: "Lato-Bold"
            }}
            label="Ajustes"
            onPress={toggleOpcionVisible}>
         </DrawerItem>


         <Animated.View style={{ height: animatedContainerHeight }}>
            {opcionVisible && (
               <>
                  <DrawerItem
                     style={{
                        width: responsiveWidth(100),
                        alignSelf: "center",
                        maxWidth: responsiveWidth(55.8),
                        marginBottom: 0,
                        marginLeft: responsiveWidth(-1.25),
                        borderTopRightRadius: responsiveHeight(2),
                        borderTopLeftRadius: responsiveHeight(2),
                        borderBottomEndRadius: 0,
                        borderBottomStartRadius: 0
                     }}
                     icon={() => (
                        <Image
                           color="#FFF"
                           source={require("../../assets/icons/Notificaciones.png")}
                           style={{
                              width: responsiveWidth(7.6),
                              height: responsiveHeight(4.4)
                           }}
                        />
                     )}
                     inactiveBackgroundColor="#03B6E8"
                     labelStyle={{
                        fontSize: responsiveFontSize(2.7),
                        color: "#FFF",
                        width: responsiveWidth(35.7),
                        alignSelf: "center",
                        fontFamily: "Lato-Bold"
                     }}
                     label="Notificaciones"
                     onPress={() => {
                        props.navigation.navigate("Notificaciones")
                     }}
                  />

                  <DrawerItem
                     style={{
                        width: responsiveWidth(100),
                        alignSelf: "center",
                        maxWidth: responsiveWidth(55.8),
                        backgroundColor: "#03B6E8", 
                        marginTop: responsiveHeight(0),
                        marginLeft: responsiveWidth(-1.25),
                        borderBottomEndRadius: responsiveHeight(2),
                        borderBottomStartRadius: responsiveHeight(2),
                        borderTopEndRadius: 0,
                        borderTopStartRadius: 0
                     }}
                     icon={() => (
                        <Image
                           color="#FFF"
                           source={require("../../assets/icons/Terminos.png")}
                           style={{
                              width: responsiveWidth(7.6),
                              height: responsiveHeight(4.5)
                           }}
                        />
                     )}
                     labelStyle={{
                        fontSize: responsiveFontSize(2.7),
                        color: "#FFF",
                        width: responsiveWidth(35.7),
                        alignSelf: "center",
                        fontFamily: "Lato-Bold"
                     }}
                     label="Términos"
                     onPress={() => {
                        props.navigation.navigate("TerminosDos")
                     }}
                  />
               </>
            )}
         </Animated.View>

         <DrawerItem
            style={{
               width: responsiveWidth(41.6),
               alignSelf: "center",
               marginTop: responsiveHeight(1)
            }}
            labelStyle={{
               fontSize: responsiveFontSize(2.7),
               color: "#03B6E8",
               width: responsiveWidth(50),
               marginLeft: responsiveWidth(2.5),
               fontFamily: "Lato-Bold"
            }}
            label="Cerrar Sesion"
            onPress={() => {
               singOut()
               navegacion.dispatch(
                  CommonActions.reset({
                     index:0,
                     routes:[{name:"Login"}]
                  })
               )
            }}
         />
      </DrawerContentScrollView>
   )
}