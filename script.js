

const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

// Function to fetch weather data from API
async function fetchWeather(city) {
    const APIKey = '601230803fb2c5e5cc25e385ee3ecc2d';
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`);
    if (!response.ok) {
        throw new Error('City not found');
    }
    return await response.json();
}

// Function to update weather UI
function updateWeatherUI(json) {
    const image = document.querySelector('.weather-box img');
    const temperature = document.querySelector('.weather-box .temperature');
    const description = document.querySelector('.weather-box .description');
    const humidity = document.querySelector('.weather-details .humidity span');
    const wind = document.querySelector('.weather-details .wind span');

    switch (json.weather[0].main) {
        case 'Clear':
                    image.src = "../weather_app/imges/clear.png";
                    break;
                case 'Rain':
                    image.src = "../weather_app/imges/rain.png";
                    break;
                case 'Clouds':
                    image.src = "../weather_app/imges/cloud.png";
                    break;
                case 'Snow':
                    image.src = "../weather_app/imges/snowing.jpeg";
                    break;
                case 'Thunderstorm':
                    image.src = "../new/weather_app/imges/thundering.jpeg";
                    break;
                case 'Dark':
                    image.src = "../new/weather_app/imges/rainy.png";
                    break;
                default:
                    image.src = "../weather_app/imges/windy.jpeg";
            }

    temperature.innerHTML = `${Math.round(json.main.temp)}<span>°C</span>`;
    description.innerHTML = `${json.weather[0].description}`;
    humidity.innerHTML = `${json.main.humidity}%`;
    wind.innerHTML = `${Math.round(json.wind.speed)} Km/h`;

    // Fade in weather details
    weatherBox.style.opacity = '0';
    weatherDetails.style.opacity = '0';

    setTimeout(() => {
        weatherBox.style.opacity = '1';
        weatherDetails.style.opacity = '1';
    }, 200); // Adjust timing as needed for smooth transition
}

// Event listener for search button click
search.addEventListener('click', () => {
    const city = document.querySelector('.search-box input').value.trim();

    if (city === '') {
        return;
    }

    fetchWeather(city)
        .then(json => {
            container.style.height = '450px';
            weatherBox.classList.add('active');
            weatherDetails.classList.add('active');
            error404.classList.remove('active');

            updateWeatherUI(json);
        })
        .catch(error => {
            console.error('Error fetching the weather data:', error);
            container.style.height = '400px';
            weatherBox.classList.remove('active');
            weatherDetails.classList.remove('active');
            error404.classList.add('active');
            alert('Failed to fetch weather data');
        });
        setTimeout(() => {
            weatherBox.style.opacity = '2';
            weatherDetails.style.opacity = '2';
        }, 8000);
});
