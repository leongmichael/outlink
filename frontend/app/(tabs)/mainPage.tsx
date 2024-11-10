import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './types';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useSharedValue, useAnimatedStyle, withSpring, runOnJS } from 'react-native-reanimated';

type MainScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

const MainPage: React.FC = () => {
  const navigation = useNavigation<MainScreenNavigationProp>();

  const [isActivityVisible, setIsActivityVisible] = useState(true); // New state to track visibility
  const [savedActivities, setSavedActivities] = useState<string[]>([]);
  const translateX = useSharedValue(0);

  // Sample static activity data
  const activity = {
    id: '1',
    title: 'Yoga Workshop',
    description: 'Join our guided yoga workshop to learn relaxation techniques and breathing exercises.',
    date: '2024-11-12',
  };

  // Handler for swipe gestures
  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'right') {
      setSavedActivities((prev) => [...prev, activity.title]);
      Alert.alert('Activity Added', `${activity.title} has been added to your list!`);
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
          onPress={() => navigation.navigate('Main')}
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
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
  },
  activityTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4285F4',
    marginBottom: 10,
  },
  activityDate: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  activityDescription: {
    fontSize: 16,
    color: '#333',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#4285F4',
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