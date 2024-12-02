import { View, Image, Text, Dimensions, StyleSheet,TouchableOpacity } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import * as WebBrowser from "expo-web-browser";
import { usewarmUpBrowser } from '../../hooks/warmUpBrowser';
import { useOAuth } from '@clerk/clerk-expo';
WebBrowser.maybeCompleteAuthSession();


const { width } = Dimensions.get('window');

export default function LoginScreen() {
    usewarmUpBrowser();
  
  const {startOAuthFlow} = useOAuth({ strategy: "oauth_google"});

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or sign Up for next steps such as MFA
      }
    } catch (err) {
    console.error("OAuth error", err);
    }
    }, []);
    
  return (
    <View style={tw`flex-1 items-center justify-center`}>
      <Image 
        source={require('./../../assets/images/UMKM.jpeg')}
        style={[tw`w-40 h-40 mb-8`, { width: width * 1, height: width * 0.9 }]} 
      /> 
      <View style={tw`p-8 text-center`}>
        <Text style={tw`text-[36px] font-bold text-center`}>Campusbiz</Text>
        <Text style={tw`text-[20px] font-semibold text-center mt-2`}>
          Aplikasi Marketplace Produk Usaha Mahasiswa
        </Text>
        <TouchableOpacity onPress={onPress} style={tw`p-3 bg-blue-500 rounded-full mt-20`}>
          <Text style={tw`text-white text-center text-[18px]`}>Get Started</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center', // Menyusun secara vertikal di tengah
      alignItems: 'center',     // Menyusun secara horizontal di tengah
    },
    image: {
      width: 150,  // Lebar gambar
      height: 150, // Tinggi gambar
      resizeMode: 'contain', // Sesuaikan ukuran gambar tanpa memotong
    },
  });