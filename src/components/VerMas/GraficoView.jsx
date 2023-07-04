import { ButtonsNav } from "./ButtonsNav"
import ModalRangoFecha from "./ModalRangoFecha"
import { View } from "react-native"
import { StyledText } from "../StyledText"
import { Grafico } from "../Grafico"
import {
   graficarCO2,
   graficarTemperatura,
   graficarHumedad,
} from "../../helpers/Config"
import { MostrarHistorico } from "../../Historico"
export const GraficoView = ({
   GraficoData: { CO2Array, temperaturaArray, humedadArray },
   rangeState: { range, setRange },
}) => {
   const getDataSets = () => {
      const getLineaIdeal = (valor) => {
         //por como funcionan estos graficos no puedo poner solo 2 puntos para esto, porque si lo hago termina siendo una linea cortisima al principio, tengo que hacerla tan larga como la longitud del array
         var linea = []
         CO2Array.forEach(() => linea.push(null))
         linea[0] = valor
         linea[linea.length - 1] = valor
         return linea
      }
      var out = []
      if (graficarCO2) {
         out.push({
            data: CO2Array,
            color: (opacity = 1) => `orange`,
            withDots: false,
         })
         out.push({
            data: getLineaIdeal(9.5),
            color: (opacity = 0.2) => `rgba(255,165,1,${255 * opacity})`,
            withDots: false,
         })
      }
      if (graficarTemperatura) {
         out.push({
            data: temperaturaArray,
            color: (opacity = 1) => `red`,
            withDots: false,
         })
         out.push({
            data: getLineaIdeal(12.5),
            color: (opacity = 0.2) => `rgba(255,0,0,${255 * opacity})`,
            withDots: false,
         })
      }
      if (graficarHumedad) {
         out.push({
            data: humedadArray,
            color: (opacity = 1) => `blue`,
            withDots: false,
         })
         out.push({
            data: getLineaIdeal(13),
            color: (opacity = 0.2) => `rgba(0,0,255,${255 * opacity})`,
            withDots: false,
         })
      }
      return out
   }
   return (
      <View
         style={{
            flexDirection: "column",
            margin: 10,
         }}
      >
         {CO2Array && temperaturaArray && humedadArray ? (
            <Grafico
               dataSets={getDataSets()}
               labels={["CO2(%)", "TEMPERATURA(°)", "HUMEDAD(%)"]}
            />
         ) : (
            <StyledText align="center" color="secondary">
               No hay datos...
            </StyledText>
         )}

         <View style={{ flexDirection: "row", marginTop: 30 }}>
            <ModalRangoFecha rangeState={{ range, setRange }} />
            <MostrarHistorico />
         </View>
         <ButtonsNav />
      </View>
   )
}
/* [
    {
        data: CO2Array,
        color: (opacity = 1) => `orange`,
    },
    {
        data: temperaturaArray,
        color: (opacity = 1) => `red`,
    },
    {
        data: humedadArray,
        color: (opacity = 1) => `blue`,
    },
] */