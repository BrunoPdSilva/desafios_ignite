import { View, StyleSheet } from "react-native"
import Logo from "../../assets/logo.svg"

export function Header() {
  return (
    <View style={styles.headerContainer}>
      <Logo width={110} height={32} />
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 172,
    backgroundColor: "#0D0D0D",
    justifyContent: "center",
    alignItems: "center",
  },
})
