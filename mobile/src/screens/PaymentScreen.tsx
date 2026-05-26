import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';

const API_BASE_URL = 'http://192.168.1.100:3000'; // Change to your server IP

interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
}

export const PaymentScreen: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedMethod, setSelectedMethod] = useState<string>('mpesa');
  const [loading, setLoading] = useState(false);

  const paymentMethods: PaymentMethod[] = [
    { id: 'mpesa', name: 'M-Pesa', icon: '📱' },
    { id: 'tigo', name: 'Tigo Money', icon: '💳' },
    { id: 'airtel', name: 'Airtel Money', icon: '📲' },
  ];

  const handlePayment = async () => {
    if (!phoneNumber.trim()) {
      Alert.alert('Error', 'Please enter your phone number');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/api/payment/request`, {
        phone: phoneNumber,
        packageId: 'pkg-daily',
        provider: selectedMethod.toUpperCase(),
      });

      Alert.alert('Success', `Payment initiated: ${response.data.transaction.reference}`);
      setPhoneNumber('');
    } catch (error) {
      Alert.alert('Error', 'Payment failed. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>💰 Payment</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.label}>Select Payment Method</Text>
        <View style={styles.methodsContainer}>
          {paymentMethods.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={[
                styles.methodButton,
                selectedMethod === method.id && styles.methodButtonSelected,
              ]}
              onPress={() => setSelectedMethod(method.id)}
            >
              <Text style={styles.methodIcon}>{method.icon}</Text>
              <Text style={styles.methodName}>{method.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="255711223344"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          editable={!loading}
        />

        <TouchableOpacity
          style={[styles.payButton, loading && styles.payButtonDisabled]}
          onPress={handlePayment}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.payButtonText}>Proceed to Payment</Text>
          )}
        </TouchableOpacity>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>ℹ️ Payment Info</Text>
          <Text style={styles.infoText}>• Payment will be verified in 3-5 seconds</Text>
          <Text style={styles.infoText}>• Your M-Pesa PIN will NOT be requested</Text>
          <Text style={styles.infoText}>• Receipt will be sent to your phone</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#9b59b6',
    padding: 20,
    paddingTop: 40,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 12,
    marginTop: 15,
  },
  methodsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  methodButton: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: 'center',
    elevation: 2,
    borderWidth: 2,
    borderColor: '#ecf0f1',
  },
  methodButtonSelected: {
    borderColor: '#9b59b6',
    backgroundColor: '#f4ecf7',
  },
  methodIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  methodName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2c3e50',
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ecf0f1',
    marginBottom: 20,
  },
  payButton: {
    backgroundColor: '#27ae60',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 3,
  },
  payButtonDisabled: {
    opacity: 0.6,
  },
  payButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  infoBox: {
    backgroundColor: '#ecf0f1',
    padding: 15,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#3498db',
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 12,
    color: '#34495e',
    marginBottom: 5,
  },
});
