// /app/components/AuthProvider.js
'use client';
import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const router = useRouter();
    const timerRef = useRef(null);

    const logout = () => {
        sessionStorage.clear();
        router.push('/login'); // Change to your login route
    };

    const resetTimer = () => {
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(logout, 30 * 60 * 1000); // 30 minutes
    };

    useEffect(() => {
        const events = ['mousemove', 'keydown', 'scroll', 'click'];
        events.forEach(event => window.addEventListener(event, resetTimer));
        resetTimer();

        return () => {
            events.forEach(event => window.removeEventListener(event, resetTimer));
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, []);

    return (
        <AuthContext.Provider value={{ logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Optional: export hook for easier access
export const useAuth = () => useContext(AuthContext);
