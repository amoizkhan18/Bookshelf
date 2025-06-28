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
import Icon from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AudioBookDetailScreen = ({ route, navigation }) => {
  const { audiobook } = route.params; // Pass audiobook object via navigation
  const [showMore, setShowMore] = useState(false);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handlePlayPress = (url, title, author, imageurl, partNumber) => {
    navigation.navigate('WarAudio', {
      audioUrl: url,
      title,
      author,
      imageurl,
      partNumber,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={[styles.backButton, { marginLeft: 10, top: 20 }]}
          onPress={handleBackPress}>
          <Icon name="chevron-left" size={30} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity
  style={[styles.homeButton, { marginRight: 10, top: 20 }]}
  onPress={() => navigation.navigate('AudioBooksScreen')}
>
  <Ionicons name="home-outline" size={30} color="#E04B07" />
</TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.imageWrapper}>
          <Image source={audiobook.imageurl} style={styles.mainImage} />
        </TouchableOpacity>
        <View style={styles.categoryContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categories}>
            {audiobook.genres.map((genre, index) => (
              <TouchableOpacity key={index} style={styles.category}>
                <Text style={styles.categoryText}>{genre}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <Text style={styles.description}>
            {showMore ? audiobook.description : `${audiobook.description.slice(0, 100)}...`}
          </Text>
          <TouchableOpacity style={styles.moreButton} onPress={() => setShowMore(!showMore)}>
            <Text style={styles.moreButtonText}>{showMore ? 'Less' : 'More'}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.divider} />
        <Text style={styles.similarBooksHeading}>Audiobook Parts</Text>
        <FlatList
          data={audiobook.audiobookParts}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={styles.audioPartCard}
              onPress={() =>
                handlePlayPress(
                  item.url,
                  audiobook.bookTitle,
                  audiobook.author,
                  audiobook.imageurl,
                  index + 1
                )
              }>
              <Text style={styles.partTitle}>{item.title}</Text>
              <Ionicons name="play" size={25} color="#E04B07" />
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  scrollView: { alignItems: 'center', paddingBottom: 50 },
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
  homeButton: { position: 'absolute', right: 10 },
  imageWrapper: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    width: '50%',
    height: 300,
  },
  mainImage: { width: '105%', height: '100%', resizeMode: 'cover' },
  categoryContainer: { padding: 20, width: '100%' },
  categories: { flexDirection: 'row', marginBottom: 10 },
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
  backButton: {
    position: 'absolute',
    left: 10,
  },
});

export default AudioBookDetailScreen;