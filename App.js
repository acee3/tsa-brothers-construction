import React, { useState } from 'react';
import { Text, View, Image, StyleSheet, ScrollView, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './components/Tabs';

export default function App() {
  return (
    <View style={{ flex: 1, bottom: 0 }}>
      <NavigationContainer style={{ flex: 1, bottom: 0 }}>
        <Tabs/>
      </NavigationContainer>
    </View>
  );
}

