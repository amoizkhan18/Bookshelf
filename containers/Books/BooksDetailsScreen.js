import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Dimensions,
  Modal,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons'; 

const BooksDetailsScreen = ({ route, navigation }) => {
  const { bookid, imageurl: passedImageUrl, genres: passedGenres, description: passedDescription, bookurl: passedBookUrl, totalpages } = route.params;
  const [showMore, setShowMore] = useState(false);
  const [bookData, setBookData] = useState(null);
  const [genres, setGenres] = useState([]);
  const [description, setDescription] = useState(passedDescription || '');
  const [imageurl, setImageUrl] = useState(passedImageUrl); // Store imageurl
  const [bookurl, setBookUrl] = useState(passedBookUrl); // Store bookurl
  const [modalVisible, setModalVisible] = useState(false);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handlePlayPress = () => {
    setModalVisible(true);
  };

  const handleReadBook = () => {
  // If totalpages is missing or invalid, don't navigate and show an alert
  if (!totalpages || isNaN(Number(totalpages))) {
    alert("Invalid or missing total pages.");
    return;
  }

  // Check for valid `totalpages` before navigating
  const pagesToPass = totalpages.toString();

  setModalVisible(false);
  // Pass the correct data to PdfScreen
  navigation.navigate("EpubReaderScreen", { bookurl, totalpages: pagesToPass });
};
  

const handleSaveToLibrary = () => {
  setModalVisible(false);
  alert('Book saved to library!');
};

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`https://freeinvoicegenerator.pk/api/newbooks/${bookid}`);
        const data = await response.json();

        console.log('API Response:', data);

        if (data) {
          // Update book data
          setDescription(data.bookdesc || passedDescription); // Use bookdesc from API or passed description
          setBookUrl(data.bookurl || passedBookUrl); // Use bookurl from API or passed bookurl
          setImageUrl(data.imageurl || passedImageUrl); // Use imageurl from API or passed imageurl
          setBookData(data);
        } else {
          console.log('No book data found');
        }
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };

    fetchBookDetails();
  }, [bookid]);

  useEffect(() => {
    if (passedGenres) {
      const processedGenres =
        typeof passedGenres === 'string'
          ? passedGenres.split(',').map((genre) => genre.trim())
          : passedGenres;
      setGenres(processedGenres);
    }
  }, [passedGenres]);

  const similarBooks = [
    { id: '1', title: 'Dubliners', author: 'James Joyce', image: require('../../assets/dubliners.jpg'), screen: 'dublinersscreen' }, 
    { id: '2', title: 'The Prophet', author: 'Kahlil Gibran', image: require('../../assets/prophet.jpg'), screen: 'GhostScreen' },
    { id: '3', title: 'Ulysses', author: 'James Joyce', image: require('../../assets/ulysses.jpg'), screen: 'IvanScreen' },
    { id: '4', title: 'Bleak House', author: 'Charles Dickens', image: require('../../assets/bleakhouse.jpg'), screen: 'CabinScreen' },
    { id: '5', title: 'Carmilla', author: 'Joseph Sheridan Le Fanu', image: require('../../assets/carmillaa.jpg'), screen: 'CarmenScreen' },
  ];

  const handleSimilarBookPress = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <SafeAreaView style={styles.container}> 
  <View style={styles.header}>
    <TouchableOpacity style={[styles.backButton, { marginLeft: 10, top: 20 }]} onPress={handleBackPress}>
      <Icon name="chevron-left" size={30} color="#FFFFFF" />
    </TouchableOpacity>
    <TouchableOpacity style={[styles.homeButton, { marginRight: 10, top: 20 }]} onPress={() => navigation.navigate('HomeScreen')}>
      <Ionicons name="home-outline" size={30} color="#E04B07" />
    </TouchableOpacity>
  </View>
      <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>
        {bookData && (
          <>
            
            <TouchableOpacity onPress={handleReadBook} style={styles.imageWrapper}>
  <Image source={{ uri: imageurl }} style={styles.mainImage} />
</TouchableOpacity>

            <View style={styles.categoryContainer}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categories}>
                {genres.length > 0 ? (
                  genres.map((genre, index) => (
                    <TouchableOpacity key={index} style={styles.category}>
                      <Text style={styles.categoryText}>{genre}</Text>
                    </TouchableOpacity>
                  ))
                ) : (
                  <Text>No genres available</Text>
                )}
              </ScrollView>
              <View style={styles.playButtonContainer}>
                <TouchableOpacity style={styles.playButton} onPress={handleReadBook}>
                  <Ionicons name="book-outline" color="#F3C0A9" size={30} />
                </TouchableOpacity>
                <Text style={styles.readMeText}>Read Me</Text>
              </View>
              <Text style={styles.description}>
                {showMore ? description : `${description.slice(0, 100)}...`}
              </Text>
              <TouchableOpacity style={styles.moreButton} onPress={() => setShowMore(!showMore)}>
                <Text style={styles.moreButtonText}>{showMore ? 'Less' : 'More'}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.divider} />
            <Text style={styles.similarBooksHeading}>Similar Books</Text>
            <FlatList
              data={similarBooks}
              horizontal
              keyExtractor={(item) => item.id}
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
          </>
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
  homeButton: {
    position: 'absolute',
    right: 10,
  },
  imageWrapper: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    width: '50%',
    height: 300, // Match the size of the image
  },
  mainImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // Ensure the image scales properly
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
    bottom: 10,
    fontFamily: 'AlegreyaSC-Bold', 
  },
  bookCard: {
    width: 130,
    alignItems: 'center',
    marginLeft: 10
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
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#121212',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'AlegreyaSC-Bold', 
  },
  modalButton: {
    backgroundColor: '#E04B07',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'AlegreyaSC-Bold', 
  },
});

export default BooksDetailsScreen;
