import { addWorkoutPlan, checkDB, initDatabase } from '@/lib/database';
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function HomeScreen() {
  useEffect(() => {
    // Initialize the database when the screen loads
    initDatabase();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Workout Tracker</Text>
      <Button
        title={'Start Workouttt'}
        onPress={() =>
          addWorkoutPlan('back and biceps', 'we train like hercules')
        }
      />
      <Button title={'check db'} onPress={() => checkDB()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
