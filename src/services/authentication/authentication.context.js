import React, { createContext, useState, useEffect } from 'react';
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
} from 'firebase/auth';
import { auth } from '../../../firebaseConfig';

const getFriendlyErrorMessage = (errorCode) => {
    switch (errorCode) {
        // Login errors
        case 'auth/invalid-credential':
        case 'auth/wrong-password':
            return 'Invalid email or password';
        case 'auth/user-not-found':
            return 'Account not found';
        // Registration errors
        case 'auth/email-already-in-use':
            return 'Email already in use';
        case 'auth/weak-password':
            return 'Password must be at least 6 characters';
        // Common errors
        case 'auth/user-disabled':
            return 'Account disabled';
        case 'auth/too-many-requests':
            return 'Too many attempts. Try again later';
        case 'auth/network-request-failed':
            return 'Network error. Check your connection';
        case 'auth/invalid-email':
            return 'Invalid email address';
        default:
            return 'An error occurred. Please try again';
    }
};

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
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
        setError(null);

        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (e) {
            setError(getFriendlyErrorMessage(e.code));
        } finally {
            setIsLoading(false);
        }
    };
    const onLogout = async () => {
        try {
            await signOut(auth);
        } catch (e) {
            setError(e.message);
        }
    };

    const clearError = () => setError(null);

    const onRegister = async (email, password, repeatedPassword) => {
        setIsLoading(true);
        setError(null);

        try {
            if (password !== repeatedPassword) {
                setError('Passwords do not match');
                return;
            }
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (e) {
            if (e.message === 'passwords-mismatch') {
                setError('Passwords do not match');
            }
            // Handle Firebase errors
            else {
                setError(getFriendlyErrorMessage(e.code));
            }
        } finally {
            setIsLoading(false);
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
                onRegister,
                clearError,
            }}
        >
            {children}
        </AuthenticationContext.Provider>
    );
};
