import axios from 'axios';

const api = axios.create({
    baseURL: 'https://desolate-tundra-57759.herokuapp.com'
});

export default api;