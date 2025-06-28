import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainContainer from './containers/MainContainer/MainContainer';
import EpubReaderScreen from './containers/EpubReaderScreen';

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

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {isSplashFinished ? (
          <>
            <RootStack.Screen name="MainTabs" component={MainContainer} />
            <RootStack.Screen name="EpubReaderScreen" component={EpubReaderScreen} />
            {/* ...other root-level screens */}
          </>
        ) : (
          <RootStack.Screen name="Splash">
            {() => <SplashScreen onFinish={() => setSplashFinished(true)} />}
          </RootStack.Screen>
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