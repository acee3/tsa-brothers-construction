import React, { useState } from 'react';
import { Text, View, Image, StyleSheet, ScrollView, Picker, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Card, ListItem, Icon, Divider, Button } from 'react-native-elements';
import { Modal, Portal, Provider } from 'react-native-paper';
import Products from "./products.json";
import fire from '../fire';

export default function Services() {
  const [modalVisible, setModalVisible] = useState(false);
  const [chosen, setChosen] = useState(Products[0]);
  const [type, setType] = useState(0);
  const [units, setUnits] = useState(0);

  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  return (
    <Provider>
      <ScrollView contentContainerStyle={{alignItems: 'center'}}>
        <View style={styles.container}>
          <Image
            source={{ uri: 'https://i.imgur.com/ZQgJDK1.jpg' }}
            style={styles.logo}
          />
        </View>
        <Portal>
          <Modal visible={modalVisible} onDismiss={hideModal} style={styles.modal} contentContainerStyle={styles.modalContent} >
            <Text style={styles.readText}>{chosen.title}</Text>
            {chosen.hasOwnProperty('types') && <View style={{ flexDirection: 'row', marginTop: 30 }}><Picker
              selectedValue={type}
              onValueChange={(value, index) => setType(value)}
            >
              <Picker.Item label="Select Type" value={0} />
              <Picker.Item label="Laminate" value={1} />
              <Picker.Item label="Hardwood" value={2} />
            </Picker></View>}
            {chosen.hasOwnProperty('measurement') && <View style={{ flexDirection: 'row', marginTop: 30 }}>
              <Text style={styles.readText}>{chosen.measurement + ': '}</Text>
              <TextInput onChangeText={setUnits} style={{ borderWidth: 2, marginLeft: 5, marginRight: 5, width: '80%' }} value={units} placeholder='ex: 100' />
            </View>}
            <View style={{ flexDirection: 'row', marginTop: 30 }}>
              <Button
                buttonStyle={styles.buttonSquare}
                title='Submit'
                onPress={() => {
                  let price = chosen.price;
                  if (chosen.hasOwnProperty('perPrice')) {
                    price = parseInt(units) * chosen.perPrice;
                  } else if (type != 0) {
                    price = parseInt(units) * chosen.perPrices[type];
                  }
                  fire.firestore()
                    .collection('users')
                    .doc(fire.auth().currentUser.uid)
                    .collection('checkout')
                    .add({
                      productName: chosen.title,
                      price: price,
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
                                total: price,
                              });
                          } else {
                            let curTotal = documentSnapshot.data().total;
                            fire.firestore()
                              .collection('users')
                              .doc(fire.auth().currentUser.uid)
                              .update({
                                total: curTotal + price,
                              });
                          }
                        })
                    })
                  setType(0);
                  setUnits(0);
                  hideModal();
                }}
              />
              <Button
                buttonStyle={styles.buttonSquareCancel}
                title='Cancel'
                onPress={() => {
                  hideModal();
                }}
              />
            </View>
          </Modal>
        </Portal>
        <Card containerStyle={{ marginBottom: 70 , width: '75%'}}>
          <Card.Title style={styles.titleText}>Service Selection</Card.Title>
          {Products.map((item, i) => (
            <ListItem key={i} bottomDivider>
              <Icon name={item.icon} />
              <ListItem.Content>
                <ListItem.Title style={styles.readText}>{item.title}</ListItem.Title>
              </ListItem.Content>
              <Button
                buttonStyle={styles.buttonSquare}
                icon={
                  <AntDesign name="right" size={20} color="white" />
                }
                onPress={() => {
                  setChosen(item);
                  showModal();
                }}
              />
            </ListItem>
          ))}
        </Card>
      </ScrollView>
    </Provider>
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
