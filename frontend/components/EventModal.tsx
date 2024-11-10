import React from 'react';
import { View, Text, StyleSheet, Modal, Image, TouchableOpacity } from 'react-native';

interface EventModalProps {
  isVisible: boolean;
  activity: {
    id: string;
    title: string;
    description: string;
    date: string;
  };
  onClose: () => void;
}

const EventModal: React.FC<EventModalProps> = ({ isVisible, activity, onClose }) => {
  return (
    <Modal visible={isVisible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{activity.title}</Text>
          <Text style={styles.modalDate}>Date: {activity.date}</Text>
          <Text style={styles.modalDescription}>{activity.description}</Text>
          <Text style={styles.modalAgeRange}>Age Range: {activity.ageRange}</Text>
          <Image source={require('../assets/images/react-logo.png')} style={styles.modalImage} />
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalDate: {
    fontSize: 18,
    color: '#666',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  modalImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  modalAgeRange: {
    fontSize: 18,
    color: '#444',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#14517B',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default EventModal;
