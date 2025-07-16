import React from 'react';
import { StatusBar as RNStatusBar, SafeAreaView, Platform } from 'react-native';
import styled from 'styled-components/native';
import { useTheme } from 'styled-components/native';

const StyledSafeArea = styled(SafeAreaView)`
    flex: 1;
    background-color: ${(props) => props.theme.colors.bg.primary};

    ${Platform.OS === 'android' &&
    RNStatusBar.currentHeight &&
    `
    padding-top: ${RNStatusBar.currentHeight}px;
  `}
`;

export const SafeArea = ({ children }) => {
    const theme = useTheme();

    return (
        <>
            <RNStatusBar
                backgroundColor="transparent"
                translucent={true}
                barStyle={theme.colors.statusBarStyle || 'dark-content'}
            />
            <StyledSafeArea>{children}</StyledSafeArea>
        </>
    );
};
