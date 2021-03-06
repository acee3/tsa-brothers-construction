import React, { useState, useEffect  } from 'react';
import { Text, View, Image, StyleSheet, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import { Card, ListItem, Icon, Divider, Button } from 'react-native-elements';
import fire from '../fire';

const Account = (props) => {
  const [email, setEmail] = useState('');

  useEffect(() => {
    const subscriber = fire.firestore()
      .collection('users')
      .doc(fire.auth().currentUser.uid)
      .onSnapshot(documentSnapshot => {
        setEmail(documentSnapshot.data().email)
      });
    return () => subscriber();
  }, []);

  return (
    <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
      <View style={styles.container}>
        <Image
          source={{ uri: 'https://i.imgur.com/ZQgJDK1.jpg' }}
          style={styles.logo}
        />
      </View>
      <Card containerStyle={{ marginBottom: 70, width: '50%' }}>
        <Card.Title style={styles.titleText}>Account Details</Card.Title>
        <View style={{marginBottom: 30, alignItems: 'center'}}><Text style={styles.readText}>{'Currently logged in as: ' + email}</Text></View>
        <Button
          buttonStyle={styles.buttonSquare}
          title='Logout'
          onPress={props.handleLogout}
        />
      </Card>
    </ScrollView>
  );
}

export default Account;

const styles = StyleSheet.create({
  container: {
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
    color: '#ce0000'
  }
});