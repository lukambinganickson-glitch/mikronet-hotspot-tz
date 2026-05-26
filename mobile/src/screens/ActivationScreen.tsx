import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert, ActivityIndicator, Dimensions } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import axios from 'axios';

const API_BASE_URL = 'http://192.168.1.100:3000';

export const ActivationScreen: React.FC = () => {
  const [showCamera, setShowCamera] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [macAddress, setMacAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const cameraRef = useRef<CameraView>(null);

  const handleManualActivation = async () => {
    if (!name.trim() || !phone.trim()) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/api/users/activate-manual`, {
        name: name.trim(),
        phone: phone.trim(),
        macAddress: macAddress || undefined,
        packageId: 'pkg-daily',
      });

      Alert.alert('Success', `User activated: ${response.data.user.id}`);
      setName('');
      setPhone('');
      setMacAddress('');
    } catch (error) {
      Alert.alert('Error', 'Activation failed. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const requestCameraPermission = async () => {
    const { granted } = await requestPermission();
    if (granted) {
      setShowCamera(true);
    } else {
      Alert.alert('Permission Denied', 'Camera access is required to scan vouchers');
    }
  };

  if (showCamera && permission?.granted) {
    return (
      <View style={styles.cameraContainer}>
        <CameraView style={styles.camera} ref={cameraRef} />
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => setShowCamera(false)}
        >
          <Text style={styles.closeButtonText}>✕ Close</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>✅ Activation</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Manual Activation</Text>

        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
          editable={!loading}
        />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="255711223344"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
          editable={!loading}
        />

        <Text style={styles.label}>MAC Address (Optional)</Text>
        <TextInput
          style={styles.input}
          placeholder="00:0C:29:43:8C:11"
          value={macAddress}
          onChangeText={setMacAddress}
          editable={!loading}
        />

        <TouchableOpacity
          style={[styles.activateButton, loading && styles.buttonDisabled]}
          onPress={handleManualActivation}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.activateButtonText}>Activate Now</Text>
          )}
        </TouchableOpacity>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.dividerLine} />
        </View>

        <TouchableOpacity
          style={styles.cameraButton}
          onPress={requestCameraPermission}
        >
          <Text style={styles.cameraButtonIcon}>📷</Text>
          <Text style={styles.cameraButtonText}>Scan Voucher QR Code</Text>
        </TouchableOpacity>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>ℹ️ How It Works</Text>
          <Text style={styles.infoText}>1. Enter your details</Text>
          <Text style={styles.infoText}>2. Or scan a voucher QR code</Text>
          <Text style={styles.infoText}>3. Get instant WiFi access</Text>
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
    backgroundColor: '#e74c3c',
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#ecf0f1',
    marginBottom: 15,
  },
  activateButton: {
    backgroundColor: '#27ae60',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    elevation: 3,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  activateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#bdc3c7',
  },
  dividerText: {
    marginHorizontal: 10,
    color: '#7f8c8d',
    fontWeight: '600',
  },
  cameraButton: {
    backgroundColor: '#3498db',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    elevation: 3,
  },
  cameraButtonIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  cameraButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  infoBox: {
    backgroundColor: '#ecf0f1',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#e74c3c',
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
