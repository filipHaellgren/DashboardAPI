// Importing styles
import './style.css';

// Importing Axios library for making HTTP requests
import axios from 'axios';

// Replace 'YOUR_ACCESS_KEY' with your Unsplash API access key
const unsplashAccessKey = '';

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
  })
  .catch(error => {
    // Check if the error status code indicates rate limit exceeded
    if (error.response && error.response.status === 429) {
      console.error('Unsplash API rate limit exceeded. Please try again later.');
    } else {
      console.error('Error fetching image:', error);
    }

    // Rethrow the error to propagate it further
    throw error;
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


document.addEventListener("DOMContentLoaded", () => {
  setInterval(() => {
    let currentDate = new Date();

    // Format date parts using toLocaleString
    let day = currentDate.toLocaleString('sv-SE', { day: 'numeric' });
    let hrs = currentDate.toLocaleString('sv-SE', { hour: '2-digit' });

    // Alternative method to format minutes with leading zeros
    let min = currentDate.getMinutes().toString().padStart(2, '0');

    let month = currentDate.toLocaleString('sv-SE', { month: 'long' });
    let year = currentDate.toLocaleString('sv-SE', { year: 'numeric' });

    // Concatenate hours and minutes with a colon
    let time = `${hrs}:${min}`;

    // Get the HTML elements where you want to display the formatted date parts
    let dayElement = document.getElementById('day');
    let hrsElement = document.getElementById('hrs');
    let minElement = document.getElementById('min');
    let monthElement = document.getElementById('month');
    let yearElement = document.getElementById('year');

    // Update the content of the HTML elements with the date parts
    dayElement.textContent = day;
    hrsElement.textContent = time;
    minElement.textContent = ''; // Clear the content, as it's already included in the time variable
    monthElement.textContent = month;
    yearElement.textContent = year;

  }, 1000);
});

let textarea = document.getElementById('notes');

// Load the saved content from local storage on page load
textarea.value = localStorage.getItem('savedNotes') || '';

// Add an event listener to the textarea for input changes
textarea.addEventListener('input', function() {
  // Save the current content to local storage
  localStorage.setItem('savedNotes', textarea.value);
});
document.addEventListener('DOMContentLoaded', () => {
  // Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key
  const apiKey = '';
  const city = 'Stockholm'; // Replace with the city you want to get weather information for
  const language = 'sv'; // Replace with the desired language code

  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&lang=${language}`;

  fetch(apiUrl)
    .then(response => {
      // Check if the response status code indicates rate limit exceeded
      if (response.status === 429) {
        console.error('OpenWeatherMap API rate limit exceeded. Please try again later.');
      }

      // Continue processing the response
      return response.json();
    })
    .then(data => {
      console.log('Received data:', data); // Log the entire data object to the console

      const weatherDataDiv = document.getElementById('weatherData');

      // Check if the data contains the expected property
      if (data && Array.isArray(data.list)) {
        // Group forecast data by day
        const groupedForecast = groupByDay(data.list);

    
        groupedForecast.forEach(dayForecast => {
          const averageTemperature = calculateAverageTemperature(dayForecast);
          const date = new Date(dayForecast[0].dt * 1000);

          weatherDataDiv.innerHTML += `
            <div class="weathercontainer">
              <p class="weatherdate"> ${date.toLocaleDateString()}</p>
              <p class="weathertemperature"> ${averageTemperature} °C</p>
              <p class="weatherweather"> ${dayForecast[0].weather[0].description}</p>
            </div>
          `;
        });
      } else {
        console.error('Invalid data structure received from the API.');
      }
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
    });
});

// Helper function to group forecast data by day
function groupByDay(forecastData) {
  const groupedForecast = {};
  forecastData.forEach(forecast => {
    const date = new Date(forecast.dt * 1000);
    const dayKey = date.toLocaleDateString();
    if (!groupedForecast[dayKey]) {
      groupedForecast[dayKey] = [];
    }
    groupedForecast[dayKey].push(forecast);
  });
  return Object.values(groupedForecast);
}

// Helper function to calculate average temperature for a day in Celsius
function calculateAverageTemperature(dayForecast) {
  const totalTemperature = dayForecast.reduce((sum, forecast) => sum + forecast.main.temp, 0);
  const averageTemperatureKelvin = totalTemperature / dayForecast.length;
  const averageTemperatureCelsius = (averageTemperatureKelvin - 273.15).toFixed(2);
  return averageTemperatureCelsius;
}


document.addEventListener("DOMContentLoaded", () => {
  const quoteContainer = document.getElementById('quoteContainer');

  // Function to fetch a random quote from the Quotable API
  function fetchRandomQuote() {
    const apiUrl = 'https://api.quotable.io/random';

    fetch(apiUrl)
      .then(response => {
        // Check if the response status code indicates rate limit exceeded
        if (response.status === 429) {
          console.error('Quotable API rate limit exceeded. Please try again later.');
        }

        // Continue processing the response
        return response.json();
      })
      .then(data => {
        // Display the quote in the HTML
        quoteContainer.innerHTML = `
          <blockquote>
            <p>${data.content}</p>
            <footer>-${data.author}</footer>
          </blockquote>
        `;
      })
      .catch(error => {
        console.error('Error fetching quote:', error);
        quoteContainer.innerHTML = 'Failed to fetch a quote.';
      });
  }

  // Fetch a random quote when the page loads
  fetchRandomQuote();

  // Optionally, you can fetch a new quote on button click or any other event
  // const fetchButton = document.getElementById('fetchButton');
  // fetchButton.addEventListener('click', fetchRandomQuote);
});
let currentInput = 'link';
  const localStorageKey = 'savedLinks';

  // Load saved links from localStorage
  const savedLinks = JSON.parse(localStorage.getItem(localStorageKey)) || [];

  function saveLinksToLocalStorage(links) {
    localStorage.setItem(localStorageKey, JSON.stringify(links));
  }

  function displaySavedLinks() {
    const containers = document.getElementById('containers');
    containers.innerHTML = '';

    savedLinks.forEach(linkData => {
      const container = document.createElement('div');
      container.classList.add('link-container');

      const linkParagraph = document.createElement('p');
      const linkAnchor = document.createElement('a');
      linkAnchor.href = '#'; // Replace '#' with the actual link value
      linkAnchor.textContent = linkData.name;
      linkAnchor.target = '_blank';
      linkParagraph.appendChild(linkAnchor);

      const removeButton = document.createElement('span');
      removeButton.innerHTML = '<img src="xbutton.png" alt="Remove">';
      removeButton.classList.add('remove-button');
      removeButton.onclick = function() {
        // Remove the link and update localStorage
        savedLinks.splice(savedLinks.indexOf(linkData), 1);
        saveLinksToLocalStorage(savedLinks);
        displaySavedLinks(); // Refresh the display
      };

      container.appendChild(linkParagraph);
      container.appendChild(removeButton);

      containers.appendChild(container);
    });
  }

  displaySavedLinks(); // Display initially saved links

  // Define the addLink function
  function addLink() {
    const combinedInput = document.getElementById('combinedInput');
    const inputText = combinedInput.value.trim();

    if (inputText) {
      if (currentInput === 'link') {
        currentInput = 'name';
        combinedInput.placeholder = 'Enter name';
        combinedInput.value = '';
        combinedInput.focus();
      } else {
        currentInput = 'link';
        combinedInput.placeholder = 'Enter link or name';
        combinedInput.value = '';

        // Save the link data
        const linkData = { name: inputText };
        savedLinks.push(linkData);
        saveLinksToLocalStorage(savedLinks);

        // Display the saved links
        displaySavedLinks();
      }
    } else {
      alert('Please enter a value.');
    }
  }

  // Attach event listener when the DOM is fully loaded
  document.addEventListener("DOMContentLoaded", () => {
    const combinedInput = document.getElementById('combinedInput');

    // Handle pressing Enter in the combined input
    combinedInput.addEventListener('keyup', function(event) {
      if (event.key === 'Enter') {
        addLink();
      }
    });
  });
