import React, { useState } from 'react';
import { Text, View, Image, StyleSheet, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import { Card, ListItem, Icon, Divider, Button } from 'react-native-elements';
import fire from '../fire';

const Account = (props) => {
  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.container}>
        <Image
          source={{ uri: 'https://i.imgur.com/ZQgJDK1.jpg' }}
          style={styles.logo}
        />
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50, marginBottom: 50 }}>
        <Button 
          title='Logout'
          onPress={props.handleLogout}
        />
      </View>
    </ScrollView>
  );
}

export default Account;

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#fff',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  logo: {
    width: 625,
    height: 180,
    marginBottom: 10,
    marginTop: 10,
  },
});
