import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native"
import PlusIcon from "../../assets/plus-icon.svg"

export function AddTaskForm() {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Adicione uma nova tarefa"
        placeholderTextColor="#808080"
      />

      <TouchableOpacity style={styles.button}>
        <PlusIcon />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 24,
    flexDirection: "row",
    gap: 4,
    position: "absolute",
    top: 142,
  },
  input: {
    flex: 1,
    padding: 16,
    height: 52,
    backgroundColor: "#262626",
    borderColor: "#0D0D0D",
    borderWidth: 1,
    borderRadius: 6,
    fontSize: 16,
    color: "#FFF"
  },
  button: {
    height: 52,
    width: 52,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1E6F9F",
  },
})
