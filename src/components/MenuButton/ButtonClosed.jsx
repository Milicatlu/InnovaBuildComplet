import { StyleSheet, Dimensions, View, Text } from "react-native"
import { StyledText } from "../StyledText"
export function ButtonClosed() {
   return (
      <View style={styles}>
         <StyledText align="center">Closed</StyledText>
      </View>
   )
}

const styles = StyleSheet.create({
   flex: 1,
   justifyContent: "center",
   alignItems: "center",
   width: 50,
   margin: 10,
   height: 50,
})