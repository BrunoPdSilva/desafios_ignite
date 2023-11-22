import { View, Text, StyleSheet } from "react-native"
import { Header } from "../../components/Header"
import { AddTaskForm } from "../../components/AddTaskForm"

export function Home() {
  return (
    <View style={styles.container}>
      <Header />
      <AddTaskForm />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
})
