import { useState, useEffect } from "react"
import { Alert, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { fetchTasksByDate, insertTask, deleteTask, fetchTasks } from "../../database"
import { format } from "date-fns"
import Task from "../components/task";

const TaskScreen = ({route}) => {
    const [taskText, setTaskText] = useState('')
    const [tasks, setTasks] = useState([])
    const {date} = route.params || {}

    const loadTasks = async () => {
        const data = date ? await fetchTasksByDate(date) : await fetchTasks()
        setTasks(data)
    };

    const addTask = async () => {
        if (!taskText.trim()) {
            alert('Task text cannot be empty')
            return
        }

        const taskDate = date || format(new Date(), "yyyy-MM-dd")

        await insertTask(taskText, taskDate)
        setTaskText('')
        await loadTasks()

        Alert.alert('Task added', `For the date: ${taskDate}`);
    }

    const handleDeleteTask = async (id) => {
        Alert.alert(
            'Delete Task',
            'Are you sure you want to delete this task?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        await deleteTask(id)
                        await loadTasks()
                    },
                },
            ],
            { cancelable: false }
        );
    };

    useEffect(() => {
        const fetchData = async () => {
            await loadTasks();
        };
        fetchData();
    }, [])

    return(
        <View style={styles.container}>
            <View>
                <Text style={styles.label}>Add new task:</Text>
                <TextInput 
                    placeholder="Enter your task details here"
                    value={taskText}
                    onChangeText={setTaskText}
                    multiline
                    style={styles.input}
                />
                <TouchableOpacity onPress={addTask} style={styles.addButton}>
                    <Text style={styles.addButtonText}>Add task</Text>
                </TouchableOpacity>
            </View>
            <View style={{alignItems: 'center'}}>
                <Text style={styles.label}>{date ? `Your tasks on ${date}:`: 'All tasks'}</Text>
                {Array.isArray(tasks) && tasks.length === 0 ? (<Text style={{color: 'white', fontSize: 18, }}>{date ? 'No tasks on this day': 'Your don\'t have any tasks'}</Text>) : (<FlatList
                    data={tasks}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => (
                        <Task item={item} handleDeleteTask={handleDeleteTask} loadTasks={loadTasks}/>
                    )}
                />)}
                
            </View>
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


export default TaskScreen