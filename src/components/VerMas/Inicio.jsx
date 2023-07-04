import { View } from "react-native"
import { StyledText } from "../StyledText"

import { ButtonsNav } from "./ButtonsNav"
export const Inicio = () => {
   return (
      <View
         style={{
            flexDirection: "column",
            marginLeft: 20,
            marginRight: 20,
         }}
      >
         <StyledText
            fontWeight="bold"
            fontSize="subheading1"
            color="secondary"
         >
            Rango de datos:
         </StyledText>
         <StyledText fontStyle="italic" color="terciary">
            Los siguientes datos son los niveles normales que debe tener la
            silo bolsa en cuanto a su temperatura, dióxido de carbono y
            humedad.
         </StyledText>
         <ButtonsNav />
      </View>
   )
}