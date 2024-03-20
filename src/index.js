import { getWeatherInfo } from './api';

getWeatherInfo('kyoto')
  .then(function(resolve) {
    console.log(resolve);
  });
