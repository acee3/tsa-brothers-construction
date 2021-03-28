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
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.container}>
        <Image
          source={{ uri: 'https://i.imgur.com/ZQgJDK1.jpg' }}
          style={styles.logo}
        />
      </View>
      <Card>
        <Card.Title style={styles.subTitleText}>Checkout</Card.Title>
        {services.length > 0 ? services.map((item, i) => (
          <ListItem key={i} bottomDivider>
            <ListItem.Content>
              <ListItem.Title>{item.productName}</ListItem.Title>
              <ListItem.Subtitle>{'$'+item.price}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        )) : 'No Order'}
      </Card>
      <Card containerStyle={{ marginBottom: 70 }}>
        <Card.Title style={styles.subTitleText}>Estimated Price: ${total}</Card.Title>
        <Button
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
