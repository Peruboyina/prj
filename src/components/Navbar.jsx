import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { language, setLanguage, languages, country, setCountry, countries } = useLanguage();

    const categories = [
        { name: 'General', path: '/' },
        { name: 'Business', path: '/business' },
        { name: 'Technology', path: '/technology' },
        { name: 'Entertainment', path: '/entertainment' },
        { name: 'Sports', path: '/sports' },
        { name: 'Science', path: '/science' },
        { name: 'Health', path: '/health' },
    ];

    return (
        <nav className="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-gray-200 dark:border-slate-800 shadow-sm">
            <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:bg-brand-500 transition-colors">
                            N
                        </div>
                        <span className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight">
                            News<span className="text-brand-600">App</span>
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex space-x-1">
                        {categories.map((category) => (
                            <NavLink
                                key={category.name}
                                to={category.path}
                                className={({ isActive }) =>
                                    `px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${isActive
                                        ? 'text-white bg-brand-600 shadow-md'
                                        : 'text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                                    }`
                                }
                            >
                                {category.name}
                            </NavLink>
                        ))}
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Country Switcher */}
                        <div className="hidden md:block relative">
                            <select
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                className="appearance-none bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-sm font-medium rounded-full py-2 pl-4 pr-8 focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-transparent"
                            >
                                {countries.map((c) => (
                                    <option key={c.code} value={c.code}>
                                        {c.name}
                                    </option>
                                ))}
                            </select>
                            <svg className="w-4 h-4 text-slate-500 absolute right-2.5 top-2.5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>

                        {/* Language Switcher */}
                        <div className="hidden md:block relative">
                            <select
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                                className="appearance-none bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-sm font-medium rounded-full py-2 pl-4 pr-8 focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-transparent"
                            >
                                {languages.map((lang) => (
                                    <option key={lang.code} value={lang.code}>
                                        {lang.name}
                                    </option>
                                ))}
                            </select>
                            <div className="absolute right-2.5 top-2.5 pointer-events-none text-slate-500 text-xs font-bold uppercase">
                                {language}
                            </div>
                        </div>

                        {/* Search Bar */}
                        <div className="hidden md:flex items-center">
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                const query = e.target.search.value;
                                if (query.trim()) {
                                    window.location.href = `/search?q=${encodeURIComponent(query)}`;
                                }
                            }} className="relative group">
                                <input
                                    type="text"
                                    name="search"
                                    placeholder="Search news..."
                                    className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-brand-500 w-48 transition-all duration-300 focus:w-64 border-none"
                                />
                                <svg className="h-4 w-4 absolute left-3 top-3 text-slate-400 group-focus-within:text-brand-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </form>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="lg:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="text-slate-700 dark:text-slate-200 hover:text-brand-600 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            >
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    {isOpen ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 overflow-hidden"
                    >
                        <div className="px-4 pt-4 pb-6 space-y-3">
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                const query = e.target.search.value;
                                if (query.trim()) {
                                    window.location.href = `/search?q=${encodeURIComponent(query)}`;
                                    setIsOpen(false);
                                }
                            }} className="relative">
                                <input
                                    type="text"
                                    name="search"
                                    placeholder="Search news..."
                                    className="w-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg py-3 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-brand-500"
                                />
                                <svg className="h-5 w-5 absolute left-3 top-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </form>

                            <div className="grid grid-cols-2 gap-3">
                                <select
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white text-sm rounded-lg focus:ring-brand-500 focus:border-brand-500 block w-full p-3"
                                >
                                    {countries.map((c) => (
                                        <option key={c.code} value={c.code}>
                                            {c.name}
                                        </option>
                                    ))}
                                </select>
                                <select
                                    value={language}
                                    onChange={(e) => {
                                        setLanguage(e.target.value);
                                    }}
                                    className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white text-sm rounded-lg focus:ring-brand-500 focus:border-brand-500 block w-full p-3"
                                >
                                    {languages.map((lang) => (
                                        <option key={lang.code} value={lang.code}>
                                            {lang.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="h-px bg-slate-200 dark:bg-slate-700 my-2"></div>

                            <div className="flex flex-col space-y-1">
                                {categories.map((category) => (
                                    <NavLink
                                        key={category.name}
                                        to={category.path}
                                        onClick={() => setIsOpen(false)}
                                        className={({ isActive }) =>
                                            `block px-4 py-3 rounded-lg text-base font-medium transition-colors ${isActive
                                                ? 'text-brand-600 bg-brand-50 dark:bg-brand-900/20'
                                                : 'text-slate-700 dark:text-slate-200 hover:text-brand-600 hover:bg-slate-50 dark:hover:bg-slate-800'
                                            }`
                                        }
                                    >
                                        {category.name}
                                    </NavLink>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
