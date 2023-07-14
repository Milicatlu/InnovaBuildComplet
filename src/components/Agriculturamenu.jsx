import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { AppBar } from "./AppBar";
import { StyledButtonAgri } from "./StyledButton";
import { StyledButton } from "./StyledButton";
import { StyledText } from "./StyledText";
import { MaterialIcons } from "@expo/vector-icons";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";

export function Agriculturamenu(props) {
  const [siloBolsas, setSiloBolsas] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleAddSiloBolsa = () => {
    setSiloBolsas([...siloBolsas, siloBolsas.length + 1]);
  };

  const renderSiloBolsa = () => {
    const grupos = [];
    const totalSiloBolsas = siloBolsas.length;
    for (let i = 0; i < totalSiloBolsas; i += 2) {
      const grupo = siloBolsas.slice(i, i + 2);
      grupos.push(grupo);
    }

    return grupos.map((grupo, index) => (
      <View key={index} style={styles.SiloContainer}>
        {grupo.map((siloBolsa) => (
          <StyledButtonAgri
            style={{ color: "#FFF", fontWeight:"bold", fontSize:responsiveFontSize(2) }}
            key={siloBolsa}
            styleContainer={styles.vacio}
            onPress={() => {
              props.navigation.navigate("SiloMenu");
            }}
            onLongPress={() => {
              setShowModal(true);
            }}
            delayLongPress={1000}
          >
            Silo bolsa {siloBolsa}
          </StyledButtonAgri>
        ))}
      </View>
    ));
  };

  return (
    <>
      <View style={styles.container} {...props}>
        <ImageBackground
          source={require("../../assets/images/Fondo-06.jpg")}
          style={styles.imagen}
        >
          <AppBar />
          <View style={styles.subcontainer}>
            <Text style={styles.petroleoText}>AGRICULTURA</Text>
            <StyledText align="center" fontSize="subheading1" fontWeight="bold" style={{fontSize:responsiveFontSize(3), top:responsiveHeight(2)}}>
              Silo bolsas
            </StyledText>

            <View style={{ marginTop: responsiveHeight(8) }}>
              <ScrollView style={{ maxHeight: responsiveHeight(50) }}>
                {renderSiloBolsa()}
              </ScrollView>
              <View style={styles.Nada}>
                <Text style={styles.NadaTexto} onPress={handleAddSiloBolsa}>
             
                + NUEVO SILO BOLSA
                </Text>
              </View>
              <View
                style={{
                  top: responsiveHeight(66),
                  left: responsiveWidth(21),
                  position: "absolute",
                }}
              >
                <MaterialIcons
                  name="create"
                  size={responsiveFontSize(1.8)}
                  style={styles.icono}
                >
                  <StyledText style={styles.texto}>
                    Editar nombre de silo bolsa
                  </StyledText>
                </MaterialIcons>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalViewM}>
            <Text style={styles.modalTextM}>ADVERTENCIA</Text>
            <Text style={styles.modalDescription}>¿Estás seguro que</Text>
            <Text style={styles.modalDescription}>deseas eliminarlo?</Text>
            <View
              style={{
                top: 10,
                height: 1.2,
                backgroundColor: "#d9d9d9",
                width: "108%",
              }}
            ></View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                margin: 10,
              }}
            >
              <View style={styles.modalButton1}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => alert("Agregar Funcion Eliminar")}
              >
                <Text style={styles.modalButtonText1}>ELIMINAR</Text>
              </TouchableOpacity>
              </View>
              <View style={styles.modalButton2}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setShowModal(false)}
              >
                <Text style={styles.modalButtonText2}>CANCELAR</Text>
              </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imagen: {
    flex: 1,
    flexDirection: "column",
    paddingTop: responsiveHeight(0.9),
  },
  subcontainer: {
    flex: 0.8,
    padding: responsiveHeight(1.8),
  },
  SiloContainer: {
    flexDirection: "row",
    left:responsiveHeight(5),
  },
  vacio: {
    fontWeight:"bold",
    width: responsiveWidth(30),
    height: responsiveHeight(5.6),
    marginBottom: responsiveHeight(2),
    marginTop: responsiveHeight(1),
    marginHorizontal: responsiveWidth(3),
    paddingHorizontal:responsiveWidth(5),
  },
  lleno: {
    height: responsiveHeight(6.5),
    backgroundColor: "#03B6E8",
    width: "100%",
    marginTop: responsiveHeight(0.6),
  },
  texto: {
    textAlign: "center",
    marginTop: responsiveHeight(2),
    fontSize: responsiveFontSize(1.8),
    color: "#03B6E8",
  },
  icono: {
    marginRight: responsiveWidth(0.5),
    color: "#03B6E8",
    marginTop: responsiveHeight(1.5),
    textAlign: "center",
  },
  petroleoText: {
    textAlign: "center",
    fontSize: responsiveFontSize(5.3),
    fontWeight: "bold",
    color: "#03B6E8",
    marginBottom: responsiveHeight(1),
  },
  Nada: {
    position: "absolute",
    backgroundColor: "#03B6E8",
    borderRadius: 10,
    width: responsiveWidth(68.27),
    height: responsiveHeight(5.42),
    left: responsiveWidth(12),
    top: responsiveHeight(60),
  },
  NadaTexto: {
    fontSize: responsiveHeight(2.2),
    color: "#fff",
    textAlign: "center",
    fontWeight:"bold",
    top: responsiveHeight(1),
    right: responsiveWidth(1),
  },
  modalContainer: {
    backgroundColor: "#FFFFFF",
    height: responsiveHeight(17.24),
    width: responsiveWidth(72),
    justifyContent: "center",
    alignItems: "center",
    left: responsiveWidth(14),
    top: responsiveHeight(30),
    borderRadius: 15,
  },
  modalTextM: {
    color: "#EB691A",
    fontSize: responsiveFontSize(2.5),
    bottom: responsiveHeight(1),
    fontWeight: "bold"
  },
  modalViewM: {
    alignItems: "center",
  },
  modalDescription:{
    color:"#58656B",
    fontSize: responsiveFontSize(1.9),
  },
  modalButtonText1:{
    color: "#EB691A",
    fontSize: responsiveFontSize(2.),
    top: responsiveHeight(1),
    right: responsiveWidth(5)
  },
  modalButtonText2:{
    color: "#878789",
    fontSize: responsiveFontSize(2),
    top: responsiveHeight(1),
    left:responsiveWidth(5)
  },
});
