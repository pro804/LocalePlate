import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

import { RestaurantsNavigator } from './restaurants.navigator';
import { SettingsNavigator } from './settings.navigator';
import { MapScreen } from '../../features/map/screens/map.screen';

import { RestaurantsContextProvider } from '../../services/restaurants/restaurants.context';
import { LocationContextProvider } from '../../services/location/location.context';
import { FavouritesContextProvider } from '../../services/favourites/favourites.context';

const Tab = createBottomTabNavigator();

const TAB_ICON = {
    Restaurants: 'restaurant',
    Settings: 'settings',
    Map: 'map',
};

const createScreenOptions = ({ route }) => {
    const iconName = TAB_ICON[route.name];
    return {
        tabBarIcon: ({ size, color }) => (
            <Ionicons name={iconName} size={size} color={color} />
        ),
    };
};
export const AppNavigator = () => (
    <FavouritesContextProvider>
        <LocationContextProvider>
            <RestaurantsContextProvider>
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        ...createScreenOptions({ route }),
                        tabBarActiveTintColor: 'tomato',
                        tabBarInactiveTintColor: 'gray',
                        headerShown: false,
                    })}
                >
                    <Tab.Screen
                        name="Restaurants"
                        component={RestaurantsNavigator}
                    />
                    <Tab.Screen name="Map" component={MapScreen} />
                    <Tab.Screen name="Settings" component={SettingsNavigator} />
                </Tab.Navigator>
            </RestaurantsContextProvider>
        </LocationContextProvider>
    </FavouritesContextProvider>
);
