import { getWeatherInfo } from './api';

const init = function() {

  const input = document.getElementById('city-name');
  const searchButton = document.getElementById('search-button');
  const tempUnitButton = document.getElementById('temperature-unit-button');
  const cityName = document.getElementById('city');
  const temperature = document.getElementById('temperature');
  const feelsLike = document.getElementById('feels-like');
  const windSpeed = document.getElementById('wind');
  const humidity = document.getElementById('humidity');
  const condition = document.getElementById('condition');

  const addEvents = function() {

    searchButton.addEventListener('click', (event) => {
      getWeatherInfo(input.value)
        .then(function(resolve) {
          displayWeatherInfo(resolve, tempUnitButton.dataset.unit);
          searchButton.setAttribute('data-weather-info', JSON.stringify(resolve));
      });
      input.value = '';
      event.preventDefault();
    })

    tempUnitButton.addEventListener('click', (event) => {
      if (tempUnitButton.getAttribute('data-unit') === 'celsius') {
        tempUnitButton.setAttribute('data-unit', 'fahrenheit');
        tempUnitButton.textContent = '°F';
      } else {
        tempUnitButton.setAttribute('data-unit', 'celsius');
        tempUnitButton.textContent = '°C';
      }
      if (searchButton.dataset.weatherInfo !== '') {displayWeatherInfo(JSON.parse(searchButton.dataset.weatherInfo), tempUnitButton.dataset.unit)};
      event.preventDefault();
    })
  }

  const displayWeatherInfo = function(data, unit) {
    if (unit === 'celsius') {
      displayWeatherInfoInCelsius(data);
    } else {
      displayWeatherInfoInFahrenheit(data);
    };
  }

  const displayWeatherInfoInCelsius = function(data) {
    cityName.textContent = `${data.cityName}, ${data.countryName}`;
    temperature.textContent = data.celsiusTemp;
    feelsLike.textContent = `Feels like: ${data.celsiusFeelsLike}`;
    windSpeed.textContent = `Wind: ${data.windSpeed} kph`;
    humidity.textContent = `Humidity: ${data.humidity}%`;
    condition.textContent = data.condition;

  }

  const displayWeatherInfoInFahrenheit = function(data) {
    cityName.textContent = `${data.cityName}, ${data.countryName}`;
    temperature.textContent = data.fahrenheitTemp;
    feelsLike.textContent = `Feels like: ${data.fahrenheitFeelsLike}`;
    windSpeed.textContent = `Wind: ${data.windSpeed} kph`;
    humidity.textContent = `Humidity: ${data.humidity}%`;
    condition.textContent = data.condition;
  }

  addEvents();
}

export default init;