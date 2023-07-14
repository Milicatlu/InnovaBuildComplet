import {
    ImageBackground,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from "react-native";
import { jwt } from "../helpers/Config";
import { StyledText } from "./StyledText";
import { AppBar } from "./AppBar";
import { LineChart } from "react-native-chart-kit";
// import AsyncStorage from "@react-native-async-storage/async-storage"
import { useState, useEffect } from "react";
import { ScrollView } from 'react-native';
import { StyledButton, StyledButton2 } from "./StyledButton";
import { Modal } from "react-native";
import { InfluxDBHelper } from "../helpers/InfluxDB";
const { width, height } = Dimensions.get("window");
import { Dimensions } from "react-native";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
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
    const meses = ["1h.", "2h.", "3h.", "4h.", "5h.", "6h.", "7h.", "8h."];
    const [parametro1, setParametro1] = useState(meses)
    const [showDropdown, setShowDropdown] = useState(false);


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
            else if (CO2 == 18) setCO2Color("#CCA500")
            else if (CO2 >= 19) setCO2Color("#EB691A")
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
            else if (humedad >= 20)
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
                            color="primary"
                            style={{ paddingBottom: responsiveHeight(8), fontSize: responsiveFontSize(2.7) }}
                        >
                            Silo bolsa 1 de soja
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
                        <View style={{ flexDirection: "row" }}>
                            <StyledText
                                style={styles.magnitud}
                                color="primary"

                            >
                                Temperatura
                            </StyledText>
                            <StyledText
                                style={styles.magnitud}
                                color="primary"
                            >
                                CO2
                            </StyledText>
                            <StyledText
                                style={styles.magnitud}
                                color="primary"
                            >
                                Humedad
                            </StyledText>
                        </View>
                        <View style={styles.imagencontainer}>
                            <ImageBackground
                                source={require("../../assets/images/Termometros.png")}
                                style={{ height: responsiveHeight(4), width:responsiveWidth(85),left:responsiveWidth(8) }}
                            />
                        </View>
                    </View>

                    <View style={{ backgroundColor: "white", width: responsiveWidth(80), height: responsiveHeight(25), left: responsiveWidth(9), top: responsiveHeight(5) }}>
                        <ScrollView horizontal contentContainerStyle={styles.scrollView}>
                            <View style={styles.item}>
                                <StyledText style={{ textAlign: "center", color: "#CCA500" }}>Temperatura</StyledText>
                                <LineChart data={{
                                    labels: parametro1,
                                    datasets: [
                                        { data: [25, 17, 20, 11, 19, 29, 7, 10, 9] }
                                    ]
                                }}
                                    width={315}
                                    height={170}
                                    yAxisSuffix='°'
                                    yAxisInterval={1}
                                    chartConfig={{
                                        backgroundColor: "#FFF",
                                        backgroundGradientFrom: "#FFF",
                                        backgroundGradientTo: "#FFF",
                                        decimalPlaces: 2,
                                        color: (opacity = 0) => `#CCA500`,
                                        labelColor: (opacity = 0) => `rgba(0,0,0, ${opacity})`,
                                        style: {
                                            borderRadius: 16
                                        },
                                        propsForDots: {
                                            r: "4",
                                            strokeWidth: "1",
                                            stroke: "#CCA500"
                                        },
                                    }}
                                    bezier
                                    style={{
                                        marginVertical: 8,

                                    }}
                                />
                            </View>

                            <View style={styles.item}>
                                <StyledText style={{ textAlign: "center", color: "#EB691A" }}>CO2</StyledText>
                                <LineChart data={{
                                    labels: parametro1,
                                    datasets: [
                                        { data: [24, 28, 10, 15, 22, 10, 11, 8, 6] }
                                    ]
                                }}
                                    width={315}
                                    height={170}
                                    yAxisSuffix='%'
                                    yAxisInterval={1}
                                    chartConfig={{
                                        backgroundColor: "#FFF",
                                        backgroundGradientFrom: "#FFF",
                                        backgroundGradientTo: "#FFF",
                                        decimalPlaces: 2,
                                        color: (opacity = 0) => `#EB691A`,
                                        labelColor: (opacity = 0) => `rgba(0,0,0, ${opacity})`,
                                        style: {
                                            borderRadius: 16
                                        },
                                        propsForDots: {
                                            r: "4",
                                            strokeWidth: "1",
                                            stroke: "#EB691A"
                                        },
                                    }}
                                    bezier
                                    style={{
                                        marginVertical: 8,

                                    }}

                                />
                            </View>
                            <View style={styles.item}>
                                <StyledText style={{ textAlign: "center", color: "#1DB6E5" }}>Humedad</StyledText>
                                <LineChart data={{
                                    labels: parametro1,
                                    datasets: [
                                        { data: [12, 18, 21, 26, 11, 8, 15, 16, 22] }
                                    ]
                                }}
                                    width={315}
                                    height={170}
                                    yAxisSuffix='%'
                                    yAxisInterval={1}
                                    chartConfig={{
                                        backgroundColor: "#FFF",
                                        backgroundGradientFrom: "#FFF",
                                        backgroundGradientTo: "#FFF",
                                        decimalPlaces: 2,
                                        color: (opacity = 0) => `#1DB6E5`,
                                        labelColor: (opacity = 0) => `rgba(0,0,0, ${opacity})`,
                                        style: {
                                            borderRadius: 16
                                        },
                                        propsForDots: {
                                            r: "4",
                                            strokeWidth: "1",
                                            stroke: "#1DB6E5"
                                        },
                                    }}
                                    bezier
                                    style={{
                                        marginVertical: 8,

                                    }} />
                            </View>
                        </ScrollView>
                    </View>
                    {showDropdown && (
                        <Modal
                            visible={showDropdown}
                            animationType="slide"
                            transparent={true}
                            onRequestClose={() => setShowDropdown(false)}
                        >
                            <View style={styles.dropdown}>
                                <View>
                                    <TouchableOpacity
                                        style={styles.dropdownbuton}
                                        onPress={() => {
                                            setShowDropdown(false);
                                        }}
                                    />
                                </View>
                                <StyledText fontWeight="bold" fontSize="subheading1" style={{ marginTop: responsiveHeight(5), marginLeft: responsiveWidth(12), color: "#1DB6E5" }}>
                                    Rango de datos
                                </StyledText>
                                <View style={{ justifyContent: "center", alignItems: "center" }}>
                                    <StyledText fontStyle="italic" color="terciary" style={{ marginTop: 20, marginLeft: -10, width: 296, height: 75, fontSize: 16, textAlign: "justify" }}>
                                        Los siguientes datos son los niveles normales que debe tener la silo bolsa en cuanto a su temperatura, dióxido de carbono y humedad.
                                    </StyledText>
                                </View>
                                <View style={{ flexDirection: "row", marginTop: 25, marginHorizontal: responsiveWidth(9), }}>
                                    <StyledText fontWeight="bold" style={styles.magnitudcont}>
                                        0° a 25°
                                    </StyledText>
                                    <StyledText fontWeight="bold" style={styles.magnitudcont}>
                                        1% a 18%
                                    </StyledText>
                                    <StyledText fontWeight="bold" style={styles.magnitudcont}>
                                        8% a 18%
                                    </StyledText>
                                </View>
                                <View style={{ flexDirection: "row", marginHorizontal: responsiveWidth(9),  }}>
                                    <StyledText style={styles.magnitudcont2}>Temperatura</StyledText>
                                    <StyledText style={styles.magnitudcont2}>CO2</StyledText>
                                    <StyledText style={styles.magnitudcont2}>Humedad</StyledText>
                                </View>
                            </View>

                        </Modal>
                    )}
                    <View>
                        <View>
                            <TouchableOpacity
                                style={styles.dropdownbuton2}
                                onPress={() => setShowDropdown(true)}
                            />
                            <View style={{ flexDirection: "row", padding: responsiveHeight(1),paddingHorizontal:responsiveWidth(5), backgroundColor: "white", top: responsiveHeight(6), borderTopLeftRadius: responsiveFontSize(2), borderTopRightRadius: responsiveFontSize(2) }} {...props}>
                                <StyledButton
                                    onPress={() => { props.navigation.navigate("Grafico2"); }}
                                    styleContainer={styles.lleno}
                                    style={{ fontSize: responsiveFontSize(2), fontWeight:"bold" }}
                                >
                                    Grafico
                                </StyledButton>
                                <StyledButton2
                                    onPress={() => { props.navigation.navigate("GraficoView"); }}
                                    styleContainer={{ flex: 1, margin: responsiveHeight(1), padding: responsiveHeight(1) }}
                                    style={{  fontSize: responsiveFontSize(2), fontWeight:"bold", color: "#1DB6E5" }}
                                >
                                    Ubicacion
                                </StyledButton2>
                            </View>
                        </View>
                    </View>
                </ImageBackground>
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
    },
    subcontainer: {
        flex: 0.9,
        paddingTop: responsiveHeight(2),
        flexDirection: "column",
    },

    infobolsaC: {
        flex: 10,
        flexDirection: "row",
        maxHeight: responsiveHeight(8),
        padding: responsiveHeight(0.5),
        backgroundColor: "#fff",
        borderTopLeftRadius: responsiveHeight(5),
        borderTopRightRadius: responsiveHeight(5),
        marginBottom: responsiveHeight(5),
        width: responsiveWidth(90),
        left:responsiveWidth(5)
    },
    infobolsa: {
        flex: 1,
        alignItems: "center",
        marginTop: 6

    },
    valor: {
        flex: 0.9,
        justifyContent: "center",
        alignItems: "center",

    },
    color: {
        top: 9,
        width: responsiveWidth(31.25),
        flex: 0.2,
        height: responsiveHeight(5),
    },
    valorN: {
        fontSize: 35,
        fontWeight: 'bold'
    },

    titulo: {
        alignSelf: "center",
        fontSize: responsiveFontSize(4.5),
        fontWeight: "bold",
        paddingTop: responsiveHeight(5),
        paddingBottom: responsiveHeight(2),
        color: "#03B6E8",
    },
    magnitud: {
        flex: 5,
        fontSize: responsiveFontSize(2),
        textAlign: "center",
        bottom:responsiveHeight(3),
    },

    magnitudcont: {
        flex: 3,
        fontSize: responsiveFontSize(3),
        textAlign: "center",
        color: "#1DB6E5",
       
    },
    magnitudcont2: {
        color: "#87878F",
        opacity:0.5,
        textAlign: "center",
        fontSize: responsiveFontSize(1.5),
        flex: 3,
        fontWeight:"bold",
    },
    imagencontainer: {
        flex: 0.1,
        maxHeight: responsiveHeight(20),
    },
    lleno: {
        backgroundColor: "rgb(3,182,232)",
        flex: 1, margin: responsiveHeight(2), padding: responsiveHeight(1) 
    },
    scrollView: {
        flexDirection: 'row', // Asegura que los elementos estén en una fila horizontal
    },
    item: {
        width: responsiveWidth(80), // Ancho de cada elemento
        height: responsiveHeight(99), // Altura de cada elemento
        margin: 1, // Espacio entre elementos
    },
    dropdown: {
        position: "absolute",
        top: responsiveHeight(60),//64 // Ajusta la posición vertical del dropdown
        height: responsiveHeight(32), // Ajusta la posición horizontal del dropdown
        width: responsiveWidth(100), // Ajusta el ancho del dropdown
        borderTopLeftRadius: responsiveFontSize(5), // Agrega un borde en la esquina superior izquierda
        borderTopRightRadius:responsiveFontSize(5),
        backgroundColor: "white",
        zIndex: 1,
    },
    dropdownbuton: {
        width: responsiveWidth(17),
        height: responsiveHeight(1),
        backgroundColor: '#CCCCCC',
        top:responsiveHeight(1),
        borderRadius: responsiveFontSize(20),
        left: responsiveWidth(41),
    },
    dropdownbuton2: {
        width: responsiveWidth(17),
        height: responsiveHeight(1),
        backgroundColor: '#CCCCCC',
        borderRadius: responsiveFontSize(20),
        border: 'none',
        left: responsiveWidth(41),
        top: responsiveHeight(7.5),
        zIndex: 999
    }

})