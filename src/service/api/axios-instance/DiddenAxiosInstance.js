import axios from 'axios';
import deepTrim from 'deep-trim';
import {API_URL} from '@env';

export const DiddenAxiosInstance = axios.create({
  baseURL: `${API_URL}`,
  timeout: 1000 * 10,
});

DiddenAxiosInstance.interceptors.request.use(
  config => {
    if (config.params) {
      config.params = deepTrim(config.params);
    }

    if (config.data && !config.data) {
      config.data = deepTrim(config.data);
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);
