const fetchWeatherData = async function(cityName) {
  const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=62f2a391579843b4944155109241903&q=${cityName}`);
  const data = await response.json();
  return data;
};

const processWeatherData = function(data) {
  const cityName = data.location.name;
  const countryName = data.location.country;
  const celsiusTemp = Math.round(data.current.temp_c);
  const fahrenheitTemp = Math.round(data.current.temp_f);
  const celsiusFeelsLike = Math.round(data.current.feelslike_c);
  const fahrenheitFeelsLike = Math.round(data.current.feelslike_f);
  const windSpeedKph = data.current.wind_kph;
  const windSpeedMph = data.current.wind_mph;
  const humidity = data.current.humidity;
  const condition = data.current.condition.text;

  return { cityName, countryName, celsiusTemp, fahrenheitTemp, celsiusFeelsLike, fahrenheitFeelsLike, windSpeedKph, windSpeedMph, humidity, condition };
};

const getWeatherInfo = async function(cityName) {
  const city = document.getElementById('city');
  const temperature = document.getElementById('temperature');
  const feelsLike = document.getElementById('feels-like');
  const windSpeed = document.getElementById('wind');
  const humidity = document.getElementById('humidity');
  const condition = document.getElementById('condition');

  city.textContent = '';
  temperature.textContent = '';
  feelsLike.textContent = '';
  windSpeed.textContent = '';
  humidity.textContent = '';
  condition.textContent = 'Loading...';
  const data = await fetchWeatherData(cityName);
  const weatherInfo = processWeatherData(data);
  return weatherInfo;
}

export { getWeatherInfo };