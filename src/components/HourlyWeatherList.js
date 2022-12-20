import React from 'react';
import {View} from 'react-native';
import HourWeatherInfo from './HourWeatherInfo';

const HourlyWeatherList = ({hourlyForecast}) => {
  return (
    <View className="flex flex-row justify-between mt-8">
      {hourlyForecast.map((forecast, index) => (
        <HourWeatherInfo key={index} forecast={forecast} />
      ))}
    </View>
  );
};

export default HourlyWeatherList;
