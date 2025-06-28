import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MainContainer from './containers/MainContainer/MainContainer';
import EpubReaderScreen from './containers/EpubReaderScreen';
import CarouselSplash from './containers/CarouselSplash';

const RootStack = createStackNavigator();

const SplashScreen = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <View style={styles.splashContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      <Image
        source={require('./assets/audora.png')}
        style={styles.logo}
      />
    </View>
  );
};

const App = () => {
  const [isSplashFinished, setSplashFinished] = useState(false);
  const [showCarousel, setShowCarousel] = useState(false);
  const [checkingFirstLaunch, setCheckingFirstLaunch] = useState(true);

  useEffect(() => {
    const checkFirstLaunch = async () => {
      const alreadyLaunched = await AsyncStorage.getItem('alreadyLaunched');
      if (alreadyLaunched === null) {
        await AsyncStorage.setItem('alreadyLaunched', 'true');
        setShowCarousel(true);
      }
      setCheckingFirstLaunch(false);
    };
    checkFirstLaunch();
  }, []);

  if (checkingFirstLaunch) return null;

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {!isSplashFinished ? (
          <RootStack.Screen name="Splash">
            {() => <SplashScreen onFinish={() => setSplashFinished(true)} />}
          </RootStack.Screen>
        ) : showCarousel ? (
          <RootStack.Screen name="CarouselSplash" component={CarouselSplash} />
        ) : (
          <>
            <RootStack.Screen name="MainTabs" component={MainContainer} />
            <RootStack.Screen name="EpubReaderScreen" component={EpubReaderScreen} />
          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 170,
    height: 200,
  },
});

export default App;