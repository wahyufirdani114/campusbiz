import { createStackNavigator } from '@react-navigation/stack';
import ExploreScreen from '../ExploreScreen';
import ProductDetail from '../ProductDetail';
import { Ionicons } from '@expo/vector-icons';

const Stack = createStackNavigator();

export default function ExploreScreenStackNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="explore-tab" 
        component={ExploreScreen} 
        options={{ headerShown: false }} // Menambahkan opsi untuk menyembunyikan header
      />
      
      {/* Screen untuk Detail Produk */}
      <Stack.Screen 
        name="product-detail" 
        component={ProductDetail}
        options={{
          headerStyle: {
            height: 50, // Mengatur tinggi header
            backgroundColor: '#fff', // Background header (sesuaikan sesuai kebutuhan)
          },
          headerTitle: 'Detail', // Menentukan judul header
          headerTitleStyle: {
            marginRight: 75,
            fontSize: 18, // Ukuran font judul
            fontWeight: 'bold', // Menebalkan font judul
            textAlign: 'center', // Menyelaraskan teks judul di tengah
            marginTop: -25, // Menyesuaikan posisi judul
          },
          headerTitleAlign: 'center', // Menyelaraskan judul di tengah
          headerBackTitleVisible: false, // Menghilangkan teks "Back" bawaan
          headerBackImage: () => (
            <Ionicons
              name="arrow-back" // Icon back
              size={24}
              color="#000" // Menyesuaikan warna dengan background
              style={{
                marginLeft: 9, // Memberikan margin dari kiri
                marginTop: -25, // Menyesuaikan jarak icon
              }}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}
