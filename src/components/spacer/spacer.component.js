import React from 'react';
import propTypes from 'prop-types';
import styled, { useTheme } from 'styled-components/native';

const sizeVariant = {
    small: 1,
    medium: 2,
    large: 3,
};

const positionVariant = {
    top: 'marginTop',
    left: 'marginLeft',
    right: 'marginRight',
    bottom: 'marginBottom',
};

const getVariant = (position, size, theme) => {
    const sizeIndex = sizeVariant[size];
    const property = positionVariant[position];
    const value = theme.space[sizeIndex];

    return `${property}:${value}`;
};

const SpacerView = styled.View`
    ${({ variant }) => variant}
`;

export const Spacer = ({ position, size, children }) => {
    const theme = useTheme();
    const variant = getVariant(position, size, theme);
    return <SpacerView variant={variant}>{children}</SpacerView>;
};

Spacer.propTypes = {
    position: propTypes.oneOf(Object.keys(positionVariant)).isRequired,
    size: propTypes.oneOf(Object.keys(sizeVariant)).isRequired,
    children: propTypes.node,
};

Spacer.defaultProps = {
    position: 'top',
    size: 'small',
};
