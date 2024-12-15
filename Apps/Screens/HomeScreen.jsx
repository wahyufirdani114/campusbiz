import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { getFirestore, collection, getDocs, query, orderBy } from 'firebase/firestore';
import { app } from '../../firebaseConfig';
import { useNavigation } from '@react-navigation/native';

import Header from './Components/HomeScreen/Header';
import Slider from './Components/HomeScreen/Slider';
import Categories from './Components/HomeScreen/Categories';
import LatestItemList from './Components/HomeScreen/LatestItemList';

export default function HomeScreen() {
  const db = getFirestore(app);
  const [sliderList, setSliderList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [latestItemList, setLatestItemList] = useState([]);
  const navigation = useNavigation();

  // Fetch data on mount
  useEffect(() => {
    getSliders();
    getCategoryList();
    getLatestItemList();
  }, []);

  // Fetch Sliders from Firestore
  const getSliders = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'Sliders'));
      const sliders = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSliderList(sliders);
      console.log('Sliders:', sliders);
    } catch (error) {
      console.error('Error fetching sliders:', error);
    }
  };

  // Fetch Categories from Firestore
  const getCategoryList = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'Category'));
      const categories = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return { id: doc.id, ...data, icon: data.icon || data.Icon };
      });
      setCategoryList(categories);
      console.log('Categories:', categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Fetch Latest Items from Firestore
  const getLatestItemList = async () => {
    try {
      const postsQuery = query(collection(db, 'Posts'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(postsQuery);
      const posts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLatestItemList(posts);
      console.log('Latest Items:', posts);
    } catch (error) {
      console.error('Error fetching latest items:', error);
    }
  };

  // Navigate to Product Detail
  const handleProductPress = (product) => {
    navigation.navigate('ProductDetail', { product }); // Pastikan rute ini ada di Stack.Navigator
  };

  return (
    <FlatList
      data={sliderList}
      ListHeaderComponent={
        <>
          <Header />
          <Slider sliderList={sliderList} />
          <Categories categoryList={categoryList} />
          <LatestItemList
            latestItemList={latestItemList}
            heading="Latest Items"
            onProductPress={handleProductPress}
          />
        </>
      }
      ListEmptyComponent={
        <View style={tw`p-4`}>
          <Text style={tw`text-center text-gray-500`}>No data available</Text>
        </View>
      }
      keyExtractor={(item) => item.id || item.title} // Gunakan ID unik jika tersedia
      contentContainerStyle={tw`p-4 bg-white`}
    />
  );
}
