import { TouchableOpacity, View, Text, StyleSheet } from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { changeTaskStatus } from "../../../database";
import { format } from "date-fns";


const Task = ({item, handleDeleteTask, loadTasks}) => {
    const navigation = useNavigation()

    const updateTask = async (item) => {
        await changeTaskStatus(item.id, item.isCompleted ? 0 : 1)
        loadTasks()
    }

    return(
        <View style={styles.taskItemContainer}>
            <TouchableOpacity style={styles.taskItem} 
                onPress={() => {
                    navigation.navigate('TaskDetails', {
                        task: item,
                        loadTasks: loadTasks
                    })
                }}
            >
                <Text style={styles.taskText}>{item.description}</Text>
                <Text style={{color: '#ffffff'}}>
                    {format(new Date(item.date), 'dd.MM.yyyy')}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                    updateTask(item);
                }}>
                <Ionicons
                    name={item.isCompleted ? 'checkmark-circle' : 'ellipse-outline'}
                    size={24}
                    color={item.isCompleted ? '#4CAF50' : '#aaa'}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
                <Ionicons name="trash-outline" size={24} color="#ff5c5c" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    taskItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 6,
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: '#333',
        borderRadius: 8,
        borderColor: '#444',
        borderWidth: 1,
        width: '100%',
    },
    taskItem: {
        flex: 1,
        padding: 10,
    },
    taskText: {
        fontSize: 16,
        color: '#f0f0f0',  
    },
})

export default Task