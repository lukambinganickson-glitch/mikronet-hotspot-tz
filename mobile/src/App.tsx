import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from './screens/HomeScreen';
import { PaymentScreen } from './screens/PaymentScreen';
import { ActivationScreen } from './screens/ActivationScreen';
import { ProfileScreen } from './screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.tabBar,
          tabBarActiveTintColor: '#3498db',
          tabBarInactiveTintColor: '#bdc3c7',
          tabBarShowLabel: true,
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color }) => <View style={[styles.icon, { color }]}>🏠</View>,
          }}
        />
        <Tab.Screen
          name="Payment"
          component={PaymentScreen}
          options={{
            tabBarLabel: 'Payment',
            tabBarIcon: ({ color }) => <View style={[styles.icon, { color }]}>💳</View>,
          }}
        />
        <Tab.Screen
          name="Activation"
          component={ActivationScreen}
          options={{
            tabBarLabel: 'Activate',
            tabBarIcon: ({ color }) => <View style={[styles.icon, { color }]}>✅</View>,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color }) => <View style={[styles.icon, { color }]}>👤</View>,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ecf0f1',
    paddingBottom: 5,
    paddingTop: 5,
    height: 60,
  },
  icon: {
    fontSize: 24,
  },
});
