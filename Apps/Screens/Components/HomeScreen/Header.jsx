import { View, Text, Image, TextInput } from 'react-native';
import React, { useState } from 'react';
import tw from 'twrnc';
import { useUser } from '@clerk/clerk-expo';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Header() {
  const { user } = useUser();
  const [searchQuery, setSearchQuery] = useState("");

  const handleTextChange = (value) => {
    console.log(value); // Cetak ke konsol setiap perubahan
    setSearchQuery(value); // Menyimpan teks ke state
  };

  return (
    <View>
      {/* Bagian sambutan dan profil */}
      <View style={tw`flex-row items-center gap-2`}>
        {/* Gambar profil pengguna */}
        <Image
          source={{ uri: user?.imageUrl }}
          style={tw`rounded-full w-12 h-12`}
        />
        <View>
          {/* Teks sambutan */}
          <Text style={tw`text-[16px] text-gray-500`}>Welcome</Text>
          <Text style={tw`text-[15px] font-bold`}>{user?.fullName}</Text>
        </View>
      </View>

      {/* Input pencarian */}
      <View style={tw`p-1 px-5 flex flex-row items-center bg-blue-50 mt-5 border-[1px] border-blue-300 rounded-full`}>
        <Ionicons name="search" size={24} color="gray" />
        <TextInput
          placeholder="Search"
          maxLength={50}
          value={searchQuery}
          onChangeText={handleTextChange}
          style={tw`pl-3 text-[18px] flex-1`}
        />
      </View>
    </View>
  );
}
