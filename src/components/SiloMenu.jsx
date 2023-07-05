//RESPONSIVE
import {
    ImageBackground,
    Pressable,
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    Image,
  } from "react-native";
  import { jwt } from "../helpers/Config";
  import { StyledButton2, StyledButton } from "./StyledButton";
  import { StyledText } from "./StyledText";
  import { AppBar } from "./AppBar";
  import { DropdownDrag } from "./DropdownDrag";
  // import AsyncStorage from "@react-native-async-storage/async-storage"
  import { useState, useEffect } from "react";
  import { GraficoAgricultura } from "./Grafico";
  import { InfluxDBHelper } from "../helpers/InfluxDB";
  import { color, set } from "react-native-reanimated";
  import { ActivityIndicator } from "react-native-paper";
  import { VerMas } from "./VerMas";
  import { Visual } from "./Visual";
  import { Grafico2 } from "./GraficoPrueba";
  const { width, height } = Dimensions.get("window");
  import { Dimensions } from "react-native";
  import { ButtonsNav } from "./VerMas/ButtonsNav";
  export function SiloMenu(props) {
    const [isOpen, setIsOpen] = useState(false)
    const [temperatura, setTemperatura] = useState(25)
    const [humedad, setHumedad] = useState(11)
    const [CO2, setCO2] = useState(24)
    const [temperaturaArray, setTemperaturaArray] = useState(null)
    const [humedadArray, setHumedadArray] = useState(null)
    const [CO2Array, setCO2Array] = useState(null)
    const [temperaturaColor, setTemperaturaColor] = useState("")
    const [CO2Color, setCO2Color] = useState("")
    const [humedadColor, setHumedadColor] = useState("")
    const opacityDropdown = 1
    const [reRenders, setReRenders] = useState(0)
    const [screenName, setScreenName] = useState("inicio")
    const [range, setRange] = useState("-30d")
  
    useEffect(() => {
        InfluxDBHelper.getLastPoint({
            tags: {
                Sector: "AGRICULTURE",
                nodeID: "3",
            },
            timeStamp: '-30d',
            field: "CO2",
        }).then((value) => {
            if (CO2 >= 1 && CO2 <= 17) setCO2Color("#1DB6E5")
            else if (CO2 == 18 ) setCO2Color("#CCA500")
            else if (CO2 >= 19 ) setCO2Color("#EB691A")
                if (!value.error.state)
                setCO2(value.value)
        })
        
        InfluxDBHelper.getLastPoint({
            tags: {
                Sector: "AGRICULTURE",
                nodeID: "1",
            },
            timeStamp: '-30d',
            field: "TEMPERATURE",
            jwt: jwt,
        }).then((value) => {
            if (temperatura >= 0 && temperatura <= 24) setTemperaturaColor("#1DB6E5")
            else if (temperatura > 5 && temperatura < 10)
                setTemperaturaColor("red")
            else if (temperatura == 25)
                setTemperaturaColor("#CCA500")
            else if (temperatura > 25) setTemperaturaColor("#EB691A")
  
            if (!value.error.state)
                setTemperatura(value.value)
        })
        InfluxDBHelper.getLastPoint({
            tags: {
                Sector: "AGRICULTURE",
                nodeID: "5",
            },
            timeStamp: '-30d',
            field: "HUMIDITY",
            jwt: jwt,
        }).then((value) => {
            if (humedad >= 18 && humedad <= 19) setHumedadColor("#CCA500")
            else if (humedad >=20 )
                setHumedadColor("#EB691A")
            else if (humedad <= 17) setHumedadColor("#1DB6E5")
            if (!value.error.state)
                setHumedad(value.value)
        })
    }, [reRenders, humedad, temperatura, CO2])
  
    useEffect(() => {
        InfluxDBHelper.getPoints({
            tags: {
                Sector: "AGRICULTURE",
                nodeID: "1",
            },
            timeStamp: range,
            field: "CO2",
            jwt: jwt,
        }).then((value) => !value.error.state ? setCO2Array(value.values) : {})
        InfluxDBHelper.getPoints({
            tags: {
                Sector: "AGRICULTURE",
                nodeID: "1",
            },
            timeStamp: range,
            field: "TEMPERATURE",
            jwt: jwt,
        }).then((value) => !value.error.state ? setTemperaturaArray(value.values) : {})
        InfluxDBHelper.getPoints({
            tags: {
                Sector: "AGRICULTURE",
                nodeID: "1",
            },
            timeStamp: range,
            field: "HUMIDITY",
            jwt: jwt,
        }).then((value) => !value.error.state ? setHumedadArray(value.values) : {})
    }, [range])
  
    setTimeout(() => {
        setReRenders(reRenders + 1)
    }, 1000)
    const determinateSnapPoints = () => {
        if (screenName === "ubicacion") return ["90%"]
        if (screenName === "grafico") return ["65%"]
        else return ["40%"]
    }
    return (
        <>
  
            <View style={styles.container}{...props}>
                <ImageBackground
                    source={require("../../assets/images/Fondo-06.jpg")}
                    style={styles.imagen}
                >
                    <AppBar />
                    <View style={styles.subcontainer}>
                        <Text style={styles.titulo}>AGRICULTURA</Text>
                        <StyledText
                            align="center"
                            fontSize="subheading1"
                            fontWeight="bold"
                            color="primary"
                            style={{ paddingBottom: 40, fontSize: 22 }}
                        >
                            Informacion de la Silo bolsa 
                        </StyledText>
                        <View style={styles.infobolsaC}>
                            <View style={styles.infobolsa}>
                                {temperatura ? (
                                    <>
                                        <View style={styles.valor}>
                                            <Text
                                                style={[
                                                    styles.valorN,
                                                    { color: temperaturaColor },
                                                ]}
                                            >
                                                {Math.round(temperatura)}°
                                            </Text>
                                        </View>
                                        <View
                                            style={[
                                                styles.color,
                                                {
                                                  backgroundColor:
                                                  temperaturaColor,
                                                },
                                            ]}
                                        ></View>
                                    </>
                                ) : (<></>)}
  
                            </View>
                            <View style={styles.infobolsa}>
                                {CO2 ? (
                                    <>
                                        <View style={styles.valor}>
                                            <Text
                                                style={[
                                                    styles.valorN,
                                                    { color: CO2Color },
                                                ]}
                                            >
                                                {Math.round(CO2)}%
                                            </Text>
                                        </View>
                                        <View
                                            style={[
                                                styles.color,
                                                { backgroundColor: CO2Color },
                                            ]}
                                        ></View>
                                    </>
                                ) : (<></>)}
                            </View>
                            <View style={styles.infobolsa}>
                                {humedad ? (
                                    <>
                                        <View style={styles.valor}>
                                            <Text
                                                style={[
                                                    styles.valorN,
                                                    { color: humedadColor },
                                                ]}
                                            >
                                                {Math.round(humedad)}%
                                            </Text>
                                        </View>
                                        <View
                                            style={[
                                                styles.color,
                                                { backgroundColor: humedadColor },
                                            ]}
                                        ></View>
                                    </>
                                ) : (<></>)}
                            </View>
                        </View>
                        <View style={{ flexDirection:"row" }}>
                            <StyledText
                                fontWeight="bold"
                                style={styles.magnitud}
                                color="primary"
  
                            >
                                Temperatura
                            </StyledText>
                            <StyledText
                                fontWeight="bold"
                                style={styles.magnitud}
                                color="primary"
                            >
                                CO2
                            </StyledText>
                            <StyledText
                                fontWeight="bold"
                                style={styles.magnitud}
                                color="primary"
                            >
                                Humedad
                            </StyledText>
                        </View>
                        <View style={styles.imagencontainer}>
                            <ImageBackground
                                source={require("../../assets/images/palabra-02.png")}
                                style={{ height: "125%" }}
                            />   
                            
                        </View>
                        {CO2Array && temperaturaArray && humedadArray && (
                            <TouchableOpacity
                                onPress={() => {
                                    setIsOpen(true)
                                }}
                                style={styles.nuevaBolsa}
                            >
                                <StyledText>Ver mas</StyledText>
                            </TouchableOpacity>
                        )}
                    </View>
  
                </ImageBackground>
                <View style={styles.contenedor}>
                    <StyledText fontWeight="bold" fontSize="subheading1" style={{ marginTop: 30, marginLeft:25 , color:"#1DB6E5"} }   >Rango de datos</StyledText>
                    <View style={{justifyContent:"center",alignItems:"center"}}>
                    <StyledText fontStyle="italic" color="terciary" style={{ marginTop: 20, marginLeft:-10, width:296,height:75,fontSize:16,textAlign:"justify" }} >
                        Los siguientes datos son los niveles normales que debe tener la
                        silo bolsa en cuanto a su temperatura, dióxido de carbono y
                        humedad.
                    </StyledText>
                    </View>
                    <View style={{ flexDirection: "row" , marginTop:20}}>
                            <StyledText
                                fontWeight="bold"
                                style={styles.magnitudcont}
                            >
                                0° a 25°
                                
                                <StyledText style={styles.magnitudcont.magnitudcont2} >           TEMPERATURA</StyledText>
                            </StyledText>
                            <StyledText
                                fontWeight="bold"
                                style={styles.magnitudcont}
                                
                            >
                                1% a 18%
                                
                                <StyledText style={styles.magnitudcont.magnitudcont2}>            CO2  </StyledText>
                            </StyledText>
                            <StyledText
                                fontWeight="bold"
                                style={styles.magnitudcont}
                            >
                                8% a 18%     
                            
                            <StyledText 
                            style={styles.magnitudcont.magnitudcont2} > HUMEDAD </StyledText>
                            </StyledText>
                            
                        </View>
                        <View style={{ flexDirection: "row", marginTop: 15 ,padding: 5}} {...props}>
                        <StyledButton
                            onPress={() => {props.navigation.navigate("Grafico2");}}
                            styleContainer={styles.lleno}
                            style={{ fontSize: 20 }}
                        >
                        Grafico
                        </StyledButton>
                        <StyledButton2
                        onPress={() => {props.navigation.navigate("GraficoView");}}
                        styleContainer={{ flex: 1, margin: 10, padding: 5 }}
                        style={{ fontSize: 20 ,color:"#1DB6E5"}}
                        >
                        Ubicacion
                        </StyledButton2>
                    </View>
  
                </View>
                
            </View>
        </>
    )
  }
  
  const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imagen: {
        flex: 1,
        flexDirection: "column",
        paddingTop: 10,
    },
    subcontainer: {
        flex: 0.9,
        padding: 12,
        paddingTop: 20,
        flexDirection: "column",
    },
    SiloContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    nuevaBolsa: {
        width: "100%",
        height: 30,
        backgroundColor: "#03B6E8",
        color: "#fff",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        fontSize: 18,
    },
    infobolsaC: {
        flex: 10,
        flexDirection: "row",
        maxHeight: "17%",
        padding: 2,
        backgroundColor: "#fff",
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        marginTop: 10,
        marginBottom: 10,
        maxWidth:"100%",
    },
    infobolsa: {
        flex: 1,
        alignItems: "center",
        marginTop:6
        
    },
    valor: {
        flex: 0.9,
        justifyContent: "center",
        alignItems: "center",
    },
    color: {
        width: "100%",
        flex: 0.1,
        backgroundColor: "red",
    },
    valorN: {
        fontSize: 35,
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
        fontSize: 40,
        fontWeight: "bold",
        color: "#03B6E8",
    
    },
    editarnombre: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10,
    },
    textedit: {
        flex: 0.87,
        color: "#04B6E8",
        fontSize: 18,
        fontFamily: "Roboto",
        justifyContent: "center",
        alignItems: "center",
    },
    icons: {
        color: "#04B6E8",
        margin: 10,
        fontSize: 32,
    },
    imagen2: {
        flex: 1,
        flexDirection: "column",
        padding: 20,
        paddingTop: 10,
    },
    btn: {
        backgroundColor: "#04B6E8",
        color: "#fff",
        borderRadius: 15,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    magnitud: {
        flex: 5,
        fontSize: 14,
        textAlign: "center",
        marginTop:10
    },
    
    magnitudcont: {
        flex: 3,
        fontSize: 18,
        textAlign: "center",
        maxWidth: 200,
        marginTop:10,
        color:"#1DB6E5",
        magnitudcont2: {
            color:"#878789",
    
        },
        
    },
    imagencontainer: {
        flex: 0.1,
        maxHeight: "10%",
    },
    contenedor:{
        flexDirection:"column",
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        backgroundColor: "white",
        marginTop: -100
        
    },
  
    lleno:{
        backgroundColor:"rgb(3,182,232)",
    },
  })