import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { TextInput, Button } from 'react-native-paper';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    
  };

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.formContainer}>
        <ThemedText type="title" style={styles.title}>Sign In</ThemedText>
        
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          mode="outlined"
          activeOutlineColor="#6A8A73"
          outlineColor="#6A8A73"
        />
        
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
          mode="outlined"
          activeOutlineColor="#6A8A73"
          outlineColor="#6A8A73"
        />
        
        <Button 
          mode="contained" 
          style={styles.submitButton} 
          buttonColor="#6A8A73"
          onPress={handleLogin}>
          Login
        </Button>
        
        <Button 
          mode="text" 
          onPress={() => router.push('/signup')}
          textColor="#6A8A73">
          Don't have an account? Sign Up
        </Button>
      </ThemedView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  formContainer: {
    padding: 20,
    gap: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    marginTop: 45,
    textAlign: 'center',
    color: '#6A8A73',
  },
  input: {
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  submitButton: {
    marginTop: 20,
    paddingVertical: 8,
  },
});

export default LoginScreen;
