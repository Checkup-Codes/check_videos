import axios from 'axios';
window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.withCredentials = true;

// CSRF token ekle
const token = document.head.querySelector('meta[name="csrf-token"]');
if (token) {
  window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.getAttribute('content');
}

// Add a response interceptor to handle 419 errors globally
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    // If we get a 419 CSRF token mismatch error
    if (error.response && error.response.status === 419) {
      // Get a fresh CSRF token and retry the request
      return axios.get('/sanctum/csrf-cookie').then(() => {
        // Update the token in the headers
        const newToken = document.head.querySelector('meta[name="csrf-token"]');
        if (newToken) {
          window.axios.defaults.headers.common['X-CSRF-TOKEN'] = newToken.getAttribute('content');
        }

        // Create a new request with the same config
        const config = error.config;
        return axios(config);
      });
    }

    // For other errors, just reject the promise
    return Promise.reject(error);
  }
);
