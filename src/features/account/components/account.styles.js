import styled from 'styled-components/native';
import { Button, TextInput } from 'react-native-paper';

import { colors } from '../../../infrastructure/theme/colors';
import { Text } from '../../../components/typography/text.component';

export const AccountBackground = styled.ImageBackground.attrs({
    source: require('../../../../assets/home_bg.jpg'),
})`
    flex: 1;
    align-items: center;
    justify-content: center;
`;
export const AccountCover = styled.View`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.3);
`;
export const AccountContainer = styled.View`
    background-color: rgba(255, 255, 255, 0.7);
    padding: ${(props) => props.theme.space[4]};
    margin-top: ${(props) => props.theme.space[2]};
`;

export const AuthButton = styled(Button).attrs({
    buttonColor: colors.brand.primary,
})`
    padding: ${(props) => props.theme.space[2]};
    border-radius: 4px;
`;

export const AuthInput = styled(TextInput).attrs({})`
    width: 300px;
    border-radius: 4px;
`;

export const Title = styled(Text).attrs({
    variant: 'body',
})`
    font-size: 30px;
`;

export const ErrorContainer = styled.View`
    max-width: 300px;
    align-items: center;
    align-self: center;
    margin-top: ${(props) => props.theme.space[2]};
    margin-bottom: ${(props) => props.theme.space[2]};
`;

export const AnimationWrapper = styled.View`
    width: 80%;
    height: 45%;
    position: absolute;
    top: 50px;
    padding: ${(props) => props.theme.space[3]};
`;
