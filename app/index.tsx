import { useAuth } from '@/context/AuthContext';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { onLogin } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Workout Tracker login page</Text>
      <TextInput
        label='Email'
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType='email-address'
      />
      <TextInput
        label='Password'
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button
        mode='contained'
        onPress={async () => onLogin!(email, password)}
        style={styles.button}
      >
        Log in
      </Button>
      <Text>Don't have an account? </Text>
      <Link href={'/(signup)'} style={styles.link}>
        <Text>Sign up!</Text>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    marginBottom: 10,
  },
  button: {
    width: '100%',
    marginBottom: 10,
  },
  link: { color: 'blue' },
});

export default LoginScreen;
