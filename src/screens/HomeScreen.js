import {View, Text, TextInput, Pressable} from 'react-native';
import React, {useState} from 'react';
import {getCities} from '../utils/location';
import {getDailyForecast} from '../utils/forecast';
import {WEATHER_CODES} from '../constants/weather';

const HomeScreen = () => {
  const [text, onChangeText] = useState();
  const [city, setCity] = useState();
  const [forecast, setForecast] = useState();

  const handleSubmit = async () => {
    //Recupere toutes les villes correspondant à la recherche de l'utilisateur
    const location = await getCities(text);

    //On recupere la première, celle qui correspont le plus à la recherche
    setCity(
      location.cities[0].cp +
        ' ' +
        location.cities[0].name +
        ' ' +
        location.cities[0].insee,
    );

    const dailyForecast = await getDailyForecast(location.cities[0].insee);
    setForecast(dailyForecast.forecast);
  };

  return (
    <>
      <View>
        <TextInput
          onChangeText={onChangeText}
          onSubmitEditing={handleSubmit}
          value={text}
        />
        <Pressable onPress={handleSubmit}>
          <Text>Rechercher</Text>
        </Pressable>
      </View>

      <View>
        <Text>{city}</Text>
      </View>

      {forecast && (
        <View>
          {forecast.map(element => (
            <Text key={element.day}>
              Pour {element.day} : {WEATHER_CODES[element.weather]}
            </Text>
          ))}
        </View>
      )}
    </>
  );
};

export default HomeScreen;
