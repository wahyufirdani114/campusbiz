import React, { useState, useEffect } from 'react';
import { FlatList, Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { getFirestore, collection, getDocs, query, orderBy } from 'firebase/firestore';
import { app } from '../../firebaseConfig';
import { useNavigation } from '@react-navigation/native'; // Mengimpor useNavigation

import Header from './Components/HomeScreen/Header';
import Slider from './Components/HomeScreen/Slider';
import Categories from './Components/HomeScreen/Categories';
import LatestItemList from './Components/HomeScreen/LatestItemList';

export default function HomeScreen() {
  const db = getFirestore(app);
  const [sliderList, setSliderList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [latestItemList, setLatestItemList] = useState([]);

  const navigation = useNavigation(); // Inisialisasi navigasi

  useEffect(() => {
    getSliders();
    getCategoryList();
    getLatestItemList();
  }, []);

  const getSliders = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'Sliders'));
      const sliders = querySnapshot.docs.map((doc) => doc.data());
      setSliderList(sliders);
      console.log('Sliders:', sliders);
    } catch (error) {
      console.error('Error fetching sliders:', error);
    }
  };

  const getCategoryList = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'Category'));
      const categories = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return { ...data, icon: data.icon || data.Icon };
      });
      setCategoryList(categories);
      console.log('Categories:', categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const getLatestItemList = async () => {
    try {
      const postsQuery = query(collection(db, 'Posts'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(postsQuery);
      const posts = querySnapshot.docs.map((doc) => doc.data());
      setLatestItemList(posts);
      console.log('Latest Items:', posts);
    } catch (error) {
      console.error('Error fetching latest items:', error);
    }
  };

  const handleProductPress = (product) => {
    // Navigasi ke screen product-detail dan kirim data produk
    navigation.push('product-detail', { product: product });
  };

  return (
    <FlatList
      data={sliderList}
      ListHeaderComponent={
        <>
          <Header />
          <Slider sliderList={sliderList || []} />
          <Categories categoryList={categoryList || []} />
          <LatestItemList 
            latestItemList={latestItemList || []}
            heading={'Latest Items'}
            onProductPress={handleProductPress} // Pass handler untuk menavigasi ke detail
          />
        </>
      }
      ListEmptyComponent={<Text>No data available</Text>}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={tw`p-4 bg-white`}
    />
  );
}
