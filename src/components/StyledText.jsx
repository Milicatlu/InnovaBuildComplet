import { Text, StyleSheet } from "react-native"
import { theme } from "../../src/theme.js"
const styles = StyleSheet.create({
    text: {
        fontSize: theme.fontSizes.body,
        color: theme.colors.textPrimary,
        fontWeight: theme.fontsWeight.normal,
        fontFamily: theme.fonts.main,
    },
    bold: {
        fontWeight: theme.fontsWeight.bold,
    },
    subheading1: {
        fontSize: theme.fontSizes.subheading1,
    },
    subheading2: {
        fontSize: theme.fontSizes.subheading2,
    },
    subheading3: {
        fontSize: theme.fontSizes.subheading3,
    },
    parrafo: {
        fontSize: theme.fontSizes.parrafo,
    },
    colorPrimary: {
        color: theme.colors.textPrimary,
    },
    colorTerciary: {
        color: theme.colors.textTerciary,
    },
    colorRojo:{
        color: theme.colors.textRojo,
    },
    colorSecondary: {
        color: theme.colors.textSecondary,
    },
    center: {
        textAlign: "center",
        textAlignVertical: "center",
    },
    italic: {
        fontStyle: "italic",
    },
})

export function StyledText({
    color,
    children,
    subheading,
    fontWeight,
    fontSize,
    align,
    style,
    fontStyle,
    ...restOfProps
}) {
    const textStyles = [
        styles.text,
        color === "primary" && styles.colorPrimary,
        color === "secondary" && styles.colorSecondary,
        color === "terciary" && styles.colorTerciary,
        color === 'rojo' && styles.colorRojo,
        fontSize === "subheading1" && styles.subheading1,
        fontSize === "subheading2" && styles.subheading2,
        fontSize === "subheading3" && styles.subheading3,
        fontSize === "parrafo" && styles.parrafo,
        fontStyle === "italic" && styles.italic,
        fontWeight === "bold" && styles.bold,
        align == "center" && styles.center,
        style,
    ]
    return (
        <Text style={[textStyles, style]} {...restOfProps}>
            {children}
        </Text>
    )
}