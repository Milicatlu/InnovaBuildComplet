import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet"
import { StatusBar } from "expo-status-bar"
import { useCallback, useRef, useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { Peticiones } from "../Peticiones"


export function ButtomSh(props) {
    const sheetRef = useRef()
    sheetRef.current < BottomSheet > (null);
    const [setIsOpen] = useState(true);
    const sP = ["50%", "100%"];
    const handleSnapPress = useCallback((index) => {
        sheetRef.current?.snapToIndex(index)
        setIsOpen(true);
    }, []);


    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => handleSnapPress(0)}>
                <Text>Hola</Text>

            </TouchableOpacity>
            <BottomSheet
                ref={sheetRef}
                enablePanDownToClose={true}
                onClose={() => setIsOpen(false)}
                snapPoints={sP}
            >
                <BottomSheetView>
                    <Text>Kevin</Text>
                    <Peticiones />
                </BottomSheetView>
            </BottomSheet>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "gray",
        alignItems: "center",
        justifyContent: "center"
    }
})