import React, { useState, useContext, useEffect } from 'react';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';

import {
    AccountBackground,
    AccountCover,
    AccountContainer,
    AuthButton,
    AuthInput,
    Title,
    ErrorContainer,
} from '../components/account.styles';

import { Text } from '../../../components/typography/text.component';
import { Spacer } from '../../../components/spacer/spacer.component';
import { AuthenticationContext } from '../../../services/authentication/authentication.context';

export const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validationErrors, setValidationErrors] = useState({});
    const { onLogin, error, isLoading, clearError } = useContext(
        AuthenticationContext,
    );

    useEffect(() => {
        if (error) clearError();
        setValidationErrors({});
    }, [email, password]);

    const handleLogin = () => {
        const errors = {};

        if (!email) errors.email = 'Email is required';
        else if (!/^\S+@\S+\.\S+$/.test(email))
            errors.email = 'Invalid email format';

        if (!password) errors.password = 'Password is required';

        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }

        onLogin(email, password);
    };
    return (
        <AccountBackground>
            <AccountCover />
            <Title>Locale Plate</Title>
            <AccountContainer>
                <AuthInput
                    label="E-mail"
                    value={email}
                    textContentType="emailAddress"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onChangeText={setEmail}
                    error={!!validationErrors.email}
                />
                {validationErrors.email && (
                    <ErrorContainer>
                        <Text variant="error">{validationErrors.email}</Text>
                    </ErrorContainer>
                )}

                <Spacer position="top" size="large">
                    <AuthInput
                        label="Password"
                        value={password}
                        textContentType="password"
                        secureTextEntry
                        autoCapitalize="none"
                        onChangeText={setPassword}
                        error={!!validationErrors.password}
                    />
                    {validationErrors.password && (
                        <ErrorContainer>
                            <Text variant="error">
                                {validationErrors.password}
                            </Text>
                        </ErrorContainer>
                    )}
                </Spacer>

                {error && (
                    <ErrorContainer>
                        <Text variant="error">{error}</Text>
                    </ErrorContainer>
                )}

                <Spacer position="top" size="large">
                    {!isLoading ? (
                        <AuthButton
                            icon="lock-open-outline"
                            mode="contained"
                            onPress={handleLogin}
                            disabled={isLoading}
                        >
                            Login
                        </AuthButton>
                    ) : (
                        <ActivityIndicator
                            animating={true}
                            color={MD2Colors.blue300}
                        />
                    )}
                </Spacer>
            </AccountContainer>
            <Spacer position="top" size="large">
                <AuthButton
                    mode="contained"
                    onPress={() => navigation.goBack()}
                >
                    Back
                </AuthButton>
            </Spacer>
        </AccountBackground>
    );
};
