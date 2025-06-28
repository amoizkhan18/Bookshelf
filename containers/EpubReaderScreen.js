import React, { useState, useRef, useEffect } from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  PanResponder,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import EPubReader from 'react-native-epub-reader';
import { NativeModules } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RNFS from 'react-native-fs';
import Icon from 'react-native-vector-icons/Entypo';
import { useNavigation, useRoute } from '@react-navigation/native';

const { EPubReaderModule } = NativeModules;
const fonts = ['serif', 'Georgia', 'Times New Roman', 'Roboto', 'monospace', 'cursive', 'fantasy' ];

function EpubReaderScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { bookUrl, fileName } = route.params || {};

  const [isDarkMode, setIsDarkMode] = useState(true);
  const [fontSize, setFontSize] = useState(16);
  const [fontFamily, setFontFamily] = useState('Roboto');
  const [showReader, setShowReader] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [fontDropdownVisible, setFontDropdownVisible] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [localFilePath, setLocalFilePath] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const downloadEpub = async () => {
    if (!bookUrl || !fileName) {
      Alert.alert('Error', 'No book URL or file name provided.');
      return;
    }
    try {
      setIsDownloading(true);
      const localPath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
      const fileExists = await RNFS.exists(localPath);
      if (fileExists) {
        setLocalFilePath(localPath);
        setShowReader(true);
        setIsDownloading(false);
        return;
      }
      const result = await RNFS.downloadFile({
        fromUrl: bookUrl,
        toFile: localPath,
      }).promise;
      if (result.statusCode === 200) {
        setLocalFilePath(localPath);
        setShowReader(true);
      } else {
        throw new Error(`Download failed with status ${result.statusCode}`);
      }
    } catch (error) {
      Alert.alert('Download Error', 'Failed to download the EPUB file. Please check your internet connection.');
    } finally {
      setIsDownloading(false);
    }
  };

  useEffect(() => {
    downloadEpub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookUrl, fileName]);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) =>
        Math.abs(gestureState.dx) > 20,
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx > 50) {
          EPubReaderModule.previousChapter();
        } else if (gestureState.dx < -50) {
          EPubReaderModule.nextChapter();
        }
      },
    })
  ).current;

  const backgroundStyle = {
    flex: 1,
    backgroundColor: isDarkMode ? '#000' : '#fff',
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />

      {/* Top bar */}
      <View style={styles.topBar}>
        <TouchableOpacity style={[styles.backButton, { marginLeft: 10 }]} onPress={handleBackPress}>
  <Icon
    name="chevron-left"
    size={30}
    color={isDarkMode ? "#fff" : "#000"}
  />
</TouchableOpacity>
        <TouchableOpacity
          onPress={() => EPubReaderModule.highlightSelection()}
          style={styles.iconButton}
        >
          <Ionicons
            name="pencil-outline"
            size={24}
            color={isDarkMode ? '#fff' : '#000'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setPopupVisible(true)}
          style={styles.dotButton}
        >
          <Text style={{ fontSize: 24, color: isDarkMode ? '#fff' : '#000' }}>⋯</Text>
        </TouchableOpacity>
      </View>

      {/* Loading indicator */}
      {isDownloading && (
        <View style={styles.loadingContainer}>
          <Text style={[styles.loadingText, { color: isDarkMode ? '#fff' : '#000' }]}>
            Downloading book...
          </Text>
        </View>
      )}

      {/* EPUB Reader */}
      {showReader && localFilePath && (
        <View style={styles.reader} {...panResponder.panHandlers}>
          <EPubReader
            style={{ flex: 1 }}
            source={{ uri: localFilePath }}
            fontSize={fontSize}
            fontFamily={fontFamily}
            nightMode={isDarkMode}
            onLocationChange={(location) => setCurrentLocation(location)}
          />
        </View>
      )}

      {/* Modal Popup */}
      <Modal
        visible={popupVisible}
        animationType="fade"
        transparent
        onRequestClose={() => setPopupVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => {
          setPopupVisible(false);
          setFontDropdownVisible(false);
        }}>
          <View style={styles.overlay}>
            <TouchableWithoutFeedback>
              <View style={styles.popup}>
                <Text style={styles.popupTitle}>Font Settings</Text>
                <TouchableOpacity
                  style={[styles.selectFont, { flexDirection: 'row', alignItems: 'center' }]}
                  onPress={() => setFontDropdownVisible(!fontDropdownVisible)}
                >
                  <Text style={styles.selectFontText}>Select Font</Text>
                  <Entypo
                    name={fontDropdownVisible ? 'chevron-down' : 'chevron-right'}
                    size={20}
                    color="#000"
                    style={styles.chevronIcon}
                  />
                </TouchableOpacity>
                {fontDropdownVisible && (
                  <View>
                    {fonts.map((font) => (
                      <TouchableOpacity
                        key={font}
                        onPress={() => {
                          setFontFamily(font);
                          setFontDropdownVisible(false);
                        }}
                        style={styles.fontOption}
                      >
                        <Text style={styles.fontOptionText}>
                          {font.charAt(0).toUpperCase() + font.slice(1)}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
                <View style={styles.fontSizeRow}>
                  <Text style={styles.fontSizeLabel}>A</Text>
                  <View style={styles.dotRow}>
                    {[12, 14, 16, 18, 20, 22].map(size => {
                      const dotSize = (size - 7) * 1.2;
                      return (
                        <TouchableOpacity
                          key={size}
                          onPress={() => setFontSize(size)}
                          style={[
                            styles.dot,
                            {
                              width: dotSize,
                              height: dotSize,
                              borderRadius: dotSize / 2,
                            },
                            fontSize === size && styles.dotSelected
                          ]}
                        />
                      );
                    })}
                  </View>
                  <Text style={styles.fontSizeLabel}>A</Text>
                </View>
                <Text style={styles.popupTitle}>Theme</Text>
                <View style={styles.themeRow}>
                  <TouchableOpacity
                    style={[
                      styles.themeButton,
                      { backgroundColor: '#fff' },
                      !isDarkMode && styles.activeThemeBorder
                    ]}
                    onPress={() => setIsDarkMode(false)}
                  >
                    <Text style={{ color: '#000', fontFamily: 'AlegreyaSC-Bold' }}>Light</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.themeButton,
                      { backgroundColor: '#000' },
                      isDarkMode && styles.activeThemeBorder
                    ]}
                    onPress={() => setIsDarkMode(true)}
                  >
                    <Text style={{ color: '#fff', fontFamily: 'AlegreyaSC-Bold' }}>Dark</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  reader: { flex: 1 },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 10,
  },
  iconButton: { marginRight: 5 },
  dotButton: { padding: 8 },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    fontFamily: 'AlegreyaSC-Bold',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  popup: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  popupTitle: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: 'AlegreyaSC-Bold',
  },
  selectFont: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 370,
  },
  selectFontText: {
    fontFamily: 'AlegreyaSC-Bold',
    fontSize: 13,
    color: '#000',
  },
  fontOption: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 6,
    marginTop: 5,
  },
  fontOptionText: {
    fontSize: 13,
    color: '#000',
    textAlign: 'center',
    fontFamily: 'AlegreyaSC-Bold',
  },
  fontSizeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  fontSizeLabel: {
    fontSize: 18,
    fontFamily: 'AlegreyaSC-Bold',
  },
  dotRow: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#aaa',
  },
  dotSelected: {
    backgroundColor: '#000',
  },
  themeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  themeButton: {
    flex: 1,
    padding: 10,
    backgroundColor: '#eee',
    marginRight: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  activeTheme: {
    backgroundColor: '#000',
  },
  activeThemeBorder: {
    borderWidth: 2,
    borderColor: '#E04B07',
  },
  selectFontRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 10,
  }
});

export default EpubReaderScreen;