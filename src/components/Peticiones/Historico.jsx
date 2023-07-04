import React, { useEffect, useRef, useState } from "react";
import {
    FlatList,
    Text,
    View,
    StyleSheet,
    ImageBackground
} from "react-native";
import { Data } from "../Data";
import Constants from "expo-constants";
import { jsonToCSV } from 'react-native-csv'
import * as XLSX from "xlsx";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { InfluxDBHelper } from "../../helpers/InfluxDB";
export function MostrarHistorico() {
    const [historico, setHistorico] = useState(null);
    const [csv, setCsv] = useState("");
    useEffect(() => {
        InfluxDBHelper.getPointsAllData({
            tags: {
                Sector: "AGRICULTURE",
                nodeID: "1",
            },
            timeStamp: "-40d",
            field: "CO2",
            jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiNzI2YWRmNDctOTllOS00YmNiLWE5ODEtYmFiYjU1ZDdkNmE5IiwiaWF0IjoxNjY2MzYxMTk1fQ.RhsHQF3gVWJd6KNoM79AweFLugZvY7tfFjF3V8PbUz8",
        })
            .then((value) => {
                setHistorico(value.values)
                console.log(historico)
            })
    }, [])


    const generarCSV = () => {
        if (historico !== null) {
            const data = jsonToCSV(historico)
            setCsv(data)
            console.log(data)
        }
    }




    const generarExcel = () => {
        let wb = XLSX.utils.book_new();
        let ws = XLSX.utils.sheet_to_csv(csv);
        XLSX.utils.book_append_sheet(wb, ws, "TESTING", true);
        const base64 = XLSX.write(wb, { type: "base64" })
        const nombreArchivo = FileSystem.documentDirectory + "Que si kevin que si.xlsx "
        FileSystem.writeAsStringAsync(nombreArchivo, base64, {
            encoding: FileSystem.EncodingType.Base64
        }).then(() => {
            Sharing.shareAsync(nombreArchivo);
        })
    };
    return (
        historico !== null ? (<>
            <Text>cargando</Text>
            <Text>cargando</Text>
            <Text>cargando</Text>
            <TouchableOpacity onPress={generarCSV}>
                <Text>Generar CSV</Text>
            </TouchableOpacity>
            <View style={{ marginTop: Constants.statusBarHeight, flexGrow: 1 }}>
                {csv && <Text style={{ justifyContent: 'space-around', alignSelf: 'center', textAlign: 'center' }}>{csv}</Text>}
            </View>
        </>) : (<Text>cargando</Text>)
    )
}
const styles = StyleSheet.create({
    texto: {
        alignContent: "center",
        justifyContent: "center",

    }
})