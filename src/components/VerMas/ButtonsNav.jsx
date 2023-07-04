import { StyledButton2, StyledButton } from "../StyledButton"
import { theme } from "../../theme"
import { useContext } from "react"
import { View } from "react-native"
export const ButtonsNav = () => {
   const DataContext = createContext()
   const context = useContext(DataContext)

   return (
      <View style={{ flexDirection: "row", marginTop: 30 }}>
         <StyledButton
            onPress={() => context.setScreenName("grafico")}
            styleContainer={{ flex: 1, margin: 10, padding: 5 }}
            style={{
               fontSize: theme.fontSizes.subheading1,
               color: theme.colors.textSecondary,
            }}
         >
            Grafico
         </StyledButton>
         <StyledButton2
            onPress={() => context.setScreenName("ubicacion")}
            styleContainer={{ flex: 1, margin: 10, padding: 5 }}
            style={{ fontSize: theme.fontSizes.subheading1 }}
         >
            Ubicacion
         </StyledButton2>
      </View>
   )
}