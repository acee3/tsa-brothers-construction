import React, { useState } from 'react';
import { Text, View, Image, StyleSheet, ScrollView, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Card, ListItem, Icon, Divider, Button } from 'react-native-elements';
import Products from "./products.json";
import fire from '../fire';

export default function Services() {
  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.container}>
        <Image
          source={{ uri: 'https://i.imgur.com/ZQgJDK1.jpg' }}
          style={styles.logo}
        />
      </View>
      <Card containerStyle={{ marginBottom: 70 }}>
        <Card.Title style={styles.subTitleText}>Service Selection</Card.Title>
        {Products.map((item, i) => (
          <ListItem key={i} bottomDivider>
            <Icon name={item.icon} />
            <ListItem.Content>
              <ListItem.Title>{item.title}</ListItem.Title>
              <ListItem.Subtitle>{'$'+item.price}</ListItem.Subtitle>
            </ListItem.Content>
            <Button
              icon={
                <AntDesign name="right" size={20} color="black" />
              }
              onPress={() => {
                fire.firestore()
                  .collection('users')
                  .doc(fire.auth().currentUser.uid)
                  .collection('checkout')
                  .add({
                    productName: item.title,
                    price: item.price,
                  }).then(function () {
                    fire.firestore()
                      .collection('users')
                      .doc(fire.auth().currentUser.uid)
                      .get()
                      .then(documentSnapshot => {
                        if (!documentSnapshot.exists) {
                          fire.firestore()
                            .collection('users')
                            .doc(fire.auth().currentUser.uid)
                            .update({
                              total: item.price,
                            });
                        } else {
                          let curTotal = documentSnapshot.data().total;
                          fire.firestore()
                            .collection('users')
                            .doc(fire.auth().currentUser.uid)
                            .update({
                              total: curTotal + item.price,
                            });
                        }
                      })
                  })
              }}
            />
          </ListItem>
        ))}
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
