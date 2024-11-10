import { Image, StyleSheet, Platform, ScrollView } from 'react-native';
import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { TextInput, Button, Checkbox } from 'react-native-paper';

export default function SignUp() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    birthdate: new Date(),
    preferences: {
      land: false,
      water: false,
      casual: false,
      competitive: false,
    },
    gender: '',
    city: '',
    zipcode: '',
  });

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.formContainer}>
        <ThemedText type="title" style={styles.title}>Sign Up</ThemedText>

        <TextInput
          label="Email"
          value={formData.email}
          onChangeText={(text) => setFormData({...formData, email: text})}
          style={styles.input}
          mode="outlined"
        />

        <TextInput
          label="Password"
          value={formData.password}
          onChangeText={(text) => setFormData({...formData, password: text})}
          secureTextEntry
          style={styles.input}
          mode="outlined"
        />

        <TextInput
          label="Full Name"
          value={formData.name}
          onChangeText={(text) => setFormData({...formData, name: text})}
          style={styles.input}
          mode="outlined"
        />

        <ThemedText style={styles.label}>Birthdate</ThemedText>
        <DateTimePicker
          value={formData.birthdate}
          onChange={(event, date) => date && setFormData({...formData, birthdate: date})}
          mode="date"
        />

        <ThemedText style={styles.label}>Preferences</ThemedText>
        <ThemedView style={styles.checkboxGroup}>
          <Checkbox.Item label="Land Activities" status={formData.preferences.land ? 'checked' : 'unchecked'}
            onPress={() => setFormData({...formData, preferences: {...formData.preferences, land: !formData.preferences.land}})} />
          <Checkbox.Item label="Water Activities" status={formData.preferences.water ? 'checked' : 'unchecked'}
            onPress={() => setFormData({...formData, preferences: {...formData.preferences, water: !formData.preferences.water}})} />
          <Checkbox.Item label="Casual Activities" status={formData.preferences.casual ? 'checked' : 'unchecked'}
            onPress={() => setFormData({...formData, preferences: {...formData.preferences, casual: !formData.preferences.casual}})} />
          <Checkbox.Item label="Competitive Sports" status={formData.preferences.competitive ? 'checked' : 'unchecked'}
            onPress={() => setFormData({...formData, preferences: {...formData.preferences, competitive: !formData.preferences.competitive}})} />
        </ThemedView>

        <ThemedText style={styles.label}>Gender</ThemedText>
        <ThemedView style={styles.radioGroup}>
          {['Male', 'Female', 'Do not wish to state', 'Other'].map((option) => (
            <Button
              key={option}
              mode={formData.gender === option ? 'contained' : 'outlined'}
              onPress={() => setFormData({...formData, gender: option})}
              style={styles.radioButton}
            >
              {option}
            </Button>
          ))}
        </ThemedView>

        <TextInput
          label="City"
          value={formData.city}
          onChangeText={(text) => setFormData({...formData, city: text})}
          style={styles.input}
          mode="outlined"
        />

        <TextInput
          label="Zipcode"
          value={formData.zipcode}
          onChangeText={(text) => setFormData({...formData, zipcode: text})}
          style={styles.input}
          mode="outlined"
          keyboardType="numeric"
        />

        <Button mode="contained" style={styles.submitButton} onPress={() => console.log(formData)}>
          Sign Up
        </Button>
      </ThemedView>
    </ScrollView>
  );
}

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
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 5,
  },
  checkboxGroup: {
    gap: 5,
  },
  radioGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 10,
  },
  radioButton: {
    flex: 1,
    minWidth: '45%',
  },
  submitButton: {
    marginTop: 20,
    paddingVertical: 8,
  },
});
