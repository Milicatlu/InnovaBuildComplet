import React from 'react'
import { ImageBackground, StyleSheet, Linking } from 'react-native'
import { StyledText } from './StyledText'
import { AppBar } from './AppBar'
import { StyledButton } from './StyledButton'
import { View, Image, Text } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

export function TerminosDos(){
    
    //Constante para guardar el link hacia el pdf para su descarga
    const handleDownloadPDF = () => {
        const fileURL = "https://www.africau.edu/images/default/sample.pdf"
        Linking.openURL(fileURL)
    }

    return (
        <>
            <ImageBackground 
                source={ require("../../assets/images/Fondo-06.jpg")}
                style={{ paddingTop: responsiveHeight(1), height: responsiveHeight(105)}}
                imageStyle={{ justifyContent: "center", alignItems: "center" }}
            >   
            <AppBar/>

            <StyledText
                color="secondary"
                align="center"
                style={{fontSize:responsiveFontSize(6), height:responsiveHeight(15)}}
            >
                <Text style={{fontWeight:"700"}}>
                    POLÍTICAS
                </Text>
            </StyledText>
                
            <StyledText 
                fontWeight="bold"
                color="#FFF"
                align="center"
                style={{fontSize: responsiveFontSize(2.7) }}   
            >
                <Text style={{fontFamily:"Lato-Bold"}}>
                    Bases y condiciones
                </Text>
            </StyledText>
                
            <View style={styles.datosC}>
                <View style={styles.datos}>
                    <Image  
                        source={require("../../assets/icons/Logo.png")} 
                        style={{width:responsiveWidth(50),height:responsiveHeight(7),alignSelf:"center",tintColor:"#e8e8e8"}}
                    />
                    <StyledText style={{ height:responsiveHeight(2.2)}}/>
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
                    <View style={{height:responsiveHeight(4)}}></View>
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
        height:responsiveHeight(69),
        width: responsiveWidth(100),
        position:'absolute',
        bottom: 0,
        paddingTop: responsiveHeight(5),
        backgroundColor:'#fff',
        borderTopEndRadius: responsiveHeight(2.5),
        borderTopStartRadius: responsiveHeight(2.5)
    },
    datos:{
        alignSelf:'center',
        width:responsiveWidth(83),
        paddingBottom:responsiveHeight(10),
    },
    label:{
        color:'black',   
        textAlign:"center",
        height:responsiveHeight(3.5),
        fontSize: responsiveFontSize(2.4),
        fontWeight:"700",
    },
    label2:{
        color:'#9e9e9e',   
        textAlign:"center",
        height:responsiveHeight(4),
        fontSize:responsiveFontSize(2.2),
        fontWeight:"700",
    },
    label3:{
        color:'#000000',   
        textAlign:"center",
        height: responsiveHeight(7.6),
        fontSize: responsiveFontSize(2),
        fontWeight:"500",
        lineHeight: responsiveHeight(3.2)
    },
    vacio:{
        height: responsiveHeight(6.25),
        width: responsiveWidth(40),
        alignSelf:"center",
        color:'red',
    }
})
