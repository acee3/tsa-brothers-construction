import React, { useState, useEffect } from 'react';
import { Text, View, Image, StyleSheet, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import { Card, ListItem, Icon, Divider, Button } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
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
    <ScrollView>
      <View style={styles.container}>
        <Image
          source={{ uri: 'https://i.imgur.com/ZQgJDK1.jpg' }}
          style={styles.logo}
        />
      </View>
      <List.Section title="Orders">
        {
          orders.map((item, i) => (
            <View>
              <List.Accordion
                key={i}
                title={item.date.substring(0, 3) + ', ' + item.date.substring(4, 10) + ', ' + item.date.substring(11, 15) + ' at ' + item.date.substring(16, 24)}
                description={'$' + item.total}
                left={props => <AntDesign name="check" size={24} color="black" />}>
                {item.services.map((item2) => (
                  <List.Item title={item2.productName} />
                ))}
              </List.Accordion>
              <Button
                title='Cancel'
                buttonStyle={{ backgroundColor: 'red' }}
                onPress={() => {
                  fire.firestore()
                    .collection('users')
                    .doc(fire.auth().currentUser.uid)
                    .collection('orders')
                    .doc(ids[i])
                    .delete()
                }}
              />
            </View>
          ))
        }
      </List.Section>
    </ScrollView>
  );
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