import axios from 'axios';

// const LOCAL_BACKEND = import.meta.env.REACT_APP_LOCAL_BACKEND;
const LOCAL_BACKEND = process.env.REACT_APP_LOCAL_BACKEND;

const api = axios.create({
    // baseURL: `${REACT_APP_PROD_BACKEND}/api`,
    baseURL: LOCAL_BACKEND,
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
