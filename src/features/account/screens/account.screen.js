import React from 'react';

import { Spacer } from '../../../components/spacer/spacer.component';
import {
    AccountBackground,
    AccountCover,
    AccountContainer,
    AuthButton,
    Title,
} from '../components/account.styles';

export const AccountScreen = ({ navigation }) => {
    return (
        <AccountBackground>
            <AccountCover />
            <Title>Locale Plate</Title>
            <AccountContainer>
                <AuthButton
                    icon="lock-open-outline"
                    mode="contained"
                    onPress={() => navigation.navigate('Login')}
                >
                    Login
                </AuthButton>
                <Spacer position="top" size="large">
                    <AuthButton
                        icon="email"
                        mode="contained"
                        onPress={() => navigation.navigate('Register')}
                    >
                        Register
                    </AuthButton>
                </Spacer>
            </AccountContainer>
        </AccountBackground>
    );
};
