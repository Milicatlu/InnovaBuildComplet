import { StyleSheet, View, TouchableOpacity } from "react-native"
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet"

import { useCallback, useRef } from "react"
export function DropdownDrag({ isOpen, setIsOpen, children, sp, onClose }) {
   const sheetRef = useRef()
   sheetRef.current < BottomSheet > null

   const handleSnapPress = useCallback((index) => {
      sheetRef.current?.snapToIndex(index)
      setIsOpen(true)
   }, [])
   return (
      isOpen && (
         <>
            <TouchableOpacity
               style={styles.button}
               onPress={() => handleSnapPress(0)}
            ></TouchableOpacity>
            <BottomSheet
               ref={sheetRef}
               enablePanDownToClose={true}
               onClose={() => {
                  setIsOpen(false)
                  onClose && onClose()
               }}
               snapPoints={sp}
            >
               <BottomSheetView>{children}</BottomSheetView>
            </BottomSheet>
         </>
      )
   )
}
const styles = StyleSheet.create({
   containerBh: {
      flex: 1,
      alignItems: "center",
      justifyContent: "flex-end",
   },
})