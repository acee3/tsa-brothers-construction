import React, { useState, useEffect } from 'react';
import { Text, View, Image, StyleSheet, ScrollView, FlatList, ActivityIndicator, TextInput } from 'react-native';
import { Card, ListItem, Icon, Divider, Button } from 'react-native-elements';
import { AntDesign, MaterialIcons, Octicons, FontAwesome } from '@expo/vector-icons';
import { List, Modal, Portal, Provider } from 'react-native-paper';
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
    <Provider>
      <ScrollView>
        <View style={styles.container}>
          <Image
            source={{ uri: 'https://i.imgur.com/ZQgJDK1.jpg' }}
            style={styles.logo}
          />
        </View>
        <Card containerStyle={{ marginBottom: 70 }}>
          <Card.Title style={styles.titleText}>Users and Orders</Card.Title>
          <List.Section>
            {
              emails.map((item, i) => (
                <List.Accordion
                  theme={{ colors: { primary: '#ce0000' } }}
                  title={item}
                  left={props => <FontAwesome name="list" size={24} color={props.color} />}>
                  <ListItems id={ids[i]} />
                </List.Accordion>
              ))
            }
          </List.Section>
        </Card>
      </ScrollView>
    </Provider>
  );
}

function ListItems(props) {
  const [orders, setOrders] = useState([]);
  const [ids, setIds] = useState([]);
  const [modalDone, setModalDone] = useState(false);
  const [modalPrice, setModalPrice] = useState(false);
  const [text, setText] = useState('');

  useEffect(() => {
    const subscriber = fire.firestore()
      .collection('users')
      .doc(props.id)
      .collection('orders')
      .onSnapshot(querySnapshot => {
        let list = [];
        let ids = [];
        querySnapshot.forEach(documentSnapshot => {
          list.push(documentSnapshot.data());
          ids.push(documentSnapshot.id);
        })
        setIds(ids);
        setOrders(list);
      });
    return () => subscriber();
  }, []);

  const showModalDone = () => setModalDone(true);
  const hideModalDone = () => setModalDone(false);

  const showModalPrice = () => setModalPrice(true);
  const hideModalPrice = () => setModalPrice(false);

  return (
    orders.map((item, i) => (
      <View>
        <Portal>
          <Modal visible={modalDone} onDismiss={hideModalDone} style={styles.modal} contentContainerStyle={styles.modalContent} >
            <Text style={styles.readText}>Mark as Completed?</Text>
            <View style={{ flexDirection: 'row', marginTop: 30 }}>
              <Button
                buttonStyle={styles.buttonSquare}
                title='Yes'
                onPress={() => {
                  fire.firestore()
                    .collection('users')
                    .doc(props.id)
                    .collection('orders')
                    .doc(ids[i])
                    .delete();
                  hideModalDone();
                }}
              />
              <Button
                buttonStyle={styles.buttonSquareCancel}
                title='Cancel'
                onPress={() => {
                  hideModalDone();
                }}
              />
            </View>
          </Modal>
        </Portal>
        <Portal>
          <Modal visible={modalPrice} onDismiss={hideModalPrice} style={styles.modal} contentContainerStyle={styles.modalContent} >
            <Text style={styles.readText}>What price do you want to charge?</Text>
            <View style={{ flexDirection: 'row', marginTop: 30 }}>
              <Text style={styles.readText}>Price: </Text>
              <TextInput
                style={{ borderWidth: 2, marginLeft: 5, marginRight: 5 , width: '80%'}}
                onChangeText={setText}
                value={text}
                placeholder={'ex: 100'}
              />
            </View>
            <View style={{ flexDirection: 'row', marginTop: 30 }}>
              <Button
                buttonStyle={styles.buttonSquare}
                title='Submit'
                onPress={() => {
                  setText('');
                  fire.firestore()
                    .collection('users')
                    .doc(props.id)
                    .collection('orders')
                    .doc(ids[i])
                    .update({ total: parseInt(text) });
                  hideModalPrice();
                }}
              />
              <Button
                buttonStyle={styles.buttonSquareCancel}
                title='Cancel'
                onPress={() => {
                  setText('');
                  hideModalPrice();
                }}
              />
            </View>
          </Modal>
        </Portal>
        <List.Accordion
          theme={{ colors: { primary: '#ce0000' } }}
          style={{ left: 50 }}
          title={item.date.substring(0, 3) + ', ' + item.date.substring(4, 10) + ', ' + item.date.substring(11, 15) + ' at ' + item.date.substring(16, 24)}
          description={'$' + item.total}
          left={props => <Octicons name="dash" size={24} color={props.color} />}>
          {<View style={{ left: 50, flexDirection: 'row' }}>
            <Button
              buttonStyle={styles.button}
              iconContainerStyle={styles.buttonIcon}
              icon={
                <AntDesign name="check" size={24} color="#fff" />
              }
              onPress={() => {
                showModalDone();
              }}
            />
            <Button
              buttonStyle={styles.button}
              iconContainerStyle={styles.buttonIcon}
              icon={
                <MaterialIcons name="attach-money" size={24} color="#fff" />
              }
              onPress={() => {
                showModalPrice();
              }}
            />
          </View>}
          {item.services.map((item2) => (
            <List.Item style={{ left: 50 }} title={item2.productName} />
          ))}
        </List.Accordion>
      </View>
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