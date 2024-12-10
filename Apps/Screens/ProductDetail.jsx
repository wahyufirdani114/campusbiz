import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Alert, Linking, Share } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '@clerk/clerk-expo';
import { deleteDoc, query, getDocs, where, collection, doc } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { app } from '../../firebaseConfig'; // Pastikan import firebaseConfig sesuai

import tw from 'twrnc';

export default function ProductDetail() {
    const { params } = useRoute(); // Mendapatkan parameter produk dari navigasi
    const [product, setProduct] = useState({});
    const navigation = useNavigation();
    const { user } = useUser();
    const db = getFirestore(app);

    useEffect(() => {
        if (params?.product) {
            setProduct(params.product);
        }

        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={shareProduct}>
                    <Ionicons
                        name="share-social-sharp"
                        size={24}
                        color="black"
                        style={tw`mr-5`}
                    />
                </TouchableOpacity>
            ),
        });
    }, [params, navigation]);

    // Fungsi untuk membagikan produk
    const shareProduct = () => {
        const content = {
            message: `${product?.title || 'Tidak ada judul'}\n${product?.desc || 'Tidak ada deskripsi'}`,
        };

        Share.share(content).catch((error) =>
            console.error('Gagal membagikan produk:', error)
        );
    };

    // Fungsi untuk menghapus produk
    const deleteUserPost = () => {
        Alert.alert(
            'Hapus Postingan?',
            'Apakah Anda yakin ingin menghapus postingan ini?',
            [
                {
                    text: 'Ya',
                    onPress: () => deleteFromFirestore(),
                },
                {
                    text: 'Batal',
                    onPress: () => console.log('Penghapusan dibatalkan'),
                    style: 'cancel',
                },
            ]
        );
    };

    const deleteFromFirestore = async () => {
        try {
            const q = query(collection(db, 'Posts'), where('title', '==', product.title));
            const snapshot = await getDocs(q);

            if (snapshot.empty) {
                Alert.alert('Error', 'Produk tidak ditemukan di database.');
                return;
            }

            // Hapus semua dokumen yang sesuai
            snapshot.forEach(async (docSnap) => {
                await deleteDoc(doc(db, 'Posts', docSnap.id));
            });

            Alert.alert('Berhasil', 'Produk berhasil dihapus.');
            navigation.goBack(); // Kembali ke layar sebelumnya setelah penghapusan
        } catch (error) {
            console.error('Gagal menghapus produk:', error);
            Alert.alert('Error', 'Gagal menghapus produk. Silakan coba lagi.');
        }
    };

    // Fungsi untuk mengirim pesan melalui WhatsApp
    const sendWhatsAppMessage = () => {
        if (product?.NoTel) {
            const waUrl = `https://wa.me/${product.NoTel}`;
            Linking.openURL(waUrl).catch((err) =>
                console.error('Gagal membuka WhatsApp:', err)
            );
        } else {
            Alert.alert(
                'Nomor Telepon Tidak Tersedia',
                'Nomor telepon untuk produk ini tidak ditemukan.',
                [{ text: 'OK' }]
            );
        }
    };

    return (
        <ScrollView style={tw`bg-white`}>
            <Image
                source={{
                    uri: product?.image || 'https://via.placeholder.com/320x240?text=No+Image',
                }}
                style={tw`h-[320px] w-full`}
                resizeMode="cover"
            />
            <View style={tw`p-3`}>
                <Text style={tw`text-[24px] font-bold`}>
                    {product?.title || 'Produk Tidak Ditemukan'}
                </Text>
                {product?.category && (
                <Text
                    style={[
                    tw`mt-2 px-2 rounded-full bg-blue-200 text-blue-500`,
                    { maxWidth: '80%', alignSelf: 'flex-start', paddingVertical: 5 }
                    ]}
                >
                    {product.category}
                </Text>
                )}

                <Text style={tw`mt-2 font-bold text-[20px]`}>Deskripsi</Text>
                <Text style={tw`text-[15px] text-gray-500`}>
                    {product?.desc || 'Deskripsi tidak tersedia'}
                </Text>

                <View style={tw`m-2 p-3 flex flex-row items-center gap-3 bg-blue-50 border-[1px] border-gray-200`}>
                    <Image
                        source={{
                            uri: product?.userImage || 'https://via.placeholder.com/100x100?text=No+Image',
                        }}
                        style={tw`w-12 h-12 rounded-full`}
                        resizeMode="cover"
                    />
                    <View style={tw`ml-3`}>
                        <Text style={tw`font-bold text-[18px]`}>
                            {product?.userName || 'Nama tidak tersedia'}
                        </Text>
                        <Text style={tw`text-gray-500`}>{product?.userEmail || ''}</Text>
                    </View>
                </View>

                {user?.primaryEmailAddress.emailAddress === product.userEmail ? (
                    <TouchableOpacity
                        onPress={deleteUserPost}
                        style={tw`bg-red-500 rounded-full p-4 m-2`}
                    >
                        <Text style={tw`text-center text-white`}>Hapus Postingan</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        onPress={sendWhatsAppMessage}
                        style={tw`bg-blue-500 rounded-full p-4 m-2`}
                    >
                        <Text style={tw`text-center text-white`}>Kirim Pesan</Text>
                    </TouchableOpacity>
                )}
            </View>
        </ScrollView>
    );
}
