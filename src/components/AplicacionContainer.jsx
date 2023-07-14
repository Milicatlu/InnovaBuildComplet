//RESPONSIVE 
import { StyleSheet, Dimensions, ImageBackground } from "react-native"
import { StyledText } from "./StyledText"
import { theme } from "../theme"
import { Link } from "react-router-native"


export function AplicacionContainer({ item }) {
   return (
      <ImageBackground source={require("../../assets/images/Agricultura.png")} style={styles.container} imageStyle={{ borderRadius: 15 }}>
         <Link to={item.uri}>
            <StyledText
               fontSize="subheading2"
               fontWeight="bold"
               color="primary"
               align="center"
            >
               {item.name}
            </StyledText>
         </Link>
      </ImageBackground>
   )
}

const styles = StyleSheet.create({
   container: {
      margin: 10,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors.primaryBackgroundColor,
      height: Dimensions.get("window").height / 5,
      width: (Dimensions.get("window").width / 100) * 80,
      borderRadius: 15,
   },
})