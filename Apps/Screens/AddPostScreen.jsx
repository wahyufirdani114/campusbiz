import { View, Text, TextInput, Button } from 'react-native'
import React, { useState, useEffect } from 'react';
import{ getFirestore,getDocs,collection } from "firebase/firestore";
import { app } from '../../firebaseConfig';
import { StyleSheet } from 'react-native';
import { Formik } from 'formik';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView} from 'react-native';
import { Picker } from '@react-native-picker/picker' ;
// import { Picker } from 'react-native';
console.log(Picker); // Debugging untuk memeriksa apakah `Picker` undefined



export default function AddPostScreen() {
  

  const db = getFirestore(app);
  const [categoryList,setCategoryList]=useState([]);

  useEffect(()=>{
    getCategoryList();
  },[])

  // const getCategoryList=async()=>{
  //   const querySnapshot=await getDocs(collection(db, 'Category'));

    // querySnapshot.forEach((doc)=>{
    //   console.log("Docs:",doc.data());
    //   setCategoryList(categoryList=>[...categoryList,doc.data()])
    // })
  // }

  const getCategoryList = async () => {
    // setCategoryList([]);
    try {
      const querySnapshot = await getDocs(collection(db, "Category"));
      const categories = [];
      querySnapshot.forEach((doc) => {
        console.log("Fetched document:", doc.id, doc.data()); // Debug data yang diambil
        categories.push(doc.data()); // Tambahkan data ke array
      });
      console.log("Fetched categories:", categories); // Debugging
      setCategoryList(categories); // Simpan ke state
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent={false} backgroundColor="#fff" barStyle="dark-content" />
        <View className="p-10">
          <Formik
            initialValues={{name:'',desc:'',category:'',address:'',price:''}}
            onSubmit={value=>console.log(value)}
          >
            {({handleChange,handleBlur,handleSubmit,values})=>(
              <View>
                  <TextInput
                    style={styles.input}
                    placeholder='Title'
                    value={values?.title}
                    onChangeText={handleChange('title')}
                  />
                  <TextInput
                    style={styles.input2}
                    placeholder='Description'
                    value={values?.desc}
                    numberOfLines={5}
                    onChangeText={handleChange('desc')}
                    
                  />
                  <TextInput
                    style={styles.input}
                    placeholder='Price'
                    value={values?.price}
                    keyboardType='number-pad'
                    onChangeText={handleChange('price')}
                    
                  />
                  <TextInput
                    style={styles.input}
                    placeholder='No. Telepon'
                    value={values?.NoTel}
                    keyboardType='number-pad'
                    onChangeText={handleChange('NoTel')}
                    
                  />
                  <TextInput
                    style={styles.input}
                    placeholder='No. Telepon'
                    value={values?.NoTel}
                    keyboardType='number-pad'
                    onChangeText={handleChange('NoTel')}
                    
                  />

                {/* CAtegory list */}
                <Picker
                  selectedValue={values?.category}
                  style={styles.input}
                  onValueChange={handleChange('category')}
                >
                  {categoryList&&categoryList.map((item,index)=>(
                    // <Picker.item key={index}
                    // label={item?.name} value={item?.name} />
                    <Picker.Item key={index} 
                    label={item?.name} value={item?.name} />
                  ))}
                  
                </Picker>


                  <Button onPress={handleSubmit} 
                  className="mt-10"
                  title="submit"/>
              </View>
            )}
          </Formik>
        </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    marginTop:10,
    flex: 1,
    backgroundColor: '#f5f5f5', // Warna background
    // justifyContent: 'center', // Konten berada di tengah secara vertikal
    alignItems: 'center', // Konten berada di tengah secara horizontal
  },
  input: {
    marginTop:10,
    width: 250, // Atur panjang input box
    height: 50, // Tinggi kotak input
    borderWidth: 1,
    borderColor: '#ccc', // Warna border
    borderRadius: 10, // Sudut membulat
    paddingHorizontal: 15, // Spasi dalam input box
    fontSize: 16, // Ukuran teks
    backgroundColor: '#fff', // Warna background input
    textAlign: 'left', // Teks berada di tengah
  },
  input2: {
    marginTop:10,
    width: 250, // Atur panjang input box
    height: 100, // Tinggi kotak input
    borderWidth: 1,
    borderColor: '#ccc', // Warna border
    borderRadius: 10, // Sudut membulat
    paddingHorizontal: 15, // Spasi dalam input box
    fontSize: 16, // Ukuran teks
    backgroundColor: '#fff', // Warna background input
    textAlign: 'left', // Teks berada di tengah
  },
});