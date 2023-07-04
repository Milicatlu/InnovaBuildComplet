import { LineChart } from "react-native-chart-kit"
import { theme } from "../theme"
import { Dimensions } from "react-native"

export function Grafico({ dataSets, labels }) {
   const chartConfig = {
      backgroundGradientFrom: "#ffffff",
      backgroundGradientTo: "#ffffff",
      color: (opacity = 1) => theme.colors.textSecondary,
      barPercentage: 0.5,
   }

   const screenWidth = Dimensions.get("window").width
   const screenHeight = Dimensions.get("window").height
   return (
      dataSets && (
         <LineChart
            data={{
               labels: labels,
               datasets: dataSets,
            }}
            width={screenWidth - 100}
            height={(screenHeight / 100) * 30}
            chartConfig={chartConfig}
            yAxisInterval={5}
         />
      )
   )

}