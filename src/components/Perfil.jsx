
/*  top: screenHeightPercentage - height * 0.3 * 1.47,
      left: screenWidthPercentage - width * 0.80 * -0.92,
      height:height*0.050,
      width: screenWidthPercentage * 1.13,*/



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
const screenWidthPercentage = widthPercentageToDP("50%");
const screenHeightPercentage = heightPercentageToDP("50%");

export function Perfil({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [credentials, setCredentials] = useState({
    name: "",
    phone: ""
  });
  const [modalVisiblePhoto, setModalVisiblePhoto] = useState(false);
  const [modalVisibleBoton, setModalVisibleBoton] = useState(false);
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const route = useRoute();
  const [avatarUpdated, setAvatarUpdated] = useState(false);
  const { image } = route.params || {};

  const handleUpdateCredentials = (name, phone) => {
    updateUserConstant(name, phone);
  };
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
  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images
    });

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
    <ImageBackground
      source={require("../../assets/images/Fondo-06.jpg")}
      resizeMode="cover"
      style={styles.image}


    >
      <AppBar />
      <View style={styles.fotoPerfilll} source={fotoPerfil ? { uri: fotoPerfil } : require('../../assets/images/FotoPerfil.png')} />

      <Image style={styles.fotoPerfill} source={fotoPerfil ? { uri: fotoPerfil } : require('../../assets/images/FotoPerfil.png')} />

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
      <Image
        source={require("../../assets/images/Camara.png")}
        style={[styles.Camara]}
      />
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={[styles.Camara]}
      ></TouchableOpacity>


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
      <TouchableOpacity
        onPress={() => setModalVisiblePhoto(true)}
        style={[styles.CamaraG]}
      ></TouchableOpacity>

      <Text style={styles.nUsuario}> {userConstant.name}</Text>
      <View style={styles.datosC}>
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
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            margin: Dimensions.get('window').height * 0.02,
            marginTop: Dimensions.get('window').height * 0.05,

          }}
        >
          <TouchableOpacity
            style={styles.guardarButton}
            onPress={handleEnviar}
          >
            <Text style={styles.buttonText}>Guardar cambios</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelarButton} onPress={navigation.navigate('inicio')}>
            <Text style={styles.buttonTextBlue}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.centeredView} />
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
                top: 10,
                height: 1.2,
                backgroundColor: '#d9d9d9',
                width: '108%',
              }}
            ></View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                margin: 40,
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

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalViewM: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    width: Dimensions.get('window').width - 110,
    alignItems: 'center',
    elevation: 0,
  },
  modalTextM: {
    fontSize: Dimensions.get('window').width - 375,
    color: '#03B6E8',
    marginTop: 10,
    fontWeight: 'bold',
  },
  modalDescription: {
    fontSize: 16,
    color: '#58656B',
    marginTop: 5,
    width: '80%',
    textAlign: 'center',
  },
  modalButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.35,
    marginTop: width * 0.035,
    height: height * 0.025,
  },

  modalButtonText: {
    color: '#03B6E8',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalButtonTextO: {
    color: '#EB691A',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  muro: {
    width: '100%',
    height: '100%',
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
    left: width * 0.22,
    top: width * (0.72),
    opacity: 1,

    position: 'absolute',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: Dimensions.get('window').width - 170,
    height: Dimensions.get('window').height - 610,
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
    top: width - 70,
    alignContent: 'center',
    left:Dimensions.get('window').width /2.8,
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
    borderRadius: width * 0.3,
    position: 'absolute',
    top: screenHeightPercentage - height * 0.3 * 1.25,
    left: screenWidthPercentage - width * 0.80 * 0.375,
    height: height * 0.27,
    width: screenWidthPercentage * 1.09,
  },
  fotoPerfilll: {
    borderRadius: width * 0.3,
    left: screenWidthPercentage - width * 0.80 * 0.375,
    height: height * 0.08,
    width: screenWidthPercentage * 1.0,
  },
});
