import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NewsCard = ({ article }) => {
    const { title, description, url, urlToImage, source, publishedAt } = article;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
            className="group bg-white dark:bg-slate-800 rounded-2xl shadow-sm hover:shadow-xl overflow-hidden border border-slate-100 dark:border-slate-700 h-full flex flex-col transition-all duration-300"
        >
            <div className="relative h-48 overflow-hidden">
                <img
                    src={urlToImage || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070&auto=format&fit=crop'}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070&auto=format&fit=crop';
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-3 right-3">
                    <span className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm text-slate-800 dark:text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
                        {source.name}
                    </span>
                </div>
            </div>

            <div className="p-5 flex-grow flex flex-col">
                <div className="flex items-center gap-2 mb-3 text-xs text-slate-500 dark:text-slate-400 font-medium">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {formatDate(publishedAt)}
                </div>

                <h3 className="text-lg font-bold mb-3 text-slate-900 dark:text-white line-clamp-2 leading-tight group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                    <a href={url} target="_blank" rel="noopener noreferrer">
                        {title}
                    </a>
                </h3>

                <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 line-clamp-3 flex-grow leading-relaxed">
                    {description || 'Click to read the full story and get more details about this event.'}
                </p>

                <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-700 flex justify-between items-center">
                    <Link
                        to="/article"
                        state={{ article }}
                        className="text-brand-600 dark:text-brand-400 text-sm font-semibold hover:text-brand-700 dark:hover:text-brand-300 flex items-center gap-1 transition-colors"
                    >
                        Read Article
                        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default NewsCard;
