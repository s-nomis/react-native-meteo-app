import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import MoreForecastScreen from './src/screens/MoreForecastScreen';
import SearchScreen from './src/screens/SearchScreen';
import WeatherScreen from './src/screens/WeatherScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Weather"
          component={WeatherScreen}
          options={{
            headerTransparent: true,
            headerTitleAlign: 'center',
            headerTintColor: 'white',
            title: 'Météo',
          }}
        />
        <Stack.Screen
          name="MoreForecast"
          component={MoreForecastScreen}
          options={{
            headerTransparent: true,
            headerTitleAlign: 'center',
            title: '',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
