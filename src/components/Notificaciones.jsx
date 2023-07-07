import React, { useEffect, useState } from "react" 
import { ImageBackground, StyleSheet, Dimensions, View, Image, Text, TouchableOpacity} from "react-native" 
import { ScrollView } from "react-native-gesture-handler"
import { StyledText } from "./StyledText"
import { AppBar } from "./AppBar"
import { supabase } from "../lib/supabase"
import { getUser } from "../lib/supabaseHandler"
const {height, width, fontScale, scale} = Dimensions.get("window")

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
                (notification, index) =>
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
            .filter((notification, index) => !closedNotifications[notification.id])
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
                style={{ paddingTop: height / 100, height: height + height / 20}}
                imageStyle={{ justifyContent: "center", alignItems: "center" }}
            >   
                <AppBar/>

                <StyledText
                    color="secondary"
                    align="center"
                    style={{margin: scale, 
                            fontSize : fontScale * 42, 
                            height:height / 7}}
                >
                    <Text style={{fontFamily:"Lato-Bold"}}>
                        NOTIFICACIONES
                    </Text>

                </StyledText>
                
            <View style={styles.datosCButtons}>
            
                <TouchableOpacity style={styles.containerButtons} onPress={() => handleButtonPress("Minería")}>
                    <Image  source={require("../../assets/icons/Mineria_Icon.png")}         
                            style={[styles.imageButtons, {marginRight: width / 30,left: width / 50, tintColor: selectedType === "Minería" ? "#03B6E8" : "#C6C6C8"}]}/>
                        <Text style={[styles.textButtons, {color: selectedType === "Minería" ? "#03B6E8" : "#C6C6C8"}]}>Minería</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.containerButtons} onPress={() => handleButtonPress("Agricultura")}>
                    <Image  source={require("../../assets/icons/Agricultura_Icon.png")}      
                            style={[styles.imageButtons, {marginLeft: width / 30, tintColor: selectedType === "Agricultura" ? "#03B6E8" : "#C6C6C8"}]}/>
                        <Text style={[styles.textButtons, {color: selectedType === "Agricultura" ? "#03B6E8" : "#C6C6C8"}]}>Agricultura</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.containerButtons} onPress={() => handleButtonPress("Petróleo")}>
                    <Image  source={require("../../assets/icons/Petroleo_Icon.png")}         
                            style={[styles.imageButtons, {marginHorizontal: width / 30, tintColor: selectedType === "Petróleo" ? "#03B6E8" : "#C6C6C8"}]}/>
                        <Text style={[styles.textButtons, {color: selectedType === "Petróleo" ? "#03B6E8" : "#C6C6C8",left: width / -40}]}>Petróleo</Text>
                </TouchableOpacity>
            </View>
            
            <View style={styles.datosC} >
                <View style={styles.datos} {...props}>
                    <ScrollView>
                        {filterNotifications(notifications).length === 0 ? (
                            <Text style={styles.noNotificacion}>No posee notificaciones pendientes</Text> 
                        ) : (
                        filterNotifications(notifications).map((notification, index) =>
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
        height:height / 1.4,
        width: width,
        position:"absolute",
        bottom: 0,
        paddingTop: height / 100,
        backgroundColor:"#fff",
        borderTopEndRadius: height / 40,
        borderTopStartRadius:height / 40
    },
    datosCButtons:{
        height:height / 16,
        width: width,
        alignSelf:"center",
        position:"absolute",
        bottom: height/ 1.35,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
    },
    imageButtons:{
        width:width / 11, 
        height: height / 30,
        tintColor:"black",
    },
    datos:{
        alignSelf:"center",
        width:width / 1.05,
    },
    label:{
        flexDirection:"row",
        height: height / 12,
    },
    line:{
        height:1, 
        backgroundColor:"#d9d9d9", 
        width:width , 
        alignSelf:"center"
    },
    image:{
        width:width / 10, 
        height: height / 22,
        tintColor:"black",
        alignSelf: "center"
    },
    text:{
        fontFamily:"Lato-Bold",
        alignSelf: "center",
        textAlign: "center",
        left: width / 100,
        width: width / 1.26
    },
    hora:{
        left:-20, 
        color:"#87847a",
        top:2, 
    },notificationContainer: {
        borderBottomColor: "#d9d9d9",
        paddingVertical: height / 40,
        shadowColor: "#87847a",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.01,    
        shadowRadius: 3.84,
        elevation:2,
        marginLeft: 10,
        marginRight:10,
    },notificationContainerFirst: {
        borderBottomColor: "#d9d9d9",
        paddingVertical: height / 40,
        shadowColor: "#87847a",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        marginLeft: 10,
        marginRight:10,
        shadowOpacity: 0.01,
        shadowRadius: 3.84,
        elevation:2,
        margin: 10,
        borderLeftColor: "#03B6E8",
        borderLeftWidth: 5,
    },
    notificationContent: {
        justifyContent: "flex-end",
        alignItems: "flex-end",
    },
    notificationType: {
        fontFamily: "Lato-Bold",
        fontSize: fontScale * 19,
        textAlign:"left",
        color:"#03B6E8",
        marginRight: width / 10,
        marginLeft: width / 10,
        bottom: height / 29,
        textAlign: "left",
    },
    notificationTime: {
        color: "#a7a7a8",
        fontSize: fontScale * 19,
        left: width / 9.9, 
        top: width / - 20,
        fontFamily:"Lato-Bold",
        textAlign: "left",
    },
    notificacionTitulo:{
        fontSize: fontScale * 26,
        fontFamily: "Lato-Bold",
        left: width / 10, 
        textAlign: "left",
        bottom: height / 62,
        marginRight: width / 7
    },
    notificationMessage: {
        textAlign: "left",
        fontSize: fontScale * 19,
        marginLeft: width / 10,
        fontFamily: "Lato-Regular",
        bottom: height / 180,
        marginRight: width / 10
    },
    relleno:{
        height: height / 70
    },
    containerButtons:{
        flexDirection:"row",
    },
    textButtons:{
        fontFamily:"Lato-Bold",
        fontSize: fontScale * 18,
        top: height / 200
    },
    closeButton:{
        height: height / 27,
        width: width / 12,
        right: width / 46,
        bottom: height / 100,
    },
    noNotificacion:{
        fontFamily:"Lato-Bold",
        alignSelf:"center",
        marginTop: height / 25,
        fontSize: fontScale * 20
    },
})