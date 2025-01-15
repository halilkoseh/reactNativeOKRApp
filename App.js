import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View, Pressable, Alert, Button, Modal, Image , TouchableOpacity} from "react-native";

import GoalInput from "./components/GoalInput"; // Ensure this component exists and is properly implemented

export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [courseGoals, setCourseGoals] = useState([]);
  const [clickCounts, setClickCounts] = useState({});

  function startAddGoalHandler() {
    setModalIsVisible(true);
  }

  function endAddGoalHandler() {
    setModalIsVisible(false);
  }

  function addGoalHandler(enteredGoalText) {
    if (enteredGoalText.trim().length === 0) return; // Prevent empty input
    setCourseGoals((currentCourseGoals) => [...currentCourseGoals, { id: Math.random().toString(), text: enteredGoalText }]);
    setModalIsVisible(false); // Close modal after adding a goal
  }

  function handleGoalClick(goalId) {
    setClickCounts((prevClickCounts) => {
      const updatedCounts = { ...prevClickCounts };
      if (!updatedCounts[goalId]) {
        updatedCounts[goalId] = 1;
      } else {
        updatedCounts[goalId] += 1;
      }

      if (updatedCounts[goalId] === 2) {
        Alert.alert("Dikkat!", "Tekrar tıklarsanız bu hedef silinecektir.");
      } else if (updatedCounts[goalId] === 3) {
        setCourseGoals((currentGoals) => currentGoals.filter((goal) => goal.id !== goalId));
        delete updatedCounts[goalId];
      }

      return updatedCounts;
    });
  }

  return (
    <View style={styles.appContainer}>
      <Text style={styles.title}>OKR Goals Planner</Text>

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ textAlign: 'center', fontSize: 20, color: '#155E95', }}>
          Schedule your plans, {'\n'}
          success in life.
        </Text>
        <Image
          style={{
            height: 300, // Kare olması için yüksekliği belirleyin
            width: 300, // Genişlik yüksekliğe eşit
            resizeMode: 'cover', // Resmin içeriğini kareye sığdırır
          }}
          source={require('./assets/images/image1.png')}
        />


      </View>

      <Modal visible={modalIsVisible} animationType="slide">
        <GoalInput onAddGoal={addGoalHandler} onCancel={endAddGoalHandler} />
      </Modal>

      <View style={styles.listContainer}>
      <TouchableOpacity
  style={{
    backgroundColor: '#155E95',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  }}
  onPress={startAddGoalHandler}
>
  <Text style={{ 
    color: '#fff', 
    fontSize: 18, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    textDecorationLine: 'underline' // Altını çizer
  }}>
    Pin a Goal
  </Text>
</TouchableOpacity>

        <Text style={styles.listTitle}>Active Goals</Text>

        <ScrollView>
          {courseGoals.map((goal) => (
            <Pressable key={goal.id} onPress={() => handleGoalClick(goal.id)} style={({ pressed }) => [styles.goalItem, pressed ? { backgroundColor: "#D1D2E0" } : null]}>
              <Text>{goal.text}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: "#E8F8FF",
    padding: 20,
  },
  title: {
    marginTop: 30,
    fontStyle: "italic",
    textAlign: "center",
    padding: 20,
    backgroundColor: "#E8F8FF",
  },
  listContainer: {
    flex: 1,
    padding: 10,
  },
  listTitle: {
    fontSize: 18,
    fontStyle: "italic",
    textAlign: "center",
    marginBottom: 10,
    marginTop: 20,
  },
  goalItem: {
    padding: 10,
    marginVertical: 8,
    backgroundColor: "#FBFBFB",
    borderRadius: 6,
    borderColor: "#D1D2E0",
    borderWidth: 1,
  },
});
