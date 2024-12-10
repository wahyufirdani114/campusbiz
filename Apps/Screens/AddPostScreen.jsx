import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ToastAndroid,
  Modal,
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { getFirestore, getDocs, collection, addDoc } from 'firebase/firestore';
import { app } from '../../firebaseConfig';
import { Picker } from '@react-native-picker/picker';
import { Formik } from 'formik';
import * as ImagePicker from 'expo-image-picker';
import tw from 'twrnc';
import { StatusBar } from 'expo-status-bar';
import { useUser } from '@clerk/clerk-react';

export default function AddPostScreen() {
  const [image, setImage] = useState(null);
  const [categoryList, setCategoryList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Untuk loading saat submit
  const { user } = useUser();
  const db = getFirestore(app);

  useEffect(() => {
    getCategoryList();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadImageToCloudinary = async (fileUri) => {
    try {
      const formData = new FormData();
      formData.append('file', {
        uri: fileUri,
        type: 'image/jpeg',
        name: 'post-image.jpg',
      });
      formData.append('upload_preset', 'Campusbiz');
      formData.append('api_key', '339871156794661');
      formData.append('cloud_name', 'dj6pc5c0o');

      const response = await fetch(
        'https://api.cloudinary.com/v1_1/dj6pc5c0o/image/upload',
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Cloudinary upload failed: ${response.status}`);
      }

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  const getCategoryList = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'Category'));
      const categories = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          ...data,
          icon: data.icon || data.Icon,
        };
      });
      setCategoryList(categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const onSubmitMethod = async (values, { resetForm }) => {
    try {
      setIsLoading(true); // Tampilkan loading
      let imageUrl = null;

      if (image) {
        imageUrl = await uploadImageToCloudinary(image);
      }

      if (!imageUrl) {
        throw new Error('Image upload failed.');
      }

      const postData = {
        ...values,
        userName: user.fullName,
        userEmail: user.primaryEmailAddress.emailAddress,
        userImage: user.imageUrl,
        image: imageUrl,
        createdAt: new Date().toISOString(),
      };

      await addDoc(collection(db, 'Posts'), postData);
      ToastAndroid.show('Post berhasil ditambahkan!', ToastAndroid.SHORT);

      // Reset form dan image
      resetForm(); // Reset semua input Formik
      setImage(null); // Reset gambar
      setIsModalVisible(true); // Tampilkan modal berhasil
    } catch (error) {
      console.error('Error submitting post:', error);
      ToastAndroid.show('Gagal membuat post', ToastAndroid.SHORT);
    } finally {
      setIsLoading(false); // Sembunyikan loading
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <SafeAreaView style={styles.container}>
        <StatusBar translucent={false} backgroundColor="#fff" barStyle="dark-content" />
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Text style={tw`text-[27px] font-bold`}>Add New Post</Text>
          <Text style={tw`text-[18px] text-gray-500 mb-7`}>Create New Post</Text>
          <Formik
            initialValues={{
              title: '',
              desc: '',
              price: '',
              NoTel: '',
              category: '',
            }}
            onSubmit={(values, formikHelpers) => onSubmitMethod(values, formikHelpers)}
            validate={(values) => {
              const errors = {};
              if (!values.title) {
                ToastAndroid.show('Title harus diisi', ToastAndroid.SHORT);
                errors.title = 'Title is required';
              }
              return errors;
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => (
              <View>
                <TouchableOpacity onPress={pickImage}>
                  {image ? (
                    <Image source={{ uri: image }} style={styles.imagePreview} />
                  ) : (
                    <Image
                      source={require('./../../assets/images/placeholder.jpg')}
                      style={styles.imagePreview}
                    />
                  )}
                </TouchableOpacity>
                <TextInput
                  style={styles.input}
                  placeholder="Title"
                  value={values.title}
                  onChangeText={handleChange('title')}
                />
                <TextInput
                  style={styles.input2}
                  placeholder="Description"
                  value={values.desc}
                  numberOfLines={5}
                  onChangeText={handleChange('desc')}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Price"
                  value={values.price}
                  keyboardType="number-pad"
                  onChangeText={handleChange('price')}
                />
                <TextInput
                  style={styles.input}
                  placeholder="No. Telepon"
                  value={values.NoTel}
                  keyboardType="number-pad"
                  onChangeText={handleChange('NoTel')}
                />
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={values.category}
                    onValueChange={(itemValue) => setFieldValue('category', itemValue)}
                  >
                    <Picker.Item label="Select Category" value="" />
                    {categoryList.map((item, index) => (
                      <Picker.Item key={index} label={item.name} value={item.name} />
                    ))}
                  </Picker>
                </View>
                {isLoading ? (
                  <ActivityIndicator size="large" color="#3b82f6" style={tw`mt-4`} />
                ) : (
                  <TouchableOpacity
                    onPress={handleSubmit}
                    style={tw`p-3 bg-blue-500 rounded-full mt-4`}
                  >
                    <Text style={tw`text-white text-center text-[18px]`}>Submit</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </Formik>
        </ScrollView>
        <Modal visible={isModalVisible} transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Post berhasil ditambahkan!</Text>
              <TouchableOpacity
                style={styles.closeModalButton}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={styles.closeModalText}>Tutup</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    padding: 20,
  },
  imagePreview: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  input2: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    height: 100,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  closeModalButton: {
    padding: 10,
    backgroundColor: '#3b82f6',
    borderRadius: 10,
  },
  closeModalText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
