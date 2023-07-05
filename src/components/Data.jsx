//RESPONSIVE
import React from "react"
import {
   View,
   StyleSheet,
   Text,
} from "react-native"

export const Data = ({ styleContainer, styleText, value }) => {
   return (
      <View style={[styles.containerMain, styleContainer]}>
         <Text style={[styles.text, styleText]}>{value}</Text>
      </View>
   )
}
const styles = StyleSheet.create({
   containerMain: {
      flex: 0,
   },
   text: {
      margin: 10,
      color: "#ffffff",
   },
})