import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../ProfileScreen';
import MyProducts from '../MyProducts';
import ProductDetail from '../ProductDetail'; // Pastikan import ProductDetail benar
import { Ionicons } from '@expo/vector-icons';

const Stack = createStackNavigator();

export default function ProfileScreenStackNav() {
  return (
    <Stack.Navigator>
      {/* Screen untuk Profile */}
      <Stack.Screen 
        name="profile-tab" 
        component={ProfileScreen} 
        options={{
          headerShown: false, // Menyembunyikan header pada ProfileScreen
        }}
      />

      {/* Screen untuk My Products */}
      <Stack.Screen 
        name="my-product" 
        component={MyProducts} 
        options={{
          headerStyle: {
            height: 0,
            backgroundColor: '#fff',
          },
          headerTitle: 'My Products',
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: 'bold',
            textAlign: 'center',
          },
          headerTitleAlign: 'center',
          headerBackTitleVisible: false,
          headerBackImage: () => (
            <Ionicons
              name="arrow-back"
              size={24}
              color="#000"
              style={{ marginLeft: 9 }}
            />
          ),
        }}
      />

      {/* Screen untuk Detail Produk */}
      <Stack.Screen
        name="product-detail"  // Pastikan nama konsisten dengan navigasi lain
        component={ProductDetail}
        options={{
          headerStyle: {
            height: 50,
            backgroundColor: '#fff',
          },
          headerTitle: 'Detail Product',
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: 'bold',
            textAlign: 'center',
          },
          headerTitleAlign: 'center',
          headerBackTitleVisible: false,
          headerBackImage: () => (
            <Ionicons
              name="arrow-back"
              size={24}
              color="#000"
              style={{ marginLeft: 9 }}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}
