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
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Updated import

const AudioBooksDetailsScreen = ({ route, navigation }) => {
  const { bookid, title: bookTitle, author, imageurl: passedImageUrl, genres: passedGenres, description: passedDescription, bookurl: passedBookUrl, audiolinks } = route.params;
  const [showMore, setShowMore] = useState(false);
  const [bookData, setBookData] = useState(null);
  const [genres, setGenres] = useState([]);
  const [description, setDescription] = useState(passedDescription || '');
  const [imageurl, setImageUrl] = useState(passedImageUrl); // Store imageurl
  const [bookurl, setBookUrl] = useState(passedBookUrl); // Store bookurl
  const [audiobookParts, setAudiobookParts] = useState([]);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handlePlayPress = (url, title, author, imageurl, partNumber) => {
    console.log('Playing:', title, 'Part:', partNumber);  
  
    navigation.navigate('MusicScreen', {
      audioUrl: url, 
      title,  
      author,
      imageurl,
      partNumber, // Pass the part number
    });
  };  


  useEffect(() => {
  const fetchBookDetails = async () => {
    try {
      const response = await fetch(`https://freeinvoicegenerator.pk/api/audiobooks/${bookid}`);
      const data = await response.json();

      console.log('API Response:', data);

      if (data && data.audiolinks) {
        // Process audiobookParts from API response
        const links = data.audiolinks.split(',').map((link, index) => ({
          id: index.toString(),
          title: `Part ${index + 1}`,
          url: link.trim(),
        }));
        setAudiobookParts(links);

        setDescription(data.bookdesc || passedDescription);
        setBookUrl(data.bookurl || passedBookUrl);
        setImageUrl(data.imageurl || passedImageUrl);
        setBookData(data);
      } else {
        // Fallback: process audiolinks from route.params if API doesn't return audiolinks
        if (audiolinks) {
          const linksFromParams = Array.isArray(audiolinks)
            ? audiolinks
            : audiolinks.split(',').map(link => link.trim());

          const formattedLinks = linksFromParams.map((link, index) => ({
            id: index.toString(),
            title: `Part ${index + 1}`,
            url: link,
          }));

          setAudiobookParts(formattedLinks);
        }

        // Set minimal data if API failed
        setDescription(passedDescription);
        setImageUrl(passedImageUrl);
        setBookUrl(passedBookUrl);
        setBookData({
          title: bookTitle,
          author,
        });
      }
    } catch (error) {
      console.error('Error fetching book details:', error);

      // Fallback on error
      if (audiolinks) {
        const linksFromParams = Array.isArray(audiolinks)
          ? audiolinks
          : audiolinks.split(',').map(link => link.trim());

        const formattedLinks = linksFromParams.map((link, index) => ({
          id: index.toString(),
          title: `Part ${index + 1}`,
          url: link,
        }));

        setAudiobookParts(formattedLinks);
      }

      setDescription(passedDescription);
      setImageUrl(passedImageUrl);
      setBookUrl(passedBookUrl);
      setBookData({
        title: bookTitle,
        author,
      });
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={[styles.backButton, { marginLeft: 10, top: 20 }]} onPress={handleBackPress}>
          <Icon name="chevron-left" size={30} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.homeButton, { marginRight: 10, top: 20 }]} onPress={() => navigation.navigate('MainContainer')}>
          <Ionicons name="home-outline" size={30} color="#E04B07" />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>
        {bookData && (
          <>
            <TouchableOpacity style={styles.imageWrapper}>
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
              <Text style={styles.description}>
                {showMore ? description : `${description.slice(0, 100)}...`}
              </Text>
              <TouchableOpacity style={styles.moreButton} onPress={() => setShowMore(!showMore)}>
                <Text style={styles.moreButtonText}>{showMore ? 'Less' : 'More'}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.divider} />
            <Text style={styles.similarBooksHeading}>Audiobook Parts</Text>
            <FlatList
  data={audiobookParts}
  keyExtractor={(item) => item.id.toString()}
  renderItem={({ item, index }) => (
    <TouchableOpacity
      style={styles.audioPartCard}
      onPress={() => handlePlayPress(item.url, bookTitle, author, imageurl, index + 1)} // Pass index + 1 as part number
    >
      <Text style={styles.partTitle}>{item.title}</Text> 
      <Ionicons name="play" size={25} color="#E04B07" />
    </TouchableOpacity>
  )}
  showsVerticalScrollIndicator={false}
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
    width: '105%',
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
  playButton: {
    backgroundColor: 'black',
    width: 55,
    height: 55,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E04B07',
    alignSelf: 'flex-end',
    marginTop: 0,
  },
  description: {
    color: 'white',
    fontSize: 16,
    textAlign: 'left',
    marginTop: 10,
    fontFamily: 'AlegreyaSC-Bold', 
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
  audioPartCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    width: '95%',
    alignSelf: 'center',
  },
  partTitle: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'AlegreyaSC-Bold', 
  },
});

export default AudioBooksDetailsScreen;
