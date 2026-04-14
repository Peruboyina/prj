import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchNews } from '../services/newsApi';
import NewsCard from '../components/NewsCard';
import { useLanguage } from '../context/LanguageContext';

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const { language } = useLanguage();

    useEffect(() => {
        const getSearchResults = async () => {
            if (!query) return;
            setLoading(true);
            const data = await searchNews(query, language);
            setArticles(data);
            setLoading(false);
        };

        getSearchResults();
    }, [query, language]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-600"></div>
            </div>
        );
    }

    return (
        <div className="max-w-[1920px] mx-auto">
            <div className="mb-8 border-b border-slate-200 dark:border-slate-700 pb-4">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                    Search Results <span className="text-slate-400 font-normal text-2xl">for "{query}"</span>
                </h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {articles.map((article, index) => (
                    <NewsCard key={`${article.url}-${index}`} article={article} />
                ))}
            </div>

            {articles.length === 0 && (
                <div className="text-center text-slate-600 dark:text-slate-400 mt-12 bg-slate-50 dark:bg-slate-800/50 p-12 rounded-xl">
                    <p className="text-xl">No articles found for "{query}". Try a different search term.</p>
                </div>
            )}
        </div>
    );
};

export default SearchResults;
