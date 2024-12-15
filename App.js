import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './Apps/Screens/LoginScreen';
import TabNavigation from './Apps/Screens/Navigations/TabNavigation';
import AddPostScreen from './Apps/Screens/AddPostScreen'; // Sesuaikan path dengan struktur folder Anda

const Stack = createStackNavigator();

export default function App() {
  return (
    <ClerkProvider publishableKey="pk_test_ZW5oYW5jZWQtaHVtcGJhY2stMTEuY2xlcmsuYWNjb3VudHMuZGV2JA">
      <SafeAreaProvider>
        <SafeAreaView style={[tw`flex-1 bg-white`, { paddingTop: 10 }]}>
          <StatusBar style="auto" />
          <NavigationContainer>
            <SignedIn>
              <Stack.Navigator
                screenOptions={{
                  headerShown: false, // Hapus header default untuk tampilan custom
                }}
              >
                {/* Tab Navigation berisi Home, Profile, dll */}
                <Stack.Screen name="Tabs" component={TabNavigation} />
                {/* Layar tambahan */}
                <Stack.Screen name="AddPost" component={AddPostScreen} />
              </Stack.Navigator>
            </SignedIn>
            <SignedOut>
              <LoginScreen />
            </SignedOut>
          </NavigationContainer>
        </SafeAreaView>
      </SafeAreaProvider>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
