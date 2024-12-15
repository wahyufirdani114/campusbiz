import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { app } from '../../firebaseConfig';
import { useUser } from '@clerk/clerk-expo';
import { collection, getFirestore, query, where, getDocs } from 'firebase/firestore';
import LatestItemList from './Components/HomeScreen/LatestItemList';
import tw from 'twrnc'; 

export default function MyProducts() {
    const db = getFirestore(app); // Inisialisasi Firestore
    const { user } = useUser(); // Data pengguna dari Clerk
    const [productList, setProductList] = useState([]); // State untuk produk
    const [loading, setLoading] = useState(true); // State loading

    useEffect(() => {
        if (user) {
            getUserPost(); // Ambil data produk
        }
    }, [user]);

    const getUserPost = async () => {
        setLoading(true);
        const q = query(
            collection(db, 'Posts'),
            where('userEmail', '==', user?.primaryEmailAddress?.emailAddress)
        );

        try {
            const snapshot = await getDocs(q);
            const products = snapshot.docs.map((doc) => ({
                id: doc.id, 
                ...doc.data(),
            }));
            setProductList(products);
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={tw`flex-1 justify-center items-center`}>
                <Text style={tw`text-gray-500`}>Loading products...</Text>
            </View>
        );
    }

    if (productList.length === 0) {
        return (
            <View style={tw`flex-1 justify-center items-center`}>
                <Text style={tw`text-gray-500`}>No products found.</Text>
            </View>
        );
    }

    return (
        <View style={tw`flex-1`}>
            <LatestItemList latestItemList={productList}
              
            /> {/* Daftar produk */}
        </View>
    );
}
