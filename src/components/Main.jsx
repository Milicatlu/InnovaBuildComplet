import {StyleSheet,Dimensions,ImageBackground,View,TouchableOpacity,Image,Modal,Text} from "react-native"
import { SectoresMain } from "./SectoresMain/index"
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
import { getUser } from "../lib/supabaseHandler"
import MapScreen from "./MapScreen"
const { height, width, fontScale, scale } = Dimensions.get("window")
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
const Drawer = createDrawerNavigator()

export function Main({ navigation }) {
  
  //estado para almacenar la visibilidad del modal
  const [modalVisible, setModalVisible] = useState(false)

  //estado para almacenar la notificacion
  const [notificacion, setNotificacion] = useState([])


    //useEffect con la llamada a notificaciones y sondeo
    useEffect(() => {
    
      //llamada a notificaciones
      const fetchnotificacion = async () => {
        const response = await getUser()
        try {
        const { data, error } = await supabase
            .from("notificaciones")
            .select()
            .eq("notificacionid",  response.id)
            .order("time", { ascending: false })
        if (error) {
          console.error("Error al obtener la última notificación:", error)
        } else if (data && data.length > 0) {
          setNotificacion(data[0])
        }
        else {
          setNotificacion(null)
        }
      } catch (error) {
        console.error("Error al obtener la última notificación:", error)
      }
    }
    
    //sondeo
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

  //funcion para cambiar el modal
  const toggleModal = () => {
    setModalVisible(!modalVisible)
  }

  //funcion para poner hora y fecha ordenada
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
            headerTintColor: "#FFF",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerTransparent: true,
            headerTitle: "",
            headerStatusBarHeight: responsiveHeight(4),
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
          <Drawer.Screen name="Login" component={Login} options={{headerShown:false}}/>
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
                  left: responsiveWidth(30.6),
                  bottom: responsiveHeight(6.2)
                }}
              >
                <Image
                  source={require("../../assets/icons/Notificaciones.png")}
                  style={{
                    height: responsiveHeight(3.5),
                    width: responsiveWidth(7),
                  }}
                />
              </TouchableOpacity>

              {!notificacion ? (
              <View style={styles.modalContainer}>
                <View style={styles.notificationContainer}>
                      <Text style={styles.notificationType}>Notificaciones</Text>
                      <Text style={styles.notificationTime}>Ahora</Text>
                      <Text style={styles.noNotificaciones}>No posee notificaciones pentientes en este momento</Text>
                </View>
              </View> 
                  ) : (
                <TouchableOpacity onPress={() => {navigation.navigate("Notificaciones"); toggleModal()}} style={styles.modalContainer}>
                  {notificacion && (
                    <View style={styles.notificationContainer}>
                      <Text style={styles.notificationType}>{notificacion.type}</Text>
                      <Text style={styles.notificationTime}>{formatDateTime(notificacion.time)}</Text>
                      <Text style={styles.notificacionTitulo}>{notificacion.title}</Text>
                      <Text style={styles.notificationMessage}>{notificacion.message}</Text>
                    </View>
                  )}
                </TouchableOpacity>
      )}
            </View>
          </View>
        </Modal>
      </ImageBackground></View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    marginTop:responsiveHeight(-32),
    width: responsiveWidth(100),
    
  },
  modalContainer: {
    backgroundColor: "#fff",
    paddingLeft: responsiveWidth(1.6),
    paddingRight: responsiveWidth(1.6),
    paddingBottom: responsiveHeight(5),
    paddingTop: responsiveHeight(1.1),
    borderRadius: responsiveHeight(2),
    height: responsiveHeight(18.5),
    width: responsiveWidth(80),
    bottom: responsiveHeight(5)
  },
  label: {
    flexDirection: "row",
    height: responsiveHeight(100),
    width: responsiveWidth(58),
  },
  image: {
    width: responsiveWidth(10),
    height: responsiveHeight(4.5),
    tintColor: "black",
    alignSelf: "center",
  },
  ButtonInicio: {
    width: responsiveWidth(11.1),
    height: responsiveHeight(5.2),
    right: "55%",
    position: "absolute",
    top: "9%",
    flex: 5,
    zIndex: 2,
  },
  ButtonP: {
    position: "absolute",
    width: responsiveWidth(11.1),
    right: "5%",
    marginTop:responsiveHeight(-1.1),
    height: responsiveHeight(5.2),
    flex: 1,
  },
  notificationButton: {
    left: responsiveWidth(-16.1),
    top: responsiveHeight(1),
  },
  notificationIcon: {
    height: responsiveHeight(3.5),
    width: responsiveWidth(7),
    bottom: responsiveHeight(1.1)
  },
  notificationContainer: {
    borderBottomColor: "#d9d9d9",
    margin: responsiveHeight(1.5),
  },
  notificationType: {
    fontFamily: "Lato-Bold",
    fontSize: responsiveFontSize(2.3),
    textAlign: "left",
    color: "#03B6E8",
  },
  notificationTime: {
    color: "#878789",
    fontSize: responsiveFontSize(2) ,
    alignSelf: "flex-end",
    bottom: responsiveHeight(2.4),
    fontFamily: "Lato-Bold",
  },
  notificacionTitulo: {
    fontSize:  responsiveFontSize(2.7),
    fontFamily: "Lato-Bold",
    bottom: responsiveHeight(1.4),
  },
  notificationMessage: {
    textAlign: "left",
    fontSize: responsiveFontSize(2.3),
    fontFamily: "Lato-Regular",
    lineHeight: responsiveHeight(2.8),
  },
  noNotificaciones: {
    textAlign: "left",
    fontSize: responsiveFontSize(2.3),
    fontFamily: "Lato-Bold",
    lineHeight: responsiveHeight(2.8),
  }
})



































                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    //363