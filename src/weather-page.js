import { getWeatherInfo } from './api';

const init = function() {

  const input = document.getElementById('city-name');
  const searchButton = document.getElementById('search-button');
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
          displayWeatherInfo(resolve);
      });
      input.value = '';
      event.preventDefault();
    })

  }

  const displayWeatherInfo = function(data) {
    cityName.textContent = `${data.cityName}, ${data.countryName}`;
    temperature.textContent = data.celsiusTemp;
    feelsLike.textContent = `Feels like: ${data.celsiusFeelsLike}`;
    windSpeed.textContent = `Wind: ${data.windSpeed} kph`;
    humidity.textContent = `Humidity: ${data.humidity}%`;
    condition.textContent = data.condition;

  }

  addEvents();
}

export default init;