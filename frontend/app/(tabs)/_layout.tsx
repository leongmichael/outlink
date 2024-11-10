import { Stack } from 'expo-router';

export default function TabLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: true }} />
      {/* Add any other screens that were previously tabs */}
    </Stack>
  );
}
