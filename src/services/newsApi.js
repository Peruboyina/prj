import axios from 'axios';

const API_KEY = '87f697100ec6420daa6c7a7e99a85d03';
const BASE_URL = 'https://newsapi.org/v2';

const newsApi = axios.create({
    baseURL: BASE_URL,
    params: {
        apiKey: API_KEY,
    },
});

export const fetchTopHeadlines = async (country = 'global', category = 'general', language = 'en') => {
    try {
        const params = { category, language };
        if (country !== 'global') {
            params.country = country;
        }

        const response = await newsApi.get('/top-headlines', { params });
        return response.data.articles;
    } catch (error) {
        console.error('Error fetching top headlines:', error);
        return [];
    }
};

export const searchNews = async (query, language = 'en') => {
    try {
        const response = await newsApi.get('/everything', {
            params: { q: query, language },
        });
        return response.data.articles;
    } catch (error) {
        console.error('Error searching news:', error);
        return [];
    }
};

export default newsApi;
