import React, { useState, useEffect } from 'react';
import { Text, View, Image, StyleSheet, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import { Card, ListItem, Icon, Divider, Button } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import { List } from 'react-native-paper';
import fire from '../fire';

export default function ManageOrders() {
  const [emails, setEmails] = useState([]);
  const [ids, setIds] = useState([]);

  useEffect(() => {
    const subscriber = fire.firestore()
      .collection('users')
      .onSnapshot(querySnapshot => {
        let ids = [];
        let emails = [];
        querySnapshot.forEach(documentSnapshot => {
          emails.push(documentSnapshot.data().email);
          ids.push(documentSnapshot.id);
        })
        setIds(ids);
        setEmails(emails);
      });
    return () => subscriber();
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image
          source={{ uri: 'https://i.imgur.com/ZQgJDK1.jpg' }}
          style={styles.logo}
        />
      </View>
      <List.Section title="Orders">
        {
          emails.map((item, i) => (
            <List.Accordion
              title={item}
              left={props => <AntDesign name="check" size={24} color="black" />}>
              <ListItems id={ids[i]} />
            </List.Accordion>
          ))
        }
      </List.Section>
    </ScrollView>
  );
}

function ListItems(props) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const subscriber = fire.firestore()
      .collection('users')
      .doc(props.id)
      .collection('orders')
      .onSnapshot(querySnapshot => {
        let list = [];
        querySnapshot.forEach(documentSnapshot => {
          list.push(documentSnapshot.data());
        })
        setOrders(list);
      });
    return () => subscriber();
  }, []);

  return (
    orders.map((item) => (
      <List.Accordion
        title={item.date.substring(0, 3) + ', ' + item.date.substring(4, 10) + ', ' + item.date.substring(11, 15) + ' at ' + item.date.substring(16, 24)}
        left={props => <AntDesign name="check" size={24} color="black" />}>
        {item.services.map((item2) => (
          <List.Item title={item2.productName} />
        ))}
      </List.Accordion>
    ))
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  logo: {
    width: 625,
    height: 180,
    marginBottom: 10,
  },
});