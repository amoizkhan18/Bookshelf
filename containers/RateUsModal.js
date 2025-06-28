import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Rate, { AndroidMarket } from 'react-native-rate';

let hasShownModal = false; // ✅ Tracks if modal is already shown for this session

const RateUsModal = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // ✅ Only show modal once per session
    if (!hasShownModal) {
      setShowModal(true);
      hasShownModal = true; // mark as shown
    }
  }, []);

  const handleDislike = () => {
    setTimeout(() => {
      setShowModal(false);
    }, 50);
  };

  const handleRate = () => {
    const options = {
      AppleAppID: '1234567890',
      GooglePackageName: 'com.yourcompany.yourapp',
      preferredAndroidMarket: AndroidMarket.Google,
      preferInApp: true,
      openAppStoreIfInAppFails: true,
    };
    Rate.rate(options, (success) => {
      if (success) {
        console.log('User rated the app');
      }
      setShowModal(false);
    });
  };

  return (
    <Modal transparent visible={showModal} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Image
            source={require('../assets/rate-us.png')} 
            style={styles.image}
          />
          <Text style={styles.title}>Rate Us</Text>
          <Text style={styles.message}>Do you like using our app? Please leave a rating!</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.outlineButton} onPress={handleDislike}>
              <Icon name="thumbs-down" size={18} color="#FF6B00" />
              <Text style={styles.outlineText}> I don’t like</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filledButton} onPress={handleRate}>
              <Icon name="thumbs-up" size={18} color="#fff" />
              <Text style={styles.filledText}> Rate</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'black',
    borderRadius: 10,
    padding: 25,
    width: '80%',
    alignItems: 'center',
    elevation: 5,
  },
  image: {
    width: 280,
    height: 50,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    marginTop: 10,
    color: '#E04B07',
    fontFamily: 'AlegreyaSC-Bold',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#FFFFFF',
    fontFamily: 'AlegreyaSC-Bold',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  outlineButton: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#FF6B00',
    borderRadius: 5,
    padding: 10,
    flex: 1,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filledButton: {
    flexDirection: 'row',
    backgroundColor: '#FF6B00',
    borderRadius: 5,
    padding: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  outlineText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'AlegreyaSC-Bold',
  },
  filledText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'AlegreyaSC-Bold',
  },
});

export default RateUsModal;
