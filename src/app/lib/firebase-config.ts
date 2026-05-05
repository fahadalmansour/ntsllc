// Firebase Configuration
// Replace these values with your actual Firebase project configuration
// Get these values from: https://console.firebase.google.com/ > Project Settings > General

export const firebaseConfig = {
  // Replace with your Firebase config
  apiKey: "your-api-key-here",
  authDomain: "neotechnology-solutions.firebaseapp.com", 
  projectId: "neotechnology-solutions",
  storageBucket: "neotechnology-solutions.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id",
  measurementId: "your-measurement-id"
};

// Helper function to check if Firebase is properly configured
export const isConfigured = () => {
  return firebaseConfig.apiKey !== "your-api-key-here" && 
         firebaseConfig.apiKey.length > 10;
};