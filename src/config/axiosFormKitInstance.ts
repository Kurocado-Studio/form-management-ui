import axios from 'axios';

const baseURL =
  // @ts-expect-error while we fix typings
  import.meta.env['VITE_NODE_ENV'] === 'local'
    ? 'http://localhost:3001'
    : 'https://html-forms-service-staging.fly.dev';

export const axiosFormKitInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10_000,
});
