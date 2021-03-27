import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, Feather, FontAwesome } from '@expo/vector-icons';

import Services from "./Services.js";
import Checkout from "./Checkout.js";
import Orders from "./Orders.js";
import Account from "./Account.js";

const Tab = createBottomTabNavigator();

export default function MyTabs(props) {
  return (
    <Tab.Navigator
      initialRouteName="Services"
      tabBarOptions={{
        activeTintColor: '#a83232',
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
