# CampusBiz

**CampusBiz** is a marketplace application for student products built using **React Native** and **Expo**. This project leverages **Firebase** for backend services and **Clerk** for authentication.

## Table of Contents
1. [Features](#features)
2. [Installation](#installation)
3. [Running the Project](#running-the-project)
4. [Project Structure](#project-structure)
5. [Dependencies](#dependencies)
6. [Expo](#expo)
7. [Firebase Configuration](#firebase-configuration)
8. [Clerk Configuration](#clerk-configuration)

## Features
- User authentication via **Clerk**
- Product posting and browsing
- Image uploads via **Expo Image Picker**
- Backend services handled with **Firebase**
- Responsive design with **Tailwind CSS**

## Installation

### 1. Clone the Repository:
```bash
git clone https://github.com/wahyufirdani114/campusbiz.git
cd campusbiz
```

### 2. Install Dependencies:
```bash
npm install
```

### 3. Install Expo CLI:
If you don't have Expo CLI installed, you can install it globally using npm:
```bash
npm install -g expo-cli
```

## Running the Project

### Start the Expo server:
```bash
npm start
```
This will start the Expo development server. You can then use the **Expo Go** app on your mobile device to scan the QR code and run the app.

### Run on Android:
```bash
npm run android
```

### Run on iOS:
```bash
npm run ios
```

### Run on Web:
```bash
npm run web
```

## Project Structure
```
campusbiz/
├── Apps/
│   ├── Screens/
│   │   ├── AddPostScreen.jsx
│   │   ├── Components/
│   │   │   ├── HomeScreen/
│   │   │   │   ├── Categories.jsx
│   │   │   │   ├── Header.jsx
│   │   │   │   ├── LatestItemList.jsx
│   │   │   │   ├── PostItem.jsx
│   │   │   │   ├── Slider.jsx
│   │   ├── ExploreScreen.jsx
│   │   ├── HomeScreen.jsx
│   │   ├── ItemList2.jsx
│   │   ├── LoginScreen.jsx
│   │   ├── MyProducts.jsx
│   │   ├── Navigations/
│   │   │   ├── ExploreScreenStackNav.jsx
│   │   │   ├── HomeScreenStackNav.jsx
│   │   │   ├── ProfileScreenStackNav.jsx
│   │   │   ├── TabNavigation.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── ProfileScreen.jsx
├── assets/
│   ├── images/
├── hooks/
│   ├── warmUpBrowser.tsx
├── .gitignore
├── App.js
├── app.json
├── babel.config.js
├── firebaseConfig.jsx
├── index.js
├── package.json
├── tailwind.config.js
├── tsconfig.json
```

## Dependencies
- **expo**: Expo SDK for building React Native apps
- **react-native**: React Native framework
- **@clerk/clerk-expo**: Clerk for authentication
- **firebase**: Firebase SDK for backend services
- **formik**: Form handling in React
- **twrnc**: Tailwind CSS for React Native
- **expo-image-picker**: Image picker for Expo
- **expo-web-browser**: Web browser for Expo
- **react-navigation**: Navigation library for React Native
- **@react-native-picker/picker**: Picker component for React Native
- **moment**: Date handling library

## Expo
**Expo** is a framework and platform for universal React applications. It provides a set of tools and services to build, deploy, and quickly iterate on native apps.

### Installing Expo CLI:
To install Expo CLI, run:
```bash
npm install -g expo-cli
```

### Running the App:
To start the Expo development server, run:
```bash
npm start
```
You can then use the **Expo Go** app on your mobile device to scan the QR code and run the app.

## Firebase Configuration
The Firebase configuration is located in the `firebaseConfig.jsx` file. Make sure to replace the configuration with your own Firebase project details.

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

## Clerk Configuration
The Clerk configuration is located in the `App.js` file. Make sure to replace the `publishableKey` with your own Clerk publishable key.

```javascript
<ClerkProvider publishableKey="YOUR_CLERK_PUBLISHABLE_KEY">
```
