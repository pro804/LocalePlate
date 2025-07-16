import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { Searchbar } from 'react-native-paper';
import { ShadowWrapper } from './shadow-component-wraper';

import { LocationContext } from '../../../services/location/location.context';

export const SearchContainer = styled.View`
    padding: ${(props) => props.theme.space[3]};
`;

const StyledSearchbar = styled(Searchbar).attrs(({ theme }) => ({
    placeholderTextColor: theme.colors.ui.secondary,
    iconColor: theme.colors.ui.primary,
    inputStyle: {
        color: theme.colors.text.primary,
    },
}))`
    background-color: ${({ theme }) => theme.colors.ui.quaternary};
    border-radius: ${({ theme }) => theme.sizes[0]};
    border-width: 0.2px;
    border-radius: 4px;
    border-color: ${({ theme }) => theme.colors.ui.secondary};
`;

export const Search = ({ isFavouritesToggled, onFavouritesToggle }) => {
    const { keyword, search } = useContext(LocationContext);
    const [searchKeyword, setSearchKeyword] = useState(keyword);

    useEffect(() => {
        setSearchKeyword(keyword);
    }, [keyword]);

    return (
        <SearchContainer>
            <ShadowWrapper size="medium" style={{ borderRadius: 8 }}>
                <StyledSearchbar
                    icon={isFavouritesToggled ? 'heart' : 'heart-outline'}
                    onIconPress={onFavouritesToggle}
                    placeholder="Search for a location"
                    value={searchKeyword}
                    onChangeText={(text) => setSearchKeyword(text)}
                    onSubmitEditing={() => search(searchKeyword)}
                />
            </ShadowWrapper>
        </SearchContainer>
    );
};
