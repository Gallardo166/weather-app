"use strict";
(self["webpackChunkweather_app"] = self["webpackChunkweather_app"] || []).push([["main"],{

/***/ "./src/api.js":
/*!********************!*\
  !*** ./src/api.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getWeatherInfo: () => (/* binding */ getWeatherInfo)
/* harmony export */ });
const fetchWeatherData = async function (cityName) {
  try {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=62f2a391579843b4944155109241903&q=${cityName}`);
    if (response.status === 400) {
      throw new Error('No matching location found.');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return 'error';
  }
};
const processWeatherData = function (data) {
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
  return {
    cityName,
    countryName,
    celsiusTemp,
    fahrenheitTemp,
    celsiusFeelsLike,
    fahrenheitFeelsLike,
    windSpeedKph,
    windSpeedMph,
    humidity,
    condition
  };
};
const getWeatherInfo = async function (cityName) {
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
  try {
    const data = await fetchWeatherData(cityName);
    const weatherInfo = processWeatherData(data);
    return weatherInfo;
  } catch (error) {
    condition.textContent = 'No matching location found.';
    return 'error';
  }
};


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _weather_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./weather-page */ "./src/weather-page.js");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.css */ "./src/style.css");


(0,_weather_page__WEBPACK_IMPORTED_MODULE_0__["default"])();

/***/ }),

/***/ "./src/weather-page.js":
/*!*****************************!*\
  !*** ./src/weather-page.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api */ "./src/api.js");

const init = function () {
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
  const addEvents = function () {
    searchButton.addEventListener('click', event => {
      (0,_api__WEBPACK_IMPORTED_MODULE_0__.getWeatherInfo)(input.value).then(function (resolve) {
        if (resolve === 'error') {
          throw new Error();
        }
        displayWeatherInfo(resolve, tempUnitButton.dataset.unit);
        searchButton.setAttribute('data-weather-info', JSON.stringify(resolve));
      }).catch(function (error) {
        searchButton.dataset.weatherInfo = '';
        return;
      });
      input.value = '';
      event.preventDefault();
    });
    tempUnitButton.addEventListener('click', event => {
      if (tempUnitButton.getAttribute('data-unit') === 'celsius') {
        tempUnitButton.setAttribute('data-unit', 'fahrenheit');
        tempUnitButton.textContent = '°F';
      } else {
        tempUnitButton.setAttribute('data-unit', 'celsius');
        tempUnitButton.textContent = '°C';
      }
      if (searchButton.dataset.weatherInfo !== '') {
        displayWeatherInfo(JSON.parse(searchButton.dataset.weatherInfo), tempUnitButton.dataset.unit);
      }
      ;
      event.preventDefault();
    });
  };
  const displayWeatherInfo = function (data, unit) {
    if (unit === 'celsius') {
      displayWeatherInfoInCelsius(data);
    } else {
      displayWeatherInfoInFahrenheit(data);
    }
    ;
    setBackground(data.condition);
  };
  const displayWeatherInfoInCelsius = function (data) {
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
  };
  const displayWeatherInfoInFahrenheit = function (data) {
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
  };
  const setBackground = function (condition) {
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
  };
  (0,_api__WEBPACK_IMPORTED_MODULE_0__.getWeatherInfo)('jakarta').then(function (resolve) {
    displayWeatherInfo(resolve, tempUnitButton.dataset.unit);
    searchButton.setAttribute('data-weather-info', JSON.stringify(resolve));
  });
  addEvents();
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (init);

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ./fonts/Poppins-Bold.ttf */ "./src/fonts/Poppins-Bold.ttf"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(/*! ./fonts/Poppins-Medium.ttf */ "./src/fonts/Poppins-Medium.ttf"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_2___ = new URL(/* asset import */ __webpack_require__(/*! ./fonts/Poppins-Regular.ttf */ "./src/fonts/Poppins-Regular.ttf"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_3___ = new URL(/* asset import */ __webpack_require__(/*! ./fonts/Poppins-Light.ttf */ "./src/fonts/Poppins-Light.ttf"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_4___ = new URL(/* asset import */ __webpack_require__(/*! ./images/sunny.jpg */ "./src/images/sunny.jpg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_5___ = new URL(/* asset import */ __webpack_require__(/*! ./images/clear.jpg */ "./src/images/clear.jpg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_6___ = new URL(/* asset import */ __webpack_require__(/*! ./images/cloudy.jpg */ "./src/images/cloudy.jpg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_7___ = new URL(/* asset import */ __webpack_require__(/*! ./images/rain.jpg */ "./src/images/rain.jpg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_8___ = new URL(/* asset import */ __webpack_require__(/*! ./images/snow.jpg */ "./src/images/snow.jpg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_9___ = new URL(/* asset import */ __webpack_require__(/*! ./images/thunder.jpg */ "./src/images/thunder.jpg"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_1___);
var ___CSS_LOADER_URL_REPLACEMENT_2___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_2___);
var ___CSS_LOADER_URL_REPLACEMENT_3___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_3___);
var ___CSS_LOADER_URL_REPLACEMENT_4___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_4___);
var ___CSS_LOADER_URL_REPLACEMENT_5___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_5___);
var ___CSS_LOADER_URL_REPLACEMENT_6___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_6___);
var ___CSS_LOADER_URL_REPLACEMENT_7___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_7___);
var ___CSS_LOADER_URL_REPLACEMENT_8___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_8___);
var ___CSS_LOADER_URL_REPLACEMENT_9___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_9___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `@font-face {
  font-family: poppins-bold;
  src: url(${___CSS_LOADER_URL_REPLACEMENT_0___});
}

@font-face {
  font-family: poppins-medium;
  src: url(${___CSS_LOADER_URL_REPLACEMENT_1___});
}

@font-face {
  font-family: poppins-regular;
  src: url(${___CSS_LOADER_URL_REPLACEMENT_2___});
}

@font-face {
  font-family: poppins-light;
  src: url(${___CSS_LOADER_URL_REPLACEMENT_3___});
}

body {
  width: 100vw;
  height: 100vh;
  padding: 0;
  margin: 0;
  position: fixed;
  overflow: hidden;

  display: flex;
  flex-direction: column;

  font-family: poppins-light;
  background-size: 1500px 100vh;
  background-attachment: fixed;
}

body[data-condition='sunny'] {
  background-image: url(${___CSS_LOADER_URL_REPLACEMENT_4___});
}

body[data-condition='clear'] {
  background-image: url(${___CSS_LOADER_URL_REPLACEMENT_5___});
}

body[data-condition='cloudy'] {
  background-image: url(${___CSS_LOADER_URL_REPLACEMENT_6___});
}

body[data-condition='rain'] {
  background-image: url(${___CSS_LOADER_URL_REPLACEMENT_7___});
  background-size: 1500px 180vh;
}

body[data-condition='snow'] {
  background-image: url(${___CSS_LOADER_URL_REPLACEMENT_8___});
}

body[data-condition='thunder'] {
  background-image: url(${___CSS_LOADER_URL_REPLACEMENT_9___});
}

form {
  align-self: flex-end;
  padding: 20px;

  input {
    width: 200px;
    border: 1px solid white;
    border-radius: 5px;
    background-color: rgba(0 0 0 / 0.4);
    color: white;
  }

  input, button {
    box-sizing: border-box;
    height: 32px;
    font-family: poppins-regular;
  }
}

button {
  padding: 5px;
  appearance: none;
  outline: none;
  border: none;
  border-radius: 4px;
  background-color: rgba(0 0 0 / 0.4);
  color: white;
}

button:hover {
  cursor: pointer;
}

#temperature-unit-button {
  flex-grow: 0;
  align-self: flex-end;
  margin-top: -8px;
  margin-right: 20px;
  width: 36px;
  height: 32px;
  font-size: 1.2rem;
  font-family: poppins-medium;
  display: flex;
  justify-content: center;
}

#info-container {
  width: 370px;
  margin-top: 64px;
  align-self: center;
  padding: 20px 0 20px 24px;
  border-radius: 15px;
  display: grid;
  grid-template: 24px 96px repeat(3, 36px) / 96px 240px;
  column-gap: 28px;
  align-items: center;
  font-size: 1.1rem;
  background-color: rgba(0 0 0 / 0.7);
  color: white;

  #city {
    grid-area: 2 / 1 / span 1 / span 2;
    font-size: 1.6rem;
    font-family: poppins-medium;
    padding-bottom: 14px;
  }

  #temperature {
    grid-area: 3 / 1 / span 3 / span 1;
    font-size: 4rem;
    font-family: poppins-bold;

    .temperature-unit {
      font-size: 1.2rem;
      vertical-align: text-top;
    }
  }

  #condition {
    grid-area: 1 / 1 / span 1 / span 2;
    font-size: 1.4rem;
    font-family: poppins-regular;
  }
}`, "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;EACE,yBAAyB;EACzB,4CAAkC;AACpC;;AAEA;EACE,2BAA2B;EAC3B,4CAAoC;AACtC;;AAEA;EACE,4BAA4B;EAC5B,4CAAqC;AACvC;;AAEA;EACE,0BAA0B;EAC1B,4CAAmC;AACrC;;AAEA;EACE,YAAY;EACZ,aAAa;EACb,UAAU;EACV,SAAS;EACT,eAAe;EACf,gBAAgB;;EAEhB,aAAa;EACb,sBAAsB;;EAEtB,0BAA0B;EAC1B,6BAA6B;EAC7B,4BAA4B;AAC9B;;AAEA;EACE,yDAAyC;AAC3C;;AAEA;EACE,yDAAyC;AAC3C;;AAEA;EACE,yDAA0C;AAC5C;;AAEA;EACE,yDAAwC;EACxC,6BAA6B;AAC/B;;AAEA;EACE,yDAAwC;AAC1C;;AAEA;EACE,yDAA2C;AAC7C;;AAEA;EACE,oBAAoB;EACpB,aAAa;;EAEb;IACE,YAAY;IACZ,uBAAuB;IACvB,kBAAkB;IAClB,mCAAmC;IACnC,YAAY;EACd;;EAEA;IACE,sBAAsB;IACtB,YAAY;IACZ,4BAA4B;EAC9B;AACF;;AAEA;EACE,YAAY;EACZ,gBAAgB;EAChB,aAAa;EACb,YAAY;EACZ,kBAAkB;EAClB,mCAAmC;EACnC,YAAY;AACd;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,YAAY;EACZ,oBAAoB;EACpB,gBAAgB;EAChB,kBAAkB;EAClB,WAAW;EACX,YAAY;EACZ,iBAAiB;EACjB,2BAA2B;EAC3B,aAAa;EACb,uBAAuB;AACzB;;AAEA;EACE,YAAY;EACZ,gBAAgB;EAChB,kBAAkB;EAClB,yBAAyB;EACzB,mBAAmB;EACnB,aAAa;EACb,qDAAqD;EACrD,gBAAgB;EAChB,mBAAmB;EACnB,iBAAiB;EACjB,mCAAmC;EACnC,YAAY;;EAEZ;IACE,kCAAkC;IAClC,iBAAiB;IACjB,2BAA2B;IAC3B,oBAAoB;EACtB;;EAEA;IACE,kCAAkC;IAClC,eAAe;IACf,yBAAyB;;IAEzB;MACE,iBAAiB;MACjB,wBAAwB;IAC1B;EACF;;EAEA;IACE,kCAAkC;IAClC,iBAAiB;IACjB,4BAA4B;EAC9B;AACF","sourcesContent":["@font-face {\n  font-family: poppins-bold;\n  src: url(./fonts/Poppins-Bold.ttf);\n}\n\n@font-face {\n  font-family: poppins-medium;\n  src: url(./fonts/Poppins-Medium.ttf);\n}\n\n@font-face {\n  font-family: poppins-regular;\n  src: url(./fonts/Poppins-Regular.ttf);\n}\n\n@font-face {\n  font-family: poppins-light;\n  src: url(./fonts/Poppins-Light.ttf);\n}\n\nbody {\n  width: 100vw;\n  height: 100vh;\n  padding: 0;\n  margin: 0;\n  position: fixed;\n  overflow: hidden;\n\n  display: flex;\n  flex-direction: column;\n\n  font-family: poppins-light;\n  background-size: 1500px 100vh;\n  background-attachment: fixed;\n}\n\nbody[data-condition='sunny'] {\n  background-image: url(./images/sunny.jpg);\n}\n\nbody[data-condition='clear'] {\n  background-image: url(./images/clear.jpg);\n}\n\nbody[data-condition='cloudy'] {\n  background-image: url(./images/cloudy.jpg);\n}\n\nbody[data-condition='rain'] {\n  background-image: url(./images/rain.jpg);\n  background-size: 1500px 180vh;\n}\n\nbody[data-condition='snow'] {\n  background-image: url(./images/snow.jpg);\n}\n\nbody[data-condition='thunder'] {\n  background-image: url(./images/thunder.jpg);\n}\n\nform {\n  align-self: flex-end;\n  padding: 20px;\n\n  input {\n    width: 200px;\n    border: 1px solid white;\n    border-radius: 5px;\n    background-color: rgba(0 0 0 / 0.4);\n    color: white;\n  }\n\n  input, button {\n    box-sizing: border-box;\n    height: 32px;\n    font-family: poppins-regular;\n  }\n}\n\nbutton {\n  padding: 5px;\n  appearance: none;\n  outline: none;\n  border: none;\n  border-radius: 4px;\n  background-color: rgba(0 0 0 / 0.4);\n  color: white;\n}\n\nbutton:hover {\n  cursor: pointer;\n}\n\n#temperature-unit-button {\n  flex-grow: 0;\n  align-self: flex-end;\n  margin-top: -8px;\n  margin-right: 20px;\n  width: 36px;\n  height: 32px;\n  font-size: 1.2rem;\n  font-family: poppins-medium;\n  display: flex;\n  justify-content: center;\n}\n\n#info-container {\n  width: 370px;\n  margin-top: 64px;\n  align-self: center;\n  padding: 20px 0 20px 24px;\n  border-radius: 15px;\n  display: grid;\n  grid-template: 24px 96px repeat(3, 36px) / 96px 240px;\n  column-gap: 28px;\n  align-items: center;\n  font-size: 1.1rem;\n  background-color: rgba(0 0 0 / 0.7);\n  color: white;\n\n  #city {\n    grid-area: 2 / 1 / span 1 / span 2;\n    font-size: 1.6rem;\n    font-family: poppins-medium;\n    padding-bottom: 14px;\n  }\n\n  #temperature {\n    grid-area: 3 / 1 / span 3 / span 1;\n    font-size: 4rem;\n    font-family: poppins-bold;\n\n    .temperature-unit {\n      font-size: 1.2rem;\n      vertical-align: text-top;\n    }\n  }\n\n  #condition {\n    grid-area: 1 / 1 / span 1 / span 2;\n    font-size: 1.4rem;\n    font-family: poppins-regular;\n  }\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    options = {};
  }
  if (!url) {
    return url;
  }
  url = String(url.__esModule ? url.default : url);

  // If url is already wrapped in quotes, remove them
  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }
  if (options.hash) {
    url += options.hash;
  }

  // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls
  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }
  return url;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ "./src/fonts/Poppins-Bold.ttf":
/*!************************************!*\
  !*** ./src/fonts/Poppins-Bold.ttf ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "cdb29a5d7ccf57ff05a3.ttf";

/***/ }),

/***/ "./src/fonts/Poppins-Light.ttf":
/*!*************************************!*\
  !*** ./src/fonts/Poppins-Light.ttf ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "7641a0f76ca9ef6c252c.ttf";

/***/ }),

/***/ "./src/fonts/Poppins-Medium.ttf":
/*!**************************************!*\
  !*** ./src/fonts/Poppins-Medium.ttf ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "673ed42382ab264e0bf5.ttf";

/***/ }),

/***/ "./src/fonts/Poppins-Regular.ttf":
/*!***************************************!*\
  !*** ./src/fonts/Poppins-Regular.ttf ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "35d26b781dc5fda684cc.ttf";

/***/ }),

/***/ "./src/images/clear.jpg":
/*!******************************!*\
  !*** ./src/images/clear.jpg ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "ea4588f1f4984b8c4f36.jpg";

/***/ }),

/***/ "./src/images/cloudy.jpg":
/*!*******************************!*\
  !*** ./src/images/cloudy.jpg ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "71619814e9e5a25cac1c.jpg";

/***/ }),

/***/ "./src/images/rain.jpg":
/*!*****************************!*\
  !*** ./src/images/rain.jpg ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "264db959d9d15c444ff8.jpg";

/***/ }),

/***/ "./src/images/snow.jpg":
/*!*****************************!*\
  !*** ./src/images/snow.jpg ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "959c438bd986eadff779.jpg";

/***/ }),

/***/ "./src/images/sunny.jpg":
/*!******************************!*\
  !*** ./src/images/sunny.jpg ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "84eb468b72eaf0c29efd.jpg";

/***/ }),

/***/ "./src/images/thunder.jpg":
/*!********************************!*\
  !*** ./src/images/thunder.jpg ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "04998bbeab5815dca6ae.jpg";

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLE9BQU8sZ0ZBQWdGLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxVQUFVLFVBQVUsVUFBVSxVQUFVLGFBQWEsV0FBVyxhQUFhLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksWUFBWSxLQUFLLFVBQVUsWUFBWSxhQUFhLGFBQWEsV0FBVyxNQUFNLEtBQUssWUFBWSxXQUFXLFlBQVksTUFBTSxNQUFNLEtBQUssVUFBVSxZQUFZLFdBQVcsVUFBVSxZQUFZLGFBQWEsV0FBVyxNQUFNLEtBQUssVUFBVSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsYUFBYSxXQUFXLFVBQVUsWUFBWSxhQUFhLFdBQVcsWUFBWSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLFdBQVcsWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLFlBQVksS0FBSyxZQUFZ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O0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDakNhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNUYTs7QUFFYjtBQUNBO0FBQ0EsY0FBYyxLQUF3QyxHQUFHLHNCQUFpQixHQUFHLENBQUk7QUFDakY7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ1RhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0RBQWtEO0FBQ2xEO0FBQ0E7QUFDQSwwQ0FBMEM7QUFDMUM7QUFDQTtBQUNBO0FBQ0EsaUZBQWlGO0FBQ2pGO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EseURBQXlEO0FBQ3pEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDNURhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvYXBpLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3dlYXRoZXItcGFnZS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3N0eWxlLmNzcz83MTYzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZmV0Y2hXZWF0aGVyRGF0YSA9IGFzeW5jIGZ1bmN0aW9uKGNpdHlOYW1lKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYGh0dHBzOi8vYXBpLndlYXRoZXJhcGkuY29tL3YxL2N1cnJlbnQuanNvbj9rZXk9NjJmMmEzOTE1Nzk4NDNiNDk0NDE1NTEwOTI0MTkwMyZxPSR7Y2l0eU5hbWV9YCk7XG4gICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSA0MDApIHt0aHJvdyBuZXcgRXJyb3IoJ05vIG1hdGNoaW5nIGxvY2F0aW9uIGZvdW5kLicpfVxuICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByZXR1cm4gJ2Vycm9yJztcbiAgICB9XG59O1xuXG5jb25zdCBwcm9jZXNzV2VhdGhlckRhdGEgPSBmdW5jdGlvbihkYXRhKSB7XG4gIGNvbnN0IGNpdHlOYW1lID0gZGF0YS5sb2NhdGlvbi5uYW1lO1xuICBjb25zdCBjb3VudHJ5TmFtZSA9IGRhdGEubG9jYXRpb24uY291bnRyeTtcbiAgY29uc3QgY2Vsc2l1c1RlbXAgPSBNYXRoLnJvdW5kKGRhdGEuY3VycmVudC50ZW1wX2MpO1xuICBjb25zdCBmYWhyZW5oZWl0VGVtcCA9IE1hdGgucm91bmQoZGF0YS5jdXJyZW50LnRlbXBfZik7XG4gIGNvbnN0IGNlbHNpdXNGZWVsc0xpa2UgPSBNYXRoLnJvdW5kKGRhdGEuY3VycmVudC5mZWVsc2xpa2VfYyk7XG4gIGNvbnN0IGZhaHJlbmhlaXRGZWVsc0xpa2UgPSBNYXRoLnJvdW5kKGRhdGEuY3VycmVudC5mZWVsc2xpa2VfZik7XG4gIGNvbnN0IHdpbmRTcGVlZEtwaCA9IGRhdGEuY3VycmVudC53aW5kX2twaDtcbiAgY29uc3Qgd2luZFNwZWVkTXBoID0gZGF0YS5jdXJyZW50LndpbmRfbXBoO1xuICBjb25zdCBodW1pZGl0eSA9IGRhdGEuY3VycmVudC5odW1pZGl0eTtcbiAgY29uc3QgY29uZGl0aW9uID0gZGF0YS5jdXJyZW50LmNvbmRpdGlvbi50ZXh0O1xuXG4gIHJldHVybiB7IGNpdHlOYW1lLCBjb3VudHJ5TmFtZSwgY2Vsc2l1c1RlbXAsIGZhaHJlbmhlaXRUZW1wLCBjZWxzaXVzRmVlbHNMaWtlLCBmYWhyZW5oZWl0RmVlbHNMaWtlLCB3aW5kU3BlZWRLcGgsIHdpbmRTcGVlZE1waCwgaHVtaWRpdHksIGNvbmRpdGlvbiB9O1xufTtcblxuY29uc3QgZ2V0V2VhdGhlckluZm8gPSBhc3luYyBmdW5jdGlvbihjaXR5TmFtZSkge1xuICBjb25zdCBjaXR5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NpdHknKTtcbiAgY29uc3QgdGVtcGVyYXR1cmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGVtcGVyYXR1cmUnKTtcbiAgY29uc3QgZmVlbHNMaWtlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZlZWxzLWxpa2UnKTtcbiAgY29uc3Qgd2luZFNwZWVkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3dpbmQnKTtcbiAgY29uc3QgaHVtaWRpdHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaHVtaWRpdHknKTtcbiAgY29uc3QgY29uZGl0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbmRpdGlvbicpO1xuXG4gIGNpdHkudGV4dENvbnRlbnQgPSAnJztcbiAgdGVtcGVyYXR1cmUudGV4dENvbnRlbnQgPSAnJztcbiAgZmVlbHNMaWtlLnRleHRDb250ZW50ID0gJyc7XG4gIHdpbmRTcGVlZC50ZXh0Q29udGVudCA9ICcnO1xuICBodW1pZGl0eS50ZXh0Q29udGVudCA9ICcnO1xuICBjb25kaXRpb24udGV4dENvbnRlbnQgPSAnTG9hZGluZy4uLic7XG4gIHRyeSB7XG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IGZldGNoV2VhdGhlckRhdGEoY2l0eU5hbWUpO1xuICAgIGNvbnN0IHdlYXRoZXJJbmZvID0gcHJvY2Vzc1dlYXRoZXJEYXRhKGRhdGEpO1xuICAgIHJldHVybiB3ZWF0aGVySW5mbztcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25kaXRpb24udGV4dENvbnRlbnQgPSAnTm8gbWF0Y2hpbmcgbG9jYXRpb24gZm91bmQuJ1xuICAgIHJldHVybiAnZXJyb3InO1xuICB9XG59XG5cbmV4cG9ydCB7IGdldFdlYXRoZXJJbmZvIH07IiwiaW1wb3J0IGluaXRXZWF0aGVyUGFnZSBmcm9tICcuL3dlYXRoZXItcGFnZSc7XG5pbXBvcnQgJy4vc3R5bGUuY3NzJztcblxuaW5pdFdlYXRoZXJQYWdlKCk7XG4iLCJpbXBvcnQgeyBnZXRXZWF0aGVySW5mbyB9IGZyb20gJy4vYXBpJztcblxuY29uc3QgaW5pdCA9IGZ1bmN0aW9uKCkge1xuICBjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xuICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaXR5LW5hbWUnKTtcbiAgY29uc3Qgc2VhcmNoQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlYXJjaC1idXR0b24nKTtcbiAgY29uc3QgdGVtcFVuaXRCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGVtcGVyYXR1cmUtdW5pdC1idXR0b24nKTtcbiAgY29uc3QgY2l0eSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaXR5Jyk7XG4gIGNvbnN0IHRlbXBlcmF0dXJlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RlbXBlcmF0dXJlJyk7XG4gIGNvbnN0IGZlZWxzTGlrZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmZWVscy1saWtlJyk7XG4gIGNvbnN0IHdpbmRTcGVlZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3aW5kJyk7XG4gIGNvbnN0IGh1bWlkaXR5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2h1bWlkaXR5Jyk7XG4gIGNvbnN0IGNvbmRpdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb25kaXRpb24nKTtcblxuICBjb25zdCBhZGRFdmVudHMgPSBmdW5jdGlvbigpIHtcblxuICAgIHNlYXJjaEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgZ2V0V2VhdGhlckluZm8oaW5wdXQudmFsdWUpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc29sdmUpIHtcbiAgICAgICAgICBpZiAocmVzb2x2ZSA9PT0gJ2Vycm9yJykge3Rocm93IG5ldyBFcnJvcn1cbiAgICAgICAgICBkaXNwbGF5V2VhdGhlckluZm8ocmVzb2x2ZSwgdGVtcFVuaXRCdXR0b24uZGF0YXNldC51bml0KTtcbiAgICAgICAgICBzZWFyY2hCdXR0b24uc2V0QXR0cmlidXRlKCdkYXRhLXdlYXRoZXItaW5mbycsIEpTT04uc3RyaW5naWZ5KHJlc29sdmUpKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgc2VhcmNoQnV0dG9uLmRhdGFzZXQud2VhdGhlckluZm8gPSAnJztcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0pO1xuICAgICAgaW5wdXQudmFsdWUgPSAnJztcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSlcblxuICAgIHRlbXBVbml0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICBpZiAodGVtcFVuaXRCdXR0b24uZ2V0QXR0cmlidXRlKCdkYXRhLXVuaXQnKSA9PT0gJ2NlbHNpdXMnKSB7XG4gICAgICAgIHRlbXBVbml0QnV0dG9uLnNldEF0dHJpYnV0ZSgnZGF0YS11bml0JywgJ2ZhaHJlbmhlaXQnKTtcbiAgICAgICAgdGVtcFVuaXRCdXR0b24udGV4dENvbnRlbnQgPSAnwrBGJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRlbXBVbml0QnV0dG9uLnNldEF0dHJpYnV0ZSgnZGF0YS11bml0JywgJ2NlbHNpdXMnKTtcbiAgICAgICAgdGVtcFVuaXRCdXR0b24udGV4dENvbnRlbnQgPSAnwrBDJztcbiAgICAgIH1cbiAgICAgIGlmIChzZWFyY2hCdXR0b24uZGF0YXNldC53ZWF0aGVySW5mbyAhPT0gJycpIHtkaXNwbGF5V2VhdGhlckluZm8oSlNPTi5wYXJzZShzZWFyY2hCdXR0b24uZGF0YXNldC53ZWF0aGVySW5mbyksIHRlbXBVbml0QnV0dG9uLmRhdGFzZXQudW5pdCl9O1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9KVxuICB9XG5cbiAgY29uc3QgZGlzcGxheVdlYXRoZXJJbmZvID0gZnVuY3Rpb24oZGF0YSwgdW5pdCkge1xuICAgIGlmICh1bml0ID09PSAnY2Vsc2l1cycpIHtcbiAgICAgIGRpc3BsYXlXZWF0aGVySW5mb0luQ2Vsc2l1cyhkYXRhKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGlzcGxheVdlYXRoZXJJbmZvSW5GYWhyZW5oZWl0KGRhdGEpO1xuICAgIH07XG4gICAgc2V0QmFja2dyb3VuZChkYXRhLmNvbmRpdGlvbik7XG4gIH1cblxuICBjb25zdCBkaXNwbGF5V2VhdGhlckluZm9JbkNlbHNpdXMgPSBmdW5jdGlvbihkYXRhKSB7XG4gICAgY2l0eS50ZXh0Q29udGVudCA9IGAke2RhdGEuY2l0eU5hbWV9LCAke2RhdGEuY291bnRyeU5hbWV9YDtcbiAgICB0ZW1wZXJhdHVyZS5pbm5lckhUTUwgPSBgXG4gICAgICAke2RhdGEuY2Vsc2l1c1RlbXB9PHNwYW4gY2xhc3M9J3RlbXBlcmF0dXJlLXVuaXQnPsKwQzwvc3Bhbj5cbiAgICBgO1xuICAgIGZlZWxzTGlrZS5pbm5lckhUTUwgPSBgXG4gICAgICBGZWVscyBsaWtlOiAke2RhdGEuY2Vsc2l1c0ZlZWxzTGlrZX08c3BhbiBjbGFzcz0ndGVtcGVyYXR1cmUtdW5pdCc+IMKwQzwvc3Bhbj5cbiAgICBgO1xuICAgIHdpbmRTcGVlZC50ZXh0Q29udGVudCA9IGBXaW5kOiAke2RhdGEud2luZFNwZWVkS3BofSBrcGhgO1xuICAgIGh1bWlkaXR5LnRleHRDb250ZW50ID0gYEh1bWlkaXR5OiAke2RhdGEuaHVtaWRpdHl9JWA7XG4gICAgY29uZGl0aW9uLnRleHRDb250ZW50ID0gZGF0YS5jb25kaXRpb247XG4gIH1cblxuICBjb25zdCBkaXNwbGF5V2VhdGhlckluZm9JbkZhaHJlbmhlaXQgPSBmdW5jdGlvbihkYXRhKSB7XG4gICAgY2l0eS50ZXh0Q29udGVudCA9IGAke2RhdGEuY2l0eU5hbWV9LCAke2RhdGEuY291bnRyeU5hbWV9YDtcbiAgICB0ZW1wZXJhdHVyZS5pbm5lckhUTUwgPSBgXG4gICAgICAke2RhdGEuZmFocmVuaGVpdFRlbXB9PHNwYW4gY2xhc3M9J3RlbXBlcmF0dXJlLXVuaXQnPsKwRjwvc3Bhbj5cbiAgICBgO1xuICAgIGZlZWxzTGlrZS5pbm5lckhUTUwgPSBgXG4gICAgICBGZWVscyBsaWtlOiAke2RhdGEuZmFocmVuaGVpdEZlZWxzTGlrZX08c3BhbiBjbGFzcz0ndGVtcGVyYXR1cmUtdW5pdCc+IMKwRjwvc3Bhbj5cbiAgICBgO1xuICAgIHdpbmRTcGVlZC50ZXh0Q29udGVudCA9IGBXaW5kOiAke2RhdGEud2luZFNwZWVkTXBofSBtcGhgO1xuICAgIGh1bWlkaXR5LnRleHRDb250ZW50ID0gYEh1bWlkaXR5OiAke2RhdGEuaHVtaWRpdHl9JWA7XG4gICAgY29uZGl0aW9uLnRleHRDb250ZW50ID0gZGF0YS5jb25kaXRpb247XG4gIH1cblxuICBjb25zdCBzZXRCYWNrZ3JvdW5kID0gZnVuY3Rpb24oY29uZGl0aW9uKSB7XG4gICAgc3dpdGNoIChjb25kaXRpb24pIHtcbiAgICAgIGNhc2UgJ1N1bm55JzpcbiAgICAgICAgYm9keS5kYXRhc2V0LmNvbmRpdGlvbiA9ICdzdW5ueSc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnQ2xlYXInOlxuICAgICAgICBib2R5LmRhdGFzZXQuY29uZGl0aW9uID0gJ2NsZWFyJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdQYXJ0bHkgY2xvdWR5JzpcbiAgICAgIGNhc2UgJ0Nsb3VkeSc6XG4gICAgICBjYXNlICdPdmVyY2FzdCc6XG4gICAgICBjYXNlICdGb2cnOlxuICAgICAgY2FzZSAnTWlzdCc6XG4gICAgICAgIGJvZHkuZGF0YXNldC5jb25kaXRpb24gPSAnY2xvdWR5JztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdQYXRjaHkgcmFpbiBwb3NzaWJsZSc6XG4gICAgICBjYXNlICdQYXRjaHkgbGlnaHQgZHJpenpsZSc6XG4gICAgICBjYXNlICdMaWdodCBkcml6emxlJzpcbiAgICAgIGNhc2UgJ0ZyZWV6aW5nIGRyaXp6bGUnOlxuICAgICAgY2FzZSAnSGVhdnkgZnJlZXppbmcgZHJpenpsZSc6XG4gICAgICBjYXNlICdQYXRjaHkgbGlnaHQgcmFpbic6XG4gICAgICBjYXNlICdMaWdodCByYWluJzpcbiAgICAgIGNhc2UgJ01vZGVyYXRlIHJhaW4gYXQgYWxsIHRpbWVzJzpcbiAgICAgIGNhc2UgJ01vZGVyYXRlIHJhaW4nOlxuICAgICAgY2FzZSAnSGVhdnkgcmFpbiBhdCB0aW1lcyc6XG4gICAgICBjYXNlICdIZWF2eSByYWluJzpcbiAgICAgIGNhc2UgJ0xpZ2h0IGZyZWV6aW5nIHJhaW4nOlxuICAgICAgY2FzZSAnTW9kZXJhdGUgb3IgaGVhdnkgZnJlZXppbmcgcmFpbic6XG4gICAgICBjYXNlICdQYXRjaHkgZnJlZXppbmcgZHJpenpsZSBwb3NzaWJsZSc6XG4gICAgICBjYXNlICdMaWdodCByYWluIHNob3dlcic6XG4gICAgICBjYXNlICdNb2RlcmF0ZSBvciBoZWF2eSByYWluIHNob3dlcic6XG4gICAgICBjYXNlICdUb3JyZW50aWFsIHJhaW4gc2hvd2VyJzpcbiAgICAgICAgYm9keS5kYXRhc2V0LmNvbmRpdGlvbiA9ICdyYWluJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdQYXRjaHkgc25vdyBwb3NzaWJsZSc6XG4gICAgICBjYXNlICdQYXRjaHkgc2xlZXQgcG9zc2libGUnOlxuICAgICAgY2FzZSAnQmxvd2luZyBzbm93JzpcbiAgICAgIGNhc2UgJ0JsaXp6YXJkJzpcbiAgICAgIGNhc2UgJ0ZyZWV6aW5nIGZvZyc6XG4gICAgICBjYXNlICdMaWdodCBzbGVldCc6XG4gICAgICBjYXNlICdNb2RlcmF0ZSBvciBoZWF2eSBzbGVldCc6XG4gICAgICBjYXNlICdQYXRjaHkgbGlnaHQgc25vdyc6XG4gICAgICBjYXNlICdMaWdodCBzbm93JzpcbiAgICAgIGNhc2UgJ01vZGVyYXRlIHNub3cnOlxuICAgICAgY2FzZSAnUGF0Y2h5IGhlYXZ5IHNub3cnOlxuICAgICAgY2FzZSAnSGVhdnkgc25vdyc6XG4gICAgICBjYXNlICdJY2UgcGVsbGV0cyc6XG4gICAgICBjYXNlICdMaWdodCBzbGVldCBzaG93ZXJzJzpcbiAgICAgIGNhc2UgJ01vZGVyYXRlIG9yIGhlYXZ5IHNsZWV0IHNob3dlcnMnOlxuICAgICAgY2FzZSAnTGlnaHQgc25vdyBzaG93ZXJzJzpcbiAgICAgIGNhc2UgJ01vZGVyYXRlIG9yIGhlYXZ5IHNub3cgc2hvd2Vycyc6XG4gICAgICBjYXNlICdMaWdodCBzaG93ZXJzIG9mIGljZSBwZWxsZXRzJzpcbiAgICAgIGNhc2UgJ01vZGVyYXRlIG9yIGhlYXZ5IHNob3dlcnMgb2YgaWNlIHBlbGxldHMnOlxuICAgICAgICBib2R5LmRhdGFzZXQuY29uZGl0aW9uID0gJ3Nub3cnO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ1RodW5kZXJ5IG91dGJyZWFrcyBwb3NzaWJsZSc6XG4gICAgICBjYXNlICdQYXRjaHkgbGlnaHQgcmFpbiB3aXRoIHRodW5kZXInOlxuICAgICAgY2FzZSAnTW9kZXJhdGUgb3IgaGVhdnkgcmFpbiB3aXRoIHRodW5kZXInOlxuICAgICAgY2FzZSAnUGF0Y2h5IGxpZ2h0IHNub3cgd2l0aCB0aHVuZGVyJzpcbiAgICAgIGNhc2UgJ01vZGVyYXRlIG9yIGhlYXZ5IHNub3cgd2l0aCB0aHVuZGVyJzpcbiAgICAgICAgYm9keS5kYXRhc2V0LmNvbmRpdGlvbiA9ICd0aHVuZGVyJztcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgZ2V0V2VhdGhlckluZm8oJ2pha2FydGEnKVxuICAgIC50aGVuKGZ1bmN0aW9uKHJlc29sdmUpIHtcbiAgICAgIGRpc3BsYXlXZWF0aGVySW5mbyhyZXNvbHZlLCB0ZW1wVW5pdEJ1dHRvbi5kYXRhc2V0LnVuaXQpO1xuICAgICAgc2VhcmNoQnV0dG9uLnNldEF0dHJpYnV0ZSgnZGF0YS13ZWF0aGVyLWluZm8nLCBKU09OLnN0cmluZ2lmeShyZXNvbHZlKSk7XG4gICAgfSk7XG4gIGFkZEV2ZW50cygpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0OyIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyA9IG5ldyBVUkwoXCIuL2ZvbnRzL1BvcHBpbnMtQm9sZC50dGZcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMV9fXyA9IG5ldyBVUkwoXCIuL2ZvbnRzL1BvcHBpbnMtTWVkaXVtLnR0ZlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8yX19fID0gbmV3IFVSTChcIi4vZm9udHMvUG9wcGlucy1SZWd1bGFyLnR0ZlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8zX19fID0gbmV3IFVSTChcIi4vZm9udHMvUG9wcGlucy1MaWdodC50dGZcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfNF9fXyA9IG5ldyBVUkwoXCIuL2ltYWdlcy9zdW5ueS5qcGdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfNV9fXyA9IG5ldyBVUkwoXCIuL2ltYWdlcy9jbGVhci5qcGdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfNl9fXyA9IG5ldyBVUkwoXCIuL2ltYWdlcy9jbG91ZHkuanBnXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzdfX18gPSBuZXcgVVJMKFwiLi9pbWFnZXMvcmFpbi5qcGdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfOF9fXyA9IG5ldyBVUkwoXCIuL2ltYWdlcy9zbm93LmpwZ1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF85X19fID0gbmV3IFVSTChcIi4vaW1hZ2VzL3RodW5kZXIuanBnXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzFfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8xX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8yX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMl9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfM19fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzNfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzRfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF80X19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF81X19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfNV9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfNl9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzZfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzdfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF83X19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF84X19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfOF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfOV9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzlfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGBAZm9udC1mYWNlIHtcbiAgZm9udC1mYW1pbHk6IHBvcHBpbnMtYm9sZDtcbiAgc3JjOiB1cmwoJHtfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19ffSk7XG59XG5cbkBmb250LWZhY2Uge1xuICBmb250LWZhbWlseTogcG9wcGlucy1tZWRpdW07XG4gIHNyYzogdXJsKCR7X19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMV9fX30pO1xufVxuXG5AZm9udC1mYWNlIHtcbiAgZm9udC1mYW1pbHk6IHBvcHBpbnMtcmVndWxhcjtcbiAgc3JjOiB1cmwoJHtfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8yX19ffSk7XG59XG5cbkBmb250LWZhY2Uge1xuICBmb250LWZhbWlseTogcG9wcGlucy1saWdodDtcbiAgc3JjOiB1cmwoJHtfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8zX19ffSk7XG59XG5cbmJvZHkge1xuICB3aWR0aDogMTAwdnc7XG4gIGhlaWdodDogMTAwdmg7XG4gIHBhZGRpbmc6IDA7XG4gIG1hcmdpbjogMDtcbiAgcG9zaXRpb246IGZpeGVkO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG5cbiAgZm9udC1mYW1pbHk6IHBvcHBpbnMtbGlnaHQ7XG4gIGJhY2tncm91bmQtc2l6ZTogMTUwMHB4IDEwMHZoO1xuICBiYWNrZ3JvdW5kLWF0dGFjaG1lbnQ6IGZpeGVkO1xufVxuXG5ib2R5W2RhdGEtY29uZGl0aW9uPSdzdW5ueSddIHtcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCR7X19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfNF9fX30pO1xufVxuXG5ib2R5W2RhdGEtY29uZGl0aW9uPSdjbGVhciddIHtcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCR7X19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfNV9fX30pO1xufVxuXG5ib2R5W2RhdGEtY29uZGl0aW9uPSdjbG91ZHknXSB7XG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybCgke19fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzZfX199KTtcbn1cblxuYm9keVtkYXRhLWNvbmRpdGlvbj0ncmFpbiddIHtcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCR7X19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfN19fX30pO1xuICBiYWNrZ3JvdW5kLXNpemU6IDE1MDBweCAxODB2aDtcbn1cblxuYm9keVtkYXRhLWNvbmRpdGlvbj0nc25vdyddIHtcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCR7X19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfOF9fX30pO1xufVxuXG5ib2R5W2RhdGEtY29uZGl0aW9uPSd0aHVuZGVyJ10ge1xuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJHtfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF85X19ffSk7XG59XG5cbmZvcm0ge1xuICBhbGlnbi1zZWxmOiBmbGV4LWVuZDtcbiAgcGFkZGluZzogMjBweDtcblxuICBpbnB1dCB7XG4gICAgd2lkdGg6IDIwMHB4O1xuICAgIGJvcmRlcjogMXB4IHNvbGlkIHdoaXRlO1xuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAgMCAwIC8gMC40KTtcbiAgICBjb2xvcjogd2hpdGU7XG4gIH1cblxuICBpbnB1dCwgYnV0dG9uIHtcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgIGhlaWdodDogMzJweDtcbiAgICBmb250LWZhbWlseTogcG9wcGlucy1yZWd1bGFyO1xuICB9XG59XG5cbmJ1dHRvbiB7XG4gIHBhZGRpbmc6IDVweDtcbiAgYXBwZWFyYW5jZTogbm9uZTtcbiAgb3V0bGluZTogbm9uZTtcbiAgYm9yZGVyOiBub25lO1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCAwIDAgLyAwLjQpO1xuICBjb2xvcjogd2hpdGU7XG59XG5cbmJ1dHRvbjpob3ZlciB7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuI3RlbXBlcmF0dXJlLXVuaXQtYnV0dG9uIHtcbiAgZmxleC1ncm93OiAwO1xuICBhbGlnbi1zZWxmOiBmbGV4LWVuZDtcbiAgbWFyZ2luLXRvcDogLThweDtcbiAgbWFyZ2luLXJpZ2h0OiAyMHB4O1xuICB3aWR0aDogMzZweDtcbiAgaGVpZ2h0OiAzMnB4O1xuICBmb250LXNpemU6IDEuMnJlbTtcbiAgZm9udC1mYW1pbHk6IHBvcHBpbnMtbWVkaXVtO1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbn1cblxuI2luZm8tY29udGFpbmVyIHtcbiAgd2lkdGg6IDM3MHB4O1xuICBtYXJnaW4tdG9wOiA2NHB4O1xuICBhbGlnbi1zZWxmOiBjZW50ZXI7XG4gIHBhZGRpbmc6IDIwcHggMCAyMHB4IDI0cHg7XG4gIGJvcmRlci1yYWRpdXM6IDE1cHg7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGU6IDI0cHggOTZweCByZXBlYXQoMywgMzZweCkgLyA5NnB4IDI0MHB4O1xuICBjb2x1bW4tZ2FwOiAyOHB4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBmb250LXNpemU6IDEuMXJlbTtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwIDAgMCAvIDAuNyk7XG4gIGNvbG9yOiB3aGl0ZTtcblxuICAjY2l0eSB7XG4gICAgZ3JpZC1hcmVhOiAyIC8gMSAvIHNwYW4gMSAvIHNwYW4gMjtcbiAgICBmb250LXNpemU6IDEuNnJlbTtcbiAgICBmb250LWZhbWlseTogcG9wcGlucy1tZWRpdW07XG4gICAgcGFkZGluZy1ib3R0b206IDE0cHg7XG4gIH1cblxuICAjdGVtcGVyYXR1cmUge1xuICAgIGdyaWQtYXJlYTogMyAvIDEgLyBzcGFuIDMgLyBzcGFuIDE7XG4gICAgZm9udC1zaXplOiA0cmVtO1xuICAgIGZvbnQtZmFtaWx5OiBwb3BwaW5zLWJvbGQ7XG5cbiAgICAudGVtcGVyYXR1cmUtdW5pdCB7XG4gICAgICBmb250LXNpemU6IDEuMnJlbTtcbiAgICAgIHZlcnRpY2FsLWFsaWduOiB0ZXh0LXRvcDtcbiAgICB9XG4gIH1cblxuICAjY29uZGl0aW9uIHtcbiAgICBncmlkLWFyZWE6IDEgLyAxIC8gc3BhbiAxIC8gc3BhbiAyO1xuICAgIGZvbnQtc2l6ZTogMS40cmVtO1xuICAgIGZvbnQtZmFtaWx5OiBwb3BwaW5zLXJlZ3VsYXI7XG4gIH1cbn1gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSx5QkFBeUI7RUFDekIsNENBQWtDO0FBQ3BDOztBQUVBO0VBQ0UsMkJBQTJCO0VBQzNCLDRDQUFvQztBQUN0Qzs7QUFFQTtFQUNFLDRCQUE0QjtFQUM1Qiw0Q0FBcUM7QUFDdkM7O0FBRUE7RUFDRSwwQkFBMEI7RUFDMUIsNENBQW1DO0FBQ3JDOztBQUVBO0VBQ0UsWUFBWTtFQUNaLGFBQWE7RUFDYixVQUFVO0VBQ1YsU0FBUztFQUNULGVBQWU7RUFDZixnQkFBZ0I7O0VBRWhCLGFBQWE7RUFDYixzQkFBc0I7O0VBRXRCLDBCQUEwQjtFQUMxQiw2QkFBNkI7RUFDN0IsNEJBQTRCO0FBQzlCOztBQUVBO0VBQ0UseURBQXlDO0FBQzNDOztBQUVBO0VBQ0UseURBQXlDO0FBQzNDOztBQUVBO0VBQ0UseURBQTBDO0FBQzVDOztBQUVBO0VBQ0UseURBQXdDO0VBQ3hDLDZCQUE2QjtBQUMvQjs7QUFFQTtFQUNFLHlEQUF3QztBQUMxQzs7QUFFQTtFQUNFLHlEQUEyQztBQUM3Qzs7QUFFQTtFQUNFLG9CQUFvQjtFQUNwQixhQUFhOztFQUViO0lBQ0UsWUFBWTtJQUNaLHVCQUF1QjtJQUN2QixrQkFBa0I7SUFDbEIsbUNBQW1DO0lBQ25DLFlBQVk7RUFDZDs7RUFFQTtJQUNFLHNCQUFzQjtJQUN0QixZQUFZO0lBQ1osNEJBQTRCO0VBQzlCO0FBQ0Y7O0FBRUE7RUFDRSxZQUFZO0VBQ1osZ0JBQWdCO0VBQ2hCLGFBQWE7RUFDYixZQUFZO0VBQ1osa0JBQWtCO0VBQ2xCLG1DQUFtQztFQUNuQyxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsWUFBWTtFQUNaLG9CQUFvQjtFQUNwQixnQkFBZ0I7RUFDaEIsa0JBQWtCO0VBQ2xCLFdBQVc7RUFDWCxZQUFZO0VBQ1osaUJBQWlCO0VBQ2pCLDJCQUEyQjtFQUMzQixhQUFhO0VBQ2IsdUJBQXVCO0FBQ3pCOztBQUVBO0VBQ0UsWUFBWTtFQUNaLGdCQUFnQjtFQUNoQixrQkFBa0I7RUFDbEIseUJBQXlCO0VBQ3pCLG1CQUFtQjtFQUNuQixhQUFhO0VBQ2IscURBQXFEO0VBQ3JELGdCQUFnQjtFQUNoQixtQkFBbUI7RUFDbkIsaUJBQWlCO0VBQ2pCLG1DQUFtQztFQUNuQyxZQUFZOztFQUVaO0lBQ0Usa0NBQWtDO0lBQ2xDLGlCQUFpQjtJQUNqQiwyQkFBMkI7SUFDM0Isb0JBQW9CO0VBQ3RCOztFQUVBO0lBQ0Usa0NBQWtDO0lBQ2xDLGVBQWU7SUFDZix5QkFBeUI7O0lBRXpCO01BQ0UsaUJBQWlCO01BQ2pCLHdCQUF3QjtJQUMxQjtFQUNGOztFQUVBO0lBQ0Usa0NBQWtDO0lBQ2xDLGlCQUFpQjtJQUNqQiw0QkFBNEI7RUFDOUI7QUFDRlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCJAZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiBwb3BwaW5zLWJvbGQ7XFxuICBzcmM6IHVybCguL2ZvbnRzL1BvcHBpbnMtQm9sZC50dGYpO1xcbn1cXG5cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiBwb3BwaW5zLW1lZGl1bTtcXG4gIHNyYzogdXJsKC4vZm9udHMvUG9wcGlucy1NZWRpdW0udHRmKTtcXG59XFxuXFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogcG9wcGlucy1yZWd1bGFyO1xcbiAgc3JjOiB1cmwoLi9mb250cy9Qb3BwaW5zLVJlZ3VsYXIudHRmKTtcXG59XFxuXFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogcG9wcGlucy1saWdodDtcXG4gIHNyYzogdXJsKC4vZm9udHMvUG9wcGlucy1MaWdodC50dGYpO1xcbn1cXG5cXG5ib2R5IHtcXG4gIHdpZHRoOiAxMDB2dztcXG4gIGhlaWdodDogMTAwdmg7XFxuICBwYWRkaW5nOiAwO1xcbiAgbWFyZ2luOiAwO1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG5cXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcblxcbiAgZm9udC1mYW1pbHk6IHBvcHBpbnMtbGlnaHQ7XFxuICBiYWNrZ3JvdW5kLXNpemU6IDE1MDBweCAxMDB2aDtcXG4gIGJhY2tncm91bmQtYXR0YWNobWVudDogZml4ZWQ7XFxufVxcblxcbmJvZHlbZGF0YS1jb25kaXRpb249J3N1bm55J10ge1xcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKC4vaW1hZ2VzL3N1bm55LmpwZyk7XFxufVxcblxcbmJvZHlbZGF0YS1jb25kaXRpb249J2NsZWFyJ10ge1xcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKC4vaW1hZ2VzL2NsZWFyLmpwZyk7XFxufVxcblxcbmJvZHlbZGF0YS1jb25kaXRpb249J2Nsb3VkeSddIHtcXG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybCguL2ltYWdlcy9jbG91ZHkuanBnKTtcXG59XFxuXFxuYm9keVtkYXRhLWNvbmRpdGlvbj0ncmFpbiddIHtcXG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybCguL2ltYWdlcy9yYWluLmpwZyk7XFxuICBiYWNrZ3JvdW5kLXNpemU6IDE1MDBweCAxODB2aDtcXG59XFxuXFxuYm9keVtkYXRhLWNvbmRpdGlvbj0nc25vdyddIHtcXG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybCguL2ltYWdlcy9zbm93LmpwZyk7XFxufVxcblxcbmJvZHlbZGF0YS1jb25kaXRpb249J3RodW5kZXInXSB7XFxuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoLi9pbWFnZXMvdGh1bmRlci5qcGcpO1xcbn1cXG5cXG5mb3JtIHtcXG4gIGFsaWduLXNlbGY6IGZsZXgtZW5kO1xcbiAgcGFkZGluZzogMjBweDtcXG5cXG4gIGlucHV0IHtcXG4gICAgd2lkdGg6IDIwMHB4O1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCB3aGl0ZTtcXG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAgMCAwIC8gMC40KTtcXG4gICAgY29sb3I6IHdoaXRlO1xcbiAgfVxcblxcbiAgaW5wdXQsIGJ1dHRvbiB7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAgIGhlaWdodDogMzJweDtcXG4gICAgZm9udC1mYW1pbHk6IHBvcHBpbnMtcmVndWxhcjtcXG4gIH1cXG59XFxuXFxuYnV0dG9uIHtcXG4gIHBhZGRpbmc6IDVweDtcXG4gIGFwcGVhcmFuY2U6IG5vbmU7XFxuICBvdXRsaW5lOiBub25lO1xcbiAgYm9yZGVyOiBub25lO1xcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwIDAgMCAvIDAuNCk7XFxuICBjb2xvcjogd2hpdGU7XFxufVxcblxcbmJ1dHRvbjpob3ZlciB7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbiN0ZW1wZXJhdHVyZS11bml0LWJ1dHRvbiB7XFxuICBmbGV4LWdyb3c6IDA7XFxuICBhbGlnbi1zZWxmOiBmbGV4LWVuZDtcXG4gIG1hcmdpbi10b3A6IC04cHg7XFxuICBtYXJnaW4tcmlnaHQ6IDIwcHg7XFxuICB3aWR0aDogMzZweDtcXG4gIGhlaWdodDogMzJweDtcXG4gIGZvbnQtc2l6ZTogMS4ycmVtO1xcbiAgZm9udC1mYW1pbHk6IHBvcHBpbnMtbWVkaXVtO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbn1cXG5cXG4jaW5mby1jb250YWluZXIge1xcbiAgd2lkdGg6IDM3MHB4O1xcbiAgbWFyZ2luLXRvcDogNjRweDtcXG4gIGFsaWduLXNlbGY6IGNlbnRlcjtcXG4gIHBhZGRpbmc6IDIwcHggMCAyMHB4IDI0cHg7XFxuICBib3JkZXItcmFkaXVzOiAxNXB4O1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGU6IDI0cHggOTZweCByZXBlYXQoMywgMzZweCkgLyA5NnB4IDI0MHB4O1xcbiAgY29sdW1uLWdhcDogMjhweDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBmb250LXNpemU6IDEuMXJlbTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCAwIDAgLyAwLjcpO1xcbiAgY29sb3I6IHdoaXRlO1xcblxcbiAgI2NpdHkge1xcbiAgICBncmlkLWFyZWE6IDIgLyAxIC8gc3BhbiAxIC8gc3BhbiAyO1xcbiAgICBmb250LXNpemU6IDEuNnJlbTtcXG4gICAgZm9udC1mYW1pbHk6IHBvcHBpbnMtbWVkaXVtO1xcbiAgICBwYWRkaW5nLWJvdHRvbTogMTRweDtcXG4gIH1cXG5cXG4gICN0ZW1wZXJhdHVyZSB7XFxuICAgIGdyaWQtYXJlYTogMyAvIDEgLyBzcGFuIDMgLyBzcGFuIDE7XFxuICAgIGZvbnQtc2l6ZTogNHJlbTtcXG4gICAgZm9udC1mYW1pbHk6IHBvcHBpbnMtYm9sZDtcXG5cXG4gICAgLnRlbXBlcmF0dXJlLXVuaXQge1xcbiAgICAgIGZvbnQtc2l6ZTogMS4ycmVtO1xcbiAgICAgIHZlcnRpY2FsLWFsaWduOiB0ZXh0LXRvcDtcXG4gICAgfVxcbiAgfVxcblxcbiAgI2NvbmRpdGlvbiB7XFxuICAgIGdyaWQtYXJlYTogMSAvIDEgLyBzcGFuIDEgLyBzcGFuIDI7XFxuICAgIGZvbnQtc2l6ZTogMS40cmVtO1xcbiAgICBmb250LWZhbWlseTogcG9wcGlucy1yZWd1bGFyO1xcbiAgfVxcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodXJsLCBvcHRpb25zKSB7XG4gIGlmICghb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSB7fTtcbiAgfVxuICBpZiAoIXVybCkge1xuICAgIHJldHVybiB1cmw7XG4gIH1cbiAgdXJsID0gU3RyaW5nKHVybC5fX2VzTW9kdWxlID8gdXJsLmRlZmF1bHQgOiB1cmwpO1xuXG4gIC8vIElmIHVybCBpcyBhbHJlYWR5IHdyYXBwZWQgaW4gcXVvdGVzLCByZW1vdmUgdGhlbVxuICBpZiAoL15bJ1wiXS4qWydcIl0kLy50ZXN0KHVybCkpIHtcbiAgICB1cmwgPSB1cmwuc2xpY2UoMSwgLTEpO1xuICB9XG4gIGlmIChvcHRpb25zLmhhc2gpIHtcbiAgICB1cmwgKz0gb3B0aW9ucy5oYXNoO1xuICB9XG5cbiAgLy8gU2hvdWxkIHVybCBiZSB3cmFwcGVkP1xuICAvLyBTZWUgaHR0cHM6Ly9kcmFmdHMuY3Nzd2cub3JnL2Nzcy12YWx1ZXMtMy8jdXJsc1xuICBpZiAoL1tcIicoKSBcXHRcXG5dfCglMjApLy50ZXN0KHVybCkgfHwgb3B0aW9ucy5uZWVkUXVvdGVzKSB7XG4gICAgcmV0dXJuIFwiXFxcIlwiLmNvbmNhdCh1cmwucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpLnJlcGxhY2UoL1xcbi9nLCBcIlxcXFxuXCIpLCBcIlxcXCJcIik7XG4gIH1cbiAgcmV0dXJuIHVybDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gdXBkYXRlcjtcbn1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcblxuICAgIC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuICBjc3MgKz0gb2JqLmNzcztcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfVxuXG4gIC8vIEZvciBvbGQgSUVcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiB7XG4gICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHt9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH1cbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyJdLCJuYW1lcyI6WyJmZXRjaFdlYXRoZXJEYXRhIiwiY2l0eU5hbWUiLCJyZXNwb25zZSIsImZldGNoIiwic3RhdHVzIiwiRXJyb3IiLCJkYXRhIiwianNvbiIsImVycm9yIiwicHJvY2Vzc1dlYXRoZXJEYXRhIiwibG9jYXRpb24iLCJuYW1lIiwiY291bnRyeU5hbWUiLCJjb3VudHJ5IiwiY2Vsc2l1c1RlbXAiLCJNYXRoIiwicm91bmQiLCJjdXJyZW50IiwidGVtcF9jIiwiZmFocmVuaGVpdFRlbXAiLCJ0ZW1wX2YiLCJjZWxzaXVzRmVlbHNMaWtlIiwiZmVlbHNsaWtlX2MiLCJmYWhyZW5oZWl0RmVlbHNMaWtlIiwiZmVlbHNsaWtlX2YiLCJ3aW5kU3BlZWRLcGgiLCJ3aW5kX2twaCIsIndpbmRTcGVlZE1waCIsIndpbmRfbXBoIiwiaHVtaWRpdHkiLCJjb25kaXRpb24iLCJ0ZXh0IiwiZ2V0V2VhdGhlckluZm8iLCJjaXR5IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInRlbXBlcmF0dXJlIiwiZmVlbHNMaWtlIiwid2luZFNwZWVkIiwidGV4dENvbnRlbnQiLCJ3ZWF0aGVySW5mbyIsImluaXRXZWF0aGVyUGFnZSIsImluaXQiLCJib2R5IiwicXVlcnlTZWxlY3RvciIsImlucHV0Iiwic2VhcmNoQnV0dG9uIiwidGVtcFVuaXRCdXR0b24iLCJhZGRFdmVudHMiLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJ2YWx1ZSIsInRoZW4iLCJyZXNvbHZlIiwiZGlzcGxheVdlYXRoZXJJbmZvIiwiZGF0YXNldCIsInVuaXQiLCJzZXRBdHRyaWJ1dGUiLCJKU09OIiwic3RyaW5naWZ5IiwiY2F0Y2giLCJwcmV2ZW50RGVmYXVsdCIsImdldEF0dHJpYnV0ZSIsInBhcnNlIiwiZGlzcGxheVdlYXRoZXJJbmZvSW5DZWxzaXVzIiwiZGlzcGxheVdlYXRoZXJJbmZvSW5GYWhyZW5oZWl0Iiwic2V0QmFja2dyb3VuZCIsImlubmVySFRNTCJdLCJzb3VyY2VSb290IjoiIn0=