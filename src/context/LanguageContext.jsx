import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('en'); // Default language is English
    const [country, setCountry] = useState('global'); // Default country is Global

    const languages = [
        { code: 'en', name: 'English' },
        { code: 'es', name: 'Spanish' },
        { code: 'fr', name: 'French' },
        { code: 'de', name: 'German' },
        { code: 'it', name: 'Italian' },
        { code: 'pt', name: 'Portuguese' },
        { code: 'ru', name: 'Russian' },
        { code: 'zh', name: 'Chinese' },
    ];

    const countries = [
        { code: 'global', name: 'Global' },
        { code: 'in', name: 'India' },
        { code: 'us', name: 'USA' },
        { code: 'gb', name: 'UK' },
        { code: 'au', name: 'Australia' },
        { code: 'ca', name: 'Canada' },
        { code: 'de', name: 'Germany' },
        { code: 'fr', name: 'France' },
        { code: 'jp', name: 'Japan' },
    ];

    return (
        <LanguageContext.Provider value={{ language, setLanguage, languages, country, setCountry, countries }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
