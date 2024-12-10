import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Text } from 'react-native';  // Pastikan untuk mengimpor Text
import ExploreScreenStackNav from './ExploreScreenStackNav'; // Pastikan untuk mengimpor stack navigator untuk ExploreScreen
import HomeScreenStackNav from './HomeScreenStackNav'; // Pastikan HomeScreen juga dibungkus Stack Navigator
import AddPostScreen from '../AddPostScreen';
import ProfileScreen from '../ProfileScreen';
import Ionicons from '@expo/vector-icons/Ionicons';
import ProfileScreenStackNav from './ProfileScreenStackNav';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, // Hide the header for the tabs
      }}
    >
      {/* Home Screen Navigation */}
      <Tab.Screen
        name="home-nav"
        component={HomeScreenStackNav} // Pastikan HomeScreen dibungkus dengan Stack Navigator
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color: color, fontSize: 12, marginBottom: 3 }}>Home</Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />

      {/* Explore Screen Navigation */}
      <Tab.Screen
        name="explore"
        component={ExploreScreenStackNav} // ExploreScreen dibungkus dalam Stack Navigator
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color: color, fontSize: 12, marginBottom: 3 }}>Explore</Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={size} color={color} />
          ),
        }}
      />

      {/* Add Post Screen */}
      <Tab.Screen
        name="addpost"
        component={AddPostScreen}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color: color, fontSize: 12, marginBottom: 3 }}>Add Post</Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle" size={size} color={color} />
          ),
        }}
      />

      {/* Profile Screen */}
      <Tab.Screen
        name="profile"
        component={ProfileScreenStackNav}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color: color, fontSize: 12, marginBottom: 3 }}>Profile</Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle-sharp" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
