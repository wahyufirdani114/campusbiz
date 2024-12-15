import { View, Text, Image, TextInput, FlatList, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import tw from 'twrnc';
import { useUser } from '@clerk/clerk-expo';
import Ionicons from '@expo/vector-icons/Ionicons';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { app } from '../../../../firebaseConfig'; // Sesuaikan path Firebase config

const db = getFirestore(app);

export default function Header({ navigation }) {
  const { user } = useUser();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (value) => {
    setSearchQuery(value);
    if (value.trim().length === 0) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const postsRef = collection(db, "Posts");
      const q = query(
        postsRef,
        where("title", ">=", value),
        where("title", "<=", value + "\uf8ff")
      );
      const querySnapshot = await getDocs(q);

      const results = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data && data.title) {
          results.push({ id: doc.id, ...data });
        }
      });

      setSearchResults(results);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={tw`p-4`}>
      {/* Profil */}
      <View style={tw`flex-row items-center gap-2`}>
        <Image
          source={{ uri: user?.imageUrl || "https://via.placeholder.com/150" }}
          style={tw`rounded-full w-12 h-12`}
        />
        <View>
          <Text style={tw`text-[16px] text-gray-500`}>Welcome</Text>
          <Text style={tw`text-[15px] font-bold`}>
            {user?.fullName || "Guest"}
          </Text>
        </View>
      </View>

      {/* Input Search */}
      <View style={tw`p-1 px-5 flex-row items-center bg-blue-50 mt-5 border border-blue-300 rounded-full`}>
        <Ionicons name="search" size={24} color="gray" />
        <TextInput
          placeholder="Search"
          maxLength={50}
          value={searchQuery}
          onChangeText={handleSearch}
          style={tw`pl-3 text-[18px] flex-1`}
        />
      </View>

      {isLoading && <Text style={tw`text-center text-blue-500 mt-2`}>Loading...</Text>}

      {/* Search Results */}
      {searchResults.length > 0 && (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={tw`p-3 border-b border-gray-200`}
              onPress={() => navigation.navigate('ProductDetail', { product: item })}
            >
              <Text style={tw`font-bold text-[16px]`}>
                {item.title || "No Title"}
              </Text>
              <Text style={tw`text-gray-500`}>
                {item.desc || "No Description"}
              </Text>
            </TouchableOpacity>
          )}
          ListHeaderComponent={
            <Text style={tw`font-bold mt-3`}>Search Results:</Text>
          }
        />
      )}

      {!isLoading && searchQuery.length > 0 && searchResults.length === 0 && (
        <Text style={tw`text-center text-gray-500 mt-2`}>No results found.</Text>
      )}
    </View>
  );
}
