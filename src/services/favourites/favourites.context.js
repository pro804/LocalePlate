import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthenticationContext } from '../authentication/authentication.context';

export const FavouritesContext = createContext();

export const FavouritesContextProvider = ({ children }) => {
    const { user } = useContext(AuthenticationContext);
    const [favourites, setFavourites] = useState([]);

    const add = (restaurant) => {
        setFavourites([...favourites, restaurant]);
    };

    const saveFavourites = async (value, uid) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(`@favourites-${uid}`, jsonValue);
        } catch (e) {
            console.log('error storing', e);
        }
    };

    const loadFavourites = async (uid) => {
        try {
            const value = await AsyncStorage.getItem(`@favourites-${uid}`);
            if (value !== null) {
                setFavourites(JSON.parse(value));
            }
        } catch (e) {
            console.log('Error loading favourites', e);
        }
    };

    const remove = (restaurant) => {
        const newFavourites = favourites.filter(
            (x) => x.placeId !== restaurant.placeId,
        );
        setFavourites(newFavourites);
    };

    useEffect(() => {
        if (user) {
            loadFavourites(user.uid);
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            saveFavourites(favourites, user.uid);
        }
    }, [favourites, user]);

    return (
        <FavouritesContext.Provider
            value={{
                favourites,
                addToFavourites: add,
                removeFromFavourites: remove,
            }}
        >
            {children}
        </FavouritesContext.Provider>
    );
};
