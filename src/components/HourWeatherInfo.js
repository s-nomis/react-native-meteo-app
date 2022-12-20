import {View, Text} from 'react-native';
import React from 'react';
import dayjs from 'dayjs';
import Icon from '../../assets/fonts/weatherIcon';
import {WEATHER_ICONS} from '../constants/weather';
import Wind from './Wind';

const HourWeatherInfo = ({forecast}) => {
  return (
    <View className="flex flex-col items-center">
      <Text className="text-white text-sm">
        {dayjs(forecast.datetime).format('HH:mm')}
      </Text>
      <Text className="text-white text-base">{forecast.temp2m}°</Text>
      <Icon name={WEATHER_ICONS[forecast.weather]} color="white" size={32} />

      <Wind
        dirWind={forecast.dirwind10m}
        wind={forecast.wind10m}
        icon_color="white"
        text_color="white"
      />
    </View>
  );
};

export default HourWeatherInfo;
