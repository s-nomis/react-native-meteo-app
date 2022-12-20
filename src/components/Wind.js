import {View, Text} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Wind = ({dirWind, wind, icon_color, text_color}) => {
  const getWindCardinaleDirection = direction_degree => {
    const NORTH_1 = 0;
    const NORTH_EAST = 45;
    const EAST = 90;
    const SOUTH_EAST = 135;
    const SOUTH = 180;
    const SOUTH_WEST = 225;
    const WEST = 270;
    const NORTH_WEST = 315;
    const NORTH_2 = 360;

    //Pour obtenir la cardinalité, on évalue la valeur renvoyer par l'api.
    //Exemple pour le Sud : La valeur doit etre la plus proche de 180°,
    //on regarde donc si elle est comprise en 180 + 22.5 et 180 - 22.5.
    //22.5 correspond à la moitié de l'écart entre 2 cardinalité,
    //180° pour le sud et 225° pour le sud-ouest : (225 - 180) / 2 = 22.5

    //Nord
    if (
      (direction_degree >= NORTH_1 && direction_degree < NORTH_1 + 22.5) ||
      (direction_degree <= NORTH_2 && direction_degree > NORTH_2 - 22.5)
    ) {
      return 'north';
    }

    //Nord-est
    if (
      direction_degree >= NORTH_EAST - 22.5 &&
      direction_degree < NORTH_EAST + 22.5
    ) {
      return 'north-east';
    }

    //Est
    if (direction_degree >= EAST - 22.5 && direction_degree < EAST + 22.5) {
      return 'east';
    }

    //Sud-est
    if (
      direction_degree >= SOUTH_EAST - 22.5 &&
      direction_degree < SOUTH - 22.5
    ) {
      return 'south-east';
    }

    //Sud
    if (direction_degree >= SOUTH - 22.5 && direction_degree < SOUTH + 22.5) {
      return 'south';
    }

    //Sud-ouest
    if (
      direction_degree >= SOUTH_WEST - 22.5 &&
      direction_degree < SOUTH_WEST + 22.5
    ) {
      return 'south-west';
    }

    //Ouest
    if (direction_degree >= WEST - 22.5 && direction_degree < WEST + 22.5) {
      return 'west';
    }

    //Nord-ouest
    if (
      direction_degree >= NORTH_WEST - 22.5 &&
      direction_degree < NORTH_WEST + 22.5
    ) {
      return 'north-west';
    }
  };

  return (
    <View className="flex flex-row items-center gap-1">
      <Icon
        name={getWindCardinaleDirection(dirWind)}
        color={icon_color}
        size={16}
      />
      <Text className={text_color && `text-${text_color}`}>{wind} km/h</Text>
    </View>
  );
};

export default Wind;
