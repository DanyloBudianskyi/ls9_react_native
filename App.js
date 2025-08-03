import TaskScreen from './src/screens/TaskScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import TaskDetailsScreen from './src/screens/TaskDetailsScreen';

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor: '#1e1e1e'
        },
        headerTintColor: '#ffffff'
      }}>
        <Stack.Screen name='Home' component={HomeScreen} options={{headerShown: false}}/>
        <Stack.Screen name='Tasks' component={TaskScreen}/>
        <Stack.Screen name='TaskDetails' component={TaskDetailsScreen}/>
      </Stack.Navigator>
    </NavigationContainer>

  );
}
