//RESPONSIVE
import {
    ImageBackground,
    Pressable,
    StyleSheet,
    View,
    TextInput,
    DrawerItem,
    DrawerItemicon,
    Text,
    Dimensions
  } from "react-native";
  import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
  import { StyledButton } from "./StyledButton";
  import { FontAwesome } from "@expo/vector-icons";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import { StyledText } from "./StyledText";
  import { AppBar } from "./AppBar";
  import { faEdit } from "@fortawesome/free-regular-svg-icons";
  import { DropdownDrag } from "./DropdownDrag";
  import { jwt } from "../helpers/Config";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import { GraficoAgricultura } from "./Grafico";
  import { useState, useEffect } from "react";
  import { InfluxDBHelper } from "../helpers/InfluxDB";
  import { StyledButtonAgri } from "./StyledButton";
  import { GraficoView } from "./VerMas/GraficoView";
  import { SiloMenu } from "./SiloMenu";
  import { Ionicons } from "@expo/vector-icons";
  import { DrawerContentScrollView } from "@react-navigation/drawer";
  import { MaterialIcons } from "@expo/vector-icons";
  import { Drawer } from "react-native-paper";
  import * as Font from 'expo-font';
  
  
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
              <StyledText
                align="center"
                fontSize="subheading2"
                fontWeight="bold"
                color="secondary"
              >
                Petroleo
              </StyledText>
              <StyledText align="center" fontSize="subheading1" fontWeight="bold">
                Etapa de: Upstream
              </StyledText>
  
              <View style={{ marginTop: 10 }}>
                <ScrollView>{renderSiloBolsa()}</ScrollView>
                <TouchableOpacity
                  style={styles.icono}
                  onPress={handleAddSiloBolsa}
                >
                  <StyledButton
                    styleContainer={styles.lleno}
                    styledProps={{ fontSize: "subheading1" }}
                  >
                    <MaterialIcons name="add" size={22} color={"white"} /> NUEVO
                    PETROLEO
                  </StyledButton>
                  <View style={{ marginTop: 10 }}>
                    <MaterialIcons name="create" size={18} style={styles.icono}>
                      <StyledText style={styles.texto}>
                        {" "}
                        Editar nombre del petroleo
                      </StyledText>
                    </MaterialIcons>
                  </View>
                </TouchableOpacity>
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
      paddingTop: 10
    },
    subcontainer: {
      flex: 0.8,
      padding: 20
    },
    SiloContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between"
    },
  
    nuevaBolsa: {
      width: "100%",
      height: 30,
      backgroundColor: "#03B6E8",
      color: "#fff",
      borderRadius: 15,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 10,
      fontSize: 18
    },
    infobolsaC: {
      flex: 0.8,
      flexDirection: "row",
      maxHeight: "20%",
      backgroundColor: "#fff",
      borderTopLeftRadius: 40,
      borderTopRightRadius: 40,
      marginTop: 10
    },
    infobolsa: {
      flex: 1,
      justifyContent: "space-between",
      alignItems: "center"
    },
    valor: {
      flex: 0.9,
      justifyContent: "center",
      alignItems: "center"
    },
    color: {
      width: "100%",
      flex: 0.1,
      backgroundColor: "red"
    },
    valorN: {
      fontSize: 40
    },
    magnitud: {
      backgroundColor: "blue",
      height: 100
    },
    text: {
      color: "#03B6E8",
      fontSize: 28,
      marginBottom: 20,
      marginTop: 10,
      alignSelf: "center",
      fontFamily: "Lato-Bold",
    },
    titulo: {
      alignSelf: "center",
      fontSize: 50
    },
    editarnombre: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "center",
      marginTop: 10
    },
    textedit: {
      flex: 0.87,
      color: "#04B6E8",
      fontSize: 18,
      fontFamily: "Roboto",
      justifyContent: "center",
      alignItems: "center"
    },
    icons: {
      color: "#03B6E8",
      margin: 10,
      fontSize: 32
    },
    imagen2: {
      flex: 1,
      flexDirection: "column",
      padding: 20,
      paddingTop: 10
    },
    btn: {
      backgroundColor: "#04B6E8",
      color: "#fff",
      borderRadius: 15,
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    contenedor: {
      alignItems: "flex-start",
      flexDirection: "row",
      justifyContent: "space-around"
    },
    vacio: {
      marginBottom: 20,
      marginTop: 10,
      margin: 20,
      width: Dimensions.get("window").width / 3
    },
    lleno: {
      height: 50,
      backgroundColor: "#03B6E8",
      width: "100%",
      marginTop: 6
    },
    texto: {
      textAlign: "center",
      marginTop: 20,
      fontSize: 18,
      color:"#03B6E8"
    },
    icons: {
      flex: 0.1,
      color: "#04B6E8",
      height: "100%",
      fontSize: 40
    },
    subsubcont: {
      flexDirection: "row",
      justifyContent: "space-between",
      margin: 10,
      height: 50
    },
    icono: {
      marginRight: 1,
      color: "#03B6E8",
      marginTop: -15,
      textAlign: "center"
    }
  });