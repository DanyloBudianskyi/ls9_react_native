import { StyleSheet, View, Text } from "react-native"

const Day = ({day, isToday, isCurrentMonth}) => {
    return(
        <View style={styles.day}>
            <Text style={[styles.text,isToday ? styles.Today : null, isCurrentMonth ? null : styles.other]}>{day.getDate()}</Text>
        </View>
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