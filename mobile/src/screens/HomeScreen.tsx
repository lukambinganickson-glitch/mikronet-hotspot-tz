import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';

const API_BASE_URL = 'http://192.168.1.100:3000'; // Change to your server IP

interface Package {
  id: string;
  name: string;
  price: number;
  speedLimit: string;
  durationHours: number;
  dataLimitGb: number;
  description: string;
}

export const HomeScreen: React.FC = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      // Mock packages since backend is REST
      const mockPackages: Package[] = [
        {
          id: 'pkg-promo',
          name: 'Quick Promo - 1 Hour',
          price: 500,
          speedLimit: '2M/2M',
          durationHours: 1,
          dataLimitGb: 0.5,
          description: 'Instant 500 TZS speed connection',
        },
        {
          id: 'pkg-eco',
          name: 'Eco Triple - 3 Hours',
          price: 1000,
          speedLimit: '3M/3M',
          durationHours: 3,
          dataLimitGb: 1.5,
          description: 'Saver 1,000 TZS package valid for 3 hours',
        },
        {
          id: 'pkg-daily',
          name: 'Standard Daily - 24 Hours',
          price: 2000,
          speedLimit: '4M/4M',
          durationHours: 24,
          dataLimitGb: 5,
          description: 'Workday 2,000 TZS hotspot card valid for 24 hours',
        },
        {
          id: 'pkg-2',
          name: 'Silver Master - 24 Hours',
          price: 3000,
          speedLimit: '6M/6M',
          durationHours: 24,
          dataLimitGb: 10,
          description: 'Stream SD videos & smooth downloads',
        },
      ];
      setPackages(mockPackages);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching packages:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🌐 MikroNet Hotspot</Text>
        <Text style={styles.headerSubtitle}>Tanzania WiFi Packages</Text>
      </View>

      <View style={styles.packagesContainer}>
        {packages.map((pkg) => (
          <TouchableOpacity
            key={pkg.id}
            style={[
              styles.packageCard,
              selectedPackage?.id === pkg.id && styles.packageCardSelected,
            ]}
            onPress={() => setSelectedPackage(pkg)}
          >
            <Text style={styles.packageName}>{pkg.name}</Text>
            <Text style={styles.packagePrice}>{pkg.price} TZS</Text>
            <Text style={styles.packageDescription}>{pkg.description}</Text>
            <View style={styles.packageDetails}>
              <Text style={styles.detail}>📶 {pkg.speedLimit}</Text>
              <Text style={styles.detail}>⏱️ {pkg.durationHours}h</Text>
              <Text style={styles.detail}>📊 {pkg.dataLimitGb}GB</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {selectedPackage && (
        <View style={styles.selectedPackageInfo}>
          <Text style={styles.selectedTitle}>Selected: {selectedPackage.name}</Text>
          <Text style={styles.selectedPrice}>{selectedPackage.price} TZS</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#3498db',
    padding: 20,
    paddingTop: 40,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#ecf0f1',
    marginTop: 5,
  },
  packagesContainer: {
    padding: 15,
  },
  packageCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#3498db',
  },
  packageCardSelected: {
    borderLeftColor: '#27ae60',
    backgroundColor: '#ecf9f1',
  },
  packageName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 5,
  },
  packagePrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#27ae60',
    marginBottom: 5,
  },
  packageDescription: {
    fontSize: 12,
    color: '#7f8c8d',
    marginBottom: 10,
  },
  packageDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ecf0f1',
  },
  detail: {
    fontSize: 11,
    color: '#34495e',
    fontWeight: '500',
  },
  selectedPackageInfo: {
    backgroundColor: '#27ae60',
    padding: 15,
    margin: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  selectedTitle: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 5,
  },
  selectedPrice: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
