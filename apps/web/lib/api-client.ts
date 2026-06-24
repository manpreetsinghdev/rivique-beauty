import axios, { type AxiosInstance } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api/v1";

export function createApiClient(getToken?: () => string | null): AxiosInstance {
  const client = axios.create({ baseURL: BASE_URL, withCredentials: true });

  client.interceptors.request.use((config) => {
    const token = getToken?.();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  return client;
}

export const apiClient = createApiClient();
