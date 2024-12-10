import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';

export default function PostItem({ item }) {
    const navigation = useNavigation();

    return (
        <TouchableOpacity 
            style={tw`flex-1 m-2 p-2 rounded-lg border-[1px] border-slate-200`}
            onPress={() => navigation.push('product-detail',
                {
                    product:item
                }
            )} // Gunakan string untuk nama layar
        >
            <Image 
                source={{ uri: item.image }}
                style={tw`w-full h-[140px] rounded-lg`} 
            />
            <View>
                <Text style={tw`text-[20px] font-bold mt-2`}>{item.title}</Text>
                <Text style={tw`text-[15px] font-bold text-blue-500`}>Rp.{item.price}</Text>
                <Text style={tw`text-blue-500 bg-blue-200 text-center mt-1 p-[2px] rounded-full px-1 text-[10px] w-[70px]`}>
                    {item.category}
                </Text>
            </View>
        </TouchableOpacity>
    );
}
