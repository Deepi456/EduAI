import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Helper to generate a somewhat deterministic mock user based on email
    const generateMockUser = (email, name = 'Student') => {
        // Just use the email length to generate some pseudo-random but consistent stats
        const baseScore = 50 + (email.length % 40);
        return {
            id: `user_${email.replace(/[^a-zA-Z0-9]/g, '')}`,
            name: name,
            email: email,
            subjects: ['Mathematics', 'Computer Science'],
            interests: ['Machine Learning', 'Data Structures', 'Web Development'],
            skillScore: baseScore,
            progress: Math.max(10, baseScore - 20)
        };
    };

    // On mount, check if there's a user session (mocking with local storage or just keeping it stateful)
    useEffect(() => {
        const storedUser = localStorage.getItem('eduai_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (email, password, name) => {
        // Mock login logic
        if (email && password) {
            // Extract name from email if not provided
            const displayName = name || email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
            const newUser = generateMockUser(email, displayName);
            setUser(newUser);
            localStorage.setItem('eduai_user', JSON.stringify(newUser));
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('eduai_user');
    };

    const updateSkillScore = (newScore) => {
        setUser(prev => ({ ...prev, skillScore: newScore }));
        // In a real app, this would hit an API
    };

    return (
        <UserContext.Provider value={{ user, login, logout, updateSkillScore }}>
            {children}
        </UserContext.Provider>
    );
};
