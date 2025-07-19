import React from 'react';

import {
    createStackNavigator,
    TransitionPresets,
    CardStyleInterpolators,
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
                name="RestaurantsList"
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
                    cardStyleInterpolator:
                        CardStyleInterpolators.forVerticalIOS,
                }}
            />
        </RestaurantsStack.Navigator>
    );
};
