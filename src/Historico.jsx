import React from "react"
import { Text, View } from "react-native"
import * as XLSX from "xlsx"
import * as FileSystem from "expo-file-system"
import * as Sharing from "expo-sharing"
import { TouchableOpacity } from "@gorhom/bottom-sheet"
import { InfluxDBHelper } from "./helpers/InfluxDB"
import { jwt } from "./helpers/Config.js"
import { StyledButton2 } from "./components/StyledButton"
import { theme } from "./theme"
export function MostrarHistorico() {
   /* const [historico, setHistorico] = useState(null);
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
   }, []) */
   /* 
  ​
      const generarCSV = () => {
          if (historico !== null) {
              const data = jsonToCSV(historico)
              setCsv(data)
              console.log(data)
          }
      }
       */
   const generarDataExcel = async () => {
      let temperatura = [],
         humedad = [],
         co2 = []

      await InfluxDBHelper.getPointsValueAndTime({
         tags: {
            Sector: "AGRICULTURE",
            nodeID: "1",
         },
         timeStamp: "-40d",
         field: "TEMPERATURE",
         jwt: jwt,
      }).then((value) => {
         temperatura = value.values
      })

      await InfluxDBHelper.getPointsValueAndTime({
         tags: {
            Sector: "AGRICULTURE",
            nodeID: "1",
         },
         timeStamp: "-40d",
         field: "CO2",
         jwt: jwt,
      }).then((value) => {
         co2 = value.values
      })

      await InfluxDBHelper.getPointsValueAndTime({
         tags: {
            Sector: "AGRICULTURE",
            nodeID: "1",
         },
         timeStamp: "-40d",
         field: "HUMIDITY",
         jwt: jwt,
      }).then((value) => {
         humedad = value.values
      })

      let out = []



      out.push(["Temperatura °", "Fecha", "Hora", "", "CO2 %", "Fecha", "Hora", "", "Humedad %", "Fecha", "Hora"])
      for (var x = 0; x < temperatura.length || x < co2.length || x < humedad.length; x++)
         out.push(["", "", "", "", "", "", "", "", "", "", ""])

      for (var x = 1; x < temperatura.length; x++) {
         out[x][0] = temperatura[x].valor
         out[x][1] = temperatura[x].fecha.substring(0, 10)
         out[x][2] = temperatura[x].fecha.substring(11, 21)
      }

      for (var x = 1; x < co2.length; x++) {
         out[x][4] = co2[x].valor
         out[x][5] = co2[x].fecha.substring(0, 10)
         out[x][6] = co2[x].fecha.substring(11, 21)
      }

      for (var x = 1; x < humedad.length; x++) {
         out[x][8] = humedad[x].valor
         out[x][9] = humedad[x].fecha.substring(0, 10)
         out[x][10] = humedad[x].fecha.substring(11, 21)
      }

      return out
   }

   const generarExcel = async () => {
      let wb = XLSX.utils.book_new()
      let sheet = XLSX.utils.aoa_to_sheet(await generarDataExcel())

      XLSX.utils.book_append_sheet(wb, sheet, "Mediciones Agricultura", true)

      const base64 = XLSX.write(wb, { type: "base64" })
      const nombreArchivo =
         FileSystem.documentDirectory +
         "MedicionesAgriculturaInnovaSpace.xlsx"

      FileSystem.writeAsStringAsync(nombreArchivo, base64, {
         encoding: FileSystem.EncodingType.Base64,
      }).then(() => {
         Sharing.shareAsync(nombreArchivo)
      })
   }
   return (
      <StyledButton2
         onPress={generarExcel}
         styleContainer={{ flex: 1, margin: 10, padding: 5 }}
         style={{ fontSize: theme.fontSizes.subheading1 }}
      >
         Descargar CSV
      </StyledButton2>
   )
}

const styles = {
   btn: {
      backgroundColor: "#04B6E8",
      borderRadius: 15,
      justifyContent: "center",
      alignItems: "center",
   },
}