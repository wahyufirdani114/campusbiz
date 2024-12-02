import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';
import LoginScreen from './Apps/Screens/LoginScreen';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './Apps/Screens/Navigations/TabNavigation';
import AddPostScreen from './Apps/Screens/AddPostScreen'; // Sesuaikan path dengan struktur folder Anda


export default function App() {
  return (
    <ClerkProvider publishableKey="pk_test_ZW5oYW5jZWQtaHVtcGJhY2stMTEuY2xlcmsuYWNjb3VudHMuZGV2JA">
      <SafeAreaProvider>
        <SafeAreaView style={[tw`flex-1 bg-white`, { paddingTop: 10 }]}>
          <StatusBar style="auto" />
          <NavigationContainer>
            <SignedIn>
              <TabNavigation />
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
