// src/context/UserContext.js

import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    const loadUser = async () => {
        try {
            const storedUser = await AsyncStorage.getItem('@currentUser');
            if (storedUser) {
                setCurrentUser(JSON.parse(storedUser));
            }
        } catch (e) {
            console.error('Failed to load user:', e);
        }
    };

    useEffect(() => {
        loadUser();
    }, []);

    const saveUser = async (user) => {
        try {
            const userString = JSON.stringify(user);
            await AsyncStorage.setItem('@currentUser', userString);
            setCurrentUser(user);
        } catch (e) {
            console.error('Failed to save user:', e);
        }
    };

    return (
        <UserContext.Provider value={{ currentUser, saveUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
