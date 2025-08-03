import { useState } from "react"
import { TextInput, View, TouchableOpacity, Text, StyleSheet } from "react-native"
import { updateTask } from "../../database"

const TaskDetailsScreen = ({route, navigation}) => {
    const {task, loadTasks} = route.params
    const[taskText, setTaskText] = useState(task.description)
    
    const saveTask = async () => {
        if (!taskText.trim()) {
            alert('Task text cannot be empty');
            return;
        }

        await updateTask(task.id, taskText)
        loadTasks()
        navigation.goBack();
    };


    return(
        <View style={styles.container}>
            <Text style={styles.label}>Task details</Text>
            <TextInput
                value={taskText}
                onChangeText={setTaskText}
                multiline
                style={styles.input}
            />
            <TouchableOpacity onPress={saveTask} style={styles.addButton}>
                <Text style={styles.addButtonText}>Save</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#262626",
        padding: 16,
    },
    addButton: {
        marginTop: 12,
        paddingVertical: 14,
        backgroundColor: "#0A84FF",
        borderRadius: 8,
        alignItems: "center",
    },
    addButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        backgroundColor: '#fff',
        fontSize: 16,
        marginBottom: 10,
    },
    label: {
        color: "#ffffff",
        fontSize: 18,
        marginBottom: 8,
        fontWeight: "600",
    },
})

export default TaskDetailsScreen