import React, { useState, useRef, useEffect } from 'react';
import { 
  View, Text, StyleSheet, SafeAreaView, Dimensions, TouchableOpacity, 
  Image, Animated, ScrollView, Share, Alert, ActivityIndicator
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Slider from '@react-native-community/slider';
import Sound from 'react-native-sound';
import Icon from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

const WarAudio = ({ route, navigation }) => {
  const { audioUrl, title, author, imageurl, partNumber } = route.params;
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const intervalRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const soundInstance = new Sound(audioUrl, null, (error) => {
      if (error) {
        console.log('Failed to load sound', error);
        setLoading(false); // even if error, stop loader
      } else {
        setSound(soundInstance);
        setDuration(soundInstance.getDuration() * 1000);
        setLoading(false); // audio loaded
      }
    });
  
    return () => {
      if (soundInstance) {
        soundInstance.release();
        clearInterval(intervalRef.current);
      }
    };
  }, [audioUrl]);

  const playPauseSound = () => {
    if (sound) {
      if (isPlaying) {
        sound.pause();
        setIsPlaying(false);
        clearInterval(intervalRef.current);
      } else {
        sound.play(() => {
          setIsPlaying(false);
          setPosition(0);
        });
        setIsPlaying(true);
        intervalRef.current = setInterval(() => {
          sound.getCurrentTime((time) => setPosition(time * 1000));
        }, 1000);
      }
    }
  };

  const skipForward10 = () => {
    if (sound) {
      let newPosition = Math.min(position + 30000, duration);
      sound.setCurrentTime(newPosition / 1000);
      setPosition(newPosition);
    }
  };

  const skipBackward10 = () => {
    if (sound) {
      let newPosition = Math.max(position - 30000, 0);
      sound.setCurrentTime(newPosition / 1000);
      setPosition(newPosition);
    }
  };

  const handlePlaybackSpeed = () => {
    const newSpeed = playbackSpeed === 1.0 ? 1.5 : playbackSpeed === 1.5 ? 2.0 : 1.0;
    setPlaybackSpeed(newSpeed);
    sound?.setSpeed(newSpeed);
  };

  const shareContent = async () => {
    try {
      const result = await Share.share({ message: `Check out this audio: ${audioUrl}` });
      if (result.action === Share.sharedAction) {
        Alert.alert('Success', 'Content shared successfully!');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong while sharing.');
    }
  };

  const formatTime = (timeMillis) => {
    const minutes = Math.floor(timeMillis / 60000);
    const seconds = Math.floor((timeMillis % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
      <Icon name="chevron-left" size={30} color="#FFFFFF" />
    </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.mainContainer}>
          <View style={styles.artworkWrapper}>
            <Image source={imageurl} style={styles.artworkImg} />
          </View>

          <View style={styles.titleContainer}>
            <TouchableOpacity style={styles.iconButton} onPress={shareContent}>
              <Ionicons name="share-outline" size={35} color="#E04B07" />
            </TouchableOpacity>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{title || "No Title Available"}</Text>  
              <Text style={styles.artist}>{author || "No Author Available"}</Text>
                <Text style={styles.headerTitle}>Part {partNumber}</Text>
            </View>
            <TouchableOpacity onPress={handlePlaybackSpeed} style={styles.iconButton}>
              <MaterialCommunityIcons name="speedometer" size={35} color="#E04B07" />
              <Text style={styles.speedText}>{playbackSpeed.toFixed(1)}x</Text>
            </TouchableOpacity>
          </View>

          <View>
            <Slider
              style={styles.progressContainer}
              value={(position / duration) * 100 || 0}
              minimumValue={0}
              maximumValue={100}
              thumbTintColor='#FF681F'
              minimumTrackTintColor='#FF681F'
              maximumTrackTintColor='#fff'
              onSlidingComplete={(value) => {
                let seekPosition = (value / 100) * duration;
                sound?.setCurrentTime(seekPosition / 1000);
                setPosition(seekPosition);
              }}
            />
            <View style={styles.progressLabelContainer}>
              <Text style={styles.progressLabelTxt}>{formatTime(position)}</Text>
              <Text style={styles.progressLabelTxt}>{formatTime(duration)}</Text>
            </View>
          </View>

          <View style={styles.musicControls}>
            <TouchableOpacity onPress={skipBackward10}>
              <MaterialCommunityIcons name="rewind-30" size={30} color="#FFFFFF" />
            </TouchableOpacity>
            <View style={styles.playButton}>
  {loading ? (
    <ActivityIndicator size="large" color="#E04B07" />
  ) : (
    <TouchableOpacity onPress={playPauseSound}>
      <Ionicons 
        name={isPlaying ? 'pause-circle-outline' : 'play-circle-outline'}
        color="#E04B07" size={80}
      />
    </TouchableOpacity>
  )}
</View>
            <TouchableOpacity onPress={skipForward10}>
              <MaterialCommunityIcons name="fast-forward-30" size={30} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
  flex: 1, 
  backgroundColor: '#121212' 
},
  header: { 
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    top: 20,
    backgroundColor: '#121212'
},
  headerTitle: { 
    flex: 1,
      fontSize: 20, 
  fontWeight: '600', 
    color: '#E04B07',
    textAlign: 'center',
    fontFamily: 'AlegreyaSC-Bold',
},
  backButton: { 
  position: 'absolute', 
  marginLeft: 15,
  zIndex: 10,
  top: 2
},
  scrollView: { 
  flex: 1 
},
  mainContainer: { 
  alignItems: 'center', 
  justifyContent: 'center', 
  marginTop: 50 
},
  artworkWrapper: { 
  width: width * 0.7, 
  height: width * 0.7, 
  marginTop: 10 
},
  artworkImg: { 
  width: '100%', 
  height: '110%', 
  borderRadius: 10, 
  resizeMode: 'contain' 
},
  titleContainer: { 
  flexDirection: 'row', 
  alignItems: 'center' 
},
  iconButton: { 
  marginHorizontal: 15, 
  marginTop: 50 
},
  textContainer: { 
  flex: 1, 
  alignItems: 'center', 
  marginTop: 55 
},
  title: { 
  fontSize: 18, 
  fontWeight: '600', 
  textAlign: 'center', 
  color: '#EEEEEE',
  fontFamily: 'AlegreyaSC-Bold', 
},
  artist: { 
  fontSize: 15, 
  fontWeight: '400', 
  textAlign: 'center', 
  color: '#B7B7B7',
  fontFamily: 'AlegreyaSC-Bold',  
},
speedText: {
  fontSize: 15,
  color: '#E04B07',
  textAlign: 'center',
  fontFamily: 'AlegreyaSC-Bold',
},
  progressContainer: { 
  width: width - 20, 
  height: 40, 
  marginTop: 40 
},
  progressLabelContainer: { 
  flexDirection: 'row', 
  justifyContent: 'space-between', 
  marginTop: 5 
},
progressLabelTxt: {
  fontSize: 14,
  color: '#FFFFFF',
  fontFamily: 'AlegreyaSC-Bold',
},
  musicControls: { 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
    marginBottom: 50
},
 playButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15, 
    marginHorizontal: 30,
    left: 3
  },
});

export default WarAudio;
