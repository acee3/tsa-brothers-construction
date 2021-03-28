import React, { useState, useEffect } from 'react';
import { Text, View, Image, StyleSheet, ScrollView, Alert } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, Feather, FontAwesome, Foundation } from '@expo/vector-icons';
import fire from '../fire';

import Services from "./Services.js";
import Checkout from "./Checkout.js";
import Orders from "./Orders.js";
import Account from "./Account.js";
import ManageOrders from "./ManageOrders.js";
import About from './About';

const Tab = createBottomTabNavigator();

export default function MyTabs(props) {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const subscriber = fire.firestore()
      .collection('users')
      .doc(fire.auth().currentUser.uid)
      .onSnapshot((documentSnapshot) => {
        setIsAdmin(documentSnapshot.data().admin)
      });
    return () => subscriber();
  }, []);

  if (isAdmin) {
    return (
      <Tab.Navigator
        initialRouteName="ManageOrders"
        tabBarOptions={{
          activeTintColor: '#ce0000',
          labelStyle: {
            paddingBottom: 5,
            fontSize: 14,
          },
          style: {
            position: 'absolute',
            bottom: 2,
            left: 0,
            right: 0,
          },
        }}>
        <Tab.Screen
          name="Manage Orders"
          component={ManageOrders}
          options={{
            tabBarLabel: 'Manage Orders',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="hammer-wrench" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Account"
          children={() => <Account handleLogout={props.handleLogout} />}
          options={{
            tabBarLabel: 'Account',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  } else {
    return (
      <Tab.Navigator
        initialRouteName="About"
        tabBarOptions={{
          activeTintColor: '#ce0000',
          labelStyle: {
            paddingBottom: 5,
            fontSize: 14,
          },
          style: {
            position: 'absolute',
            bottom: 2,
            left: 0,
            right: 0,
          },
        }}>
        <Tab.Screen
          name="About"
          component={About}
          options={{
            tabBarLabel: 'About',
            tabBarIcon: ({ color, size }) => (
              <Foundation name="magnifying-glass" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Services"
          component={Services}
          options={{
            tabBarLabel: 'Services',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="hammer-wrench" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Checkout"
          component={Checkout}
          options={{
            tabBarLabel: 'Checkout',
            tabBarIcon: ({ color, size }) => (
              <Feather name="shopping-cart" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Orders"
          component={Orders}
          options={{
            tabBarLabel: 'Orders',
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="list" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Account"
          children={() => <Account handleLogout={props.handleLogout} />}
          options={{
            tabBarLabel: 'Account',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}
