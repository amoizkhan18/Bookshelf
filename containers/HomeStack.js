import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import AudioBooksScreen from './AudioBooksScreen';
import BooksDetailsScreen from './BooksDetailsScreen';
import AudioBooksDetailsScreen from './AudioBooksDetailsScreen';
import AudioBooksListScreen from './AudioBooksListScreen';
import MusicScreen from './MusicScreen';
import SeeAllScreen from './SeeAllScreen';
import SeeAllAudioScreen from './SeeAllAudioScreen';
import GhostScreen from '../similarbooks/GhostScreen';
import IvanScreen from '../similarbooks/IvanScreen';
import CabinScreen from '../similarbooks/CabinScreen';
import CarmenScreen from '../similarbooks/CarmenScreen';
import GhostBook from '../similarbooks/GhostBook';
import dublinersscreen from '../similarbooks/dublinersscreen';
import WarAudio from './WarAudio';
import BooksListScreen from './BooksListScreen';
import BookDetailsScreen from './BookDetailsScreen';
import EpubReaderScreen from './EpubReaderScreen';
import AudioBookDetailScreen from './AudioBookDetailScreen';



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
            <Stack.Screen name="EpubReaderScreen" component={EpubReaderScreen} />
            <Stack.Screen name="AudioBookDetailScreen" component={AudioBookDetailScreen} />
    {/* ...add more screens as needed */}
  </Stack.Navigator>
);

export default HomeStack;