import React from 'react';

import {
    createStackNavigator,
    CardStyleInterpolators,
    TransitionPresets,
} from '@react-navigation/stack';

import { SettingsScreen } from '../../features/settings/screens/settings.screen';
import { FavouritesScreen } from '../../features/settings/screens/favourites.screen';
import { RestaurantDetailScreen } from '../../features/restaurants/screens/restaurant-detail.screen';
import { CameraScreen } from '../../features/settings/screens/camera.screen';

const SettingsStack = createStackNavigator();

export const SettingsNavigator = ({ route, navigation }) => {
    return (
        <SettingsStack.Navigator
            screenOptions={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                headerTitleAlign: 'center',
                headerBackTitleVisible: false,
            }}
        >
            <SettingsStack.Screen
                name=" UserSettings"
                component={SettingsScreen}
                options={{ headerShown: false }}
            />
            <SettingsStack.Screen
                name="Favourites"
                component={FavouritesScreen}
                options={{
                    title: 'Favourites',
                    headerBackButtonDisplayMode: 'generic',
                    headerBackTitleStyle: { color: 'blue' },
                }}
            />
            <SettingsStack.Screen
                name="FavouritesDetail"
                component={RestaurantDetailScreen}
                options={{
                    ...TransitionPresets.ModalPresentationIOS,
                    presentation: 'modal',
                    headerShown: false,
                    gestureDirection: 'vertical',
                    gestureEnabled: true,
                    statusBarEnabled: false,
                    cardStyleInterpolator:
                        CardStyleInterpolators.forVerticalIOS,
                }}
            />
            <SettingsStack.Screen
                name="Camera"
                component={CameraScreen}
                options={{
                    title: 'Camera',
                    headerBackButtonDisplayMode: 'generic',
                    headerBackTitleStyle: { color: 'blue' },
                }}
            />
        </SettingsStack.Navigator>
    );
};
