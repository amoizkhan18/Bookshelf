import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const categories = [
  { genre: 'Romance', heading: 'ROMANCE', image: require('../assets/Romancex.png'), label: 'Romance' },
  { genre: 'ShortStories', heading: 'SHORT STORIES', image: require('../assets/ShortStoriesx.png'), label: 'Short Stories' },
  { genre: 'Thrillers', heading: 'THRILLERS', image: require('../assets/Thrillersx.png'), label: 'Thrillers' },
  { genre: 'Mystery', heading: 'MYSTERY & DETECTIVE', image: require('../assets/Mysteryx.png'), label: 'Mystery &\nDetective' },
  { genre: 'Children', heading: 'CHILDREN', image: require('../assets/Juvenilex.png'), label: 'Children' },
  { genre: 'Biographical', heading: 'BIOGRAPHIES & MEMOIRS', image: require('../assets/Biographicalxx.png'), label: 'Biographies &\nMemoirs' },
  { genre: 'Drama', heading: 'DRAMAS & PLAYS', image: require('../assets/Dramax.png'), label: 'Dramas & Plays' },
  { genre: 'FairyTales', heading: 'FAIRYTALES', image: require('../assets/FairyTalesx.png'), label: 'Fairytales' },
  { genre: 'SocialScience', heading: 'SOCIAL SCIENCES', image: require('../assets/SocialSciencex.png'), label: 'Social Sciences' },
  { genre: 'Philosophy', heading: 'PHILOSOPHY', image: require('../assets/philosophy.jpg'), label: 'Philosophy' },
  { genre: 'Fantasy', heading: 'FANTASY', image: require('../assets/fantas.jpg'), label: 'Fantasy' },
  { genre: 'Literary', heading: 'LANGUAGES & LITERATURE', image: require('../assets/Literaryx.png'), label: 'Languages &\nLiterature' },
  { genre: 'Poetry', heading: 'POETRY', image: require('../assets/Poetryx.png'), label: 'Poetry' },
  { genre: 'ScienceFiction', heading: 'SCIENCE FICTION', image: require('../assets/ScienceFictionx.png'), label: 'Science Fiction' },
  { genre: 'History', heading: 'HISTORY', image: require('../assets/Westernx.png'), label: 'History' },
];

const SeeAllScreen = ({ navigation }) => {
  const [booksButtonColor, setBooksButtonColor] = useState('#E04B07');

  const handleBooksButtonPress = () => {
    setBooksButtonColor('#E04B07');
  };

  const handleBackPress = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('Home');
    }
  };

  const handleCategoryPress = (genre, heading) => {
    navigation.navigate('BooksListScreen', { genre, heading });
  };

  const handleClickPress = () => {
    navigation.navigate('AudioBooksScreen');
  };

  // Helper to chunk categories into rows of 2
  const chunkArray = (arr, size) =>
    arr.reduce((acc, _, i) => (i % size ? acc : [...acc, arr.slice(i, i + size)]), []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <Icon name="chevron-back" size={30} color="#FFFFFF" />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, { backgroundColor: booksButtonColor }]} onPress={handleBooksButtonPress}>
            <Text style={styles.buttonText}>Books</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button1} onPress={handleClickPress}>
            <Text style={styles.buttonText}>Audio Books</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.heading}>ALL CATEGORIES</Text>

        {/* Render categories in rows of 2 */}
        {chunkArray(categories, 2).map((row, rowIndex) => (
          <View style={styles.imageContainer} key={rowIndex}>
            {row.map(cat => (
              <TouchableOpacity
                key={cat.genre}
                style={styles.categoryButton}
                onPress={() => handleCategoryPress(cat.genre, cat.heading)}
              >
                <Image source={cat.image} style={styles.categoryImage} />
                <Text style={styles.categoryText}>{cat.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
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
  backButton: {
    marginLeft: 10,
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
    fontSize: 14,
  },
  heading: {
    color: '#E04B07',
    fontSize: 20,
    fontFamily: 'AlegreyaSC-Bold',
    marginBottom: 10,
    marginLeft: 10,
    marginTop: 30,
  },
  imageContainer: {
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
    marginBottom: 10,
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
    textAlign:'center'
  },
});

export default SeeAllScreen; 