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

const CarmenScreen = ({ navigation }) => { 
  const [showMore, setShowMore] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const hardcodedImage = require('../assets/carmillaa.jpg');
  const hardcodedGenres = ['Vampires'];
  const hardcodedDescription =
'"Carmilla" by Joseph Sheridan Le Fanu is a gothic novella written in the late 19th century. The story revolves around Laura, a lonely young woman living in a secluded schloss in Styria, who encounters a mysterious and enchanting guest named Carmilla. As the narrative unfolds, the bond between Laura and Carmilla deepens, leading to an exploration of themes such as identity, desire, and the supernatural. The opening of "Carmilla" introduces the reader to Laura and the desolate yet picturesque setting of her familys castle. Laura recounts a haunting childhood experience involving a mysterious lady who visited her in her nursery and evokes both fear and fascination. The narrative quickly transitions to her fathers arrival, revealing the news of the tragic death of a young woman, which foreshadows the supernatural events to come. Soon after, a carriage accident leads to Carmillas arrival as a guest, and Laura is immediately drawn to her, albeit with an undercurrent of foreboding. The stage is set for the powerful and strange relationship that will develop between them, characterized by dreams and an intertwining fate that will challenge Lauras understanding of herself and the world around her.';

const bookurl = 'https://moizz.work.gd/assets/pg10007-images-3.epub';

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
    { id: '3', title: 'Ulysses', author: 'James Joyce', image: require('../assets/ulysses.jpg'), screen: 'IvanScreen' },
    { id: '4', title: 'Bleak House', author: 'Charles Dickens', image: require('../assets/bleakhouse.jpg'), screen: 'CabinScreen' },
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

export default CarmenScreen;
