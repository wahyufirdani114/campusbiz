import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import { useAuth, useUser } from '@clerk/clerk-expo'; // Impor useUser untuk mendapatkan data pengguna
import { Clerk } from '@clerk/clerk-expo'; // Impor Clerk untuk mengakses fungsi signOut
import diary from '../../assets/images/diary.png';
import explore from '../../assets/images/Explore.png';
import logout from '../../assets/images/logout.png';
import { FlatList } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {
  const { user } = useUser(); // Mendapatkan data pengguna
  const navigation = useNavigation();
  const {isLoaded,signOut} =useAuth();

  const menuList = [
    {
      id: 1,
      name: 'My Products',
      icon: diary,
      path: 'my-product',
    },
    {
      id: 2,
      name: 'Explore',
      icon: explore,
      path: 'explore',
    },
    {
      id: 3,
      name: 'LogOut',
      icon: logout,
      path: 'login', // Setelah logout, kita akan navigasi ke halaman login
    },
  ];

  // Fungsi untuk menangani aksi menu, termasuk logout
  const onMenuPress = (item) => {
    if (item?.name === 'LogOut') 
    {
      signOut();
      return ; 
    }
    item?.path?navigation.navigate(item.path):null;
  }
  

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={tw`p-5 bg-white flex-1`}>
        <View style={tw`items-center mt-10`}>
          {/* Memastikan bahwa imageUrl user ada */}
          {user?.imageUrl && (
            <Image
              source={{ uri: user?.imageUrl }}
              style={tw`w-[100px] h-[100px] rounded-full`}
            />
          )}
          <Text style={tw`font-bold text-[25px] mt-2`}>
            {user?.fullName || 'No Name'}
          </Text>
          <Text style={tw`text-[18px] mt-2 text-gray-500`}>
            {user?.primaryEmailAddress?.emailAddress || 'No Email'}
          </Text>
        </View>

        <FlatList
          data={menuList}
          numColumns={3}
          style={{ marginTop: 20 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => onMenuPress(item)} // Menambahkan onPress
              style={tw`flex-1 p-3 border-[1px] items-center mx-2 mt-4 rounded-lg border-blue-400 bg-blue-50`}
            >
              {item.icon && (
                <Image source={item?.icon} style={tw`w-[50px] h-[50px]`} />
              )}
              <Text style={tw`font-bold text-[12px] mt-2 text-center`}>
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </GestureHandlerRootView>
  );
}
