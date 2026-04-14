import React, { useEffect, useState } from 'react';
import { fetchTopHeadlines } from '../services/newsApi';
import NewsCard from '../components/NewsCard';
import { useLanguage } from '../context/LanguageContext';

const Home = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const { language, country, countries } = useLanguage();

    const currentCountryName = countries.find(c => c.code === country)?.name || 'Global';

    useEffect(() => {
        const getHeadlines = async () => {
            setLoading(true);
            const data = await fetchTopHeadlines(country, 'general', language);
            setArticles(data);
            setLoading(false);
        };

        getHeadlines();
    }, [language, country]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-600"></div>
            </div>
        );
    }

    return (
        <div className="max-w-[1920px] mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-baseline mb-8 border-b border-slate-200 dark:border-slate-700 pb-4">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                    Top Headlines <span className="text-brand-600 text-2xl font-medium block md:inline md:ml-2">— {currentCountryName}</span>
                </h1>
                <p className="text-slate-500 dark:text-slate-400 mt-2 md:mt-0 font-medium">
                    {country === 'global' ? 'Showing top headlines from around the world' : `Showing latest news from ${currentCountryName}`}
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {articles.map((article, index) => (
                    <NewsCard key={`${article.url}-${index}`} article={article} />
                ))}
            </div>

            {articles.length === 0 && (
                <div className="text-center text-slate-600 dark:text-slate-400 mt-12 bg-slate-50 dark:bg-slate-800/50 p-12 rounded-xl">
                    <p className="text-xl">No articles found. Please try again later.</p>
                </div>
            )}
        </div>
    );
};

export default Home;
