import {
  StyleSheet,
  Dimensions,
  ImageBackground,
  View,
  TouchableOpacity,
  Image,
  Modal,
  Text,
} from "react-native"
import { SectoresMain } from "./SectoresMain/index"
import Constants from "expo-constants"
import { Login } from "./Login.jsx"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { CustomDrawerContent } from "./CustomDrawerContent"
import { useState, useEffect } from "react"
import { PetroleoCategoria } from "./CategoriaPetroleo"
import { Configuraciones } from "./Configuraciones/index.jsx"
import { Mineria } from "./Mineria.jsx"
import { Perfil } from "./Perfil.jsx"
import { Terminos } from "./Terminos.jsx"
import { TerminosDos } from "./TerminosDos"
import { Notificaciones } from "./Notificaciones"
import { EtapaPetroleo } from "./EtapaPetroleo"
import { PetroleoMenu } from "./PetroleoMenu"
import { Link } from "@react-navigation/native"
import { Agriculturamenu } from "./Agriculturamenu"
import { SiloMenu } from "./SiloMenu.jsx"
import { Grafico2 } from "./GraficoPrueba"
import { EtapaMineria } from "./EtapaMineria"
import { AgriculturaSilo } from "./AgriculturaSilo"
import { supabase } from "../lib/supabase"
import MapScreen from "./MapScreen"
const { height, width, fontScale, scale } = Dimensions.get("window")
const Drawer = createDrawerNavigator()

export function Main({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false)

  const [notificacion, setNotificacion] = useState([])

  useEffect(() => {
    const fetchnotificacion = async () => {
      try {
        const { data, error } = await supabase
          .from("notificaciones")
          .select()
          .order("time", { ascending: false })
        if (error) {
          console.error("Error al obtener la última notificación:", error)
        } else if (data && data.length > 0) {
          setNotificacion(data[0])

        }
      } catch (error) {
        console.error("Error al obtener la última notificación:", error)
      }
    }

    const pollSupabase = async () => {
      await fetchnotificacion()

      await new Promise(resolve => setTimeout(resolve, 5000))

      pollSupabase()
    }

    pollSupabase()

    return () => {
      clearTimeout(pollSupabase)
    }

  }, [])


  const toggleModal = () => {
    setModalVisible(!modalVisible)
  }

  //funcion para poner hora y fecha ordenado
  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime)
    const formattedDate = formatDate(date)
    const formattedTime = formatTime(date)
    return `${formattedDate} ${formattedTime}`
  }
  const formatDate = (date) => {
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    return `${padZero(day)}/${padZero(month)}/${year}`
  }
  const formatTime = (date) => {
    const hours = date.getHours()
    const minutes = date.getMinutes()
    return `${padZero(hours)}:${padZero(minutes)}`
  }
  const padZero = (number) => {
    return number < 10 ? `0${number}` : number
  }



  return (
  <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/Fondo-06.jpg")} resizeMode="cover"
        style={{
            
            flex: 1,
      
        }}
      >
        <Drawer.Navigator
          useLegacyImplementation
          drawerContent={(props) => <CustomDrawerContent {...props} />}
          screenOptions={{
            headerPressOpacity: 1,
            headerTintColor: "#FFF",
         
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerTransparent: true,
            headerTitle: "",
            headerStatusBarHeight: height / 25,
            
            headerRight: () => (
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  onPress={toggleModal}
                  style={styles.notificationButton}
                >
                  <Image
                    source={require("../../assets/icons/Notificaciones.png")}
                    style={styles.notificationIcon}
                  />
                </TouchableOpacity>
                <Image
                  style={styles.ButtonP}
                  source={require("../../assets/images/FotoPerfil.png")}
                />
                <Link
                  style={styles.ButtonP}
                  to={{ screen: "Perfil" }}
                  onPress={() => navigation.navigate("Perfil")} // Navigate to "Perfil" screen
                ></Link>

                <Link
                  style={styles.ButtonInicio}
                  to={{ screen: "Inicio" }}
                  onPress={() => navigation.navigate("Inicio")} // Navigate to "Inicio" screen
                ></Link>
              </View>
            ),
          }}
        >
          <Drawer.Screen name="Inicio" component={SectoresMain} />
          <Drawer.Screen name="Login" component={Login} />
          <Drawer.Screen name="Mineria" component={Mineria} />
          <Drawer.Screen name="Agricultura" component={SiloMenu} />
          <Drawer.Screen name="Petroleo" component={PetroleoMenu} />
          <Drawer.Screen name="Configuraciones" component={Configuraciones} />
          <Drawer.Screen name="Perfil" component={Perfil} />
          <Drawer.Screen name="Terminos" component={Terminos} />
          <Drawer.Screen name="TerminosDos" component={TerminosDos} />
          <Drawer.Screen name="Notificaciones" component={Notificaciones} />
          <Drawer.Screen name="PetroleoCategoria" component={PetroleoCategoria} />
          <Drawer.Screen name="PetroleoMenu" component={PetroleoMenu} />
          <Drawer.Screen name="AgriculturaMenu" component={Agriculturamenu} />
          <Drawer.Screen name="SiloMenu" component={SiloMenu} />
          <Drawer.Screen name="Grafico2" component={Grafico2} />
          <Drawer.Screen name="AgriculturaSilo" component={AgriculturaSilo} />
          <Drawer.Screen name="EtapaPetroleo" component={EtapaPetroleo} />
          <Drawer.Screen name="EtapaMineria" component={EtapaMineria} />
          <Drawer.Screen name="Mapa" component={MapScreen} />


        </Drawer.Navigator>
        <Modal
          visible={modalVisible}
          animationType="fade"
          transparent={true}
          onRequestClose={toggleModal}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalBackground}>
              <TouchableOpacity
                onPress={toggleModal}
                style={{
                  left: width / 3.3,
                  bottom: height / 17
                }}
              >
                <Image
                  source={require("../../assets/icons/Notificaciones.png")}
                  style={{
                    height: height / 28,
                    width: width / 14,
                  }}
                />
              </TouchableOpacity>

              <View style={styles.modalContainer}>
                {notificacion && (
                  <View style={styles.notificationContainer}>
                    <Text style={styles.notificationType}>{notificacion.type}</Text>
                    <Text style={styles.notificationTime}>{formatDateTime(notificacion.time)}</Text>
                    <Text style={styles.notificacionTitulo}>{notificacion.title}</Text>
                    <Text style={styles.notificationMessage}>{notificacion.message}</Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        </Modal>
      </ImageBackground></View>
  )
}
const styles = StyleSheet.create({
  container:{
    flex:1,
   
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    marginTop: height / -3.12,
    width: width,

  },
  modalContainer: {
    backgroundColor: "#fff",
    paddingLeft: width / 60,
    paddingRight: width / 60,
    paddingBottom: height / 20,
    paddingTop: height / 90,
    borderRadius: scale * 11,
    height: height / 5.4,
    width: width / 1.25,
    bottom: height / 20
  },
  label: {
    flexDirection: "row",
    height: height / 1,
    width: width / 1.7,
  },
  image: {
    width: width / 10,
    height: height / 22,
    tintColor: "black",
    alignSelf: "center",
  },
  text: {
    fontFamily: "Lato-Bold",
    alignSelf: "center",
    textAlign: "center",
    fontSize: fontScale * 15,
    width: width / 1.9,
  },
  ButtonInicio: {
    width: width / 9,
    height: height / 19,
    right: "55%",
    position: "absolute",
    top: "9%",
    flex: 5,
    zIndex: 2,
  },
  ButtonP: {
    position: "absolute",
    width: width / 9,
    right: "5%",
    height: height / 19,
    flex: 1,
  },
  notificationButton: {
    left: width / - 6.2,
    top: height / 104,
  },
  notificationIcon: {
    height: height / 30,
    width: width / 14,
  },
  notificationContainer: {
    borderBottomColor: "#d9d9d9",
    margin: scale * 6.4,
  },
  notificationType: {
    fontFamily: "Lato-Bold",
    fontSize: fontScale * 18,
    textAlign: "left",
    color: "#03B6E8",
  },
  notificationTime: {
    color: "#878789",
    fontSize: fontScale * 18,
    alignSelf: "flex-end",
    bottom: height / 38,
    fontFamily: "Lato-Bold",
  },
  notificacionTitulo: {
    fontSize: fontScale * 22,
    fontFamily: "Lato-Bold",
    bottom: height / 70,
  },
  notificationMessage: {
    textAlign: "left",
    fontSize: fontScale * 18,
    fontFamily: "Lato-Regular",
    lineHeight: height / 35,
  },
})
