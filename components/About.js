import React, { useState, useEffect } from 'react';
import { Text, View, Image, ImageBackground, StyleSheet, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import { Card, ListItem, Icon, Divider, Button } from 'react-native-elements';
import { Modal, Portal, Provider } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import fire from '../fire';

export default function About() {
  return (
    <Provider>
      <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
        <ImageBackground
          source={{ uri: 'https://www.immigration.ca/wp-content/uploads/2012/12/New-Brunswick_250833833.jpeg' }}
          style={{ flex: 1, left: 0, right: 0, resizeMode: 'contain', tintColor: '#000000' }}
        >
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.largeText}>Brothers Construction</Text>
            <Text style={styles.slightlySmallerText}>We'll Do What You Need</Text>
          </View>
        </ImageBackground>

      </View>
      < ScrollView contentContainerStyle={{ alignItems: 'center', marginTop: 700 }}>
        <View style={styles.containerVertical}>
          <View style={{ marginTop: 30 }}></View>
          <View style={styles.container}>
            <View style={{ margin: 'auto' }}>
              <Text style={styles.titleText}>Meet the Owner: Rojas Silviano</Text>
              <Text style={styles.readText}>He is an expert handyman and has been working in the {"\n"}field for three years. He primarily works in the New Brunswick {"\n"}area, but he can do just about anything you want wherever you want.</Text>
            </View>
            <Image
              source={{ uri: 'https://i.imgur.com/fa0je7T.jpeg' }}
              style={{ marginTop: 30, height: 500, width: 500, borderWidth: 5, margin: 'auto' }}
            />
          </View>
          <View style={styles.container}>
            <Image
              source={{ uri: 'https://i.imgur.com/SNyqDbs.png' }}
              style={{ marginTop: 30, height: 500, width: 500, borderWidth: 5, margin: 'auto' }}
            />
            <View style={{ margin: 'auto' }}>
              <Text style={styles.titleText}>Information: </Text>
              <Text style={styles.readText}>Phone Number: 1-732-207-5253 {"\n"}Payment Method: Cash</Text>
            </View>
          </View>
        </View>
      </ScrollView >
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '92%',
    backgroundColor: '#fff',
    alignItems: 'center',
    textAlign: 'center',
    flexDirection: 'row',
    marginTop: 50,
    marginBottom: 100
  },
  containerVertical: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
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
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center'
  },
  largeText: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white',
    marginTop: -100
  },
  slightlySmallerText: {
    fontSize: 30,
    color: 'white',
  }
});