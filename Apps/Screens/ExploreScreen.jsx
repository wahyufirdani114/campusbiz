import { View, Text, ActivityIndicator, FlatList, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import tw from 'twrnc';
import { app } from '../../firebaseConfig';
import { getFirestore, getDocs, orderBy, collection, query } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

export default function ExploreScreen() {
  const db = getFirestore(app);
  const [productList, setProductList] = useState([]); // State to store products
  const [loading, setLoading] = useState(true); // State to handle loading indicator
  const navigation = useNavigation(); // Access navigation object

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = async () => {
    try {
      setLoading(true); // Show loading indicator while fetching data
      const q = query(collection(db, 'Posts'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        const products = snapshot.docs.map(doc => doc.data());
        setProductList(products); // Update state with fetched products
      } else {
        console.log('No products found');
        setProductList([]); // Set empty array if no products
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false); // Hide loading indicator after fetching data
    }
  };

  const handleProductPress = (product) => {
    // Navigate to the ProductDetail screen with product details
    navigation.push('product-detail', { product }); // Make sure 'product-detail' is correctly defined in your stack
  };

  return (
    <View style={tw`bg-white flex-1`}>
      {loading ? (
        <ActivityIndicator size="large" color="#3b82f6" style={tw`mt-10`} />
      ) : (
        <FlatList
          data={productList}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2} // Menampilkan 2 produk per baris
          columnWrapperStyle={tw`justify-between px-4`} // Jarak antar kolom
          ListHeaderComponent={
            <View style={tw`p-5 py-8`}>
              <Text style={tw`text-[30px] font-bold text-gray-700`}>Explore More</Text>
            </View>
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              style={tw`bg-white rounded-lg shadow-md p-3 mb-4 w-[48%]`} // Lebar 48% untuk grid 2 kolom
              onPress={() => handleProductPress(item)}
            >
              <Image
                source={{ uri: item.image }}
                style={tw`h-24 w-full rounded-md mb-3`} // Gambar lebih kecil
                resizeMode="cover"
              />
              <Text style={tw`text-center text-sm font-semibold mb-1 text-gray-700`}>
                {item.title}
              </Text>
              {item.price && (
                <Text style={tw`text-center text-blue-500 font-bold`}>
                  {`Rp.${item.price}`}
                </Text>
              )}
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <Text style={tw`p-5 text-[20px] mt-20 text-center text-gray-400`}>
              Tidak Ada Postingan
            </Text>
          }
        />
      )}
    </View>
  );
}
