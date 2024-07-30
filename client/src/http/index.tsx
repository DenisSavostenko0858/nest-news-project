import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const url = 'http://localhost:5000';

const $host: AxiosInstance = axios.create({
  baseURL: url
});

const $authHost: AxiosInstance = axios.create({
  baseURL: url
});

const authInterceptor = (config: AxiosRequestConfig): AxiosRequestConfig => {
  if (!config.headers) {
    config.headers = {};
  }
  config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
};

$authHost.interceptors.request.use(authInterceptor as unknown as (value: any) => any);

export {
  $host,
  $authHost
};