import {
  View,
  Text,
  TextInput,
  Pressable,
  ToastAndroid,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useHeaderHeight} from '@react-navigation/elements';
import {POPULAR_CITIES} from '../constants/popularCities';

const SearchScreen = ({navigation}) => {
  const [input, onChangeText] = useState('');

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('user_city');
      if (value !== null) {
        navigation.navigate('Weather', {input: value});
      }
    } catch (e) {
      ToastAndroid.show(
        'Erreur lors de la récuperation de la sauvegarde',
        ToastAndroid.LONG,
      );
    }
  };

  const handleSubmitWithInput = () => {
    if (input.length > 0) {
      navigation.navigate('Weather', {input});
    } else {
      ToastAndroid.show(
        'Le nom de la ville ne peut pas être vide',
        ToastAndroid.LONG,
      );
    }
  };

  useLayoutEffect(() => {
    getData();
  }, []);

  return (
    <SafeAreaView
      className="flex-1 p-4 bg-white gap-8"
      style={{marginTop: useHeaderHeight()}}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <View className="flex flex-row space-x-3">
        <TextInput
          className="flex-1 bg-neutral-100 rounded-full px-4"
          placeholder="Ville"
          onChangeText={onChangeText}
          onSubmitEditing={handleSubmitWithInput}
          value={input}
        />

        <Pressable
          className="items-center justify-center"
          onPress={handleSubmitWithInput}>
          <Text className="text-blue-400 text-base font-semibold">
            Rechercher
          </Text>
        </Pressable>
      </View>

      <View>
        <Text className="text-xs mb-4">Villes populaires</Text>

        <View className="flex flex-row flex-wrap gap-4">
          {POPULAR_CITIES.map((city, index) => (
            <Pressable
              key={index}
              className="bg-neutral-100 px-5 py-2 rounded-full"
              onPress={() => navigation.navigate('Weather', {input: city})}>
              <Text className="text-black text-base">{city}</Text>
            </Pressable>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;
