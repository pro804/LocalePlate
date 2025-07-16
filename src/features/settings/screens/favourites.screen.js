import React, { useContext } from 'react';

import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';

import { FavouritesContext } from '../../../services/favourites/favourites.context';

import { SafeAreaView } from 'react-native';
import { Text } from '../../../components/typography/text.component';
import { Spacer } from '../../../components/spacer/spacer.component';

import { RestaurantList } from '../../restaurants/components/restaurant-list.styles';
import { RestaurantInfoCard } from '../../restaurants/components/restaurant-info-card.component';

const NoFavouritesArea = styled(SafeAreaView)`
    flex: 1;
    background-color: ${(props) => props.theme.colors.bg.primary};
    align-items: center;
    justify-content: center;
`;
const FavouritesSafeArea = styled(SafeAreaView)`
    flex: 1;
    background-color: ${(props) => props.theme.colors.bg.primary};
`;

export const FavouritesScreen = ({ navigation }) => {
    const { favourites } = useContext(FavouritesContext);

    return favourites.length ? (
        <FavouritesSafeArea>
            <RestaurantList
                data={favourites}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate('RestaurantDetail', {
                                    restaurant: item,
                                })
                            }
                        >
                            <Spacer position="bottom" size="large">
                                <RestaurantInfoCard restaurant={item} />
                            </Spacer>
                        </TouchableOpacity>
                    );
                }}
                keyExtractor={(item) => item.name}
            />
        </FavouritesSafeArea>
    ) : (
        <NoFavouritesArea>
            <Text variant="label">No favourites yet</Text>
        </NoFavouritesArea>
    );
};
