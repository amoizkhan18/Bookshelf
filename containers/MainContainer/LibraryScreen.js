import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useFocusEffect } from '@react-navigation/native';

const LibraryScreen = ({ navigation }) => {
  const [libraryBooks, setLibraryBooks] = useState([]);

  // Fetch books from AsyncStorage when the screen is focused
  useFocusEffect(
    React.useCallback(() => {
      const fetchLibraryBooks = async () => {
        try {
          const storedBooks = await AsyncStorage.getItem('libraryBooks');
          if (storedBooks !== null) {
            const parsedBooks = JSON.parse(storedBooks);
            const booksWithIds = parsedBooks.map(book => ({
              ...book,
              id: book.id || `${book.title}-${book.author}`, // Assign fallback ID
            }));
            setLibraryBooks(booksWithIds);
          }
        } catch (error) {
          console.error('Error fetching books from library:', error);
        }
      };

      fetchLibraryBooks();
    }, [])
  );

  // Handle book removal from library
  const handleRemovePress = async (bookid) => {
  if (!bookid) {
    console.warn('Missing book ID for removal');
    return;
  }

  const updatedBooks = libraryBooks.filter(
    book => book.id !== bookid && book.bookid !== bookid
  );

  setLibraryBooks(updatedBooks);
  await AsyncStorage.setItem('libraryBooks', JSON.stringify(updatedBooks));
  Alert.alert('Book removed from Library');
};

  // Navigate to BooksDetailsScreen when a book is selected
  const handleSelectBook = (book) => {
  console.log('Selected book:', book);
  console.log('Audiolinks:', book.audiolinks);

  const description = book.description || 'Description not available';
  const totalpages = book.totalpages || 'N/A';

  if (book.audiolinks && book.audiolinks.length > 0) {
    console.log('Book in Library:', book.title, book.audiolinks);

    const audioArray = Array.isArray(book.audiolinks)
      ? book.audiolinks
      : book.audiolinks.split(',').map(link => link.trim());

    navigation.navigate('Home', {
  screen: 'AudioBooksDetailsScreen',
  params: {
    bookid: book.id,
    title: book.title,
    author: book.author,
    imageurl: book.imageurl,
    genres: book.genres,
    description: book.description,
    bookurl: book.bookurl,
    audiolinks: audioArray,
  }
});
  } else {
    navigation.navigate('Home', {
  screen: 'BooksDetailsScreen',
  params: {
    bookid: book.id,
    bookurl: book.bookurl,
    description,
    genres: book.genres,
    imageurl: book.imageurl,
    totalpages,
    title: book.title,
    author: book.author,
  }
});
  }
};

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>My Library</Text>
        
        {libraryBooks.length > 0 ? (
          libraryBooks.map((book, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.bookContainer}
              onPress={() => handleSelectBook(book)}  // Navigate to BooksDetailsScreen
            >
              <Image source={{ uri: book.imageurl }} style={styles.bookImage} />
              <View style={styles.bookDetails}>
                <Text style={styles.bookTitle}>{book.title}</Text>
                <Text style={styles.bookAuthor}>{book.author}</Text>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => handleRemovePress(book.id)}  // Pass book.id here
                >
                  <Ionicons name="trash-outline" size={24} color="#E04B07" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noBooksText}>No books in your library yet.</Text>
        )}
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
  heading: {
    color: '#E04B07',
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 20,
    fontFamily: 'AlegreyaSC-Bold',
  },
  bookContainer: {
    flexDirection: 'row',
    backgroundColor: '#292929',
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
  },
  bookImage: {
    width: 100,
    height: 150,
    marginRight: 10,
  },
  bookDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  bookTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    marginBottom: 5,
    fontFamily: 'AlegreyaSC-Bold',
  },
  bookAuthor: {
    color: '#696969',
    fontSize: 15,
    fontFamily: 'AlegreyaSC-Bold',
  },
  removeButton: {
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  noBooksText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    fontFamily: 'AlegreyaSC-Bold',
  },
});

export default LibraryScreen;