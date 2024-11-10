import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { TextInput, Button } from 'react-native-paper';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const API_URL = 'http://localhost:8080';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (validateForm()) {
      try {
        const loginData = {
          email,
          password,
        };
        
        const response = await fetch(`${API_URL}/user/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(loginData)
        });

        if (!response.ok) {
          const errorData = await response.json();
          setErrors(prev => ({
            ...prev,
            submit: errorData.mssg || 'Login failed. Please try again.'
          }));
          return;
        }

        const data = await response.json();
        console.log('Login successful:', data);
        
        // Navigate to home page on successful login
        router.replace('/(tabs)/');
        
      } catch (error) {
        console.error('Login error:', error);
        setErrors(prev => ({
          ...prev,
          submit: 'Login failed. Please try again.'
        }));
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.formContainer}>
        <ThemedText type="title" style={styles.title}>Welcome Back!</ThemedText>
        
        <TextInput
          label="Email *"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          mode="outlined"
          activeOutlineColor="#6A8A73"
          outlineColor={errors.email ? '#FF0000' : '#6A8A73'}
          error={!!errors.email}
        />
        {errors.email && (
          <ThemedText style={styles.errorText}>{errors.email}</ThemedText>
        )}
        
        <TextInput
          label="Password *"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
          mode="outlined"
          activeOutlineColor="#6A8A73"
          outlineColor={errors.password ? '#FF0000' : '#6A8A73'}
          error={!!errors.password}
        />
        {errors.password && (
          <ThemedText style={styles.errorText}>{errors.password}</ThemedText>
        )}

        {errors.submit && (
          <ThemedText style={styles.errorText}>{errors.submit}</ThemedText>
        )}
        
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
  errorText: {
    color: '#FF0000',
    fontSize: 12,
    marginTop: -5,
    marginBottom: 5,
  },
});

export default Login;
