import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './types';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, { 
  useAnimatedGestureHandler, 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  runOnJS
} from 'react-native-reanimated';
import { useUser } from '@/context/UserContext';

const SWIPE_THRESHOLD = 120;
const { width: SCREEN_WIDTH } = Dimensions.get('window');

const API_URL = 'http://localhost:8080';

const MainPage: React.FC = () => {
  const navigation = useNavigation<MainScreenNavigationProp>();
  const [currentEvents, setCurrentEvents] = useState<any[]>([]);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const { userId } = useUser();
  const translateX = useSharedValue(0);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      
      console.log('Fetching events for date:', today);
      console.log('Request URL:', `${API_URL}/events/getEventsByDateRange`);

      const response = await fetch(`${API_URL}/events/getEventsByDateRange`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ date: today }),
      });

      if (!response.ok) {
        const text = await response.text();
        console.error('Server response:', text);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Received data:', data);
      
      if (!data.eventIds || !Array.isArray(data.eventIds)) {
        throw new Error('Invalid response format: expected eventIds array');
      }

      // Fetch details for each event ID
      const eventDetails = await Promise.all(
        data.eventIds.map(async (eventId: string) => {
          const eventResponse = await fetch(`${API_URL}/events/getEvent`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({ eventId }),
          });

          if (!eventResponse.ok) {
            const text = await eventResponse.text();
            console.error(`Error response for event ${eventId}:`, text);
            throw new Error(`Failed to fetch event ${eventId}`);
          }

          return eventResponse.json();
        })
      );
      
      console.log('Event details:', eventDetails);
      setCurrentEvents(eventDetails);
    } catch (error) {
      console.error('Detailed error:', error);
      console.error('Error fetching events:', error.message);
    }
  };

  const addEventToUser = async (eventId: string) => {
    try {
      await fetch(`${API_URL}/users/addEvent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          eventId,
        }),
      });
      console.log("user id: ", userId);
      console.log("event id: ", eventId);
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'right' && currentEvents[currentEventIndex]) {
      addEventToUser(currentEvents[currentEventIndex]._id);
    }
    setCurrentEventIndex(prev => prev + 1);
    translateX.value = 0;
  };

  const gestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: (event) => {
      translateX.value = event.translationX;
    },
    onEnd: (event) => {
      if (Math.abs(event.translationX) > SWIPE_THRESHOLD) {
        translateX.value = withSpring(Math.sign(event.translationX) * SCREEN_WIDTH);
        runOnJS(handleSwipe)(event.translationX > 0 ? 'right' : 'left');
      } else {
        translateX.value = withSpring(0);
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.header}>Featured Events</Text>
        
        {currentEvents[currentEventIndex] && (
          <PanGestureHandler onGestureEvent={gestureHandler}>
            <Animated.View style={[styles.eventCard, animatedStyle]}>
              <Text style={styles.eventTitle}>{currentEvents[currentEventIndex].location}</Text>
              <Text style={styles.eventDetails}>
                Date: {new Date(currentEvents[currentEventIndex].date).toLocaleDateString()}
              </Text>
              <Text style={styles.eventDetails}>
                Age Range: {currentEvents[currentEventIndex].ageRange}
              </Text>
            </Animated.View>
          </PanGestureHandler>
        )}
        
        {currentEventIndex >= currentEvents.length && (
          <Text style={styles.noMoreEvents}>No more events to show!</Text>
        )}
      </ScrollView>

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
  eventCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  eventTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  eventDetails: {
    fontSize: 16,
    marginBottom: 5,
    color: '#666',
  },
  noMoreEvents: {
    textAlign: 'center',
    fontSize: 18,
    color: '#666',
    marginTop: 20,
  },
});

export default MainPage;
