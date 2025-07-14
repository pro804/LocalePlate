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

export const RegisterScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatedPassword, setRepeatedPassword] = useState('');
    const [validationErrors, setValidationErrors] = useState({});
    const { onRegister, error, isLoading, clearError } = useContext(
        AuthenticationContext,
    );

    useEffect(() => {
        if (error) clearError();
        setValidationErrors({});
    }, [email, password, repeatedPassword]);

    const handleRegister = () => {
        // Enhanced client-side validation
        const errors = {};

        if (!email) errors.email = 'Email is required';
        else if (!/^\S+@\S+\.\S+$/.test(email))
            errors.email = 'Invalid email format';

        if (!password) errors.password = 'Password is required';
        else if (password.length < 6)
            errors.password = 'Password must be at least 6 characters';

        // Add specific validation for repeated password
        if (!repeatedPassword)
            errors.repeatedPassword = 'Please repeat your password';
        else if (password !== repeatedPassword)
            errors.repeatedPassword = 'Passwords do not match';

        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }

        onRegister(email, password, repeatedPassword);
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

                <Spacer position="top" size="large">
                    <AuthInput
                        label="Repeat Password"
                        value={repeatedPassword}
                        textContentType="password"
                        secureTextEntry
                        autoCapitalize="none"
                        onChangeText={setRepeatedPassword}
                        error={!!validationErrors.repeatedPassword}
                    />
                    {validationErrors.repeatedPassword && (
                        <ErrorContainer>
                            <Text variant="error">
                                {validationErrors.repeatedPassword}
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
                            icon="email"
                            mode="contained"
                            onPress={handleRegister}
                            disabled={isLoading}
                        >
                            Register
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
