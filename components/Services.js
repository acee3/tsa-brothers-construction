import React, { useState } from 'react';
import { Text, View, Image, StyleSheet, ScrollView, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Card, ListItem, Icon, Divider, Button } from 'react-native-elements';
import Products from "./products.json";

export default function Services()
{
  return (
    <ScrollView>
      <View style={styles.container}>
        <Image
          source={{ uri: 'https://i.imgur.com/6jZxnwl.png' }}
          style={styles.logo}
        />
        <Text style={styles.titleText}>Brothers Construction</Text>
      </View>
      <Card>
        <Card.Title style={styles.subTitleText}>Service Selection</Card.Title>
        {Products.map((item, i) => (
          <ListItem key={i} bottomDivider>
            <Icon name={item.icon} />
            <ListItem.Content>
              <ListItem.Title>{item.title}</ListItem.Title>
            </ListItem.Content>
            <Button
              icon={
                <AntDesign name="right" size={20} color="black" />
              }
              onPress={() => {
                Alert.alert(
                  item.price,
                  item.description
                )
              }}
            />
          </ListItem>
        ))}
      </Card>
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
    width: 200,
    height: 200,
    marginBottom: 10,
  },
});
