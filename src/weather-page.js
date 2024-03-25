import { getWeatherInfo } from './api';

const init = function() {
  const body = document.querySelector('body');
  const input = document.getElementById('city-name');
  const searchButton = document.getElementById('search-button');
  const tempUnitButton = document.getElementById('temperature-unit-button');
  const city = document.getElementById('city');
  const temperature = document.getElementById('temperature');
  const feelsLike = document.getElementById('feels-like');
  const windSpeed = document.getElementById('wind');
  const humidity = document.getElementById('humidity');
  const condition = document.getElementById('condition');

  const addEvents = function() {

    searchButton.addEventListener('click', (event) => {
      getWeatherInfo(input.value)
        .then(function(resolve) {
          if (resolve === 'error') {throw new Error}
          displayWeatherInfo(resolve, tempUnitButton.dataset.unit);
          searchButton.setAttribute('data-weather-info', JSON.stringify(resolve));
        })
        .catch(function(error) {
          searchButton.dataset.weatherInfo = '';
          return;
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
    setBackground(data.condition);
  }

  const displayWeatherInfoInCelsius = function(data) {
    city.textContent = `${data.cityName}, ${data.countryName}`;
    temperature.innerHTML = `
      ${data.celsiusTemp}<span class='temperature-unit'>°C</span>
    `;
    feelsLike.innerHTML = `
      Feels like: ${data.celsiusFeelsLike}<span class='temperature-unit'> °C</span>
    `;
    windSpeed.textContent = `Wind: ${data.windSpeedKph} kph`;
    humidity.textContent = `Humidity: ${data.humidity}%`;
    condition.textContent = data.condition;
  }

  const displayWeatherInfoInFahrenheit = function(data) {
    city.textContent = `${data.cityName}, ${data.countryName}`;
    temperature.innerHTML = `
      ${data.fahrenheitTemp}<span class='temperature-unit'>°F</span>
    `;
    feelsLike.innerHTML = `
      Feels like: ${data.fahrenheitFeelsLike}<span class='temperature-unit'> °F</span>
    `;
    windSpeed.textContent = `Wind: ${data.windSpeedMph} mph`;
    humidity.textContent = `Humidity: ${data.humidity}%`;
    condition.textContent = data.condition;
  }

  const setBackground = function(condition) {
    switch (condition) {
      case 'Sunny':
        body.dataset.condition = 'sunny';
        break;
      case 'Clear':
        body.dataset.condition = 'clear';
        break;
      case 'Partly cloudy':
      case 'Cloudy':
      case 'Overcast':
      case 'Fog':
      case 'Mist':
        body.dataset.condition = 'cloudy';
        break;
      case 'Patchy rain possible':
      case 'Patchy light drizzle':
      case 'Light drizzle':
      case 'Freezing drizzle':
      case 'Heavy freezing drizzle':
      case 'Patchy light rain':
      case 'Light rain':
      case 'Moderate rain at all times':
      case 'Moderate rain':
      case 'Heavy rain at times':
      case 'Heavy rain':
      case 'Light freezing rain':
      case 'Moderate or heavy freezing rain':
      case 'Patchy freezing drizzle possible':
      case 'Light rain shower':
      case 'Moderate or heavy rain shower':
      case 'Torrential rain shower':
        body.dataset.condition = 'rain';
        break;
      case 'Patchy snow possible':
      case 'Patchy sleet possible':
      case 'Blowing snow':
      case 'Blizzard':
      case 'Freezing fog':
      case 'Light sleet':
      case 'Moderate or heavy sleet':
      case 'Patchy light snow':
      case 'Light snow':
      case 'Moderate snow':
      case 'Patchy heavy snow':
      case 'Heavy snow':
      case 'Ice pellets':
      case 'Light sleet showers':
      case 'Moderate or heavy sleet showers':
      case 'Light snow showers':
      case 'Moderate or heavy snow showers':
      case 'Light showers of ice pellets':
      case 'Moderate or heavy showers of ice pellets':
        body.dataset.condition = 'snow';
        break;
      case 'Thundery outbreaks possible':
      case 'Patchy light rain with thunder':
      case 'Moderate or heavy rain with thunder':
      case 'Patchy light snow with thunder':
      case 'Moderate or heavy snow with thunder':
        body.dataset.condition = 'thunder';
        break;
    }
  }

  getWeatherInfo('jakarta')
    .then(function(resolve) {
      displayWeatherInfo(resolve, tempUnitButton.dataset.unit);
      searchButton.setAttribute('data-weather-info', JSON.stringify(resolve));
    });
  addEvents();
}

export default init;