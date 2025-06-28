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
  Modal,
  Pressable,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Entypo';

const IvanScreen = ({ navigation }) => {
  const [showMore, setShowMore] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const hardcodedImage = require('../assets/ulysses.jpg');
  const hardcodedGenres = ['Psychological fiction'];
  const hardcodedDescription =
'"Ulysses" by James Joyce is a modernist novel written in the early 20th century. This influential work takes place in Dublin and chronicles the experiences of its central characters, primarily Leopold Bloom, as well as Stephen Dedalus and Molly Bloom, over the course of a single day, June 16, 1904. The story engages with themes of identity, daily life, and the complexity of human thought, often intertwining the mundane with profound introspection. The beginning of "Ulysses" introduces readers to Buck Mulligan and Stephen Dedalus at a Martello tower overlooking Dublin Bay. Buck Mulligan, a lively and somewhat boisterous character, prepares for the day with an unrefined but humorous manner, invoking religious imagery as he shaves. Stephen, in contrast, is depicted as introspective and burdened by memories of his deceased mother, reflecting on grief and guilt while navigating his relationship with Mulligan. The opening sets the tone for the intricate explorations of character dynamics and the dense, stream-of-consciousness narrative style that Joyce employs throughout the novel.';

const bookurl = 'https://moizz.work.gd/assets/pg4300-images-3.epub';

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handlePlayPress = () => {
    setModalVisible(true);
  };

  const handleReadBook = () => {
  setModalVisible(false);
  navigation.navigate('GhostBook', { bookurl }); 
};


  const handleSaveToLibrary = () => {
    setModalVisible(false);
    alert('Book saved to library!');
  };

  const similarBooks = [
    { id: '1', title: 'Dubliners', author: 'James Joyce', image: require('../assets/dubliners.jpg'), screen: 'dublinersscreen' }, 
    { id: '2', title: 'The Prophet', author: 'Kahlil Gibran', image: require('../assets/prophet.jpg'), screen: 'GhostScreen' },
    { id: '3', title: 'Bleak House', author: 'Charles Dickens', image: require('../assets/bleakhouse.jpg'), screen: 'CabinScreen' },
    { id: '4', title: 'Carmilla', author: 'Joseph Sheridan Le Fanu', image: require('../assets/carmillaa.jpg'), screen: 'CarmenScreen' },
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
                <TouchableOpacity style={[styles.homeButton, { marginRight: 10, top: 20 }]} onPress={() => navigation.navigate('MainContainer')}>
                  <Ionicons name="home-outline" size={30} color="#E04B07" />
                </TouchableOpacity>
              </View>
      <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>
        <>
          <TouchableOpacity onPress={handleReadBook} style={styles.imageWrapper}>
                              <Image source={hardcodedImage} style={styles.mainImage} />
                              </TouchableOpacity>
          <View style={styles.categoryContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categories}>
              {hardcodedGenres.map((genre, index) => (
                <TouchableOpacity key={index} style={styles.category}>
                  <Text style={styles.categoryText}>{genre}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity style={styles.playButton} onPress={handlePlayPress}>
              <Ionicons name="book-outline" color="#F3C0A9" size={30} />
            </TouchableOpacity>
            <Text style={styles.description}>
              {showMore ? hardcodedDescription : `${hardcodedDescription.slice(0, 100)}...`}
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
      </ScrollView>
      <Modal transparent={true} visible={modalVisible} animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Choose an Option</Text>
            <Pressable style={styles.modalButton} onPress={handleReadBook}>
              <Text style={styles.modalButtonText}>Read Book</Text>
            </Pressable>
            <Pressable style={styles.modalButton} onPress={handleSaveToLibrary}>
              <Text style={styles.modalButtonText}>Save to Library</Text>
            </Pressable>
            <Pressable
              style={[styles.modalButton, { backgroundColor: 'grey' }]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
    fontFamily: 'AlegreyaSC-Bold',
    bottom: 10
  },
  bookCard: {
    width: 140,
    alignItems: 'center',
  },
  bookImage: {
    width: 75,
    height: 110,
    marginBottom: 5,
    marginTop: 5,
  },
  bookTitle: {
    color: 'white',
    fontSize: 16,
    marginTop: 5,
    textAlign: 'center',
    fontFamily: 'AlegreyaSC-Bold',
  },
  bookAuthor: {
    color: 'grey',
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'AlegreyaSC-Bold',
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
  backButton: {
    position: 'absolute',
    top: 20,
    left: 10,
}
});

export default IvanScreen;
