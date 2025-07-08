import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, SafeAreaView, TouchableWithoutFeedback } from 'react-native';
import { useFonts } from 'react-native-fonts'; // Changed from expo-font to react-native-fonts
import  SplashScreen from 'react-native-splash-screen'; // Changed from expo-splash-screen to react-native-splash-screen
import RateUsModal from '../RateUsModal';


const HomeScreen = ({ navigation }) => {
  const [booksButtonColor, setBooksButtonColor] = useState('#E04B07');
  
  const [fontsLoaded, setFontsLoaded] = useState(false); // Managing font load state manually
  const [fontError, setFontError] = useState(null);
 
  // Load fonts
  useEffect(() => {       
    const loadFonts = async () => {
      try {
        await useFonts({
          'AlegreyaSC-Bold': require('../../assets/fonts/AlegreyaSC-Bold.ttf'),
        });
        setFontsLoaded(true);
        SplashScreen.hide(); // Hides the splash screen when fonts are loaded
      } catch (error) { 
        setFontError(error); // Set error state in case of issues
      }
    };

    loadFonts();
  }, []);

  const onLayoutRootView = useCallback(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hide();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null; // Show nothing while fonts are loading
  }

  const handleBooksButtonPress = () => {
    setBooksButtonColor('#E04B07');
    // Navigate to Books Screen
  };

  const handleAudioBooksButtonPress = () => {
    setBooksButtonColor('#292929');
    // Navigate to Audio Books Screen
  };

  const handleSeeAllPress = () => {
    navigation.navigate('SeeAllScreen');
  };

  const handlePress = () => {
    navigation.navigate('AudioBooksScreen');
  };

  const handleCategoryPress = (genre, heading) => {
  navigation.navigate('BooksListScreen', { genre, heading });
};

 const handleItemPress = (item) => {
  navigation.navigate('BookDetailsScreen', { bookId: item.id }); // Pass only the id
};

  // Array of Trending Items
  const trendingItems = [
    { id: 1, image: require('../../assets/thinkandgrowrich.png'), title: 'Think & Grow Rich', author: 'Napoleon Hill',},
    { id: 2, image: require('../../assets/asamanthinketh.png'), title: 'As a Man thinketh', author: 'James Allen' },
    { id: 3, image: require('../../assets/artofwar.png'), title: 'The Art of war', author: 'Sun tzu' },
    { id: 4, image: require('../../assets/richestmaninbabylon.png'), title: 'The richest man in babylon', author: 'George S. Clason' },
    { id: 5, image: require('../../assets/divinecomedy.png'), title: 'The Divine Comedy', author: 'Dante Alighieri' },
    { id: 6, image: require('../../assets/countofmonte.png'), title: 'The Count of Monte Cristo', author: 'Alexandre Dumas' },
    { id: 7, image: require('../../assets/sidhartha.png'), title: 'Siddhartha', author: 'Hermann Hesse' },
    { id: 8, image: require('../../assets/sunalsorises.png'), title: 'The Sun Also Rises', author: 'Ernest Hemingway' },
    { id: 9, image: require('../../assets/meditations.png'), title: 'Meditations', author: 'Marcus Aurelius' },
    { id: 10, image: require('../../assets/powerofyoursubconscious.png'), title: 'Power of Your Subconscious Mind', author: 'Joseph Murphy' },
];

  // Array of Popular Items
  const popularItems = [
    { id: 11, image: require('../../assets/thegreatgatsby.png'), title: 'The Great Gatsby', author: 'F. Scott Fitzgerald',},
    { id: 12, image: require('../../assets/murderofroger.png'), title: 'The Murder of Roger Ackroyd', author: 'Agatha Christie' },
    { id: 13, image: require('../../assets/warandpeace.png'), title: 'War & Peace', author: 'Leo Tolstoy' },
    { id: 14, image: require('../../assets/theprince.png'), title: 'The Prince', author: 'Niccolò Machiavelli' },
    { id: 15, image: require('../../assets/prideandprejudice.png'), title: 'Pride & Prejudice', author: 'Jane Austen' },
    { id: 16, image: require('../../assets/taoteching.png'), title: 'Tao Te Ching', author: 'Lao Tzu' },
    { id: 17, image: require('../../assets/miamotomusahi.png'), title: 'The Book of Five Rings', author: 'Miyamoto Musashi' },
    { id: 18, image: require('../../assets/dracula.png'), title: 'Dracula', author: 'Bram Stoker' },
    { id: 19, image: require('../../assets/adventuresofhuckleberry.png'), title: 'Adventures of Huckleberry Finn', author: 'Mark Twain' },
    { id: 20, image: require('../../assets/crimeandpunishment.png'), title: 'Crime & Punishment', author: 'Fyodor Dostoyevsky' },
];

  return (
    <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          {/* Top Left Logo */}
          <Image source={require('../../assets/bsnewlogo.png')} style={styles.logo} />

          {/* Books Button */}
          <TouchableOpacity style={[styles.button, { backgroundColor: booksButtonColor }]} onPress={handleBooksButtonPress}>
            <Text style={styles.buttonText}>Books</Text>
          </TouchableOpacity>

          {/* Audio Books Button */}
          <TouchableOpacity style={styles.button1} onPress={handlePress}>
            <Text style={styles.buttonText}>Audio Books</Text>
          </TouchableOpacity>
        </View>

        {/* Rate Us Popup */}
      <RateUsModal />

        <TouchableWithoutFeedback onPress={handleSeeAllPress}>
          <Text style={styles.smallText}>See all</Text>
        </TouchableWithoutFeedback>

        {/* All Categories Heading */}
        <Text style={styles.heading}>ALL CATEGORIES</Text>

        {/* Categories */}
        <View style={styles.categoriesContainer}>
  <TouchableOpacity
    style={styles.categoryButton}
    onPress={() => handleCategoryPress('Romance', 'ROMANCE')}
  >
    <Image source={require('../../assets/Romancex.png')} style={styles.categoryImage} />
    <Text style={styles.categoryText}>Romance</Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={styles.categoryButton}
    onPress={() => handleCategoryPress('ShortStories', 'SHORT STORIES')}
  >
    <Image source={require('../../assets/ShortStoriesx.png')} style={styles.categoryImage} />
    <Text style={styles.categoryText}>Short Stories</Text>
  </TouchableOpacity>
</View>

<View style={styles.categoriesContainer}>
  <TouchableOpacity
    style={styles.categoryButton}
    onPress={() => handleCategoryPress('Thrillers', 'THRILLERS')}
  >
    <Image source={require('../../assets/Thrillersx.png')} style={styles.categoryImage} />
    <Text style={styles.categoryText}>Thrillers</Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={styles.categoryButton}
    onPress={() => handleCategoryPress('Mystery', 'MYSTERY & DETECTIVE')}
  >
    <Image source={require('../../assets/Mysteryx.png')} style={styles.categoryImage} />
    <Text style={styles.categoryText}>Mystery &{'\n'}Detective</Text>
  </TouchableOpacity>
</View>

        {/* New & Trending Heading */}
        <Text style={styles.heading}>NEW & TRENDING</Text>

        {/* Trending Items */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.trendingContainer}>
          {trendingItems.map(item => (
            <TouchableOpacity key={item.id} onPress={() => handleItemPress(item)}>
              <View style={styles.trendingItem}>
                <View style={{ alignItems: 'center' }}>
                <Image source={item.image} style={styles.trendingImage} />
                <Text style={styles.bookTitle}>{item.title}</Text>
                <Text style={styles.author}>{item.author}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Popular Heading */}
        <Text style={styles.heading1}>POPULAR</Text>

        {/* Popular Items */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.trendingContainer}>
          {popularItems.map(item => (
            <TouchableOpacity key={item.id} onPress={() => handleItemPress(item)}>
              <View style={styles.trendingItem}>
                <View style={{ alignItems: 'center' }}>
                <Image source={item.image} style={styles.trendingImage} />
                <Text style={styles.bookTitle}>{item.title}</Text>
                <Text style={styles.author}>{item.author}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

      </ScrollView>
      <RateUsModal />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212'
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    top: 20
  },
  logo: {
    width: 35,
    height: 30,
    marginLeft: 10
  },
  button: {
    backgroundColor: '#292929',
    borderRadius: 20,
    padding: 5,
    alignItems: 'center',
    width: '20%',
    marginLeft: 20,
  },
  button1: {
    backgroundColor: '#292929',
    borderRadius: 20,
    padding: 5,
    alignItems: 'center',
    width: '33%',
    marginLeft: 15,
  },
  buttonText: {
    color: '#ffffff',
    fontFamily: 'AlegreyaSC-Bold',
    fontSize: 14
  },
  smallText: {
    color: '#E04B07',
    fontSize: 13,
    fontWeight: 'medium',
    alignSelf: 'flex-end',
    marginRight: 15,
    textDecorationLine: 'underline',
    top: 45,
    zIndex: 999,
  },
  heading: {
    color: '#E04B07',
    fontSize: 20,
    fontFamily: 'AlegreyaSC-Bold',
    marginBottom: 10,
    marginLeft: 10,
    marginTop: 20
  },
  heading1: {
    color: '#E04B07',
    fontSize: 20,
    fontFamily: 'AlegreyaSC-Bold',
    marginBottom: 10,
    marginLeft: 10,
    marginTop: -4
  },
  categoriesContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 10,
  },
  categoryButton: {
    backgroundColor: '#292929',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    borderRadius: 5,
    width: '47%',
    marginRight: 10,
  },
  categoryImage: {
    width: 50,
    height: 70,
    marginRight: 10,
  },
  categoryText: {
    color: '#FFFFFF',
    fontFamily: 'AlegreyaSC-Bold',
    fontSize: 14,
  },
trendingContainer: {
  flexDirection: 'row',
  flexWrap: 'wrap', // allows items to wrap to next line
  justifyContent: 'flex-start',
  marginTop: 10,
  marginBottom: 10,
  marginLeft: 5,
},
  trendingItem: {
    marginRight: 5,
  },
  trendingImage: {
    width: 120,
    height: 180,
    borderRadius: 10,
    marginLeft: 7
  },
bookTitle: {
  color: '#ffffff',
  fontFamily: 'AlegreyaSC-Bold',
  fontSize: 14,
  marginTop: 5,
  textAlign: 'center',
  flexWrap: 'wrap', // important for multiline
  width: 120,        // matches image width
},

author: {
  color: '#aaa',
  fontFamily: 'AlegreyaSC-Bold',
  fontSize: 12,
  textAlign: 'center',
  flexWrap: 'wrap',
  width: 120,        // matches image width
},
  
});

export default HomeScreen;
 