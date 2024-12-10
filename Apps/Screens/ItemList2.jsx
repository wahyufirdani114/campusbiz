import { View, Text, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import tw from 'twrnc';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import LatestItemList from './Components/HomeScreen/LatestItemList';
import { useRoute } from '@react-navigation/native';
import { app } from '../../firebaseConfig';

export default function ItemList2() {
    const { params } = useRoute();
    const db = getFirestore(app);
    const [itemList, setItemList] = useState([]);
    const [loading, setLoading] = useState(true); // Set loading default to true

    useEffect(() => {
        if (params?.category) {
            console.log('Kategori:', params.category); // Debugging log
            getItemListByCategory(params.category); // Call function with category param
        } else {
            console.log('Tidak ada kategori yang diterima');
            setLoading(false); // Set loading to false if no category is found
        }
    }, [params]); // Listen for changes in params

    const getItemListByCategory = async (category) => {
        try {
            setItemList([]); // Reset itemList before fetching new data
            const q = query(
                collection(db, 'Posts'), 
                where('category', '==', category)
            );
            const snapshot = await getDocs(q);
            setLoading(false); // Set loading to false after data is fetched

            if (!snapshot.empty) {
                const items = snapshot.docs.map(doc => doc.data());
                console.log('Data ditemukan:', items); // Debugging log
                setItemList(items);
            } else {
                console.log('Tidak ada postingan untuk kategori ini');
                setItemList([]); // Empty the itemList if no data
            }
        } catch (error) {
            setLoading(false); // Set loading to false if there's an error
            console.error('Error fetching data:', error);
        }
    };

    return (
        <View style={tw`flex-1 bg-white pt-2 pb-4 px-4`}>
            {loading ? (
                <ActivityIndicator style={tw`mt-20`} size={'large'} color={'#3b82f6'} />
            ) : itemList?.length > 0 ? (
                <LatestItemList latestItemList={itemList} heading={''} />
            ) : (
                <Text style={tw`p-5 text-[20px] mt-20 text-center text-gray-400`}>
                    Tidak Ada Postingan
                </Text>
            )}
        </View>
    );
}
