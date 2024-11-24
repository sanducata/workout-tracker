import { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { AuthProvider, useAuth } from '@/context/AuthContext';

const StackLayout = () => {
  const { authState } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  console.log(authState);
  useEffect(() => {
    const inAuthGroup = segments[0] === '(protected)';

    if (authState?.authenticated === null && inAuthGroup) {
      router.replace('/');
    } else if (authState?.authenticated) {
      router.replace('/(protected)');
    }
  }, [authState]);

  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{ headerShown: false, animation: 'none' }}
      />
      <Stack.Screen
        name='(protected)'
        options={{ headerShown: false, animation: 'none' }}
      />
      <Stack.Screen
        name='(signup)'
        options={{
          headerShown: false,
          animation: 'none',
        }}
      />
    </Stack>
  );
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <StackLayout />
    </AuthProvider>
  );
}
