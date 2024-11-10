import { Stack } from 'expo-router';

export default function TabLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="mainPage" options={{ title: 'Main Page' }} />
      <Stack.Screen name="MyEvents" options={{ title: 'My Events' }} />
    </Stack>
  );
}
