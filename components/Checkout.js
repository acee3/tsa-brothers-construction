import React, { useState, useEffect } from 'react';
import { Text, View, Image, StyleSheet, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import { Card, ListItem, Icon, Divider, Button } from 'react-native-elements';
import fire from '../fire';

export default function Checkout() {
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const subscriber = fire.firestore()
      .collection('users')
      .doc(fire.auth().currentUser.uid)
      .collection('checkout')
      .onSnapshot((querySnapshot) => {
        let list = [];
        querySnapshot.forEach(documentSnapshot => {
          list.push(documentSnapshot.data());
        });
        setServices(list);
        setLoading(false);
      });
    return () => subscriber();
  }, []);

  useEffect(() => {
    const subscriber = fire.firestore()
      .collection('users')
      .doc(fire.auth().currentUser.uid)
      .onSnapshot((documentSnapshot) => {
        if (documentSnapshot.exists) {
          setTotal(documentSnapshot.data().total)
        } else {
          setTotal(0);
        }
      })
    return () => subscriber();
  }, [])

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <ScrollView contentContainerStyle={{alignItems: 'center'}}>
      <View style={styles.container}>
        <Image
          source={{ uri: 'https://i.imgur.com/ZQgJDK1.jpg' }}
          style={styles.logo}
        />
      </View>
      <Card containerStyle={{width: '75%'}}>
        <Card.Title style={styles.titleText}>Service Selection</Card.Title>
        {services.length > 0 ? services.map((item, i) => (
          <ListItem key={i} bottomDivider>
            <ListItem.Content style={{alignItems: 'center'}}>
              <ListItem.Title styles={styles.readText}>{item.productName}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        )) : <View style={{alignItems: 'center'}}><Text style={styles.readText}>No Orders</Text></View>}
      </Card>
      <Card containerStyle={{ marginBottom: 70, width: '75%' }}>
        <Card.Title style={styles.titleText}>Estimated Price: ${total}</Card.Title>
        <Button
          buttonStyle={styles.buttonSquare}
          title='Submit Order'
          onPress={() => {
            if (services.length > 0) {
              fire.firestore()
                .collection('users')
                .doc(fire.auth().currentUser.uid)
                .collection('orders')
                .add({
                  services: services,
                  total: total,
                  date: new Date().toString()
                }).then(function () {
                  let path = fire.firestore().collection('users').doc(fire.auth().currentUser.uid).collection('checkout');
                  path.get().then((querySnapshot) => {
                    querySnapshot.docs.forEach((doc) => {
                      path.doc(doc.id).delete()
                    })
                  })
                }).then(function () {
                  fire.firestore()
                    .collection('users')
                    .doc(fire.auth().currentUser.uid)
                    .update(
                      {
                        total: 0
                      }
                    )
                });
            }
          }}
        />
      </Card>
    </ScrollView>
  );
}

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