# MikroNet Hotspot Mobile App

A React Native mobile application for purchasing WiFi hotspot packages in Tanzania.

## 📱 Features

- ✅ Browse WiFi packages
- 💳 Multiple payment methods (M-Pesa, Tigo Money, Airtel Money)
- 📷 QR code voucher scanning
- 👤 User profile management
- 🔐 Biometric authentication support
- 📊 Real-time package activation

## 🛠️ Prerequisites

- Node.js 16+
- Expo CLI: `npm install -g eas-cli expo-cli`
- Android SDK (for building APK)
- Java JDK 11+

## 📥 Installation

```bash
cd mobile
npm install
```

## 🚀 Development

```bash
# Start development server
npm start

# Run on Android emulator
npm run android

# Run on iOS simulator
npm run ios
```

## 🏗️ Building APK

### Option 1: Local Build

```bash
# Build locally (requires Android SDK)
npm run build-apk
```

### Option 2: Cloud Build (Recommended)

```bash
# Build on EAS servers
eas build --platform android

# Build for production
eas build --platform android --auto-submit
```

## 📦 APK Output

After successful build:
- Local: `./dist/` folder
- EAS Cloud: Download from EAS dashboard
- File: `app-release.apk` or `app-production.apk`

## 🔑 Configuration

### API Endpoint

Update `API_BASE_URL` in screen files:

```typescript
const API_BASE_URL = 'http://YOUR_SERVER_IP:3000';
```

### Firebase Setup (Optional)

Add `google-services.json` for push notifications:

```bash
# Generate from Firebase Console
# Place in: mobile/google-services.json
```

## 📋 Screens

### Home Screen
- Display available WiFi packages
- Package details (speed, duration, price)
- Package selection

### Payment Screen
- Select payment method
- Enter phone number
- Process payment
- Real-time payment status

### Activation Screen
- Manual user activation
- QR code scanning
- Voucher redemption

### Profile Screen
- View active packages
- User information
- Settings & Help
- Logout

## 🔒 Security

- SSL certificate pinning
- Encrypted local storage
- No sensitive data in logs
- Secure API communication

## 📝 API Integration

```bash
# Payment API
POST /api/payment/request
{
  "phone": "255711223344",
  "packageId": "pkg-daily",
  "provider": "MPESA"
}

# Activation API
POST /api/users/activate-manual
{
  "name": "John Doe",
  "phone": "255711223344",
  "packageId": "pkg-daily"
}
```

## 🐛 Troubleshooting

### Build Fails
```bash
# Clear cache
rm -rf node_modules
npm install

# Clean build
eas build --platform android --clear-cache
```

### API Connection Issues
- Verify server IP is correct
- Check firewall allows port 3000
- Test with: `curl http://SERVER_IP:3000/health`

### Camera Permission Issues
- Grant camera permissions in device settings
- Reinstall app if permission cache is stuck

## 📱 Supported Devices

- Android 8.0+ (API 26+)
- Minimum 2GB RAM recommended
- Internet connection required

## 🚀 Distribution

### Google Play Store
```bash
eas build --platform android --auto-submit
```

### Direct APK Distribution
```bash
# Share app-release.apk file
# Users can install with: adb install app-release.apk
```

## 📄 License

MIT

## 🤝 Support

For issues:
1. Check GitHub Issues
2. Email: support@mikronet.tz
3. Call: +255 XXX XXX XXX
