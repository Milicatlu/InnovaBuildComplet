import React, { useRef, useState } from "react";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer"
import { Image, View, Text, Animated, Dimensions } from "react-native"
import { userConstant } from "../Constants/userConstants";
const { height, width, fontScale, scale } = Dimensions.get("window")
export function CustomDrawerContent(props) {
   //Estado para controlar la visibilidad del modal
   const [opcionVisible, setOpcionVisible] = useState(false);

   //Referencia para la animacion de la altura del contenedor
   const animatedContainerHeight = useRef(new Animated.Value(200)).current;

   // Funcion para alternal la visibilidad del modal
   const toggleOpcionVisible = () => {
      setOpcionVisible(!opcionVisible)
   }

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
            alignItems: "center"
         }}>

            <Image
               style={{ width: width / 3, height: height / 6 }}
               source={require("../../assets/images/Iso-12.png")}
            />
            <Text style={{
               fontSize: fontScale * 25,
               fontWeight: "bold", color: "#03B6E8",
               height: height / 20
            }}>

               {userConstant.name}
            </Text>
         </View>

         <DrawerItem
            style={{
               width: width / 1.7,
               alignSelf: "flex-start",
               height: height / 22
            }}
            icon={() => (
               <Image
                  source={require("../../assets/icons/Home.png")}
                  style={{
                     width: width / 12,
                     height: height / 24,
                     alignSelf: "auto",
                     marginLeft: width / 100
                  }}
               />
            )}
            labelStyle={{
               fontSize: fontScale * 23,
               color: "black",
               width: width / 2.91,
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
               width: width / 1.7,
               height: height / 20,
               alignSelf: "flex-start"
            }}
            icon={() => (
               <Image
                  source={require("../../assets/icons/Petroleo_Icon.png")}
                  style={{
                     width: width / 10,
                     height: height / 21
                  }}
               />
            )}
            labelStyle={{
               fontSize: fontScale * 23,
               color: "black", width: width / 2.91,
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
               width: width / 1.7,
               height: height / 19,
               alignSelf: "flex-start"
            }}
            icon={() => (
               <Image
                  source={require("../../assets/icons/Agricultura_Icon.png")}
                  style={{
                     width: width / 10,
                     height: height / 21
                  }}
               />
            )}
            labelStyle={{
               fontSize: fontScale * 23,
               color: "black",
               width: width / 2.91,
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
               width: width / 1.7,
               height: height / 15,
               alignSelf: "flex-start"
            }}
            icon={() => (
               <Image
                  source={require("../../assets/icons/Mineria_Icon.png")}
                  style={{
                     width: width / 10,
                     height: height / 21
                  }}
               />
            )}
            labelStyle={{
               fontSize: fontScale * 23,
               color: "black",
               width: width / 2.91,
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
            width: width / 1.72,
            alignSelf: "center"
         }} />

         <DrawerItem
            style={{
               width: width / 1.7,
               alignSelf: "flex-start",
               height: height / 21
            }}
            icon={() => (
               <Image
                  source={require("../../assets/icons/Perfil.png")}
                  style={{
                     width: width / 10.8,
                     height: height / 22,
                     marginLeft: width / 300
                  }}
               />
            )}
            labelStyle={{
               fontSize: fontScale * 23,
               color: "black",
               width: width / 2.91,
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
               width: width / 1.7,
               alignSelf: "flex-start"
            }}
            icon={() => (
               <Image
                  source={require("../../assets/icons/Ajustes.png")}
                  style={{
                     width: width / 10,
                     height: height / 22,
                     tintColor: opcionVisible ? "#03B6E8" : "#737373"
                  }}
               />
            )}
            labelStyle={{
               fontSize: fontScale * 23,
               color: "black",
               width: width / 2.91,
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
                        width: width,
                        alignSelf: "center",
                        maxWidth: width / 1.79,
                        marginBottom: 0,
                        marginLeft: width / -80,
                        borderTopRightRadius: scale * 10,
                        borderTopLeftRadius: scale * 10,
                        borderBottomEndRadius: 0,
                        borderBottomStartRadius: 0
                     }}
                     icon={() => (
                        <Image
                           color="#FFF"
                           source={require("../../assets/icons/Notificaciones.png")}
                           style={{
                              width: width / 13,
                              height: height / 23
                           }}
                        />
                     )}
                     inactiveBackgroundColor="#03B6E8"
                     labelStyle={{
                        fontSize: fontScale * 22,
                        color: "#FFF",
                        width: width / 2.8,
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
                        width: width,
                        alignSelf: "center",
                        maxWidth: width / 1.79,
                        backgroundColor: "#03B6E8", marginTop: 0,
                        marginLeft: width / -80,
                        borderBottomEndRadius: scale * 10,
                        borderBottomStartRadius: scale * 10,
                        borderTopEndRadius: 0,
                        borderTopStartRadius: 0
                     }}
                     icon={() => (
                        <Image
                           color="#FFF"
                           source={require("../../assets/icons/Terminos.png")}
                           style={{
                              width: width / 13,
                              height: height / 22
                           }}
                        />
                     )}
                     labelStyle={{
                        fontSize: fontScale * 22,
                        color: "#FFF",
                        width: width / 2.8,
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
               width: width / 2.4,
               alignSelf: "center",
               marginTop: height / 100
            }}
            labelStyle={{
               fontSize: fontScale * 22,
               color: "#03B6E8",
               width: width / 2,
               marginLeft: width / 39,
               fontFamily: "Lato-Bold"
            }}
            label="Cerrar Sesion"
            onPress={() => {
               props.navigation.navigate("Login")
            }}
         />
      </DrawerContentScrollView>
   )
}