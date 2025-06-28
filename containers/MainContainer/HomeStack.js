import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import AudioBooksScreen from '../AudioBooks/AudioBooksScreen';
import BooksDetailsScreen from '../Books/BooksDetailsScreen';
import AudioBooksDetailsScreen from '../AudioBooks/AudioBooksDetailsScreen';
import AudioBooksListScreen from '../AudioBooks/AudioBooksListScreen';
import MusicScreen from '../AudioBooks/MusicScreen';
import SeeAllScreen from '../Books/SeeAllScreen';
import SeeAllAudioScreen from '../AudioBooks/SeeAllAudioScreen';
import GhostScreen from '../../similarbooks/GhostScreen';
import IvanScreen from '../../similarbooks/IvanScreen';
import CabinScreen from '../../similarbooks/CabinScreen';
import CarmenScreen from '../../similarbooks/CarmenScreen';
import GhostBook from '../../similarbooks/GhostBook';
import dublinersscreen from '../../similarbooks/dublinersscreen';
import WarAudio from '../AudioBooks/WarAudio';
import BooksListScreen from '../Books/BooksListScreen';
import BookDetailsScreen from '../Books/BookDetailsScreen';
import AudioBookDetailScreen from '../AudioBooks/AudioBookDetailScreen';



const Stack = createStackNavigator(); 

const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="SeeAllScreen" component={SeeAllScreen} />
            <Stack.Screen name="AudioBooksDetailsScreen" component={AudioBooksDetailsScreen} />
            <Stack.Screen name="AudioBooksListScreen" component={AudioBooksListScreen} />
            <Stack.Screen name="AudioBooksScreen" component={AudioBooksScreen} />
            <Stack.Screen name="BooksDetailsScreen" component={BooksDetailsScreen} />
            <Stack.Screen name="MusicScreen" component={MusicScreen} />
            <Stack.Screen name="SeeAllAudioScreen" component={SeeAllAudioScreen} />
            <Stack.Screen name="GhostScreen" component={GhostScreen} />
            <Stack.Screen name="IvanScreen" component={IvanScreen} />
            <Stack.Screen name="CabinScreen" component={CabinScreen} />
            <Stack.Screen name="CarmenScreen" component={CarmenScreen} />
            <Stack.Screen name="GhostBook" component={GhostBook} />
            <Stack.Screen name="dublinersscreen" component={dublinersscreen} />
            <Stack.Screen name="WarAudio" component={WarAudio} />
            <Stack.Screen name="BooksListScreen" component={BooksListScreen} />
            <Stack.Screen name="BookDetailsScreen" component={BookDetailsScreen} />
            <Stack.Screen name="AudioBookDetailScreen" component={AudioBookDetailScreen} />
    {/* ...add more screens as needed */}
  </Stack.Navigator>
);

export default HomeStack;