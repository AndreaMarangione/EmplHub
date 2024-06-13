import axios from 'axios';

class AxiosApi {
    constructor() {
        const baseUrl = `${process.env.REACT_APP_SERVER_URL}`;
        this.axiosInstance = axios.create({
            baseURL: baseUrl,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        this.axiosInstance.interceptors.request.use((config) => {
            const token = JSON.parse(localStorage.getItem('token'));
            if (token) {
                config.headers.Authorization = token;
            }
            return config;
        }, (error) => {
            return Promise.reject(error);
        })
    }
    async get(url, config = {}) {
        const response = await this.axiosInstance.get(url, {
            ...config,
            headers: {
                ...this.axiosInstance.defaults.headers,
                ...config.headers
            }
        });
        return response;
    }
    async post(url, body, config = {}) {
        const response = await this.axiosInstance.post(url, body, {
            ...config,
            headers: {
                ...this.axiosInstance.defaults.headers,
                ...config.headers
            }
        });
        return response;
    }
    async put(url, body, config = {}) {
        const response = await this.axiosInstance.put(url, body, {
            ...config,
            headers: {
                ...this.axiosInstance.defaults.headers,
                ...config.headers
            }
        });
        return response;
    }
    async patch(url, body, config = {}) {
        const response = await this.axiosInstance.patch(url, body, {
            ...config,
            headers: {
                ...this.axiosInstance.defaults.headers,
                ...config.headers
            }
        });
        return response;
    }
    async delete(url, config = {}) {
        const response = await this.axiosInstance.delete(url, {
            ...config,
            headers: {
                ...this.axiosInstance.defaults.headers,
                ...config.headers
            }
        });
        return response;
    }
}

export default AxiosApi;
