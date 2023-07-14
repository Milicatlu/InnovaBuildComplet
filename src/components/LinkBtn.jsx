//RESPONSIVE
import { Link } from "@react-navigation/native"
import { StyleSheet } from "react-native"

export function LinkBtn({ to, children }) {
   return (
      <Link style={styles.link} to={to}>{children}</Link>
   )
}

const styles = StyleSheet.create({
   link: {
      borderWidth: 2,
      borderRadius: 15,
      borderColor: "#03B6E8",
      flex: 1,
      color: "#ffffff",
      width: 217,
      maxHeight: "22%",
      justifyContent: 'center',
      textAlign: 'center',
      textAlignVertical: 'center',
      margin: 10
   },
})