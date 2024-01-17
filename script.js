const axios = require('axios');

// Replace 'YOUR_ACCESS_KEY' with your Unsplash API access key
const unsplashAccessKey = 'QJ8cDqu4toxwomn3dKBhwDTvx1rrv8wZAokKnkEP9fA';

// Set up the base URL and headers for the Unsplash API
const unsplashApi = axios.create({
  baseURL: 'https://api.unsplash.com/',
  headers: {
    'Authorization': `Client-ID ${unsplashAccessKey}`
  }
});

// Make a GET request to retrieve a list of photos
unsplashApi.get('/photos')
  .then(response => {
    // Handle the successful response
    console.log('Response:', response.data);
  })
  .catch(error => {
    // Handle errors
    console.error('Error:', error);
  });
