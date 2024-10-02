import axios from 'axios';

const MONGO_URL = process.env.REACT_APP_MONGO_URL;
const LOCAL_BACKEND = process.env.REACT_APP_LOCAL_BACKEND;
const BACK_PROXY = process.env.BACKEND_PROXY;

const api = axios.create({
    // baseURL: `${REACT_APP_PROD_BACKEND}/api`,
    // baseURL: LOCAL_BACKEND,
    // baseURL: MONGO_URL,
    baseURL: `${BACK_PROXY}/api`,
    headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`,
    },
});

api.interceptors.request.use(
    (request) => {
        console.log('Starting Request', request);
        request.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
        return request;
    },
    function (error) {
        console.log('REQUEST ERROR', error);
    },
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    function (error) {
        error = error.response.data;
        console.log('RESPONSE ERROR', error);
        return Promise.reject(error);
    },
);

export default api;
