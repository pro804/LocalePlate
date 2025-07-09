import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from 'styled-components/native';

import Proptypes from 'prop-types';

export const ShadowWrapper = ({ children, size = 'small', style }) => {
    const theme = useTheme();

    const shadowStyle = theme.shadows[size] || theme.shadows.small;

    const combinedStyle = StyleSheet.flatten([
        styles.wrapper,
        shadowStyle,
        style,
    ]);

    return <View style={combinedStyle}>{children}</View>;
};

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: 'transparent',
        borderRadius: 4,
        overflow: 'visible',
        width: '100%',
        marginVertical: 4,
    },
});

ShadowWrapper.propTypes = {
    children: Proptypes.node,
    size: Proptypes.string,
    style: Proptypes.object,
};
