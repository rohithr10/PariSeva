import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { Config } from '../constants/config';
import { store } from '../store';
import { logout, selectToken } from '../store/slices/auth.slice';

const apiClient = axios.create({
  baseURL: Config.API_BASE_URL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const state = store.getState();
    const token = selectToken(state);
    const church = state.auth.church;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (church?._id) {
      config.headers['X-Church-ID'] = church._id;
    }
    return config;
  },
  error => Promise.reject(error),
);

apiClient.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      store.dispatch(logout());
    }
    return Promise.reject(error);
  },
);

export default apiClient;
