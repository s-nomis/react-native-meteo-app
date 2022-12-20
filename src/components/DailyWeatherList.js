import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {WEATHER_ICONS} from '../constants/weather';
import Icon from '../../assets/fonts/weatherIcon';
import CustomDayFormat from './CustomDayFormat';

const DailyWeatherList = ({navigation, dailyForecast}) => {
  return (
    <View className="flex flex-col gap-2">
      {dailyForecast.slice(0, 3).map(element => (
        <View key={element.day} className="flex flex-row items-center">
          <Icon name={WEATHER_ICONS[element.weather]} color="white" size={32} />

          <View className="flex-1 my-auto pl-1">
            <CustomDayFormat
              day={element.day}
              format="dddd"
              weather={element.weather}
              color="white"
            />
          </View>

          <Text className="text-white text-base">
            {element.tmax}° / {element.tmin}°
          </Text>
        </View>
      ))}

      <Pressable
        className="items-center bg-[#7FB1E6] rounded-full"
        onPress={() =>
          navigation.navigate('MoreForecast', {forecast: dailyForecast})
        }>
        <Text className="text-white text-base py-3">
          14 jours de prévisions
        </Text>
      </Pressable>
    </View>
  );
};

export default DailyWeatherList;
