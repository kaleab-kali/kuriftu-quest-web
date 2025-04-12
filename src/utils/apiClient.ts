import axios from 'axios';

export const supabaseClient = axios.create({
  baseURL: import.meta.env.VITE_SUPABASE_URL + '/rest/v1',
  headers: {
    apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
    'Content-Type': 'application/json'
  }
});

// response interceptor for error handling
supabaseClient.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);
