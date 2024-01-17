// Importing styles
import './style.css';

// Importing Axios library for making HTTP requests
import axios from 'axios';

// Replace 'YOUR_ACCESS_KEY' with your Unsplash API access key
const unsplashAccessKey = 'QJ8cDqu4toxwomn3dKBhwDTvx1rrv8wZAokKnkEP9fA';

// Creating an instance of Axios for the Unsplash API
const unsplashApi = axios.create({
  baseURL: 'https://api.unsplash.com/',
  headers: {
    'Authorization': `Client-ID ${unsplashAccessKey}`,
    'Accept-Version': 'v1',
  }
});

// Function to fetch a single image with specific dimensions from Unsplash
export function fetchSingleImage() {
  return unsplashApi.get('/photos/random', {
    params: {
      query: 'gradient',
      width: 4096,
      height: 2160,
    }
  });
}

// Function to render a single image in the specified container
function renderSingleImage(image) {
  // Selecting the container element by class
  const imageContainer = document.querySelector('.backgroundSplash');

  // Clearing existing content in the container
  imageContainer.innerHTML = '';

  // Creating an image element
  const imgElement = document.createElement('img');

  // Setting the source and alt attributes of the image
  imgElement.src = image.urls.regular;
  imgElement.alt = image.alt_description;

  // Appending the image element to the container
  imageContainer.appendChild(imgElement);
}

// Function to save image details to localStorage
function saveImageDetails(image) {
  localStorage.setItem('savedImageDetails', JSON.stringify(image));
}

// Function to load saved image details from localStorage
function loadSavedImage() {
  // Retrieving saved image details from localStorage
  const savedImageDetails = localStorage.getItem('savedImageDetails');
  
  if (savedImageDetails) {
    // Parsing saved image details and rendering the image
    const savedImage = JSON.parse(savedImageDetails);
    renderSingleImage(savedImage);
  } else {
    // Fetching a new image if none saved
    fetchNewImage();
  }
}

// Function to fetch a new image and update localStorage
function fetchNewImage() {
  fetchSingleImage()
    .then(response => {
      const newImage = response.data;
      renderSingleImage(newImage);
      saveImageDetails(newImage);
    })
    .catch(error => {
      console.error('Error fetching image:', error);
    });
}

// Load the saved image or fetch a new one on page load
window.addEventListener('load', loadSavedImage);

// Attach the click event listener to the button with class 'fetchNewImageBtn'
const fetchNewImageButton = document.querySelector('.fetchNewImageBtn');

if (fetchNewImageButton) {
  fetchNewImageButton.addEventListener('click', fetchNewImage);
} else {
  console.error('Button not found.');
}

// Function to save the input value to localStorage
function saveUsername() {
  const usernameInput = document.getElementById('username');
  localStorage.setItem('savedUsername', usernameInput.value);
}

// Function to load the saved username from localStorage
function loadUsername() {
  const usernameInput = document.getElementById('username');
  const savedUsername = localStorage.getItem('savedUsername');

  if (savedUsername) {
    usernameInput.value = savedUsername;
  }
}

// Attach the input event listener to the username input
document.getElementById('username').addEventListener('input', saveUsername);

// Load the saved username when the page loads
window.addEventListener('load', loadUsername);
