import React, { useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import { AppBar } from './AppBar';
import { StyledButtonAgri } from './StyledButton';
import { StyledButton } from './StyledButton';
import { StyledText } from './StyledText';
import { MaterialIcons } from '@expo/vector-icons';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

export function PetroleoMenu(props) {
  const [siloBolsas, setSiloBolsas] = useState([]);

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
            style={{ color: "#FFF" }}
            key={siloBolsa}
            styleContainer={styles.vacio}
            onPress={() => {
              props.navigation.navigate("EtapaPetroleo");
            }}
          >
            Petroleo {siloBolsa}
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
          <Text style={styles.petroleoText}>Petróleo</Text>
            <StyledText align="center" fontSize="subheading1" fontWeight="bold">
              Etapa de: Upstream
            </StyledText>

            <View style={{ marginTop: responsiveHeight(1) }}>
              <ScrollView>{renderSiloBolsa()}</ScrollView>
              <StyledButton
                styleContainer={styles.lleno}
                styledProps={{ fontSize: "subheading1" }}
                onPress={handleAddSiloBolsa}
              >
                <MaterialIcons name="add" size={responsiveFontSize(2.2)} color={"white"} /> NUEVO PETRÓLEO
              </StyledButton>
              <View style={{ marginTop: responsiveHeight(1) }}>
                <MaterialIcons name="create" size={responsiveFontSize(1.8)} style={styles.icono}>
                  <StyledText style={styles.texto}>
                    Editar nombre del petroleo
                  </StyledText>
                </MaterialIcons>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  imagen: {
    flex: 1,
    flexDirection: "column",
    paddingTop: responsiveHeight(0.9)
  },
  subcontainer: {
    flex: 0.8,
    padding: responsiveHeight(1.8)
  },
  SiloContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between"
  },
  color: {
    width: "100%",
    flex: 0.1,
    backgroundColor: "red"
  },
  vacio: {
    marginBottom: responsiveHeight(2),
    marginTop: responsiveHeight(1),
    margin: responsiveHeight(2),
    width: responsiveWidth(32)
  },
  lleno: {
    height: responsiveHeight(6.5),
    backgroundColor: "#03B6E8",
    width: "100%",
    marginTop: responsiveHeight(0.6)
  },
  texto: {
    textAlign: "center",
    marginTop: responsiveHeight(2),
    fontSize: responsiveFontSize(1.8),
    color: "#03B6E8"
  },
  icono: {
    marginRight: responsiveWidth(0.5),
    color: "#03B6E8",
    marginTop: -responsiveHeight(1.5),
    textAlign: "center"
  },
  petroleoText: {
    textAlign: "center",
    fontSize: responsiveFontSize(5.3),
    fontWeight: "bold",
    color: "#03B6E8",
    marginBottom: responsiveHeight(1),
  }
  
});
