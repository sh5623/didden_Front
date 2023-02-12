import axios from 'axios';
import deepTrim from 'deep-trim';
import Config from 'react-native-config';

export const DiddenAxiosInstance = axios.create({
  baseURL: Config.API_URL,
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
