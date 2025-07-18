import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { FadeInView } from '../animations/fade.animation';
import { Spacer } from '../spacer/spacer.component';
import { CompactRestaurantInfo } from '../restaurant/compact-restaurant-info.component';

import { Text } from '../typography/text.component';

const FavouritesWrapper = styled.View`
    padding: 10px;
`;

export const FavouritesBar = ({ favourites, onNavigate }) => {
    if (!favourites.length) {
        return null;
    }

    return (
        <FavouritesWrapper>
            <FadeInView>
                <Spacer position="left" size="small">
                    <Text variant="caption">Favourites</Text>
                </Spacer>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {favourites.map((restaurant) => {
                        const key = restaurant.name;
                        return (
                            <Spacer position="left" size="medium" key={key}>
                                <TouchableOpacity
                                    onPress={() =>
                                        onNavigate('RestaurantDetail', {
                                            restaurant,
                                        })
                                    }
                                >
                                    <CompactRestaurantInfo
                                        restaurant={restaurant}
                                    />
                                </TouchableOpacity>
                            </Spacer>
                        );
                    })}
                </ScrollView>
            </FadeInView>
        </FavouritesWrapper>
    );
};
