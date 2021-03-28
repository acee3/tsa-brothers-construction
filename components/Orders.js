import React, { useState, useEffect } from 'react';
import { Text, View, Image, StyleSheet, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import { Card, ListItem, Icon, Divider, Button } from 'react-native-elements';
import { Octicons } from '@expo/vector-icons';
import { List } from 'react-native-paper';
import fire from '../fire';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [ids, setIds] = useState([]);

  useEffect(() => {
    const subscriber = fire.firestore()
      .collection('users')
      .doc(fire.auth().currentUser.uid)
      .collection('orders')
      .onSnapshot(querySnapshot => {
        let list = [];
        let ids = [];
        querySnapshot.forEach(documentSnapshot => {
          list.push(documentSnapshot.data());
          ids.push(documentSnapshot.id);
        })
        setOrders(list);
        setIds(ids);
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
      <Card containerStyle={{ marginBottom: 70, width: '75%' }}>
        <Card.Title style={styles.titleText}>Orders</Card.Title>
        <List.Section>
          {
            orders.map((item, i) => (
              <View>
                <List.Accordion
                  theme={{ colors: { primary: '#ce0000' } }}
                  key={i}
                  title={item.date.substring(0, 3) + ', ' + item.date.substring(4, 10) + ', ' + item.date.substring(11, 15) + ' at ' + item.date.substring(16, 24)}
                  description={'$' + item.total}
                  left={props => <Octicons name="dash" size={24} color={props.color} />}>
                  {<View><Button
                    title='Cancel Order'
                    buttonStyle={styles.buttonSquare}
                    onPress={() => {
                      fire.firestore()
                        .collection('users')
                        .doc(fire.auth().currentUser.uid)
                        .collection('orders')
                        .doc(ids[i])
                        .delete()
                    }}
                  /></View>}
                  {item.services.map((item2) => (
                    <List.Item title={item2.productName} />
                  ))}
                </List.Accordion>
              </View>
            ))
          }
        </List.Section>
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