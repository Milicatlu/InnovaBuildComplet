//RESPONSIVE
import React from 'react';
import { View, Dimensions, ImageBackground, StyleSheet, } from 'react-native'
import { LineChart } from 'react-native-chart-kit'
import { StyledText } from "./StyledText"
import { AppBar } from "./AppBar"
import { useState, useEffect } from "react"
import { BotonGrafico } from './StyledButton';
import { supabase } from "../lib/supabase"


export function Grafico2() {

    const [co2, setCo2] = useState([])

    useEffect(() => {
        const fetchCo2 = async () => {
            try {
                const { data, error } = await supabase
                    .from("agricultura")
                    .select("co2")
                    .order("time", { ascending: false })

                if (error) {
                    console.error("Error al obtener el ultimo valor:", error)
                } else if (data && data.length > 0) {
                    setCo2(data.map(item => item.co2))
                    console.log("setco2????", setCo2)
                    console.log("aca esta la data", data)
                }
            } catch (error) {
                console.error("2Error al obtener ultimo valor:", error)
            }
        }

        const pollSupabase = async () => {
            await fetchCo2()
            await new Promise(resolve => setTimeout(resolve, 10000))
            pollSupabase()
        }

        pollSupabase()

        return () => {
            clearTimeout(pollSupabase)
        }
    }, [setCo2])






    function cambiarMeses() {
        setParametro1(meses)
    }
    function cambiarDias() {
        setParametro1(dias)
    }
    function cambiarHoras() {
        setParametro1(horas);
    }

    const meses = ["En.", "Feb.", "Mar.", "Abr.", "May.", "Jun.", "Jul.", "Ag.", "Sept.", "Oct.", "Nov.", "Dic."];
    const dias = ["Lun", "Mar.", "Mier.", "Juev.", "Vier.", "Sab.", "Dom."];
    const horas = ["1h.", "2h.", "3h.", "4h.", "5h.", "6h.", "7h.", "9h.", "10h.", "11h.", "12h."];

    const [parametro1, setParametro1] = useState(meses)
    return (
        <>
            <ImageBackground
                source={require("../../assets/images/Fondo-06.jpg")}
                style={styles.imagen}
                imageStyle={{ justifyContent: "center", alignItems: "center" }}
            >

                <AppBar />

                <View>
                    <StyledText style={styles.titulo.Hum}>Humedad</StyledText>
                    <LineChart data={{
                        labels: parametro1,
                        datasets: [
                            { data: [1, 2] }
                        ]
                    }}
                        width={Dimensions.get('window').width}
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
                            borderRadius: 16
                        }}

                    />

                    <StyledText style={styles.titulo.CO2}>CO2</StyledText>
                    <LineChart data={{
                        labels: parametro1,
                        datasets: [
                            { data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] }
                        ]
                    }}
                        width={Dimensions.get('window').width}
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
                                r: '4',
                                strokeWidth: "1",
                                stroke: "#EB691A"
                            },
                        }}
                        bezier
                        style={{
                            marginVertical: 8,
                            borderRadius: 16
                        }}
                    />
                    <StyledText style={styles.titulo.Temp} >Temperatura</StyledText>
                    <LineChart data={{
                        labels: parametro1,
                        datasets: [
                            { data: [15, 14, 13, 12, 11, 10, 9, 10, 11, 12, 13, 14, 15] }
                        ]
                    }}
                        width={Dimensions.get('window').width}
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
                                r: '4',
                                strokeWidth: "1",
                                stroke: "#CCA500"
                            },
                        }}
                        bezier
                        style={{
                            marginVertical: 8,
                            borderRadius: 16
                        }}
                    />

                    <View style={styles.contenedor}>
                        <BotonGrafico onPress={cambiarMeses}>Meses</BotonGrafico>
                        <BotonGrafico onPress={cambiarDias}>Dias</BotonGrafico>
                        <BotonGrafico onPress={cambiarHoras}>Horas</BotonGrafico>
                    </View>
                </View>
            </ImageBackground>
        </>
    )
}

const styles = StyleSheet.create({
    imagen: {
        paddingTop: 10,
        height: Dimensions.get("window").height + Dimensions.get("window").height / 20
    },
    titulo: {
        Temp: {
            color: "#CCA500",
            fontSize: 20,
            textAlign: "center",
            fontWeight: "bold",
        },
        CO2: {
            color: "#EB691A",
            fontSize: 20,
            textAlign: "center",
            fontWeight: "bold",
        },
        Hum: {
            fontSize: 20,
            textAlign: "center",
            fontWeight: "bold",
            color: "#03B6E8"
        },
    },
    contenedor: {
        alignItems: "flex-start",
        flexDirection: "row",
        justifyContent: "space-around",

    },
})
