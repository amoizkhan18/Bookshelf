import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, SafeAreaView, TouchableWithoutFeedback } from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { audiobooksData } from '../../data/audiobooksData';

const AudioBooksScreen = ({ navigation }) => {
  const [audioBooksButtonColor, setAudioBooksButtonColor] = useState('#E04B07');

  const handleBooksButtonPress = () => {
  setAudioBooksButtonColor('#292929');
  navigation.navigate('Home', { screen: 'HomeScreen' });
};

  const handleAudioBooksButtonPress = () => {
    setAudioBooksButtonColor('#E04B07');
    // Navigate to Audio Books Screen
  };

  const handleSeeAllAudioPress = () => { 
    navigation.navigate('SeeAllAudioScreen');
  };

 const handleCategoryPress = (genre, heading) => {
  navigation.navigate('AudioBooksListScreen', { genre, heading });
};

  const handleItemPress = (item) => {
  // Find the audiobook object by id from audiobooksData
  const audiobook = audiobooksData.find(ab => ab.id === item.id);
  if (audiobook) {
    navigation.navigate('AudioBookDetailScreen', { audiobook });
  } else {
    console.warn(`No audiobook found for id: ${item.id}`);
  }
}; 

  // Array of Trending Items  
  const trendingItems = [
    { id: 1, image: require('../../assets/taoteching.png'), title: 'Tao Te Ching', author: 'Lao Tzu' },
    { id: 2, image: require('../../assets/warandpeace.png'), title: 'War & Peace', author: 'Leo Tolstoy' },
    { id: 3, image: require('../../assets/dracula.png'), title: 'Dracula', author: 'Bram Stoker' },
    { id: 4, image: require('../../assets/thegreatgatsby.png'), title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
    { id: 5, image: require('../../assets/sunalsorises.png'), title: 'The Sun Also Rises', author: 'Ernest Hemingway' },
    { id: 6, image: require('../../assets/asamanthinketh.png'), title: 'As a Man thinketh', author: 'James Allen' },
    { id: 7, image: require('../../assets/crimeandpunishment.png'), title: 'Crime & Punishment', author: 'Fyodor Dostoyevsky' },
    { id: 8, image: require('../../assets/murderofroger.png'), title: 'The Murder of Roger Ackroyd', author: 'Agatha Christie' },
    { id: 9, image: require('../../assets/countofmonte.png'), title: 'The Count of Monte Cristo', author: 'Alexandre Dumas' },
    { id: 10, image: require('../../assets/artofwar.png'), title: 'The Art of war', author: 'Sun tzu' },
  ];
 
  const popularItems = [
    { id: 11, image: require('../../assets/sidhartha.png'), title: 'Siddhartha', author: 'Hermann Hesse' },
    { id: 12, image: require('../../assets/meditations.png'), title: 'Meditations', author: 'Marcus Aurelius' },
    { id: 13, image: require('../../assets/theprince.png'), title: 'The Prince', author: 'Niccolò Machiavelli' },
    { id: 14, image: require('../../assets/thinkandgrowrich.png'), title: 'Think & grow rich', author: 'Napoleon Hill' },
    { id: 15, image: require('../../assets/powerofyoursubconscious.png'), title: 'Power of Your Subconscious Mind', author: 'Joseph Murphy' },
    { id: 16, image: require('../../assets/divinecomedy.png'), title: 'Divine Comedy Inferno', author: 'Dante Alighieri' },
    { id: 17, image: require('../../assets/richestmaninbabylon.png'), title: 'The Richest Man in Babylon', author: 'George S. Clason' },
    { id: 18, image: require('../../assets/adventuresofhuckleberry.png'), title: 'Adventures of Huckleberry Finn', author: 'Mark Twain' },
    { id: 19, image: require('../../assets/miamotomusahi.png'), title: 'The Book of Five Rings', author: 'Miyamoto Musashi' },
    { id: 20, image: require('../../assets/prideandprejudice.png'), title: 'Pride & Prejudice', author: 'Jane Austen' },
];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          {/* Top Left Logo */}
          <Image source={require('../../assets/bsnewlogo.png')} style={styles.logo} />

          {/* Books Button */}
          <TouchableOpacity style={styles.button} onPress={handleBooksButtonPress}>
            <Text style={styles.buttonText}>Books</Text>
          </TouchableOpacity>

          {/* Audio Books Button */}
          <TouchableOpacity style={[styles.button1, { backgroundColor: audioBooksButtonColor }]} onPress={handleAudioBooksButtonPress}>
            <Text style={styles.buttonText}>Audio Books</Text>
          </TouchableOpacity>
        </View>

        <TouchableWithoutFeedback onPress={handleSeeAllAudioPress}>
                  <Text style={styles.smallText}>See all</Text>
                </TouchableWithoutFeedback>

        {/* All Categories Heading */}
        <Text style={styles.heading}>ALL CATEGORIES</Text>

        {/* Categories */}
       <View style={styles.categoriesContainer}>
  <TouchableOpacity
    style={styles.categoryButton}
    onPress={() => handleCategoryPress('Fiction', 'FICTION')}
  >
    <Image source={require('../../assets/fiction.jpg')} style={styles.categoryImage} />
    <Text style={styles.categoryText}>Fiction</Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={styles.categoryButton}
    onPress={() => handleCategoryPress('Nonfiction', 'NONFICTION')}
  >
    <Image source={require('../../assets/nonfiction.jpg')} style={styles.categoryImage} />
    <Text style={styles.categoryText}>Nonfiction</Text>
  </TouchableOpacity>
</View>

<View style={styles.categoriesContainer}>
  <TouchableOpacity
    style={styles.categoryButton}
    onPress={() => handleCategoryPress('Fantasy', 'FANTASY')}
  >
    <Image source={require('../../assets/fantas.jpg')} style={styles.categoryImage} />
    <Text style={styles.categoryText}>Fantasy</Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={styles.categoryButton}
    onPress={() => handleCategoryPress('ScienceFiction', 'SCIENCE FICTION')}
  >
    <Image source={require('../../assets/ScienceFictionx.png')} style={styles.categoryImage} />
    <Text style={styles.categoryText}>Science Fiction</Text>
  </TouchableOpacity>
</View>

        {/* New & Trending Heading */}
        <Text style={styles.heading1}>NEW & TRENDING</Text>

        {/* Trending Items */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.trendingContainer}>
          {trendingItems.map(item => (
            <View style={styles.trendingItem} key={item.id} >
              <Image source={item.image} style={styles.trendingImage} />
              <Text style={styles.bookTitle}>{item.title}</Text>
              <Text style={styles.author}>{item.author}</Text>
              <TouchableOpacity style={styles.playButton} onPress={() => handleItemPress(item)}>
                <EntypoIcon name="controller-play" size={25} color="#F3C0A9" />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        {/* Popular Heading */}
        <Text style={styles.heading2}>POPULAR</Text>

        {/* Popular Items */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.trendingContainer}>
          {popularItems.map(item => (
            <View style={styles.trendingItem} key={item.id}>
              <Image source={item.image} style={styles.trendingImage} />
              <Text style={styles.bookTitle}>{item.title}</Text>
              <Text style={styles.author}>{item.author}</Text>
              <TouchableOpacity style={styles.playButton} onPress={() => handleItemPress(item)}>
                <EntypoIcon name="controller-play" size={25} color="#F3C0A9" />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </ScrollView>
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
    color: '#FFFFFF',
    fontFamily: 'AlegreyaSC-Bold',
    fontSize: 14
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
    marginBottom: 15,
    marginLeft: 10,
    marginTop: 30
  },
  heading2: {
    color: '#E04B07',
    fontSize: 20,
    fontFamily: 'AlegreyaSC-Bold',
    marginBottom: 15,
    marginLeft: 10,
    marginTop: 20
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
    fontFamily: 'AlegreyaSC-Bold', 
  },
  imageContainer: {
    flexDirection: 'row',
    marginTop: 5,
    marginLeft: 5,
  },
  trendingContainer: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    marginBottom: 10
  },
  trendingItem: {
    backgroundColor: '#292929',
    width: 120,
    borderRadius: 10,
    marginHorizontal: 3,
    alignItems: 'center',
    paddingTop: 10,
  },
  trendingImage: {
    width: 100,
    height: 150,
    marginBottom: 10,
  },
bookTitle: {
  color: '#FFFFFF',
  fontSize: 16,
  marginTop: 10,
  fontFamily: 'AlegreyaSC-Bold',
  textAlign: 'center', // ✅ Add this line to center-align multiline text
},
  author: {
    color: '#9E909D',
    fontSize: 12,
    marginBottom: 10,
    fontFamily: 'AlegreyaSC-Bold',
  },
  playButton: {
    backgroundColor: 'black',
    width: 40,
    height: 40,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E04B07',
    bottom: 5,
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
});

export default AudioBooksScreen;
 