import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={isFocused ? styles.tabItemFocused : styles.tabItem}
            >
              <Icon
                name={label === 'Home' ? 'home' : label === 'Search' ? 'search' : 'library'}
                size={25}
                color={isFocused ? '#E04B07' : '#696969'}
              />
              <Text style={[styles.text, { color: isFocused ? '#E04B07' : '#696969' }]}>{label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: 'black', // Set the background color here
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#696969',
    height: '60'
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
  },
  tabItemFocused: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontFamily: 'AlegreyaSC-Bold',
    fontSize: 10,
    marginTop: 5,
  },
});

export default CustomTabBar;
