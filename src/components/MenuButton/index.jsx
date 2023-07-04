import { StyleSheet, Dimensions, TouchableHighlight } from "react-native"
import { ButtonClosed } from "./ButtonClosed"
import { ButtonOpened } from "./ButtonOpened"
import { useContext } from "react"
import { AppBarContext } from "../../../context/DataContext"
export function MenuButton() {
   const context = useContext(AppBarContext)

   return (
      <>
         <TouchableHighlight onPress={context.changeState}>
            {context.active ? <ButtonOpened /> : <ButtonClosed />}
         </TouchableHighlight>
      </>
   )
}

const styles = StyleSheet.create({
   flex: 1,
   justifyContent: "center",
   alignItems: "center",
   width: Dimensions.get("window").width,
   height: Dimensions.get("window").height,
})