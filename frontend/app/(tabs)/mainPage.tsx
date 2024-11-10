import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './types';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useSharedValue, useAnimatedStyle, withSpring, runOnJS } from 'react-native-reanimated';

type MainScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

const API_URL = 'http://localhost:8080';

const MainPage: React.FC = () => {
  const navigation = useNavigation<MainScreenNavigationProp>();

  const [isActivityVisible, setIsActivityVisible] = useState(true); // New state to track visibility
  const translateX = useSharedValue(0);
  const userId = '67306f1e7a6c2bb4d02ecc27';

  // Sample static activity data
  const activity = {
    eventId: '6730508fa6674ec63f2142ee',
    title: 'Yoga Workshop',
    description: 'Join our guided yoga workshop to learn relaxation techniques and breathing exercises.',
    date: '2024-11-12',
  };

  // API call to add activity to user's list
  const addActivityToUserList = async () => {
    try {
      const response = await fetch(`${API_URL}/user/addEvent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          eventId: activity.eventId,
        }),
      });

      if (response.ok) {
        Alert.alert('Activity Added', `${activity.title} has been added to your list!`);
      } else {
        const error = await response.json();
        Alert.alert('Error', error.message || 'Failed to add activity');
      }
    } catch (error) {
      console.error('Error adding activity:', error);
      Alert.alert('Error', 'Could not connect to server');
    }
  };

  // Handler for swipe gestures
  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'right') {
      addActivityToUserList(); // Call backend API to add activity
    }
    setIsActivityVisible(false); // Hide activity after swipe
  };

  // Gesture handling
  const gestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: (event) => {
      translateX.value = event.translationX;
    },
    onEnd: () => {
      if (translateX.value > 100) {
        runOnJS(handleSwipe)('right');
        translateX.value = withSpring(0);
      } else if (translateX.value < -100) {
        runOnJS(handleSwipe)('left');
        translateX.value = withSpring(0);
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
        <Text style={styles.header}>Featured Activity</Text>

        {isActivityVisible && ( // Conditional rendering based on visibility state
          <PanGestureHandler onGestureEvent={gestureHandler}>
            <Animated.View style={[styles.activityContainer, animatedStyle]}>
              <Text style={styles.activityTitle}>{activity.title}</Text>
              <Text style={styles.activityDate}>Date: {activity.date}</Text>
              <Text style={styles.activityDescription}>{activity.description}</Text>
            </Animated.View>
          </PanGestureHandler>
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
  activityContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
    minHeight: 300,
  },
  activityTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4285F4',
    marginBottom: 10,
  },
  activityDate: {
    fontSize: 20,
    color: '#666',
    marginBottom: 20,
  },
  activityDescription: {
    fontSize: 22,
    color: '#333',
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

export default MainPage;
