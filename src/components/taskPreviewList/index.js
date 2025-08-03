import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { fetchTasks } from "../../../database";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";

const TaskPreviewList = () => {
  const [tasks, setTasks] = useState([]);
  const navigation = useNavigation();

  const loadTasks = async () => {
    const allTasks = await fetchTasks();
    setTasks(allTasks.slice(0, 5));
  };

  useFocusEffect(
    useCallback(() => {
      loadTasks();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your tasks</Text>

      {tasks.length === 0 ? (
        <Text style={styles.noTasks}>No tasks yet</Text>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.taskCard}>
              <Text style={styles.taskText}>{item.description}</Text>
            </View>
          )}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Tasks")}>
        <Text style={styles.buttonText}>View all</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TaskPreviewList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1e1e1e",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4,
    margin: 16,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#ffffff",
  },
  noTasks: {
    fontStyle: "italic",
    color: "#aaaaaa",
    textAlign: "center",
  },
  taskCard: {
    backgroundColor: "#2c2c2e",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#3a3a3c",
  },
  taskText: {
    fontSize: 15,
    color: "#ffffff",
  },
  button: {
    marginTop: 12,
    paddingVertical: 10,
    backgroundColor: "#0A84FF",
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
});
