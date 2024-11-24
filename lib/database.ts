import * as SQLite from 'expo-sqlite';

export async function initDatabase() {
  try {
    // Open the database asynchronously
    const db = await SQLite.openDatabaseAsync('workout_tracker.db');

    // Execute SQL command directly as a string
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS workout_plans (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('Table created successfully!');
  } catch (error) {
    console.error('Error initializing the database:', error);
  }
}

// Insert a workout plan into the database
export async function addWorkoutPlan(name: string, description: string) {
  const db = await SQLite.openDatabaseAsync('workout_tracker.db');
  try {
    await db.runAsync(
      'INSERT INTO workout_plans (name, description) VALUES (?, ?);',
      [name, description]
    );
    console.log('Workout plan added successfully!');
  } catch (error) {
    console.error('Error adding workout plan:', error);
  }
}

export async function checkDB() {
  const db = await SQLite.openDatabaseAsync('workout_tracker.db');
  const allRows = await db.getAllAsync('SELECT * FROM workout_plans');

  console.log('allRows ', allRows);
}
