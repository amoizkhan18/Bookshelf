import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  TextInput,
  ScrollView,
  ActivityIndicator,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SearchScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    if (searchText.trim() === '') {
      setSearchResults([]);
      setShowResults(false);
      return;
    }
  
    const searchBooks = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://freeinvoicegenerator.pk/api/newbooks/search/${searchText}`
        );
        const data = await response.json();
        
        if (Array.isArray(data)) {
  const filteredData = data.filter((book) =>
    book.title?.toLowerCase().startsWith(searchText.toLowerCase())
  );

  setSearchResults(filteredData);
  setShowResults(filteredData.length > 0);
} else {
  setSearchResults([]);
  setShowResults(false);
}
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setLoading(false);
      }
    };
  
    const timeoutId = setTimeout(searchBooks, 300);
    return () => clearTimeout(timeoutId);
  }, [searchText]);

  useEffect(() => {
    // Load recent searches from AsyncStorage when the component mounts
    const loadRecentSearches = async () => {
      try {
        const savedSearches = await AsyncStorage.getItem('recentSearches');
        if (savedSearches) {
          setRecentSearches(JSON.parse(savedSearches));
        }
      } catch (error) {
        console.error('Error loading recent searches:', error);
      }
    };

    loadRecentSearches();
  }, []);

  const saveRecentSearches = async (updatedSearches) => {
    try {
      await AsyncStorage.setItem(
        'recentSearches',
        JSON.stringify(updatedSearches)
      );
    } catch (error) {
      console.error('Error saving recent searches:', error);
    }
  };

  const selectBook = (book) => {
  console.log('BOOK SELECTED:', book);
  setShowResults(false);

  const bookid = book.bookid || book.id;
  const description = book.bookdesc || book.description || 'Description not available';
  const totalpages = book.totalpages || 'N/A';
  const title = book.title || 'Untitled';
  const author = book.author || 'Unknown Author';
  const genres = book.genres || 'Unknown Genre';
  const imageurl = book.imageurl || '';
  const bookurl = book.bookurl || '';
  const audiolinks = book.audiolinks || [];

  setRecentSearches((prevSearches) => {
    const filteredSearches = prevSearches.filter(
      (search) => (search.bookid || search.id) !== bookid
    );
    const updatedSearches = [book, ...filteredSearches];
    const finalSearches = updatedSearches.slice(0, 6);
    saveRecentSearches(finalSearches);
    return finalSearches;
  });

  if (audiolinks.length > 0) {
    navigation.navigate('AudioBooksDetailsScreen', {
      bookid,
      genres,
      description,
      imageurl,
      bookurl,
      audiolinks,
      title,
      author,
    });
  } else {
    navigation.navigate('BooksDetailsScreen', {
      bookid,
      bookurl,
      description,
      genres,
      imageurl,
      totalpages,
      title,
      author,
    });
  }
};


  const handleClearSearch = () => {
    setSearchText('');
    setSearchResults([]);
    setShowResults(false);
  };

  const handleHideResults = () => {
    if (searchText === '') {
      setShowResults(false);
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        handleHideResults();
      }}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.searchBar}>
          <Icon name="search1" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            placeholderTextColor="#666"
            onChangeText={setSearchText}
            value={searchText}
            onFocus={() => setShowResults(true)}
          />
          {searchText ? (
            <TouchableOpacity onPress={handleClearSearch}>
              <Icon name="closecircle" size={20} color="#666" />
            </TouchableOpacity>
          ) : null}
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#E04B07" />
        ) : (
          showResults &&
          searchResults.length > 0 && (
            <FlatList
  data={searchResults}
  keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
  renderItem={({ item }) => (
    <TouchableOpacity
      style={styles.resultItem}
      onPress={() => selectBook(item)}
    >
      <Text style={styles.resultItemText}>{item.title}</Text>
    </TouchableOpacity>
  )}
  style={styles.resultsList}
  keyboardShouldPersistTaps="handled"
  scrollEnabled={true}
/>
          )
        )}

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <Text style={styles.heading}>RECENT SEARCHES</Text>
          <View style={styles.recentSearchesContainer}>
            {recentSearches.length > 0 ? (
  <FlatList
    data={recentSearches}
    keyExtractor={(item, index) => item.bookid?.toString() || index.toString()}
    numColumns={2}
    columnWrapperStyle={{ justifyContent: 'space-evenly' }}
    renderItem={({ item, index }) => (
      <View style={styles.searchItemContainer}>
        <TouchableOpacity
          style={styles.searchItem}
          onPress={() => selectBook(item)}
        >
          <Image source={{ uri: item.imageurl }} style={styles.image} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.closeIconContainer}
          onPress={() => {
            const updatedSearches = recentSearches.filter((_, i) => i !== index);
            setRecentSearches(updatedSearches);
            saveRecentSearches(updatedSearches);
          }}
        >
          <Icon name="closecircle" size={25} color="#E04B07" />
        </TouchableOpacity>
      </View>
    )}
  />
) : (
  <Text style={styles.noRecentSearches}>No recent searches</Text>
)}
          </View>
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    backgroundColor: '#121212',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 20,
    backgroundColor: '#292929',
    paddingHorizontal: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: 'white',
    paddingVertical: 13,
    fontFamily: 'AlegreyaSC-Bold',
  },
  resultsList: {
    backgroundColor: '#292929',
    borderRadius: 10,
    maxHeight: 200,
    marginHorizontal: 10,
    marginBottom: 20,
  },
  resultItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  resultItemText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'AlegreyaSC-Bold',
  },
  heading: {
    color: '#E04B07',
    fontSize: 20,
    fontFamily: 'AlegreyaSC-Bold',
    marginLeft: 10,
    marginTop: 10
  },
  recentSearchesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
  searchItemContainer: {
    position: 'relative',
    width: '45%', // Makes two columns
    marginBottom: 15, // Spacing between rows
    alignItems: 'center',
  },
  searchItem: {
    width: '100%',
    alignItems: 'center',
    
  },
  image: {
    width: 130,
    height: 190,
    borderRadius: 10,
    marginTop: 10
  },
  closeIconContainer: {
    position: 'absolute',
    top: 5,
    right: 5,
    borderRadius: 50,
    backgroundColor: '#292929',
    padding: 3,
    zIndex: 1,
  },
  noRecentSearches: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    fontFamily: 'AlegreyaSC-Bold',
  },
});

export default SearchScreen;