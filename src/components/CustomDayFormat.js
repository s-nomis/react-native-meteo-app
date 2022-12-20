import {View, Text} from 'react-native';
import React from 'react';
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import isTomorrow from 'dayjs/plugin/isTomorrow';
import {WEATHER_CODES} from '../constants/weather';

import('dayjs/locale/fr');

const CustomDayFormat = ({day, format, weather, color}) => {
  dayjs.locale('fr');
  dayjs.extend(isToday);
  dayjs.extend(isTomorrow);

  const date = dayjs();

  return (
    <Text className={color && `text-${color}`}>
      {date.add(day, 'day').isToday()
        ? "Aujourd'hui"
        : date.add(day, 'day').isTomorrow()
        ? 'Demain'
        : date.add(day, 'day').format(format)}
      {weather && ' - ' + WEATHER_CODES[weather]}
    </Text>
  );
};

export default CustomDayFormat;
