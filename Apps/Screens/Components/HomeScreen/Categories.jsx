import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';

export default function Categories({ categoryList }) {

    const navigation=useNavigation();
  return (
    <View style={tw`mt-3 px-4`}>
      <Text style={tw`font-bold text-[20px] mb-3`}>Categories</Text>
      <FlatList
        data={categoryList}
        keyExtractor={(item, index) => item.id || index.toString()}
        numColumns={4} // Tetap dengan 4 kolom
        contentContainerStyle={tw`justify-between`} // Jarak rata antar elemen
        renderItem={({ item }) => (
          <TouchableOpacity
          onPress={()=>navigation.navigate('item-List',{
            category:item.name
          })}
            style={tw`flex-1 items-center justify-center p-2 border-[1px] border-blue-200 m-1 h-[80px] rounded-lg bg-blue-50 `}
          >
            <Image
              source={{ uri: `${item.icon}?cache=${new Date().getTime()}` }}
              style={tw`w-[40px] h-[40px] rounded-lg `} // Ukuran ikon diperbesar
              resizeMode="contain" // Agar gambar proporsional
            />
            <Text style={tw`text-xs mt-2 text-center`}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
