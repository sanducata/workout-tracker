import { useAuth } from '@/context/AuthContext';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

export const SignupScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const { onSignup } = useAuth();

  const handleSignup = async (
    username: string,
    email: string,
    password: string
  ) => {
    try {
      await onSignup!(username, email, password);
      router.replace('/(protected)');
    } catch (error) {
      console.error('An error has occured: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an account</Text>
      <TextInput
        label={'Username'}
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        label={'Email'}
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType={'email-address'}
      />
      <TextInput
        label={'Password'}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button
        mode={'contained'}
        onPress={() => handleSignup(username, email, password)}
        style={styles.button}
      >
        Sign up
      </Button>
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
});

export default SignupScreen;
