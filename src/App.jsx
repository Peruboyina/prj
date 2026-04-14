import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import CategoryNews from './pages/CategoryNews';
import SearchResults from './pages/SearchResults';
import ArticleDetail from './pages/ArticleDetail';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="search" element={<SearchResults />} />
        <Route path="article" element={<ArticleDetail />} />
        <Route path=":category" element={<CategoryNews />} />
      </Route>
    </Routes>
  );
}

export default App;
