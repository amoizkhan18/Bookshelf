import React, { useRef, useState } from 'react';
import { View, FlatList, Image, Dimensions, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const images = [
  require('../assets/carousel1.png'),
  require('../assets/carousel2.png'),
  require('../assets/carousel3.png'),
];

const { width } = Dimensions.get('window');

const CarouselSplash = () => {
  const flatListRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const navigation = useNavigation();

  const mainTexts = [
    "Dive into stories,\nwhether in pages\nor waves of sound",
    "Create your\nLibrary",
    "Welcome!"
  ];
  const subTexts = [
    "Discover worlds within pages, where every\nstory is an invitation to explore",
    "Add the books and topics you\nlike to your library. Then you can\neasily find the newest books on\nthose topics",
    "PAGES HOLD WORLDS UNTOLD!\n\nDiscover the allure of past epochs, delve\ninto timeless stories and historical accounts,\nembark on adventures within these timeless\nLiterary treasures available online."
  ];

  const onViewRef = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  });

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  return (
   <View style={styles.screenContainer}>
    <View style={styles.contentContainer}>
      <FlatList
        ref={flatListRef}
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item }) => (
          <Image source={item} style={styles.carouselImage} />
        )}
        style={styles.carouselList}
        contentContainerStyle={{ alignItems: 'center' }}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
      />
      <View style={styles.textContainer}>
        <Text style={styles.mainText}>
          {mainTexts[activeIndex]}
        </Text>
        <Text style={styles.subText}>
          {subTexts[activeIndex]}
        </Text>
      </View>
    </View>
    <Image
  source={
    activeIndex === 0
      ? require('../assets/circle1.png')
      : activeIndex === 1
      ? require('../assets/circle2.png')
      : require('../assets/circle3.png') 
  }
  style={styles.sideIcon}
/>
    <TouchableOpacity
  style={activeIndex === 2 ? styles.sideIcon3 : styles.sideIcon1}
  onPress={() => {
    if (activeIndex < images.length - 1 && flatListRef.current) {
      flatListRef.current.scrollToIndex({ index: activeIndex + 1, animated: true });
    } else if (activeIndex === 2) {
      navigation.replace('HomeScreen', { // Navigate to HomeStack when the last image is reached
        screen: 'HomeScreen',
      });
    }
  }}
>
  <Image
    source={
      activeIndex === 2
        ? require('../assets/reading.png')
        : require('../assets/next1.png')
    }
    style={activeIndex === 2 ? { width: 270, height: 70 } : { width: 200, height: 70 }}
    resizeMode="contain"
  />
</TouchableOpacity>
  </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  contentContainer: {
    width: '100%',
    alignItems: 'center',
  },
  carouselList: {
  },
  carouselImage: {
    width: width,
    height: 340,
    resizeMode: 'contain',
  },
  textContainer: {
    alignItems: 'center',
    width: '90%',
    marginTop: 25,
  },
  mainText: {
    color: '#fff',
    fontSize: 38,
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'AlegreyaSC-Bold',
  },
  subText: {
    color: '#ccc',
    fontSize: 15,
    textAlign: 'center',
    fontFamily: 'AlegreyaSC-Bold',
  },
  rowContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%',
},
sideIcon: {
  position: 'absolute',
  left: 20,
  bottom: 45, 
  width: 50,
  height: 10,
},
sideIcon1: {
  position: 'absolute',
  right: -5,
  bottom: 17, 
},
sideIcon3: {
  position: 'absolute',
  right: -5,
  bottom: 17, 
},

});

export default CarouselSplash;