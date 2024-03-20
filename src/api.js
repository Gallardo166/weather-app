const fetchWeatherData = async function(cityName) {
  const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=62f2a391579843b4944155109241903&q=${cityName}`);
  const data = await response.json();
  return data;
};

const processWeatherData = function(data) {
  const cityName = data.location.name;
  const countryName = data.location.country;
  const celsiusTemp = data.current.temp_c;
  const fahrenheitTemp = data.current.temp_f;
  const celsiusFeelsLike = data.current.feelslike_c;
  const fahrenheitFeelsLike = data.current.feelslike_f;
  const windSpeed = data.current.wind_kph;
  const humidity = data.current.humidity;
  const condition = data.current.condition.text;

  return { cityName, countryName, celsiusTemp, fahrenheitTemp, celsiusFeelsLike, fahrenheitFeelsLike, windSpeed, humidity, condition };
};

const getWeatherInfo = async function(cityName) {
  const data = await fetchWeatherData(cityName);
  const weatherInfo = processWeatherData(data);
  return weatherInfo;
}

export { getWeatherInfo };