import { View, TextInput, Button, StyleSheet, Modal } from "react-native";
import { useState } from "react";

function GoalInput(props) {
  const [enteredGoalText, setEnteredGoalText] = useState("");

  function goalInputHandler(enteredText) {
    setEnteredGoalText(enteredText);
  }

  function addGoalHandler() {
    if (enteredGoalText.trim().length > 0) {
      props.onAddGoal(enteredGoalText);
      setEnteredGoalText(""); // Giriş kutusunu temizle
    }
  }

  return (
    <View style={styles.inputcnontainer}>
      <TextInput style={styles.TextInput} placeholder="Enter your new achievement..." onChangeText={goalInputHandler} value={enteredGoalText} />

      <View style={{ flexDirection: "row", justifyContent: "space-between", width: "60%" }}>
        <Button title="< Back" color={"red"} onPress={props.onCancel} />
        <Button title="Add +" onPress={addGoalHandler} />
      </View>
    </View>
  );
}

export default GoalInput;

const styles = StyleSheet.create({
  inputcnontainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E8F8FF",
    flex: 1,
  },

  TextInput: {
    width: "80%",
    borderColor: "#D1D2E0",
    borderWidth: 1,
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 60,
    marginBottom: 10,
    alignContent: "center",
    textAlign: "center",
  }

});
