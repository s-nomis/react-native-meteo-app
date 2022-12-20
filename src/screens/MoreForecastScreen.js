import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, StatusBar, ScrollView} from 'react-native';
import {useHeaderHeight} from '@react-navigation/elements';
import {LineChart} from 'react-native-chart-kit';
import dayjs from 'dayjs';
import Icon from '../../assets/fonts/weatherIcon';
import {WEATHER_ICONS} from '../constants/weather';
import CustomDayFormat from '../components/CustomDayFormat';
import Wind from '../components/Wind';

const MoreForecastScreen = ({route}) => {
  const [tempMaxArray, setTempMaxArray] = useState([]);
  const [tempMinArray, setTempMinArray] = useState([]);

  const {forecast} = route.params;
  const date = dayjs();

  //Données permettant de tracer le graphique
  const dataTempMax = {
    datasets: [
      {
        data: tempMaxArray,
      },
    ],
  };

  const dataTempMin = {
    datasets: [
      {
        data: tempMinArray,
      },
    ],
  };

  //Configuration du graphique
  const chartConfigTempMax = {
    backgroundGradientFrom: 'white', //couleur de départ du dégradé de l'arrière plan
    backgroundGradientTo: 'white', //couleur de fin du dégradé de l'arrière plan
    fillShadowGradientFrom: 'white', //couleur de départ du dégradé de la partie sous la ligne
    fillShadowGradientTo: 'white', //couleur de fin du dégradé de la partie sous la ligne
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, //couleur et opacité de la ligne et des points
    propsForBackgroundLines: {
      //options concernant la grille de l'arrière plan
      stroke: 'none',
    },
    propsForLabels: {
      //options concernant les labels présent sur l'axe x et y
      display: 'none',
    },
  };

  const chartConfigTempMin = {
    backgroundGradientFrom: 'white',
    backgroundGradientTo: 'white',
    fillShadowGradientFrom: 'white',
    fillShadowGradientTo: 'white',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    propsForBackgroundLines: {
      stroke: 'none',
    },
    propsForLabels: {
      display: 'none',
    },
  };

  useEffect(() => {
    const arrayTempMax = [];
    const arrayTempMin = [];
    forecast.map(element => {
      arrayTempMax.push(element.tmax);
      arrayTempMin.push(element.tmin);
    });

    setTempMaxArray(arrayTempMax);
    setTempMinArray(arrayTempMin);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      {/* Scroll vertical pour les petits écrans */}
      <ScrollView
        className="flex flex-col px-4"
        style={{marginTop: useHeaderHeight()}}>
        <Text className="text-neutral-500 text-3xl mb-8">
          Prévisions sur 14 jours
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex flex-col">
            {/* Affichage de la date, des icones, et de la température max par jour */}
            <View className="flex flex-row">
              {forecast.map((element, index) => (
                <View key={index} className="items-center gap-4 w-24">
                  <View className="items-center">
                    <CustomDayFormat
                      day={element.day}
                      format="ddd"
                      color="neutral-500"
                    />
                    <Text className="text-neutral-400">
                      {date.add(element.day, 'day').format('DD/MM')}
                    </Text>
                  </View>
                  <Icon
                    name={WEATHER_ICONS[element.weather]}
                    size={32}
                    color="#737373"
                  />
                  <Text className="text-neutral-500">{element.tmax}°</Text>
                </View>
              ))}
            </View>

            {/* Graphique représentant la température max par jour */}
            {tempMaxArray.length > 0 && (
              <LineChart
                data={dataTempMax}
                width={1158}
                height={150}
                chartConfig={chartConfigTempMax}
                style={{
                  paddingRight: 40,
                }}
              />
            )}

            {/* Graphique représentant la température min par jour */}
            {tempMinArray.length > 0 && (
              <LineChart
                data={dataTempMin}
                width={1158}
                height={150}
                chartConfig={chartConfigTempMin}
                style={{
                  paddingRight: 40,
                }}
              />
            )}

            {/* Affichage de la température min et du vent par jour */}
            <View className="flex flex-row">
              {forecast.map((element, index) => (
                <View key={index} className="items-center gap-4 w-24">
                  <Text className="text-neutral-500 mb-4">{element.tmin}°</Text>
                  <Wind
                    dirWind={element.dirwind10m}
                    wind={element.wind10m}
                    icon_color="gray"
                    text_color="neutral-500"
                  />
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MoreForecastScreen;
