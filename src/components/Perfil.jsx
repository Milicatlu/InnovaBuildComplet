import {
  ImageBackground,
  Alert,
  Pressable,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image
} from "react-native";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

import { supabase } from "../lib/supabase";
import { StyledText } from "./StyledText";
import { Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import { StyledButton } from "./StyledButton";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { AppBar } from "./AppBar";
import { phone, userConstant } from "../Constants/userConstants";
import { updateUserConstant } from "../Constants/userConstants";
import { useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
const { width, height } = Dimensions.get("window");

import {
  widthPercentageToDP,
  heightPercentageToDP
} from "react-native-responsive-screen";
//definición de dimensiones para utilizar en el renderizado visual de la aplicación
const screenWidthPercentage = widthPercentageToDP("50%");
const screenHeightPercentage = heightPercentageToDP("50%");

export function Perfil({ navigation }) {

  const [modalVisible, setModalVisible] = useState(false);
  //constante en donde se guarda y se cambia el nombre del perfil o telefono del perfil
  const [credentials, setCredentials] = useState({
    name: "",
    phone: ""
  });

  //constantes de los modales de camara y de foto de perfil
  const [modalVisiblePhoto, setModalVisiblePhoto] = useState(false);
  const [modalVisibleBoton, setModalVisibleBoton] = useState(false);

  //constante para cambiar foto del perfil
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const route = useRoute();

  //se obtiene la imagen dada por camara.js
  const { image } = route.params || {};

  const handleUpdateCredentials = (name, phone) => {
    updateUserConstant(name, phone);
  };

  //logica no utilizada para poder subir imagen del usuario a supabase, cuando se elige cierta imagen para su foto de perfil
  const getImages = async () => {
    const { data, error } = await supabase
      .storage
      .from('photos')
      .list(user?.id + '/', {
        limit: 100,
        offset: 0,
        sortBy: { column: 'name', order: 'asc' }
      });
    if (data !== null) {
      setImages(data);
    } else {
      console.log('Error al cargar la imagen');
    }
  };

  const handleEnviar = () => {
    // Lógica para enviar el formulario o realizar las acciones necesarias
    // al tocar el botón "Enviar"
    setModalVisibleBoton(true);
  };

  //logica no utilizada para poder sacar una imagen de la galeria del dispositivo del usuario, ademas que tambien se intenta poder subirlo al garaje de supabase
  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images
    })
    if (!result.cancelled) {
      const response = await supabase.storage
        .from("photos")
        .upload(users)
        .upload("photos", result.uri);

      if (response.error) {
        console.error("Error al cargar la imagen:", response.error);
      } else {
        const { publicURL } = response.data;

        const { data, error } = await supabase
          .from("photos")
          .insert([{ url: publicURL }]);

        if (error) {
          console.error("Error al insertar en la base de datos:", error);
        } else {
          console.log("Imagen guardada en la base de datos:", data);
          setFotoPerfil(publicURL);
        }
      }
    }
  };
  useEffect(() => {
    if (image) {
      setFotoPerfil(image);
    }
  }, [image]);


  return (
    //Imagen de fondo
    <ImageBackground
      source={require("../../assets/images/Fondo-06.jpg")}
      resizeMode="cover"
      style={styles.image}
    >
      {/*Menu de la parte de superior*/}
      <AppBar />
      <View style={styles.fotoPerfilll} source={fotoPerfil ? { uri: fotoPerfil } : require('../../assets/images/FotoPerfil.png')} />
      {/*Linea para determinar si existe un archivo para utilizar otra foto de perfil en su lugar */}
      <Image style={styles.fotoPerfill} source={fotoPerfil ? { uri: fotoPerfil } : require('../../assets/images/FotoPerfil.png')} />

    {/*Modal de foto de perfil con las opciones para subir una imagen, tomar una foto, falta la logica para eliminar foto*/}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              onPress={() => navigation.navigate("camara")}
              style={[styles.modalText]}
            >
              <Text style={styles.text}>Tomar foto</Text>
            </TouchableOpacity>
            <View
              style={{
                marginTop: 15,
                left: "10%",
                height: 1.5,
                backgroundColor: "#D9D9D9",
                width: "80%"
              }}
            />
            <TouchableOpacity onPress={"hola"} style={[styles.modalText]}>
              <Text style={styles.text}>Subir foto</Text>
            </TouchableOpacity>
            <View
              style={{
                marginTop: 15,
                left: "10%",
                height: 1.5,
                backgroundColor: "#D9D9D9",
                width: "80%"
              }}
            />
            <TouchableOpacity onPress={"hola"} style={[styles.modalText]}>
              <Text style={styles.textOrange}>Eliminar foto</Text>
            </TouchableOpacity>
            <Pressable
              style={[styles.button]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles} />
            </Pressable>
          </View>
        </View>
      </Modal>

      {/*Boton e imagen para desplegar el modal de opciones de foto de perfil*/}
      <Image
        source={require("../../assets/images/Camara.png")}
        style={[styles.Camara]}
      />
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={[styles.Camara]}
      ></TouchableOpacity>

      {/*Modal para ver imagen de foto de perfil mas grande y al tocar en cualquier lado se cierra*/}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisiblePhoto}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisiblePhoto);
        }}
      >
        <View style={styles.muro} />
        <Image
          style={styles.fotoPerfilG}
          source={
            fotoPerfil
              ? { uri: fotoPerfil }
              : require('../../assets/images/FotoPerfil.png')
          }
        />
        <Pressable
          style={[styles.buttonG]}
          onPress={() => setModalVisiblePhoto(!modalVisiblePhoto)}
        >
          <Text style={styles}></Text>
        </Pressable>
      </Modal>

      {/*Boton para accionar el modal de "foto perfil mas grande"*/}
      <TouchableOpacity
        onPress={() => setModalVisiblePhoto(true)}
        style={[styles.CamaraG]}
      ></TouchableOpacity>

          {/*Nombre del usuario */}
      <Text style={styles.nUsuario}> {userConstant.name}</Text>

      {/*Datos del usuario */}
      <View style={styles.datosC}>

        {/*Nombre del usuario, se puede modificar el nombre */}
        <View style={styles.datos}>
          <StyledText fontSize={"subheading1"} style={styles.label}>
            Nombre completo
          </StyledText>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TextInput
              style={styles.textarea}
              onChangeText={(text) =>
                setCredentials({
                  ...credentials,
                  name: text
                })
              }
            >
              {userConstant.name}
            </TextInput>
            <View style={styles.icon}>
              <Ionicons name="md-pencil" size={24} color="#818281" />
            </View>
          </View>
          <View
            style={{ height: 1.5, backgroundColor: "#D9D9D9", width: "100%" }}
          />
        </View>
        
            {/*Email del usuario, solo se puede ver y no se puede editar */}
        <View style={styles.datos}>
          <StyledText fontSize={"subheading1"} style={styles.label}>
            E-mail
          </StyledText>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.textarea} disabled={true}>
              {userConstant.email}
            </Text>
          </View>
          <View
            style={{ height: 1.5, backgroundColor: "#D9D9D9", width: "100%" }}
          />
        </View>

                {/*Telefono del usuario*/}
        <View style={styles.datos}>
          <StyledText fontSize={"subheading1"} style={styles.label}>
            Número de teléfono
          </StyledText>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TextInput
              style={styles.textarea}
              onChangeText={(text) =>
                setCredentials({
                  ...credentials,
                  phone: text
                })
              }
            >
              {phone}
            </TextInput>
            <View style={styles.icon}>
              <Ionicons name="md-pencil" size={24} color="#818281" />
            </View>
          </View>
          <View
            style={{ height: 1.5, backgroundColor: "#D9D9D9", width: "100%" }}
          />
        </View>
        {/*Contenedor de botones de guardado y cancelar */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            margin: Dimensions.get('window').height * 0.02,
            marginTop: Dimensions.get('window').height * 0.05,

          }}
        >
          {/*Boton de guardar cambios hechos*/}
          <TouchableOpacity
            style={styles.guardarButton}
            onPress={handleEnviar}
          >
            <Text style={styles.buttonText}>Guardar cambios</Text>
          </TouchableOpacity>

          {/*Boton de cancerlar cualquier cambio hecho */}
          <TouchableOpacity style={styles.cancelarButton} onPress={navigation.navigate('inicio')}>
            <Text style={styles.buttonTextBlue}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>


      <View style={styles.centeredView} />

      {/*Modal de confirmación de los datos puestos */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisibleBoton}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalViewM}>
            <Text style={styles.modalTextM}>CONFIRMACIÓN</Text>
            <Text style={styles.modalDescription}>
              ¿Estás seguro que deseas modificar tus datos?
            </Text>
            <View
              style={{
                top: 6,
                height:responsiveHeight(0.2),
                backgroundColor: '#d9d9d9',
                width: responsiveWidth(80),
              }}
            ></View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                margin: responsiveHeight(4),
              }}
            >
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setModalVisibleBoton(false)}
              >
                <Text style={styles.modalButtonText}>SÍ, CONFIRMO</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setModalVisibleBoton(false)}
              >
                <Text style={styles.modalButtonTextO}>CANCELAR</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </ImageBackground>
  );
}

const styles = StyleSheet.create({
// Estilos para diversos componentes y elementos
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalViewM: {
    backgroundColor: "#fff",
    borderRadius: responsiveFontSize(2),
    padding: responsiveWidth(1),
    width:responsiveWidth(80),
    alignItems: 'center',
    elevation: 0,
  },
  modalTextM: {
    fontSize:responsiveFontSize(3.5),
    color: '#03B6E8',
    marginTop: responsiveWidth(1),
    fontWeight: 'bold',
  },
  modalDescription: {
    fontSize: responsiveFontSize(2),
    color: '#58656B',
    marginTop:responsiveHeight(1.5),
    width: responsiveWidth(50),
    textAlign: 'center',
  },
  modalButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: responsiveWidth(40),
    marginTop:responsiveHeight(-2),
    height: responsiveHeight(2),
  },

  modalButtonText: {
    color: '#03B6E8',
    fontSize:responsiveFontSize(1.5),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalButtonTextO: {
    color: '#EB691A',
    fontSize:responsiveFontSize(1.5),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  muro: {
    width: responsiveWidth(100),
    height: responsiveHeight(100),
    opacity: 0.5,
    backgroundColor: 'black',
    position: 'absolute',
  },
  fotoPerfilG: {
    left: width * 0.09,
    top: width * 0.25,
    borderRadius: 200,
    width: Dimensions.get('window').width - 70,
    height: Dimensions.get('window').height - 480,
  },
  buttonG: {
    position: 'absolute',
    width: '100%',
    height: '99%',
    left: 2,
    top: '10%',
    flex: 1,
  },
  CamaraG: {
    position: 'absolute',
    flex: 2,
    backdropFilter: 'blur(100px)',
    borderRadius: 100,
    left: width * 0.27,
    top: width * 0.3,
    width: Dimensions.get('window').width - 245,
    height: Dimensions.get('window').height - 640,
  },
  centeredView: {
    flex: 1,
    left:responsiveWidth(19),
    top: responsiveHeight(33),
    opacity: 1,
    position: 'absolute',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: responsiveFontSize(2),
    width: responsiveWidth(60),
    height: responsiveHeight(20),
    elevation: 4,
  },
  button: {
    padding: 10,
    left: '78%',
    width: '20%',
    bottom: '110%',
    backgroundColor: 'transparent',
    borderRadius: 15,
  },
  textOrange: {
    color: 'orange',
    fontSize: 20,
  },
  text: {
    color: 'grey',
    fontSize: 20,
  },
  modalText: {
    marginTop: 15,
    left: '15%',
  },
  Camara: {
    position: 'absolute',
    flex: 1,
    borderRadius: 100,
    top: screenHeightPercentage - height * 0.3 * 0.6,
    left: screenWidthPercentage - width * 0.80 * -0.18,
    height: height * 0.055,
    width: screenWidthPercentage * 0.25,

  },
  buttonTextBlue: {
    color: '#03B6E8',
    fontWeight: 'bold',
    fontSize: 17,
  },
  guardarButton: {
    backgroundColor: '#03B6E8',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: Dimensions.get('window').height /15,
    bottom: width * -0.06,
    width: Dimensions.get('window').width /2.5,

  },
  cancelarButton: {
    backgroundColor: 'transparent',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    borderWidth: 1.5,
    borderColor: '#03B6E8',
    height: Dimensions.get('window').height /15,
    bottom: width * -0.06,
    width: Dimensions.get('window').width /2.5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 17,

  },
  container: {
    width: 200,
    height: 100,
  },
  nUsuario: {
    
    fontFamily: 'Lato-Bold',
    fontWeight: 'bold',
    fontSize: width * 0.08,
    color: '#03B6E8',
    position: 'absolute',
    top: responsiveHeight(40),
    alignContent: 'center',
    left:responsiveWidth(33.5),
  },

  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  datosC: {
    width: Dimensions.get('window').width - 0,
    height: Dimensions.get('window').height - 100,
    paddingTop: width - 390,
    top: width - 140,
    backgroundColor: '#fff',
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
  },
  datos: {
    alignSelf: 'center',
    width: Dimensions.get('window').width - 80,
    paddingBottom: 20,
  },
  label: {
    color: '#878789',
  },
  textarea: {
    height: 40,
    fontSize: 20,
    color: 'black',
    flex: 0.95,
  },
  lleno: {
    height: 50,
    backgroundColor: '#03B6E8',
  },
  icon: {
    justifyContent: 'center',
  },
  vacio: {
    height: 50,
    color: '#ddd',
  },
  nombreUsuario: {
    flex: 1,
  },
  fotoPerfill: {
    margin: 10,
    borderRadius: responsiveFontSize(4),
    position: 'absolute',
    top: responsiveHeight(12),
    left:responsiveWidth(22.5),
    height:responsiveHeight(25),
    width: responsiveWidth(50),
  },
  fotoPerfilll: {
    borderRadius:responsiveFontSize(4),
    left: screenWidthPercentage - width * 0.80 * 0.375,
    height: height * 0.08,
    width: screenWidthPercentage * 1.0,
  },
});
