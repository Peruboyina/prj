import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ArticleDetail = () => {
    const location = useLocation();
    const { article } = location.state || {};

    if (!article) {
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Article not found</h2>
                <Link to="/" className="text-blue-600 dark:text-blue-400 hover:underline">
                    Go back home
                </Link>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-4xl mx-auto"
        >
            <Link to="/" className="inline-flex items-center mb-6 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to News
            </Link>

            <article className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                {article.urlToImage && (
                    <div className="h-96 w-full relative">
                        <img
                            src={article.urlToImage}
                            alt={article.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.target.style.display = 'none';
                            }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent flex items-end">
                            <div className="p-8">
                                <span className="inline-block bg-blue-600 text-white text-sm px-3 py-1 rounded-full mb-4">
                                    {article.source.name}
                                </span>
                                <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                                    {article.title}
                                </h1>
                            </div>
                        </div>
                    </div>
                )}

                <div className="p-8">
                    {!article.urlToImage && (
                        <>
                            <span className="inline-block bg-blue-600 text-white text-sm px-3 py-1 rounded-full mb-4">
                                {article.source.name}
                            </span>
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                                {article.title}
                            </h1>
                        </>
                    )}

                    <div className="flex items-center text-gray-500 dark:text-gray-400 mb-8 border-b border-gray-200 dark:border-gray-700 pb-6">
                        <span>By {article.author || 'Unknown Author'}</span>
                        <span className="mx-2">•</span>
                        <span>{new Date(article.publishedAt).toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        })}</span>
                    </div>

                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        <p className="text-xl text-gray-700 dark:text-gray-300 font-medium mb-6 leading-relaxed">
                            {article.description}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                            {article.content ? article.content.replace(/\[\+\d+ chars\]/, '') : 'No further content available.'}
                        </p>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-center md:text-left">
                        <a
                            href={article.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                        >
                            Read Full Article at Source
                            <svg className="ml-2 -mr-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </a>
                    </div>
                </div>
            </article>
        </motion.div>
    );
};

export default ArticleDetail;
