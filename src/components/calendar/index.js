import { useState } from 'react';
import Day from '../day';
import { FlatList, StyleSheet, View, StatusBar, Platform, Text} from 'react-native';
import Header from '../header';

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date())
  
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)

    const startDayOfWeek = startOfMonth.getDay() || 7;

    const currentMonth = []
    for(let i = 0; i < endOfMonth.getDate(); i++){
        const day = new Date(startOfMonth)
        day.setDate(day.getDate() + i)
        currentMonth.push(day)
    }
  
    const prevMonthDays = [];
    for (let i = 0; i < startDayOfWeek - 1; i++) {
        const day = new Date(startOfMonth);
        day.setDate(day.getDate() - (startDayOfWeek - 1 - i));
        prevMonthDays.push(day);
    }

    const nextMonthDays = [];
    for (let i = 0; i < 42 - (prevMonthDays.length + currentMonth.length); i++) {
        const day = new Date(endOfMonth);
        day.setDate(day.getDate() + i + 1);
        nextMonthDays.push(day);
    }

    const days = [...prevMonthDays, ...currentMonth, ...nextMonthDays]

    const weeks = [];
    for (let i = 0; i < days.length; i += 7) {
        weeks.push(days.slice(i, i + 7));
    }

    const weekDays = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];

    function renderItem({item}){
        return(
            
            <View style={styles.week}>
                {item.map((day, key)=> (
                    <Day 
                        key={key} 
                        day={day} 
                        isToday={day.toDateString() === currentDate.toDateString()}
                        isCurrentMonth={day.getMonth() === currentDate.getMonth()}
                    />
                ))}
            </View>
        )
    }

    return(
        <View style={styles.container}>
            <View style={styles.calendarWrapper}>
                <Header currentDay={currentDate} setCurrentDay={setCurrentDate}/>
                <View style={styles.weekDay}>
                        {weekDays.map((day, index) => (
                        <Text key={index} style={styles.weekdayText}>{day}</Text>
                ))}
                </View>
                <FlatList data={weeks} renderItem={renderItem}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
  week: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  weekDay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    
  },
  weekdayText: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
    width: 40,
    height: 40,
    color: 'white'
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    width: "100%",
  },
  calendarWrapper: {
    flex: 1,
    paddingHorizontal: 10,
    width: 320, // или 300, или % от экрана
    },
})


export default Calendar