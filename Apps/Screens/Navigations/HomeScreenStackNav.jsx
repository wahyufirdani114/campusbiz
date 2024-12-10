import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../HomeScreen';
import ProductDetail from '../ProductDetail'; // Pastikan sudah diimport
import ItemList2 from '../ItemList2';
import { Ionicons } from '@expo/vector-icons'; // Pastikan Ionicons terinstall

const Stack = createStackNavigator();

export default function HomeScreenStackNav() {
  return (
    <Stack.Navigator>
      {/* Screen untuk Home */}
      <Stack.Screen
        name="home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      {/* Screen untuk Item List */}
      <Stack.Screen
        name="item-List"
        component={ItemList2}
        options={({ route }) => ({
          title: route.params?.category || 'Items', // Judul dinamis berdasarkan kategori
          headerStyle: {
            backgroundColor: '#fff', // Background header
            height: 60, // Tinggi header untuk memberi proporsi yang baik
          },
          headerTitleStyle: {
            fontSize: 18, // Ukuran font judul
            fontWeight: 'bold',
            textAlign: 'center',
            marginTop: -2
          },
          headerTitleAlign: 'center', // Pastikan judul di tengah
          headerBackTitleVisible: false, // Hilangkan teks "Back" bawaan
          headerBackImage: () => (
            <Ionicons
              name="arrow-back" // Icon Back
              size={24}
              color="#000"
              style={{
                marginLeft: 9,
                marginTop: -25 // Beri jarak dari tepi kiri
              }}
            />
          ),
        })}
      />
      {/* Screen untuk Product Detail */}
      <Stack.Screen
        name="product-detail"
        component={ProductDetail} // Pastikan Anda sudah mengimpor ProductDetail
        options={{ title: 'Product Detail' }} // Opsi judul screen
      />
    </Stack.Navigator>
  );
}
