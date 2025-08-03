import { StyleSheet, Text, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"

const Day = ({day, isToday, isCurrentMonth}) => {
    const navigation = useNavigation()

    const handlePress = () => {
        const dayStr = day.toISOString().split('T')[0]
        console.log(dayStr)
        navigation.navigate('Tasks', {date: dayStr})
    }

    return(
        <TouchableOpacity style={styles.day} onPress={handlePress}>
            <Text style={[styles.text,isToday ? styles.Today : null, isCurrentMonth ? null : styles.other]}>{day.getDate()}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    Today: {
        backgroundColor: "#5c5c5c",
        fontWeight: "800"
    },
    day: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
    },
    text: {
        color: 'white',
        padding: 10,
    },
    other: {
        color: 'gray'
    }
})

export default Day