import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './types';
import EventModal from '../../components/EventModal';

type MyEventsNavigationProp = StackNavigationProp<RootStackParamList, 'MyEvents'>;

interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
}

const MyEvents: React.FC = () => {
  const navigation = useNavigation<MyEventsNavigationProp>();
  const [events, setEvents] = useState<Event[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUserEvents();
  }, []);

  const fetchUserEvents = async () => {
    try {
      // Replace with your actual API endpoint and user ID
      const userId = '67303e71542cd5b701fd3f34'; // You'll need to get this from your auth context or storage
      const response = await fetch(`http://localhost:8080/user/events/${userId}`);
      const data = await response.json();
      
      if (response.ok) {
        setEvents(data);
      } else {
        Alert.alert('Error', 'Failed to fetch events');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong while fetching events');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEventPress = (event: Event) => {
    setSelectedEvent(event);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedEvent(null);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.header}>My Events</Text>

        {isLoading ? (
          <Text style={styles.loadingText}>Loading events...</Text>
        ) : events.length === 0 ? (
          <Text style={styles.noEventsText}>No events found</Text>
        ) : (
          events.map((event) => (
            <TouchableOpacity
              key={event._id}
              style={styles.eventContainer}
              onPress={() => handleEventPress(event)}
            >
              <Text style={styles.eventTitle}>{event.title}</Text>
              <Text style={styles.eventDate}>Date: {new Date(event.date).toLocaleDateString()}</Text>
              <Text style={styles.eventDescription} numberOfLines={2}>
                {event.description}
              </Text>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      {/* Bottom Navigation Bar */}
      <View style={styles.navbar}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('mainPage')}
        >
          <Text style={styles.navButtonText}>Main</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('MyEvents')}
        >
          <Text style={styles.navButtonText}>My Events</Text>
        </TouchableOpacity>
      </View>

      {/* Event Modal */}
      {selectedEvent && (
        <EventModal
          isVisible={isModalVisible}
          activity={selectedEvent}
          onClose={handleCloseModal}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
    paddingBottom: 80,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
    marginTop: 30,
  },
  eventContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 15,
  },
  eventTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4285F4',
    marginBottom: 10,
  },
  eventDate: {
    fontSize: 20,
    color: '#666',
    marginBottom: 10,
  },
  eventDescription: {
    fontSize: 22,
    color: '#333',
  },
  loadingText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
  noEventsText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 80,
    backgroundColor: '#14517B',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  navButton: {
    paddingVertical: 10,
  },
  navButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MyEvents; 