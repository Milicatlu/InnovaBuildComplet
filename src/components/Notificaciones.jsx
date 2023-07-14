import React, { useEffect, useState } from "react" 
import { ImageBackground, StyleSheet, View, Image, Text, TouchableOpacity} from "react-native" 
import { ScrollView } from "react-native-gesture-handler"
import { StyledText } from "./StyledText"
import { AppBar } from "./AppBar"
import { supabase } from "../lib/supabase"
import { getUser } from "../lib/supabaseHandler"
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions'

export function Notificaciones(props){
    //Estado para almacenar el tipo seleccionado
    const [selectedType, setSelectedType] = useState(null)
    
    //Estado para seleccionar las notificaciones existentes, algunas para default
    const [notifications, setNotifications] = useState({})
    
    //Estado para almacenar las notificaciones borradas
    const [closedNotifications, setClosedNotifications] = useState({})

    //Manejador de eventos para cambiar el tipo seleccionado
    const handleButtonPress = (type) => {
        setSelectedType((prevType) => (prevType === type ? null : type))
    }

    //Estado para almacenar la ultima notificacion cerrada
    const [lastClosedNotificationIndex, setLastClosedNotificationIndex] = useState(-1)
    
    //Filtro para las notificaciones segun el tipo seleccionado y ordenamiento ascendente por tiempo
    const filterNotifications = (notifications) => {
        if (selectedType) {
            return Object.values(notifications)
                .filter(
                (notification) =>
                    notification.type === selectedType &&
                    !closedNotifications[notification.id]
                )
                .sort((a, b) => b.time.localeCompare(a.time))
                .map((notification, index) => ({
                ...notification,
                isLatestClosed: index === lastClosedNotificationIndex + 1,
                }))
        }
      
        return Object.values(notifications)
            .filter((notification) => !closedNotifications[notification.id])
            .sort((a, b) => b.time.localeCompare(a.time))
            .map((notification, index) => ({
                ...notification,
                isLatestClosed: index === lastClosedNotificationIndex + 1,
            }))
    }
    
    //Funcion para borrar notificacion
    const deleteNotification = async (id) => {
        try {
            const { error } = await supabase.from("notificaciones").delete().match({ id })
    
            if (error) {
                console.error("Error al eliminar la notificación:", error)
            } else {
                // Eliminar la notificación de la lista local de notificaciones
                setNotifications((prevNotifications) =>
                    prevNotifications.filter((notification) => notification.id !== id)
                )
            }
        } 
        catch (error) {
            console.error("Error al eliminar la notificación:", error)
        }
    }

    

    //function para llamar notificacion
    const fetchNotifications = async () => {
        const response = await getUser()
        try {
            const { data, error } = await supabase
                .from("notificaciones")
                .select()
                .eq("notificacionid",  response.id)
                .order("time", { ascending: false })
            
            if (error) {
                console.error("Error al obtener los datos de notificaciones:", error)
            } else if (data) {
                setNotifications(data)
            }
        } 
        
        catch (error) {
            console.error("Error al obtener los datos de notificaciones:", error)
        }
    }

    //intervalo para sondeo    
    useEffect(()=>{
        fetchNotifications()
        const intervalId = setInterval(fetchNotifications, 10000);

        return () => {
        clearInterval(intervalId);
        }
    },[])
    
    //funcion para poner hora y fecha ordenado
    const formatDateTime = (dateTime) => {
        const date = new Date(dateTime)
        const formattedDate = formatDate(date)
        const formattedTime = formatTime(date)
        return `${formattedDate} ${formattedTime}`
    }
    const formatDate = (date) => {
        const day = date.getDate()
        const month = date.getMonth() + 1
        const year = date.getFullYear()
        return `${padZero(day)}/${padZero(month)}/${year}`
    }
    const formatTime = (date) => {
        const hours = date.getHours()
        const minutes = date.getMinutes()
        return `${padZero(hours)}:${padZero(minutes)}`
    }
    const padZero = (number) => {
        return number < 10 ? `0${number}` : number
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
                    style={{ fontSize : responsiveFontSize(5.4), height:responsiveHeight(14)}}
                >
                    <Text style={{fontFamily:"Lato-Bold"}}>
                        NOTIFICACIONES
                    </Text>
                        
                </StyledText>
                
            <View style={styles.datosCButtons}>
            
                <TouchableOpacity style={styles.containerButtons} onPress={() => handleButtonPress("Minería")}>
                    <Image  source={require("../../assets/icons/Mineria_Icon.png")}         
                            style={[styles.imageButtons, {marginRight: responsiveWidth(3.3),left: responsiveWidth(2), tintColor: selectedType === "Minería" ? "#03B6E8" : "#C6C6C8"}]}/>
                        <Text style={[styles.textButtons, {color: selectedType === "Minería" ? "#03B6E8" : "#C6C6C8"}]}>Minería</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.containerButtons} onPress={() => handleButtonPress("Agricultura")}>
                    <Image  source={require("../../assets/icons/Agricultura_Icon.png")}      
                            style={[styles.imageButtons, {marginLeft: responsiveWidth(3.3), tintColor: selectedType === "Agricultura" ? "#03B6E8" : "#C6C6C8"}]}/>
                        <Text style={[styles.textButtons, {color: selectedType === "Agricultura" ? "#03B6E8" : "#C6C6C8"}]}>Agricultura</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.containerButtons} onPress={() => handleButtonPress("Petróleo")}>
                    <Image  source={require("../../assets/icons/Petroleo_Icon.png")}         
                            style={[styles.imageButtons, {marginHorizontal: responsiveWidth(3.3), tintColor: selectedType === "Petróleo" ? "#03B6E8" : "#C6C6C8"}]}/>
                        <Text style={[styles.textButtons, {color: selectedType === "Petróleo" ? "#03B6E8" : "#C6C6C8",left: responsiveWidth(-2.5)}]}>Petróleo</Text>
                </TouchableOpacity> 
            </View>
            
            <View style={styles.datosC} >
                <View style={styles.datos} {...props}>
                    <ScrollView>
                        {filterNotifications(notifications).length === 0 ? (
                            <Text style={styles.noNotificacion}>No posee notificaciones pendientes</Text> 
                        ) : (
                        filterNotifications(notifications).map((notification) =>
                            <React.Fragment key={notification.id}>
                                {!closedNotifications[notification.id] && (
                                    <TouchableOpacity
                                    style={[styles.notificationContainer, notification.isLatestClosed && styles.notificationContainerFirst]}
                                        onPress={() => {if (notification.type == "Agricultura"){props.navigation.navigate("Agricultura")} 
                                                        if (notification.type == "Minería"){props.navigation.navigate("Mineria")} 
                                                        if (notification.type == "Petróleo"){props.navigation.navigate("Petroleo")}}}
                                    >
                                            <View style={styles.notificationContent}>
                                                <TouchableOpacity
                                                    style={styles.closeButtonContainer}
                                                    onPress={() => deleteNotification(notification.id)}
                                                >
                                                    <Image source={require("../../assets/icons/cruz.png")} style={styles.closeButton}/>
                                                </TouchableOpacity>
                                            </View>
                                            <Text style={styles.notificationType}>{notification.type}</Text>
                                            <Text style={styles.notificationTime}>{formatDateTime(notification.time)}</Text>
                                            <Text style={styles.notificacionTitulo}>{notification.title}</Text>
                                            <Text style={styles.notificationMessage}>{notification.message}</Text>
                                            
                                    </TouchableOpacity> 
                                )}
                                <Text style={styles.relleno}/>
                            </React.Fragment>
                        )
                        )} 
                    </ScrollView>
                </View>
            </View>
        </ImageBackground>
    </>
)}

const styles = StyleSheet.create({
    datosC:{
        height:responsiveHeight(71.5),
        width: responsiveWidth(100),
        position:"absolute",
        bottom: 0,
        paddingTop: responsiveHeight(1),
        backgroundColor:"#fff",
        borderTopEndRadius: responsiveHeight(2.5),
        borderTopStartRadius: responsiveHeight(2.5)
    },
    datosCButtons:{
        height:responsiveHeight(6.25),
        width: responsiveWidth(100),
        alignSelf:"center",
        position:"absolute",
        bottom: responsiveHeight(74),
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
    },
    imageButtons:{
        width:responsiveWidth(9), 
        height: responsiveHeight(3.3),
        tintColor:"black",
    },
    datos:{
        alignSelf:"center",
        width:responsiveWidth(95),
    },
    label:{
        flexDirection:"row",
        height: responsiveHeight(8.3),
    },
    image:{
        width:responsiveWidth(10), 
        height: responsiveHeight(4.5),
        tintColor:"black",
        alignSelf: "center"
    },
    text:{
        fontFamily:"Lato-Bold",
        alignSelf: "center",
        textAlign: "center",
        left: responsiveWidth(1),
        width: responsiveWidth(1)
    },
    notificationContainer: {
        borderBottomColor: "#d9d9d9",
        paddingVertical: responsiveHeight(2.5),
        shadowColor: "#87847a",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.01,    
        shadowRadius: 3.84,
        elevation:2,
        marginLeft: responsiveWidth(2.3),
        marginRight:responsiveWidth(2.3),
    },notificationContainerFirst: {
        marginTop:responsiveHeight(2),
        borderBottomColor: "#d9d9d9",
        paddingVertical: responsiveHeight(2.5),
        shadowColor: "#87847a",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        marginLeft: responsiveWidth(2.3),
        marginRight:responsiveWidth(2.3),
        shadowOpacity: 0.01,
        shadowRadius: 3.84,
        elevation:2,
        borderLeftColor: "#03B6E8",
        borderLeftWidth: responsiveWidth(1),
    },
    notificationContent: {
        justifyContent: "flex-end",
        alignItems: "flex-end",
    },
    notificationType: {
        fontFamily: "Lato-Bold",
        fontSize: responsiveFontSize(2.3),
        textAlign:"left",
        color:"#03B6E8",
        marginRight: responsiveWidth(10),
        marginLeft: responsiveWidth(10),
        bottom: responsiveHeight(3.4),
        textAlign: "left",
    },
    notificationTime: {
        color: "#a7a7a8",
        fontSize: responsiveFontSize(2.3),
        left:responsiveWidth(10), 
        top: responsiveHeight(-2.5),
        fontFamily:"Lato-Bold",
        textAlign: "left",
    },
    notificacionTitulo:{
        fontSize: responsiveFontSize(3.2),
        fontFamily: "Lato-Bold",
        left: responsiveWidth(10), 
        textAlign: "left",
        bottom: responsiveHeight(1.6),
        marginRight: responsiveWidth(14)
    },
    notificationMessage: {
        textAlign: "left",
        fontSize: responsiveFontSize(2.3),
        marginLeft: responsiveWidth(10),
        fontFamily: "Lato-Regular",
        bottom: responsiveHeight(0.5),
        marginRight: responsiveWidth(10)
    },
    relleno:{
        height: responsiveHeight(1.4)
    },
    containerButtons:{
        flexDirection:"row",
    },
    textButtons:{
        fontFamily:"Lato-Bold",
        fontSize: responsiveFontSize(2.2),
        top: responsiveHeight(0.5)
    },
    closeButton:{
        height: responsiveHeight(3.7),
        width: responsiveWidth(8.3),
        right: responsiveWidth(2.1),
        bottom: responsiveHeight(1),
    },
    noNotificacion:{
        fontFamily:"Lato-Bold",
        alignSelf:"center",
        marginTop: responsiveHeight(4),
        fontSize: responsiveFontSize(2.4)
    },
})





















































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    //363