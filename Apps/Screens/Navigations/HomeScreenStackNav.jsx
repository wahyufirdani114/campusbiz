import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../HomeScreen';
import ProductDetail from '../ProductDetail'; // Pastikan sudah diimport
import ItemList2 from '../ItemList2';
import { Ionicons } from '@expo/vector-icons'; // Pastikan Ionicons terinstal

const Stack = createStackNavigator();

export default function HomeScreenStackNav() {
  return (
    <Stack.Navigator>
      {/* Screen untuk Home */}
      <Stack.Screen
        name="home"
        component={HomeScreen}
        options={{ headerShown: false }} // Header disembunyikan di Home
      />

      {/* Screen untuk Item List */}
      <Stack.Screen
        name="item-List"
        component={ItemList2}
        options={({ route, navigation }) => ({
          title: route.params?.category || 'Items', // Judul dinamis
          headerStyle: {
            backgroundColor: '#fff',
            height: 60, // Tinggi header
          },
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center', // Judul di tengah
          headerBackTitleVisible: false, // Hilangkan teks "Back" bawaan
          headerLeft: () => (
            <Ionicons
              name="arrow-back"
              size={24}
              color="#000"
              onPress={() => navigation.goBack()} // Fungsi untuk kembali ke layar sebelumnya
              style={{ marginLeft: 15 }} // Memberi jarak dari tepi kiri
            />
          ),
        })}
      />

      {/* Screen untuk Product Detail */}
      <Stack.Screen
        name="product-detail"
        component={ProductDetail}
        options={({ navigation }) => ({
          title: 'Product Detail',
          headerStyle: {
            backgroundColor: '#fff',
            height: 60,
          },
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
          headerLeft: () => (
            <Ionicons
              name="arrow-back"
              size={24}
              color="#000"
              onPress={() => navigation.goBack()} // Kembali ke layar sebelumnya
              style={{ marginLeft: 15 }}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
}
