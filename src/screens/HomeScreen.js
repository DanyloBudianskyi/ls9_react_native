import { View, StyleSheet, useWindowDimensions } from "react-native";
import Calendar from "../components/calendar";
import { useEffect } from "react";
import { createTable } from "../../database";
import TaskPreviewList from "../components/taskPreviewList";

const HomeScreen = () => {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  useEffect(() => {
    createTable();
  }, []);

  return (
    <View style={[styles.container, isLandscape && styles.containerLandscape]}>
      <View style={styles.section}>
        <Calendar />
      </View>
      <View style={styles.section}>
        <TaskPreviewList />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    backgroundColor: '#262626',
  },
  containerLandscape: {
    flexDirection: 'row',
  },
  section: {
    flex: 1,
    padding: 10,
  },
});

export default HomeScreen;
