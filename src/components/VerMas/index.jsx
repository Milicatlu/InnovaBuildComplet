import { View, Text } from "react-native"
import { GraficoView } from "./GraficoView"
import { useEffect, useState } from "react"
import { Inicio } from "./Inicio"
import { Ubicacion } from "./Ubicacion"
export const VerMas = ({
   GraficoData,
   screenState: { screenName, setScreenName },
   rangeState: { range, setRange },
}) => {
   const [screen, setScreen] = useState(<></>)
   useEffect(() => {
      if (screenName === "inicio") setScreen(<Inicio />)
      if (screenName === "grafico")
         setScreen(<GraficoView GraficoData={GraficoData} rangeState={{ range, setRange }} />)
      if (screenName === "ubicacion") setScreen(<Ubicacion />)
   }, [screenName])
   return (
      <DataContext.Provider value={{ screen, setScreen, setScreenName }}>
         <View
            style={{
               flexDirection: "column",
               margin: 20,
            }}
         >
            {screen}
         </View>
      </DataContext.Provider>
   )
}