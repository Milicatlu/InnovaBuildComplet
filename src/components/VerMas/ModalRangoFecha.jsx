import React, { useState } from "react"
import { Button, View } from "react-native"
import DateTimePickerModal from "react-native-modal-datetime-picker"
import { StyledButton2 } from "../StyledButton"
import { theme } from "../../theme"
import { useEffect } from "react"

const Example = ({ rangeState: { range, setRange } }) => {
   const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
   const [valorMinimo, setValorMinimo] = useState("-30d")

   useEffect(() => {
      setRange(valorMinimo)
   }, [valorMinimo])

   const showDatePicker = () => {
      setDatePickerVisibility(true)
   }

   const hideDatePicker = () => {
      setDatePickerVisibility(false)
   }

   const handleConfirmMinium = (date) => {
      date = date.toISOString()
      console.warn("A date minium has been picked: " + date)
      hideDatePicker()
      setValorMinimo(date)
   }
   const handleConfirmMaxium = (date) => {
      date = date.toISOString()
      console.warn("A date maxium has been picked: " + date)
      hideDatePicker()
   }

   return (
      <>
         <StyledButton2
            styleContainer={{ flex: 1, margin: 10, padding: 5 }}
            style={{ fontSize: theme.fontSizes.subheading1 }}
            onPress={showDatePicker}
         >
            Rango
         </StyledButton2>
         <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirmMinium}
            onCancel={hideDatePicker}
            maximumDate={new Date()}
         //Aca deberian buscar alguna forma de que el valor maximo de minimo no sea superior a valor Maximo
         />

         <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirmMaxium}
            onCancel={hideDatePicker}
            maximumDate={new Date()}
         />
      </>
   )
}
function armarRange(start, stop) {
   if (stop) {
      start += ",  stop: " + stop
   }
   console.log(start)
   return start
}
export default Example