import { View, Text, FlatList, Image } from 'react-native';
import React from 'react'
import tw from 'twrnc';

export default function Slider({ sliderList }) {
    return (
      <View style={tw`mt-3`}>
        <FlatList
          data={sliderList}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <View>
              <Image
                source={{ uri: item?.image }}
                style={tw`h-[100px] w-[220px] mr-2 rounded-lg
                    `}
              />
            </View>
          )}
          keyExtractor={(item, index) => index.toString()} // Tambahkan keyExtractor untuk menghindari warning di FlatList
        />
      </View>
    );
  }
  