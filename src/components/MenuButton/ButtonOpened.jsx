import { StyleSheet, Dimensions, View, Text } from "react-native"
import { StyledText } from "../StyledText"
export function ButtonOpened() {
   return (
      <View style={styles}>
         <StyledText align="center">Opened</StyledText>
      </View>
   )
}

const styles = StyleSheet.create({
   flex: 1,
   justifyContent: "center",
   alignItems: "center",
   width: 50,
   height: 50,
   margin: 10,
})