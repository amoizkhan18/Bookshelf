import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Entypo';
import { booksData } from '../../data/booksData';

const BookDetailsScreen = ({ route, navigation }) => {
  const { bookId } = route.params;
  const book = booksData.find(b => b.id === bookId)

  const [showMore, setShowMore] = useState(false);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleReadBook = () => {
  if (!book.bookUrl) {
    alert('No EPUB available for this book.');
    return;
  }
  navigation.navigate('EpubReaderScreen', {
    bookUrl: book.bookUrl,
    fileName: book.epubFileName || `${book.title}.epub`,
  });
};

  const handleSimilarBookPress = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <SafeAreaView style={styles.container}>
       <View style={styles.header}>
    <TouchableOpacity style={[styles.backButton, { marginLeft: 10, top: 20 }]} onPress={handleBackPress}>
      <Icon name="chevron-left" size={30} color="#FFFFFF" />
    </TouchableOpacity>
  </View>
      <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>
        <TouchableOpacity onPress={handleReadBook} style={styles.imageWrapper}>
          <Image source={book.image} style={styles.mainImage} />
        </TouchableOpacity>
        <View style={styles.categoryContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categories}>
            {book.genres.map((genre, index) => (
              <TouchableOpacity key={index} style={styles.category}>
                <Text style={styles.categoryText}>{genre}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <View style={styles.playButtonContainer}>
            <TouchableOpacity style={styles.playButton} onPress={handleReadBook}>
              <Ionicons name="book-outline" color="#F3C0A9" size={30} />
            </TouchableOpacity>
            <Text style={styles.readMeText}>Read Me</Text>
          </View>
          <Text style={styles.description}>
            {showMore ? book.description : `${book.description.slice(0, 100)}...`}
          </Text>
          <TouchableOpacity style={styles.moreButton} onPress={() => setShowMore(!showMore)}>
            <Text style={styles.moreButtonText}>{showMore ? 'Less' : 'More'}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.divider} />
        <Text style={styles.similarBooksHeading}>Similar Books</Text>
        <FlatList
          data={book.similarBooks}
          horizontal
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSimilarBookPress(item.screen)}>
              <View style={styles.bookCard}>
                <Image source={item.image} style={styles.bookImage} />
                <Text style={styles.bookTitle}>{item.title}</Text>
                <Text style={styles.bookAuthor}>{item.author}</Text>
              </View>
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false} 
        />
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
    alignItems: 'center',
    paddingBottom: 50,
  },
    header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
    position: 'absolute',
    top: 0,
    zIndex: 1,
  },
  imageWrapper: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    width: '50%',
    height: 300,
  },
  mainImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  categoryContainer: {
    padding: 20,
    width: '100%',
  },
  categories: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  category: {
    backgroundColor: '#E04B07',
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginRight: 10,
  },
  categoryText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'AlegreyaSC-Bold',
  },
  playButtonContainer: {
    alignItems: 'flex-end',
    marginTop: 0,
  },
  playButton: {
    backgroundColor: 'black',
    width: 55,
    height: 55,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E04B07',
  },
  readMeText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'AlegreyaSC-Bold',
    marginTop: 5,
  },
description: {
  color: 'white',
  fontSize: 16,
  textAlign: 'left',
  marginTop: 10,
  lineHeight: 23,
  },
  moreButton: {
    backgroundColor: '#E04B07',
    paddingVertical: 7,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 10,
  },
  moreButtonText: {
    color: 'white',
    fontFamily: 'AlegreyaSC-Bold',
  },
  divider: {
    height: 1,
    backgroundColor: 'grey',
    width: '90%',
    marginVertical: 20,
  },
  similarBooksHeading: {
    color: '#E04B07',
    fontSize: 20,
    alignSelf: 'flex-start',
    marginLeft: 20,
    fontFamily: 'AlegreyaSC-Bold',
    bottom: 10,
  },
  bookCard: {
    width: 140,
    alignItems: 'center',
    marginLeft: 20
  },
  bookImage: {
    width: 75,
    height: 110,
    marginBottom: 5,
    marginTop: 5,
    marginRight: 3
  },
  bookTitle: {
    color: 'white',
    fontSize: 16,
    marginTop: 5,
    textAlign: 'center',
    fontFamily: 'AlegreyaSC-Bold',
    marginRight: 3
  },
  bookAuthor: {
    color: 'grey',
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'AlegreyaSC-Bold',
    marginRight: 3
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 10,
  },
});

export default BookDetailsScreen;