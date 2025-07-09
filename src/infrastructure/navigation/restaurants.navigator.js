import React from 'react';

import {
    createStackNavigator,
    TransitionPresets,
} from '@react-navigation/stack';

import { RestaurantsScreen } from '../../features/restaurants/screens/restaurants.screen';
import { RestaurantDetailScreen } from '../../features/restaurants/screens/restaurant-detail.screen';

const RestaurantsStack = createStackNavigator();

export const RestaurantsNavigator = () => {
    return (
        <RestaurantsStack.Navigator
            screenOptions={{
                ...TransitionPresets.ModalPresentationIOS,
                headerShown: false,
            }}
        >
            <RestaurantsStack.Screen
                name="Restaurants"
                component={RestaurantsScreen}
            />
            <RestaurantsStack.Screen
                name="RestaurantDetail"
                component={RestaurantDetailScreen}
                options={{
                    ...TransitionPresets.ModalPresentationIOS,
                    presentation: 'modal',
                    gestureDirection: 'vertical',
                    gestureEnabled: true,
                    statusBarEnabled: false,
                }}
            />
        </RestaurantsStack.Navigator>
    );
};
