import React, { useState, useEffect } from 'react';
import { Text, View, Image, StyleSheet, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import { Card, ListItem, Icon, Divider, Button } from 'react-native-elements';
import { Modal, Portal, Provider } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import fire from '../fire';

export default function About() {
  return (
    <Provider>
      <View style={{position: 'absolute', alignItems: 'center', width: '100%', height: '100%'}}>
        <Image
          source={{uri: 'https://www.immigration.ca/wp-content/uploads/2012/12/New-Brunswick_250833833.jpeg'}}
          style={{flex: 1, resizeMode: 'contain'}}
        />
      </View>
      < ScrollView contentContainerStyle={{ alignItems: 'center' }}>
      <View style={{position: 'absolute', alignItems: 'center', width: '100%', height: '100%'}}>
        <Image
          source={{uri: 'https://www.immigration.ca/wp-content/uploads/2012/12/New-Brunswick_250833833.jpeg'}}
          style={{flex: 1, resizeMode: 'contain'}}
        />
      </View>
      </ScrollView >
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 100
  },
  logo: {
    width: 625,
    height: 180,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#ce0000',
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 20
  },
  buttonIcon: {
    alignItems: 'center'
  },
  buttonSquare: {
    backgroundColor: '#ce0000',
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
    marginRight: 5
  },
  buttonSquareCancel: {
    backgroundColor: '#545454',
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
    marginRight: 5
  },
  modal: {
    position: 'absolute', justifyContent: 'center', alignItems: 'center'
  },
  modalContent: {
    position: 'absolute', backgroundColor: 'white', padding: 40, marginBottom: 30, lineHeight: '80%', width: '100%', maxWidth: '420px', justifyContent: 'center', alignItems: 'center'
  },
  readText: {
    fontSize: 20
  },
  titleText: {
    fontSize: 25,
    color: '#ce0000'
  }
});