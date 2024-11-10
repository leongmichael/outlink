import { Image, StyleSheet, Platform, ScrollView } from 'react-native';
import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTheme } from 'react-native-paper';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { TextInput, Button, Checkbox } from 'react-native-paper';

export default function SignUp() {
  const theme = useTheme();
  const [errors, setErrors] = useState({});
  const [showDatePicker, setShowDatePicker] = useState(false);

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

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.zipcode) newErrors.zipcode = 'Zipcode is required';
    if (!formData.gender) newErrors.gender = 'Please select a gender';
    
    if (!Object.values(formData.preferences).some(pref => pref)) {
      newErrors.preferences = 'Please select at least one preference';
    }

    if (!formData.birthdate) newErrors.birthdate = 'Birthdate is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log(formData);
    }
  };

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setFormData({...formData, birthdate: selectedDate});
    }
  };

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.formContainer}>
        <ThemedText type="title" style={styles.title}>Sign Up</ThemedText>

        <TextInput
          label="Email *"
          value={formData.email}
          onChangeText={(text) => setFormData({...formData, email: text})}
          style={styles.input}
          mode="outlined"
          activeOutlineColor="#6A8A73"
          outlineColor={errors.email ? '#FF0000' : '#6A8A73'}
          error={!!errors.email}
          helperText={errors.email}
        />

        <TextInput
          label="Password *"
          value={formData.password}
          onChangeText={(text) => setFormData({...formData, password: text})}
          secureTextEntry
          style={styles.input}
          mode="outlined"
          activeOutlineColor="#6A8A73"
          outlineColor={errors.password ? '#FF0000' : '#6A8A73'}
          error={!!errors.password}
          helperText={errors.password}
        />

        <TextInput
          label="Full Name *"
          value={formData.name}
          onChangeText={(text) => setFormData({...formData, name: text})}
          style={styles.input}
          mode="outlined"
          activeOutlineColor="#6A8A73"
          outlineColor={errors.name ? '#FF0000' : '#6A8A73'}
          error={!!errors.name}
        />
        {errors.name && (
          <ThemedText style={styles.errorText}>{errors.name}</ThemedText>
        )}

        <ThemedText style={styles.label}>Birthdate *</ThemedText>
        {errors.birthdate && (
          <ThemedText style={styles.errorText}>{errors.birthdate}</ThemedText>
        )}
        <Button
          mode="outlined"
          onPress={() => setShowDatePicker(true)}
          style={[styles.dateButton, errors.birthdate && styles.dateButtonError]}
          textColor="#6A8A73"
        >
          {formData.birthdate 
            ? formData.birthdate.toLocaleDateString() 
            : 'Select Birthdate'}
        </Button>

        {showDatePicker && (
          <DateTimePicker
            value={formData.birthdate || new Date()}
            onChange={onDateChange}
            mode="date"
            maximumDate={new Date()}
          />
        )}

        <ThemedText style={styles.label}>Preferences *</ThemedText>
        {errors.preferences && (
          <ThemedText style={styles.errorText}>{errors.preferences}</ThemedText>
        )}
        <ThemedView style={styles.checkboxGroup}>
          <Checkbox.Item 
            label="Land Activities" 
            status={formData.preferences.land ? 'checked' : 'unchecked'}
            onPress={() => setFormData({...formData, preferences: {...formData.preferences, land: !formData.preferences.land}})}
            color="#6A8A73"
          />
          <Checkbox.Item 
            label="Water Activities" 
            status={formData.preferences.water ? 'checked' : 'unchecked'}
            onPress={() => setFormData({...formData, preferences: {...formData.preferences, water: !formData.preferences.water}})}
            color="#6A8A73"
          />
          <Checkbox.Item 
            label="Casual Activities" 
            status={formData.preferences.casual ? 'checked' : 'unchecked'}
            onPress={() => setFormData({...formData, preferences: {...formData.preferences, casual: !formData.preferences.casual}})}
            color="#6A8A73"
          />
          <Checkbox.Item 
            label="Competitive Sports" 
            status={formData.preferences.competitive ? 'checked' : 'unchecked'}
            onPress={() => setFormData({...formData, preferences: {...formData.preferences, competitive: !formData.preferences.competitive}})}
            color="#6A8A73"
          />
        </ThemedView>

        <ThemedText style={styles.label}>Gender *</ThemedText>
        {errors.gender && (
          <ThemedText style={styles.errorText}>{errors.gender}</ThemedText>
        )}
        <ThemedView style={styles.checkboxGroup}>
          {['Male', 'Female', 'Do not wish to state', 'Other'].map((option) => (
            <Checkbox.Item
              key={option}
              label={option}
              status={formData.gender === option ? 'checked' : 'unchecked'}
              onPress={() => setFormData({...formData, gender: option})}
              color="#6A8A73"
            />
          ))}
        </ThemedView>

        <TextInput
          label="City *"
          value={formData.city}
          onChangeText={(text) => setFormData({...formData, city: text})}
          style={styles.input}
          mode="outlined"
          activeOutlineColor="#6A8A73"
          outlineColor={errors.city ? '#FF0000' : '#6A8A73'}
          error={!!errors.city}
        />
        {errors.city && (
          <ThemedText style={styles.errorText}>{errors.city}</ThemedText>
        )}

        <TextInput
          label="Zipcode *"
          value={formData.zipcode}
          onChangeText={(text) => setFormData({...formData, zipcode: text})}
          style={styles.input}
          mode="outlined"
          keyboardType="numeric"
          activeOutlineColor="#6A8A73"
          outlineColor={errors.zipcode ? '#FF0000' : '#6A8A73'}
          error={!!errors.zipcode}
        />
        {errors.zipcode && (
          <ThemedText style={styles.errorText}>{errors.zipcode}</ThemedText>
        )}

        <Button 
          mode="contained" 
          style={styles.submitButton} 
          buttonColor="#6A8A73"
          onPress={handleSubmit}>
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
    marginTop: 45,
    textAlign: 'center',
    color: '#6A8A73',
  },
  input: {
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 5,
    color: '#6A8A73',
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
  errorText: {
    color: '#FF0000',
    fontSize: 12,
    marginTop: -5,
    marginBottom: 5,
  },
  datePicker: {
    marginBottom: 15,
  },
  datePickerError: {
    borderColor: '#FF0000',
  },
  dateButton: {
    marginBottom: 15,
    borderColor: '#6A8A73',
  },
  dateButtonError: {
    borderColor: '#FF0000',
  },
});
