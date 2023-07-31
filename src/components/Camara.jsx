import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { MaterialIcons } from '@expo/vector-icons';
import Button from './Button';
import { useNavigation } from '@react-navigation/native';

/**
 * Componente para acceder y utilizar la cámara del dispositivo.
 * Permite tomar fotos y guardarlas en la galería.
 */
export default function Camara() {
  // Estado para almacenar el permiso de acceso a la cámara
  const [hasCameraPermission, setHasCameraPermission] = useState(null);

  // Estado para almacenar la imagen capturada por la cámara
  const [image, setImage] = useState(null);

  // Referencia al componente Camera para acceder a sus métodos
  const cameraRef = useRef(null);

  // Estado para controlar el tipo de cámara (frontal o trasera)
  const [type, setType] = useState(Camera.Constants.Type.back);

  // Estado para controlar el flash de la cámara
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);

  // Estado para almacenar la foto capturada por la cámara
  const [capturedPhoto, setCapturedPhoto] = useState(null);

  // Objeto de navegación para redirigir a otra pantalla
  const navigation = useNavigation();

  /**
   * Efecto para solicitar permisos de acceso a la cámara y a la galería.
   */
  useEffect(() => {
    (async () => {
      // Solicitar permiso para acceder a la galería
      MediaLibrary.requestPermissionsAsync();

      // Solicitar permiso para acceder a la cámara
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
    })();
  }, []);

  /**
   * Función para tomar una foto usando la cámara.
   */
  const takePicture = async () => {
    if (cameraRef) {
      try {
        // Capturar la foto y obtener los datos
        const data = await cameraRef.current.takePictureAsync();
        console.log(data);
        // Establecer la imagen capturada en el estado
        setImage(data.uri);
      } catch (error) {
        console.log(error);
      }
    }
  };

  /**
   * Función para guardar la foto capturada en la galería.
   */
  const savePicture = async () => {
    if (image) {
      try {
        // Crear un recurso en la galería con la imagen capturada
        const asset = await MediaLibrary.createAssetAsync(image);
        // Mostrar una alerta indicando que la foto se ha guardado
        alert('Picture saved! 🎉');
        // Limpiar la imagen capturada del estado
        setImage(null);
        console.log('saved successfully');
        // Redirigir a la pantalla de Perfil con la imagen guardada como parámetro
        navigation.navigate('Perfil', { image: asset.uri });
      } catch (error) {
        console.log(error);
      }
    }
  };

  // Si no se ha otorgado el permiso de acceso a la cámara, mostrar un mensaje
  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {/* Renderizar el componente Camera o la imagen capturada */}
      {!image ? (
        <Camera
          style={styles.camera}
          type={type}
          ref={cameraRef}
          flashMode={flash}
        >
          {/* Controles para cambiar el tipo de cámara y el flash */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 30,
            }}
          >
            {/* Botón para cambiar el tipo de cámara */}
            <Button
              title=""
              icon="retweet"
              onPress={() => {
                setType(
                  type === CameraType.back ? CameraType.front : CameraType.back
                );
              }}
            />
            {/* Botón para activar o desactivar el flash */}
            <Button
              onPress={() =>
                setFlash(
                  flash === Camera.Constants.FlashMode.off
                    ? Camera.Constants.FlashMode.on
                    : Camera.Constants.FlashMode.off
                )
              }
              icon="flash"
              color={flash === Camera.Constants.FlashMode.off ? 'gray' : '#fff'}
            />
          </View>
        </Camera>
      ) : (
        <Image source={{ uri: image }} style={styles.camera} />
      )}

      {/* Controles para tomar y guardar la foto */}
      <View style={styles.controls}>
        {image ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 50,
            }}
          >
            {/* Botón para tomar una nueva foto */}
            <Button
              title="Re-take"
              onPress={() => setImage(null)}
              icon="retweet"
            />
            {/* Botón para guardar la foto en la galería */}
            <Button title="Save" onPress={savePicture} icon="check" />
          </View>
        ) : (
          <Button title="Take a picture" onPress={takePicture} icon="camera" />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Estilos para el contenedor principal del componente
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#000',
    padding: 8,
  },
  // Estilos para los controles del componente
  controls: {
    flex: 0.5,
  },
  // Estilos para el botón
  button: {
    height: 40,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Estilos para el texto del botón
  text: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#E9730F',
    marginLeft: 10,
  },
  // Estilos para el componente Camera
  camera: {
    flex: 5,
    borderRadius: 20,
  },
  // Estilos para los controles superiores (cámara y flash)
  topControls: {
    flex: 1,
  },
});
