import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Alert,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BooksListScreen = ({ navigation, route }) => {
  const { genre, heading } = route.params;
  const [bookData, setBookData] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const limit = 10;

  useEffect(() => {
    loadBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, genre]);

  const loadBooks = async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://freeinvoicegenerator.pk/api/newbooks/genres/${genre}?page=${page}&limit=${limit}`
      );
      const data = await response.json();

      const books = data.map(book => ({
        bookid: book.bookid || `${book.title}-${book.author}`,
        title: book.title,
        author: book.author,
        imageurl: book.imageurl,
        genres: book.genres,
        description: book.bookdesc,
        bookurl: book.bookurl,
        totalpages: book.totalpages,
      }));

      setBookData(prev => [...prev, ...books]);
      setHasMore(books.length >= limit);
    } catch (error) {
      console.error('Error fetching book data:', error);
      Alert.alert('Error', 'Failed to load books');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (!isLoading && hasMore) {
      setPage(prev => prev + 1);
    }
  };

  const handlePress = (book) => {
    navigation.navigate('BooksDetailsScreen', {
      bookid: book.bookid,
      genres: book.genres,
      description: book.description,
      imageurl: book.imageurl,
      bookurl: book.bookurl,
      totalpages: book.totalpages,
      title: book.title,
      author: book.author,
    });
  };

  const handleDownloadPress = async (book) => {
    const fallbackId = `${book.title}-${book.author}`;
    const bookToSave = {
      bookid: book.bookid || fallbackId,
      title: book.title || 'Unknown Title',
      author: book.author || 'Unknown Author',
      genres: book.genres || [],
      description: book.description || 'No description available',
      imageurl: book.imageurl || '',
      bookurl: book.bookurl || '',
      totalpages: book.totalpages || 'N/A',
    };

    try {
      const existingBooksString = await AsyncStorage.getItem('libraryBooks');
      const existingBooks = existingBooksString ? JSON.parse(existingBooksString) : [];

      const bookExists = existingBooks.some(storedBook => storedBook.bookid === bookToSave.bookid);

      let updatedBooks = [];
      if (!bookExists) {
        updatedBooks = [...existingBooks, bookToSave];
        await AsyncStorage.setItem('libraryBooks', JSON.stringify(updatedBooks));
        Alert.alert('Success', 'Book added to Library');
      } else {
        updatedBooks = existingBooks;
        Alert.alert('Notice', 'This book is already in the Library');
      }
    } catch (error) {
      console.error('Error saving book to library:', error);
      Alert.alert('Error', 'Failed to add book to Library');
    }
  };

  const renderFooter = () => {
    if (!isLoading) return null;
    return <ActivityIndicator size="large" color="#E04B07" style={{ marginVertical: 15 }} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={bookData}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={() => (
          <>
            <View style={styles.header}>
              <TouchableOpacity style={[styles.backButton, { marginLeft: 10 }]} onPress={() => navigation.goBack()}>
                <Icon name="chevron-left" size={30} color="#FFFFFF" />
              </TouchableOpacity>

              <TouchableOpacity style={[styles.button, { backgroundColor: '#E04B07' }]} onPress={() => navigation.navigate('MainContainer')}>
                <Text style={styles.buttonText}>Books</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button1} onPress={() => navigation.navigate('AudioBooksScreen')}>
                <Text style={styles.buttonText}>Audio Books</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.heading}>{heading}</Text>
          </>
        )}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.categoryContainer} onPress={() => handlePress(item)}>
            <View style={styles.category}>
              <Image source={{ uri: item.imageurl }} style={styles.categoryImage} />
              <View style={styles.categoryContent}>
                <Text style={styles.categoryTitle}>{item.title}</Text>
                <Text style={styles.categorySubtitle}>{item.author}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.downloadButton} onPress={() => handleDownloadPress(item)}>
              <Ionicons name="add-outline" size={35} color="#F3C0A9" />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        ListFooterComponent={renderFooter}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 20,
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
    marginBottom: 20,
    marginLeft: 10,
  },
  categoryContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  category: {
    backgroundColor: '#292929',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 5,
  },
  categoryImage: {
    width: 100,
    height: 150,
    marginRight: 10,
  },
  categoryContent: {
    flexDirection: 'column',
    flex: 1,
    paddingLeft: 10,
  },
  categoryTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontFamily: 'AlegreyaSC-Bold',
    marginBottom: 5,
  },
  categorySubtitle: {
    color: '#696969',
    fontSize: 15,
    marginBottom: 5,
    fontFamily: 'AlegreyaSC-Bold',
  },
  downloadButton: {
    backgroundColor: 'black',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E04B07',
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
});

export default BooksListScreen; 