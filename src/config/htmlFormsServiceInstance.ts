import axios from 'axios';

const baseURL =
  import.meta.env['VITE_NODE_ENV'] === 'local'
    ? 'http://localhost:3000'
    : 'https://html-forms-service.fly.dev';

export const axiosHtmlFormsService = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});
