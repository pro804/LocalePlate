import React, { createContext, useState, useEffect } from 'react';
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth';
import { auth } from '../../../firebaseConfig';

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setIsLoading(false);
        });

        return unsubscribe;
    }, []);

    const onLogin = async (email, password) => {
        setIsLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password,
            );
            setUser(userCredential.user);
            setError(null);
        } catch (e) {
            setError(e.message);
            console.error('Login error:', e.code, e.message);
        } finally {
            setIsLoading(false);
        }
    };

    const onLogout = async () => {
        try {
            await signOut(auth);
            setUser(null);
            setError(null);
        } catch (e) {
            setError(e.message);
        }
    };

    return (
        <AuthenticationContext.Provider
            value={{
                user,
                isLoading,
                error,
                isAuthenticated: !!user,
                onLogin,
                onLogout,
            }}
        >
            {children}
        </AuthenticationContext.Provider>
    );
};
