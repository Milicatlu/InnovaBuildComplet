//RESPONSIVE
import React from "react"
import {
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    fontSize,
} from "react-native"
import { StyledText } from "./StyledText"
//import { FaPencilAlt } from 'react-icons/fa';
const image = { uri: "https://reactjs.org/logo-og.png" }
export function StyledButton({
    styledProps,
    onPress,
    style,
    children,
    styleContainer,
}) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.bolsas, styleContainer]}
        >
            <StyledText
                {...styledProps}
                style={[style]}
                align="center"
                color="primary"

            >
                {children}
            </StyledText>
        </TouchableOpacity>
    )
}

export function StyledButton2({
    styledProps,
    onPress,
    style,
    children,
    styleContainer,
}) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.bolsas, styleContainer]}
        >
            <StyledText
                {...styledProps}
                style={[style]}
                align="center"
                color="textSecondary"
            >
                {children}
            </StyledText>
        </TouchableOpacity>
    )
}
export function StyledButtonAgri({
    styledProps,
    onPress,
    style,
    children,
    styleContainer,
}) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.bolsas, styleContainer]}
        >
            <StyledText
                {...styledProps}
                style={[style]}
                align="center"
                color="#FFF"
                fontSize={20}
            >
                {children}
            </StyledText>
        </TouchableOpacity>
    )
}

export function StyledButton22(props) {
    return (
        <TouchableOpacity
            onPress={props.onPress}
            style={[styles.vacio, props.styleContainer]}
        >
            <StyledText style={props.style} align="center" color="primarycolor">
                {props.children}
            </StyledText>
        </TouchableOpacity>
    )
}

export function StyledButton3(props) {
    return (
        <TouchableOpacity onPress={props.onPress} style={styles.rec}>
            <StyledText style={props.style} align="center" color="primary">
                {props.children}
            </StyledText>
        </TouchableOpacity>
    )
}

export function StyledButton4(props) {
    return (
        <TouchableOpacity onPress={props.onPress} style={styles.btnBotton}>
            <StyledText style={props.style} align="center" color="primary">
                {props.children}
            </StyledText>
        </TouchableOpacity>
    )
}
export function BotonGrafico({
    styledProps,
    onPress,
    style,
    children,
    styleContainer,
   
}) {
    return (
         
            <TouchableOpacity
                onPress={onPress}
                style={[styles.bolsas2, styleContainer]}
            >
                <StyledText
                    {...styledProps}
                    style={[style]}
                    align="center"
                    color="primary"
                >
                    {children}
                </StyledText>
            </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    bolsas: {
        width: "50%",
        marginTop: 20,
        marginBottom: 10,
        padding: 10,
        height: 50,
        textAlign: "center",
        justifyContent: "center",
        borderRadius: 15,
        borderWidth: 2.5,
        borderColor: "#03B6E8",
    },
    lleno: {
        width: "100%",
        backgroundColor: "#03B6E8",
        color: "#fff",
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        fontSize: 18,
    },
    rec: {
        backgroundColor: "#03B6E8",
        flex: 1,
        width: "90%",
        maxHeight: "20%",
        justifyContent: "center",
        margin: 10,
    },
    btnBotton: {
        width: "100%",
        marginTop: 10,
        padding: 10,
        backgroundColor: "#03B6E8",
        justifyContent: "center",
        alignItems: "center",
    },

    btnGrafic: {
        width: "35%",
        marginTop: 10,
        padding: 10,
        backgroundColor: "#03B6E8",
        justifyContent: "center",
        alignItems: "center",
    },
    bolsas2:{
        width: "30%",
        marginTop: 20,
        marginBottom: 10,
        padding: 10,
        height: 50,
        textAlign: "center",
        justifyContent: "center",
        borderRadius: 15,
        borderWidth: 2.5,
        borderColor: "#03B6E8",
        
    }
})