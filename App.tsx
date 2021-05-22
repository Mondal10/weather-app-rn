import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Home from './src/screens/Home';

export default function App() {
  return (
    <LinearGradient
      locations={[0.1, 0.5, 1]}
      colors={['#faf7fe', '#f5dffa', '#faf7fe']}
      style={styles.container}
    >
      <StatusBar style="auto" />
      <Home />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3eafb',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
