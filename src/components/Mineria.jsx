import { ImageBackground, StyleSheet, View, Dimensions} from "react-native"
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler"
import { StyledButton } from './StyledButton'
import { StyledText } from "./StyledText"
import { AppBar } from "./AppBar"
import { useState } from "react"
import { StyledButtonAgri } from "./StyledButton"
import { MaterialIcons } from "@expo/vector-icons"
export function Mineria(props) {
    
    const [siloBolsas, setSiloBolsas] = useState([]);

    const handleAddSiloBolsa = () => {
        setSiloBolsas([...siloBolsas, siloBolsas.length + 1])
    }

    const renderSiloBolsa = () => {
        const grupos = []
        const totalSiloBolsas = siloBolsas.length

        for (let i = 0; i < totalSiloBolsas; i+=2){
            const grupo = siloBolsas.slice(i,i+2)
            grupos.push(grupo)
        }
    
        return grupos.map((grupo,index) => (
            <View key={index} style={styles.SiloContainer}>
                {grupo.map((siloBolsa) => (
                    <StyledButtonAgri  style={{color:"#FFF"}} key={siloBolsa} styleContainer={styles.vacio} onPress={() => {props.navigation.navigate("EtapaMineria");}}>
                        Bomba {siloBolsa}
                        </StyledButtonAgri>
                ))}

            </View>
        ))
    }


    

    return (
        <>
            <View style={styles.container} {...props}>
                <ImageBackground
                    source={require("../../assets/images/Fondo-06.jpg")}
                    style={styles.imagen}
                >
                    <AppBar />
                    <View style={styles.subcontainer}>
                        <StyledText
                            align="center"
                            fontSize="subheading2"
                            fontWeight="bold"
                            color="secondary"
                        >
                            MINERIA
                        </StyledText>
                        <StyledText align="center" fontSize="subheading1" fontWeight="bold">Bomba de Varilla
                        </StyledText>
                        
                    <View>
                    
                    <ScrollView style={{marginTop:10}}>
                    {renderSiloBolsa()}
                    </ScrollView>
                    
                    <TouchableOpacity style={styles.icono} onPress={handleAddSiloBolsa}  >
                        <StyledButton styleContainer={styles.lleno} styledProps={{ fontSize: "subheading1" }}>
                        <MaterialIcons name="add" size={22} color={"white"} /> NUEVA BOMBA</StyledButton>
                        <View style={{marginTop:10}}>
                        <MaterialIcons name="create" size = {18}  style={styles.icono} >
                            <StyledText style={styles.texto} onPress={() => {props.navigation.navigate("Mineria");}}> Editar nombre la bomba</StyledText>
                        </MaterialIcons>
                        </View>
                    </TouchableOpacity>                        
                    </View>
                    </View>
                </ImageBackground>
                
            </View>
        </>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imagen: {
        flex: 1,
        flexDirection: "column",
    },
    subcontainer: {
        flex: 0.8 ,
        padding: Dimensions.get("window").width / 20,
    },
    SiloContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    vacio:{
        marginBottom: Dimensions.get("window").height / 35,
        marginTop: Dimensions.get("window").height / 35 / 2, 
        marginHorizontal:Dimensions.get("window").width / 20,
        width: Dimensions.get("window").width / 3
    },
    lleno:{
        height:Dimensions.get("window").height / 15,
        backgroundColor:'#03B6E8',
        width:"100%",
        marginTop: Dimensions.get("window").height / Dimensions.get("window").height 
    },
    texto:{
        textAlign: 'center',
        fontSize: 18,
        color:"#03B6E8",
        fontFamily:"Lato-Bold"
    },
    icono: {
        marginRight: Dimensions.get("window").height / Dimensions.get("window").height ,
        color:"#03B6E8",
        marginBottom: Dimensions.get("window").height / 50,
        textAlign: 'center',
    },
})



