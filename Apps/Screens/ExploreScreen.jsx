import { View, Text, ActivityIndicator, FlatList, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react'; // Mengimpor hooks untuk state dan efek
import tw from 'twrnc';
import { app } from '../../firebaseConfig';
import { getFirestore, getDocs, orderBy, collection, query } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

export default function ExploreScreen() {
  const db = getFirestore(app);
  const [productList, setProductList] = useState([]); // Menggunakan state immutable
  const [loading, setLoading] = useState(true); // Menggunakan state immutable untuk loading indicator
  const navigation = useNavigation(); // Fungsi sebagai first-class object untuk navigasi

  useEffect(() => {
    getAllProducts(); // Memanggil fungsi murni tanpa efek samping
  }, []);

  const getAllProducts = async () => {
    try {
      setLoading(true); // State dikelola secara terpisah, tidak mengubah variabel global
      const q = query(collection(db, 'Posts'), orderBy('createdAt', 'desc')); // Query bersifat deklaratif
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        const products = snapshot.docs.map(doc => doc.data()); // Menggunakan map, contoh gaya deklaratif
        setProductList(products); // Mengelola state immutable dengan data baru
      } else {
        console.log('No products found');
        setProductList([]); // Tidak memodifikasi state secara langsung
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false); // Mengatur ulang state loading tanpa efek samping
    }
  };

  const handleProductPress = (product) => {
    // Fungsi sebagai first-class object: dapat diteruskan sebagai props
    navigation.push('product-detail', { product }); // Deklaratif: mendeskripsikan navigasi
  };

  return (
    <View style={tw`bg-white flex-1`}>
      {loading ? (
        <ActivityIndicator size="large" color="#3b82f6" style={tw`mt-10`} />
      ) : (
        <FlatList
          data={productList}
          keyExtractor={(item, index) => index.toString()} // Deklaratif: mendeskripsikan bagaimana kunci dibuat
          numColumns={2} // Deklaratif: mendefinisikan jumlah kolom
          columnWrapperStyle={tw`justify-between px-4`} // Deklaratif: mendeskripsikan tata letak kolom
          ListHeaderComponent={
            <View style={tw`p-5 py-8`}>
              <Text style={tw`text-[30px] font-bold text-gray-700`}>Explore More</Text>
            </View>
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              style={tw`bg-white rounded-lg shadow-md p-3 mb-4 w-[48%]`} // Gaya deklaratif: mendefinisikan tampilan produk
              onPress={() => handleProductPress(item)} // Fungsi navigasi sebagai first-class function
            >
              <Image
                source={{ uri: item.image }}
                style={tw`h-24 w-full rounded-md mb-3`} // Deklaratif: mendeskripsikan bagaimana gambar ditampilkan
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
