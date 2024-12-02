import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import ExploreScreen from '../ExploreScreen';
import HomeScreen from '../HomeScreen';
import AddPostScreen from '../AddPostScreen';
import ProfileScreen from '../ProfileScreen';
import Ionicons from '@expo/vector-icons/Ionicons';

const Tab= createBottomTabNavigator();
export default function TabNavigation() {
  return (
    <Tab.Navigator  screenOptions={{
        headerShown:false,
        // tabBarActiveTintColor:'#000'
        }}>
        <Tab.Screen name='home' component={HomeScreen}
        options={{
            tabBarLabel:({color})=>(
                <Text style={{color:color,fontSize:12,marginbottom:3}}>Home</Text>
            ),
            tabBarIcon:({color,size})=>(
            <Ionicons name="home" size={size} color={color} />
            )
        }}
        />
        <Tab.Screen name='explore' component={ExploreScreen}
        options={{
            tabBarLabel:({color})=>(
                <Text style={{color:color,fontSize:12,marginbottom:3}}>Explore</Text>
            ),
            tabBarIcon:({color,size})=>(
            <Ionicons name="search" size={size} color={color} />
            )
        }}
        />
        <Tab.Screen name='addpost' component={AddPostScreen}
                options={{
                    tabBarLabel:({color})=>(
                        <Text style={{color:color,fontSize:12,marginbottom:3}}>Add Post</Text>
                    ),
                    tabBarIcon:({color,size})=>(
                    <Ionicons name="add-circle" size={size} color={color} />
                    )
                }}
        />
        <Tab.Screen name='profile' component={ProfileScreen}
                        options={{
                            tabBarLabel:({color})=>(
                                <Text style={{color:color,fontSize:12,marginbottom:3}}>Profile</Text>
                            ),
                            tabBarIcon:({color,size})=>(
                                <Ionicons name="person-circle-sharp" size={size} color={color} />
                            )
                        }}
        />
    </Tab.Navigator>
  )
}