import {
  View,
  Text,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useHeaderHeight} from '@react-navigation/elements';
import {getCities} from '../utils/location';
import {
  getDailyForecast,
  getNextHoursForecast,
  getTodayEphemeris,
} from '../utils/forecast';
import {WEATHER_CODES} from '../constants/weather';
import DailyWeatherList from '../components/DailyWeatherList';
import HourlyWeatherList from '../components/HourlyWeatherList';
import TodayWeatherInfo from '../components/TodayWeatherInfo';

const WeatherScreen = ({navigation, route}) => {
  const [loading, setLoading] = useState(true);
  const [ephemeris, setEphemeris] = useState();
  const [dailyForecast, setDailyForecast] = useState();
  const [hourlyForecast, setHourlyForecast] = useState();

  const {input} = route.params;
  const headerHeight = useHeaderHeight();

  const storeData = async city => {
    try {
      await AsyncStorage.setItem('user_city', city);
    } catch (e) {
      ToastAndroid.show(
        'Erreur lors de la sauvegarde de la ville',
        ToastAndroid.LONG,
      );
    }
  };

  useEffect(() => {
    async function fetchData() {
      const location = await getCities(input);

      var todayEphemeris = {};
      var dailyForecast = {};
      var hourlyForecast = {};

      if (location.cities[0]) {
        storeData(location.cities[0].name);
        navigation.setOptions({title: location.cities[0].name});

        todayEphemeris = await getTodayEphemeris(0, location.cities[0].insee);
        dailyForecast = await getDailyForecast(location.cities[0].insee);
        hourlyForecast = await getNextHoursForecast(location.cities[0].insee);
      }

      if (todayEphemeris.ephemeride) {
        setEphemeris(todayEphemeris.ephemeride);
      }
      if (dailyForecast.forecast) {
        setDailyForecast(dailyForecast.forecast);
      }
      if (hourlyForecast.forecast) {
        setHourlyForecast(hourlyForecast.forecast);
      }

      setLoading(false);
    }

    fetchData();
  }, []);

  return (
    <LinearGradient
      className="flex-1"
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      colors={['#0071D1', '#6CA6E5']}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      {loading ? (
        <View className="flex-1 justify-center">
          <ActivityIndicator size="large" color="#000000" />
        </View>
      ) : (
        <ScrollView className="px-4" style={{marginTop: headerHeight}}>
          {/* Affichage de la température et du temps actuel */}
          {hourlyForecast && (
            <View className="flex flex-col items-center py-40">
              <View className="flex flex-row">
                <Text className="text-9xl text-white">
                  {hourlyForecast[0].temp2m}
                </Text>
                <Text className="text-4xl text-white">°C</Text>
              </View>

              <Text className="text-2xl text-white">
                {WEATHER_CODES[hourlyForecast[0].weather]}
              </Text>
            </View>
          )}

          {/* Affichage des des données jours par jours */}
          {dailyForecast && (
            <DailyWeatherList
              navigation={navigation}
              dailyForecast={dailyForecast}
            />
          )}

          {/* Affichage par tranche de 3 heures pendant 12 heures */}
          {hourlyForecast && (
            <HourlyWeatherList hourlyForecast={hourlyForecast} />
          )}

          {/* Affichage d'infos divers sur la journée en cours */}
          {ephemeris && (
            <TodayWeatherInfo
              ephemeris={ephemeris}
              forecast={dailyForecast[0]}
            />
          )}

          {(!dailyForecast || !hourlyForecast || !ephemeris) && (
            <View className="flex-1 items-center">
              <Text className="text-2xl text-white">Ville invalide</Text>
            </View>
          )}
        </ScrollView>
      )}
    </LinearGradient>
  );
};

export default WeatherScreen;
