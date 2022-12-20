import {View, Text} from 'react-native';
import React from 'react';

const TodayWeatherInfo = ({ephemeris, forecast}) => {
  return (
    <View className="flex flex-row bg-[#7FB1E6] rounded-3xl mt-8 mb-4 py-4 px-4">
      <View className="flex-1 gap-2">
        <View className="flex flex-col gap-1">
          <Text className="text-[#BAD4F5] text-sm">Lever du soleil</Text>
          <Text className="text-white text-lg">{ephemeris.sunrise}</Text>
        </View>

        <View className="flex flex-col gap-1">
          <Text className="text-[#BAD4F5]">Temps d'ensoleillement</Text>
          <Text className="text-white text-lg">
            {ephemeris.duration_day} heures
          </Text>
        </View>

        <View className="flex flex-col gap-1">
          <Text className="text-[#BAD4F5]">Risque de gel</Text>
          <Text className="text-white text-lg">{forecast.probafrost} %</Text>
        </View>
        <View className="flex flex-col gap-1">
          <Text className="text-[#BAD4F5]">Risque de vent {'>'} 70km/h</Text>
          <Text className="text-white text-lg">{forecast.probawind70} %</Text>
        </View>
      </View>

      <View className="flex-1 gap-2">
        <View className="flex flex-col gap-1">
          <Text className="text-[#BAD4F5]">Coucher du soleil</Text>
          <Text className="text-white text-lg">{ephemeris.sunset}</Text>
        </View>

        <View className="flex flex-col gap-1">
          <Text className="text-[#BAD4F5]">Risque de pluie</Text>
          <Text className="text-white text-lg">{forecast.probarain} %</Text>
        </View>

        <View className="flex flex-col gap-1">
          <Text className="text-[#BAD4F5]">Risque de brouillard</Text>
          <Text className="text-white text-lg">{forecast.probafog} %</Text>
        </View>

        <View className="flex flex-col gap-1">
          <Text className="text-[#BAD4F5]">Vitesse du vent</Text>
          <Text className="text-white text-lg">{forecast.wind10m} km/h</Text>
        </View>
      </View>
    </View>
  );
};

export default TodayWeatherInfo;
