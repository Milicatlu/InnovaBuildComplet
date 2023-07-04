import React from 'react'
import { ImageBackground, StyleSheet, Dimensions, Linking } from 'react-native'
import { StyledText } from './StyledText'
import { AppBar } from './AppBar'
import { StyledButton } from './StyledButton'
import { View, Image, Text } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
const {height, width, fontScale, scale} = Dimensions.get("window")

export function TerminosDos(){
    const handleDownloadPDF = () => {
        const fileURL = "https://www.africau.edu/images/default/sample.pdf"
        Linking.openURL(fileURL)
    }

    return (
        <>
            <ImageBackground 
                source={ require("../../assets/images/Fondo-06.jpg")}
                style={{ paddingTop: height / 100, height: height}}
                imageStyle={{ justifyContent: "center", alignItems: "center" }}
            >   
            <AppBar/>

            <StyledText
                color="secondary"
                align="center"
                style={{ margin: scale, fontSize : fontScale * 46, height:height / 12}}
            >
                <Text style={{fontWeight:"700"}}>
                    POLÍTICAS
                </Text>
            </StyledText>
                
            <StyledText 
                fontWeight="bold"
                color="#FFF"
                align="center"
                style={{ margin: scale * 3, fontSize: fontScale * 26 }}   
            >
                <Text style={{fontFamily:"Lato-Bold"}}>
                    Bases y condiciones
                </Text>
            </StyledText>
                
            <View style={styles.datosC}>
                <View style={styles.datos}>
                    <Image 
                        source={require("../../assets/icons/Logo.png")} 
                        style={{width:width / 2,height:height/ 14,alignSelf:"center",tintColor:"#e8e8e8"}}
                    />
                    <StyledText style={{ height:height / 45}}/>
                    <StyledText style={styles.label}><Text style={{fontFamily:"Lato-Bold"}}>Te contamos las condiciones y</Text></StyledText>
                    <StyledText style={styles.label}><Text style={{fontFamily:"Lato-Bold"}}>nuestra politica de privacidad</Text></StyledText>
                    <StyledText></StyledText>
                    <StyledText style={styles.label2}><Text style={{color:"#03B6E8", fontFamily:"Lato-Bold"}}>Las actualizaciones claves</Text><Text style={{fontFamily:"Lato-Bold"}}> incluyen</Text></StyledText>
                    <StyledText style={styles.label2}><Text style={{fontFamily:"Lato-Bold"}}>informacion sobre lo siguiente:</Text></StyledText>
                    <StyledText></StyledText>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <ScrollView>
                            <StyledText style={styles.label3}><Text style={{fontFamily:"Lato-Regular"}}>•  El servicio que brindara Innova Space qui dolorem impsum qui dolorem impsum</Text></StyledText>
                            <StyledText style={styles.label3}><Text style={{fontFamily:"Lato-Regular"}}>•  El servicio que brindara Innova Space qui dolorem impsum qui dolorem impsum</Text></StyledText>
                            <StyledText></StyledText>
                        </ScrollView>
                    </View>
                    <View style={{height:height / 30}}></View>
                    <View style={{justifyContent:"center"}}>
                        <StyledButton styleContainer={styles.vacio} onPress={handleDownloadPDF} styledProps={{fontSize:'subheading1'}}><Text style={{color:"#03B6E8",fontFamily:"Lato-Bold"}}>Descargar PDF</Text></StyledButton>
                    </View>
                </View>
            </View>

        </ImageBackground>
        </>
    )
}

const styles = StyleSheet.create({
    datosC:{
        height:height / 1.45,
        width: width,
        position:'absolute',
        bottom: 0,
        paddingTop: height / 20,
        backgroundColor:'#fff',
        borderTopEndRadius: height / 40,
        borderTopStartRadius:height / 40
    },
    datos:{
        alignSelf:'center',
        width:width / 1.2,
        paddingBottom:height / 10,
    },
    label:{
        color:'black',   
        textAlign:"center",
        height:height / 28,
        fontSize: fontScale * 21,
        fontWeight:"700",
    },
    label2:{
        color:'#9e9e9e',   
        textAlign:"center",
        height:height / 25,
        fontSize:fontScale * 20,
        fontWeight:"700",
    },
    label3:{
        color:'#000000',   
        textAlign:"center",
        height: height / 13,
        fontSize: fontScale * 17,
        fontWeight:"500",
        lineHeight: height / 33
    },
    vacio:{
        height: height / 16,
        width: width / 2.5,
        alignSelf:"center",
        color:'red',
    }
})
