// context/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export const UserAuthContext = ({ children }) => {
    const [user, setUser] = useState(null); // null means not logged in
    const router = useRouter();

    // Example: Load user from localStorage or cookies
    useEffect(() => {
        const userDetail = sessionStorage.getItem("userDetail"); // or use cookies
        if (!userDetail) {
            router.push('/login');
            sessionStorage.clear();
        }
    }, []);


    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
