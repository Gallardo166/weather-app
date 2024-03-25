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
  const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=62f2a391579843b4944155109241903&q=${cityName}`);
  const data = await response.json();
  return data;
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
  const data = await fetchWeatherData(cityName);
  const weatherInfo = processWeatherData(data);
  return weatherInfo;
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
        displayWeatherInfo(resolve, tempUnitButton.dataset.unit);
        searchButton.setAttribute('data-weather-info', JSON.stringify(resolve));
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
}`, "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;EACE,yBAAyB;EACzB,4CAAkC;AACpC;;AAEA;EACE,2BAA2B;EAC3B,4CAAoC;AACtC;;AAEA;EACE,4BAA4B;EAC5B,4CAAqC;AACvC;;AAEA;EACE,0BAA0B;EAC1B,4CAAmC;AACrC;;AAEA;EACE,YAAY;EACZ,aAAa;EACb,UAAU;EACV,SAAS;EACT,eAAe;EACf,gBAAgB;;EAEhB,aAAa;EACb,sBAAsB;;EAEtB,0BAA0B;EAC1B,6BAA6B;EAC7B,4BAA4B;AAC9B;;AAEA;EACE,yDAAyC;AAC3C;;AAEA;EACE,yDAAyC;AAC3C;;AAEA;EACE,yDAA0C;AAC5C;;AAEA;EACE,yDAAwC;EACxC,6BAA6B;AAC/B;;AAEA;EACE,yDAAwC;AAC1C;;AAEA;EACE,yDAA2C;AAC7C;;AAEA;EACE,oBAAoB;EACpB,aAAa;;EAEb;IACE,YAAY;IACZ,uBAAuB;IACvB,kBAAkB;IAClB,mCAAmC;IACnC,YAAY;EACd;;EAEA;IACE,sBAAsB;IACtB,YAAY;IACZ,4BAA4B;EAC9B;AACF;;AAEA;EACE,gBAAgB;EAChB,aAAa;EACb,YAAY;EACZ,kBAAkB;EAClB,mCAAmC;EACnC,YAAY;AACd;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,YAAY;EACZ,oBAAoB;EACpB,gBAAgB;EAChB,kBAAkB;EAClB,WAAW;EACX,YAAY;EACZ,iBAAiB;EACjB,2BAA2B;EAC3B,aAAa;EACb,uBAAuB;AACzB;;AAEA;EACE,YAAY;EACZ,gBAAgB;EAChB,kBAAkB;EAClB,yBAAyB;EACzB,mBAAmB;EACnB,aAAa;EACb,qDAAqD;EACrD,gBAAgB;EAChB,mBAAmB;EACnB,iBAAiB;EACjB,mCAAmC;EACnC,YAAY;;EAEZ;IACE,kCAAkC;IAClC,iBAAiB;IACjB,2BAA2B;IAC3B,oBAAoB;EACtB;;EAEA;IACE,kCAAkC;IAClC,eAAe;IACf,yBAAyB;;IAEzB;MACE,iBAAiB;MACjB,wBAAwB;IAC1B;EACF;;EAEA;IACE,kCAAkC;IAClC,iBAAiB;IACjB,4BAA4B;EAC9B;AACF","sourcesContent":["@font-face {\n  font-family: poppins-bold;\n  src: url(./fonts/Poppins-Bold.ttf);\n}\n\n@font-face {\n  font-family: poppins-medium;\n  src: url(./fonts/Poppins-Medium.ttf);\n}\n\n@font-face {\n  font-family: poppins-regular;\n  src: url(./fonts/Poppins-Regular.ttf);\n}\n\n@font-face {\n  font-family: poppins-light;\n  src: url(./fonts/Poppins-Light.ttf);\n}\n\nbody {\n  width: 100vw;\n  height: 100vh;\n  padding: 0;\n  margin: 0;\n  position: fixed;\n  overflow: hidden;\n\n  display: flex;\n  flex-direction: column;\n\n  font-family: poppins-light;\n  background-size: 1500px 100vh;\n  background-attachment: fixed;\n}\n\nbody[data-condition='sunny'] {\n  background-image: url(./images/sunny.jpg);\n}\n\nbody[data-condition='clear'] {\n  background-image: url(./images/clear.jpg);\n}\n\nbody[data-condition='cloudy'] {\n  background-image: url(./images/cloudy.jpg);\n}\n\nbody[data-condition='rain'] {\n  background-image: url(./images/rain.jpg);\n  background-size: 1500px 180vh;\n}\n\nbody[data-condition='snow'] {\n  background-image: url(./images/snow.jpg);\n}\n\nbody[data-condition='thunder'] {\n  background-image: url(./images/thunder.jpg);\n}\n\nform {\n  align-self: flex-end;\n  padding: 20px;\n\n  input {\n    width: 200px;\n    border: 1px solid white;\n    border-radius: 5px;\n    background-color: rgba(0 0 0 / 0.4);\n    color: white;\n  }\n\n  input, button {\n    box-sizing: border-box;\n    height: 32px;\n    font-family: poppins-regular;\n  }\n}\n\nbutton {\n  appearance: none;\n  outline: none;\n  border: none;\n  border-radius: 4px;\n  background-color: rgba(0 0 0 / 0.4);\n  color: white;\n}\n\nbutton:hover {\n  cursor: pointer;\n}\n\n#temperature-unit-button {\n  flex-grow: 0;\n  align-self: flex-end;\n  margin-top: -8px;\n  margin-right: 20px;\n  width: 36px;\n  height: 32px;\n  font-size: 1.2rem;\n  font-family: poppins-medium;\n  display: flex;\n  justify-content: center;\n}\n\n#info-container {\n  width: 370px;\n  margin-top: 64px;\n  align-self: center;\n  padding: 20px 0 20px 24px;\n  border-radius: 15px;\n  display: grid;\n  grid-template: 24px 96px repeat(3, 36px) / 96px 240px;\n  column-gap: 28px;\n  align-items: center;\n  font-size: 1.1rem;\n  background-color: rgba(0 0 0 / 0.7);\n  color: white;\n\n  #city {\n    grid-area: 2 / 1 / span 1 / span 2;\n    font-size: 1.6rem;\n    font-family: poppins-medium;\n    padding-bottom: 14px;\n  }\n\n  #temperature {\n    grid-area: 3 / 1 / span 3 / span 1;\n    font-size: 4rem;\n    font-family: poppins-bold;\n\n    .temperature-unit {\n      font-size: 1.2rem;\n      vertical-align: text-top;\n    }\n  }\n\n  #condition {\n    grid-area: 1 / 1 / span 1 / span 2;\n    font-size: 1.4rem;\n    font-family: poppins-regular;\n  }\n}"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUM1RGE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9hcGkuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvd2VhdGhlci1wYWdlLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvc3R5bGUuY3NzPzcxNjMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBmZXRjaFdlYXRoZXJEYXRhID0gYXN5bmMgZnVuY3Rpb24oY2l0eU5hbWUpIHtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgaHR0cHM6Ly9hcGkud2VhdGhlcmFwaS5jb20vdjEvY3VycmVudC5qc29uP2tleT02MmYyYTM5MTU3OTg0M2I0OTQ0MTU1MTA5MjQxOTAzJnE9JHtjaXR5TmFtZX1gKTtcbiAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgcmV0dXJuIGRhdGE7XG59O1xuXG5jb25zdCBwcm9jZXNzV2VhdGhlckRhdGEgPSBmdW5jdGlvbihkYXRhKSB7XG4gIGNvbnN0IGNpdHlOYW1lID0gZGF0YS5sb2NhdGlvbi5uYW1lO1xuICBjb25zdCBjb3VudHJ5TmFtZSA9IGRhdGEubG9jYXRpb24uY291bnRyeTtcbiAgY29uc3QgY2Vsc2l1c1RlbXAgPSBNYXRoLnJvdW5kKGRhdGEuY3VycmVudC50ZW1wX2MpO1xuICBjb25zdCBmYWhyZW5oZWl0VGVtcCA9IE1hdGgucm91bmQoZGF0YS5jdXJyZW50LnRlbXBfZik7XG4gIGNvbnN0IGNlbHNpdXNGZWVsc0xpa2UgPSBNYXRoLnJvdW5kKGRhdGEuY3VycmVudC5mZWVsc2xpa2VfYyk7XG4gIGNvbnN0IGZhaHJlbmhlaXRGZWVsc0xpa2UgPSBNYXRoLnJvdW5kKGRhdGEuY3VycmVudC5mZWVsc2xpa2VfZik7XG4gIGNvbnN0IHdpbmRTcGVlZEtwaCA9IGRhdGEuY3VycmVudC53aW5kX2twaDtcbiAgY29uc3Qgd2luZFNwZWVkTXBoID0gZGF0YS5jdXJyZW50LndpbmRfbXBoO1xuICBjb25zdCBodW1pZGl0eSA9IGRhdGEuY3VycmVudC5odW1pZGl0eTtcbiAgY29uc3QgY29uZGl0aW9uID0gZGF0YS5jdXJyZW50LmNvbmRpdGlvbi50ZXh0O1xuXG4gIHJldHVybiB7IGNpdHlOYW1lLCBjb3VudHJ5TmFtZSwgY2Vsc2l1c1RlbXAsIGZhaHJlbmhlaXRUZW1wLCBjZWxzaXVzRmVlbHNMaWtlLCBmYWhyZW5oZWl0RmVlbHNMaWtlLCB3aW5kU3BlZWRLcGgsIHdpbmRTcGVlZE1waCwgaHVtaWRpdHksIGNvbmRpdGlvbiB9O1xufTtcblxuY29uc3QgZ2V0V2VhdGhlckluZm8gPSBhc3luYyBmdW5jdGlvbihjaXR5TmFtZSkge1xuICBjb25zdCBjaXR5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NpdHknKTtcbiAgY29uc3QgdGVtcGVyYXR1cmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGVtcGVyYXR1cmUnKTtcbiAgY29uc3QgZmVlbHNMaWtlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZlZWxzLWxpa2UnKTtcbiAgY29uc3Qgd2luZFNwZWVkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3dpbmQnKTtcbiAgY29uc3QgaHVtaWRpdHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaHVtaWRpdHknKTtcbiAgY29uc3QgY29uZGl0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbmRpdGlvbicpO1xuXG4gIGNpdHkudGV4dENvbnRlbnQgPSAnJztcbiAgdGVtcGVyYXR1cmUudGV4dENvbnRlbnQgPSAnJztcbiAgZmVlbHNMaWtlLnRleHRDb250ZW50ID0gJyc7XG4gIHdpbmRTcGVlZC50ZXh0Q29udGVudCA9ICcnO1xuICBodW1pZGl0eS50ZXh0Q29udGVudCA9ICcnO1xuICBjb25kaXRpb24udGV4dENvbnRlbnQgPSAnTG9hZGluZy4uLic7XG4gIGNvbnN0IGRhdGEgPSBhd2FpdCBmZXRjaFdlYXRoZXJEYXRhKGNpdHlOYW1lKTtcbiAgY29uc3Qgd2VhdGhlckluZm8gPSBwcm9jZXNzV2VhdGhlckRhdGEoZGF0YSk7XG4gIHJldHVybiB3ZWF0aGVySW5mbztcbn1cblxuZXhwb3J0IHsgZ2V0V2VhdGhlckluZm8gfTsiLCJpbXBvcnQgaW5pdFdlYXRoZXJQYWdlIGZyb20gJy4vd2VhdGhlci1wYWdlJztcbmltcG9ydCAnLi9zdHlsZS5jc3MnO1xuXG5pbml0V2VhdGhlclBhZ2UoKTtcbiIsImltcG9ydCB7IGdldFdlYXRoZXJJbmZvIH0gZnJvbSAnLi9hcGknO1xuXG5jb25zdCBpbml0ID0gZnVuY3Rpb24oKSB7XG4gIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XG4gIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NpdHktbmFtZScpO1xuICBjb25zdCBzZWFyY2hCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VhcmNoLWJ1dHRvbicpO1xuICBjb25zdCB0ZW1wVW5pdEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0ZW1wZXJhdHVyZS11bml0LWJ1dHRvbicpO1xuICBjb25zdCBjaXR5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NpdHknKTtcbiAgY29uc3QgdGVtcGVyYXR1cmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGVtcGVyYXR1cmUnKTtcbiAgY29uc3QgZmVlbHNMaWtlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZlZWxzLWxpa2UnKTtcbiAgY29uc3Qgd2luZFNwZWVkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3dpbmQnKTtcbiAgY29uc3QgaHVtaWRpdHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaHVtaWRpdHknKTtcbiAgY29uc3QgY29uZGl0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbmRpdGlvbicpO1xuXG4gIGNvbnN0IGFkZEV2ZW50cyA9IGZ1bmN0aW9uKCkge1xuXG4gICAgc2VhcmNoQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICBnZXRXZWF0aGVySW5mbyhpbnB1dC52YWx1ZSlcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzb2x2ZSkge1xuICAgICAgICAgIGRpc3BsYXlXZWF0aGVySW5mbyhyZXNvbHZlLCB0ZW1wVW5pdEJ1dHRvbi5kYXRhc2V0LnVuaXQpO1xuICAgICAgICAgIHNlYXJjaEJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2RhdGEtd2VhdGhlci1pbmZvJywgSlNPTi5zdHJpbmdpZnkocmVzb2x2ZSkpO1xuICAgICAgfSk7XG4gICAgICBpbnB1dC52YWx1ZSA9ICcnO1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9KVxuXG4gICAgdGVtcFVuaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgIGlmICh0ZW1wVW5pdEJ1dHRvbi5nZXRBdHRyaWJ1dGUoJ2RhdGEtdW5pdCcpID09PSAnY2Vsc2l1cycpIHtcbiAgICAgICAgdGVtcFVuaXRCdXR0b24uc2V0QXR0cmlidXRlKCdkYXRhLXVuaXQnLCAnZmFocmVuaGVpdCcpO1xuICAgICAgICB0ZW1wVW5pdEJ1dHRvbi50ZXh0Q29udGVudCA9ICfCsEYnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGVtcFVuaXRCdXR0b24uc2V0QXR0cmlidXRlKCdkYXRhLXVuaXQnLCAnY2Vsc2l1cycpO1xuICAgICAgICB0ZW1wVW5pdEJ1dHRvbi50ZXh0Q29udGVudCA9ICfCsEMnO1xuICAgICAgfVxuICAgICAgaWYgKHNlYXJjaEJ1dHRvbi5kYXRhc2V0LndlYXRoZXJJbmZvICE9PSAnJykge2Rpc3BsYXlXZWF0aGVySW5mbyhKU09OLnBhcnNlKHNlYXJjaEJ1dHRvbi5kYXRhc2V0LndlYXRoZXJJbmZvKSwgdGVtcFVuaXRCdXR0b24uZGF0YXNldC51bml0KX07XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0pXG4gIH1cblxuICBjb25zdCBkaXNwbGF5V2VhdGhlckluZm8gPSBmdW5jdGlvbihkYXRhLCB1bml0KSB7XG4gICAgaWYgKHVuaXQgPT09ICdjZWxzaXVzJykge1xuICAgICAgZGlzcGxheVdlYXRoZXJJbmZvSW5DZWxzaXVzKGRhdGEpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkaXNwbGF5V2VhdGhlckluZm9JbkZhaHJlbmhlaXQoZGF0YSk7XG4gICAgfTtcbiAgICBzZXRCYWNrZ3JvdW5kKGRhdGEuY29uZGl0aW9uKTtcbiAgfVxuXG4gIGNvbnN0IGRpc3BsYXlXZWF0aGVySW5mb0luQ2Vsc2l1cyA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICBjaXR5LnRleHRDb250ZW50ID0gYCR7ZGF0YS5jaXR5TmFtZX0sICR7ZGF0YS5jb3VudHJ5TmFtZX1gO1xuICAgIHRlbXBlcmF0dXJlLmlubmVySFRNTCA9IGBcbiAgICAgICR7ZGF0YS5jZWxzaXVzVGVtcH08c3BhbiBjbGFzcz0ndGVtcGVyYXR1cmUtdW5pdCc+wrBDPC9zcGFuPlxuICAgIGA7XG4gICAgZmVlbHNMaWtlLmlubmVySFRNTCA9IGBcbiAgICAgIEZlZWxzIGxpa2U6ICR7ZGF0YS5jZWxzaXVzRmVlbHNMaWtlfTxzcGFuIGNsYXNzPSd0ZW1wZXJhdHVyZS11bml0Jz4gwrBDPC9zcGFuPlxuICAgIGA7XG4gICAgd2luZFNwZWVkLnRleHRDb250ZW50ID0gYFdpbmQ6ICR7ZGF0YS53aW5kU3BlZWRLcGh9IGtwaGA7XG4gICAgaHVtaWRpdHkudGV4dENvbnRlbnQgPSBgSHVtaWRpdHk6ICR7ZGF0YS5odW1pZGl0eX0lYDtcbiAgICBjb25kaXRpb24udGV4dENvbnRlbnQgPSBkYXRhLmNvbmRpdGlvbjtcbiAgfVxuXG4gIGNvbnN0IGRpc3BsYXlXZWF0aGVySW5mb0luRmFocmVuaGVpdCA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICBjaXR5LnRleHRDb250ZW50ID0gYCR7ZGF0YS5jaXR5TmFtZX0sICR7ZGF0YS5jb3VudHJ5TmFtZX1gO1xuICAgIHRlbXBlcmF0dXJlLmlubmVySFRNTCA9IGBcbiAgICAgICR7ZGF0YS5mYWhyZW5oZWl0VGVtcH08c3BhbiBjbGFzcz0ndGVtcGVyYXR1cmUtdW5pdCc+wrBGPC9zcGFuPlxuICAgIGA7XG4gICAgZmVlbHNMaWtlLmlubmVySFRNTCA9IGBcbiAgICAgIEZlZWxzIGxpa2U6ICR7ZGF0YS5mYWhyZW5oZWl0RmVlbHNMaWtlfTxzcGFuIGNsYXNzPSd0ZW1wZXJhdHVyZS11bml0Jz4gwrBGPC9zcGFuPlxuICAgIGA7XG4gICAgd2luZFNwZWVkLnRleHRDb250ZW50ID0gYFdpbmQ6ICR7ZGF0YS53aW5kU3BlZWRNcGh9IG1waGA7XG4gICAgaHVtaWRpdHkudGV4dENvbnRlbnQgPSBgSHVtaWRpdHk6ICR7ZGF0YS5odW1pZGl0eX0lYDtcbiAgICBjb25kaXRpb24udGV4dENvbnRlbnQgPSBkYXRhLmNvbmRpdGlvbjtcbiAgfVxuXG4gIGNvbnN0IHNldEJhY2tncm91bmQgPSBmdW5jdGlvbihjb25kaXRpb24pIHtcbiAgICBzd2l0Y2ggKGNvbmRpdGlvbikge1xuICAgICAgY2FzZSAnU3VubnknOlxuICAgICAgICBib2R5LmRhdGFzZXQuY29uZGl0aW9uID0gJ3N1bm55JztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdDbGVhcic6XG4gICAgICAgIGJvZHkuZGF0YXNldC5jb25kaXRpb24gPSAnY2xlYXInO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ1BhcnRseSBjbG91ZHknOlxuICAgICAgY2FzZSAnQ2xvdWR5JzpcbiAgICAgIGNhc2UgJ092ZXJjYXN0JzpcbiAgICAgIGNhc2UgJ0ZvZyc6XG4gICAgICBjYXNlICdNaXN0JzpcbiAgICAgICAgYm9keS5kYXRhc2V0LmNvbmRpdGlvbiA9ICdjbG91ZHknO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ1BhdGNoeSByYWluIHBvc3NpYmxlJzpcbiAgICAgIGNhc2UgJ1BhdGNoeSBsaWdodCBkcml6emxlJzpcbiAgICAgIGNhc2UgJ0xpZ2h0IGRyaXp6bGUnOlxuICAgICAgY2FzZSAnRnJlZXppbmcgZHJpenpsZSc6XG4gICAgICBjYXNlICdIZWF2eSBmcmVlemluZyBkcml6emxlJzpcbiAgICAgIGNhc2UgJ1BhdGNoeSBsaWdodCByYWluJzpcbiAgICAgIGNhc2UgJ0xpZ2h0IHJhaW4nOlxuICAgICAgY2FzZSAnTW9kZXJhdGUgcmFpbiBhdCBhbGwgdGltZXMnOlxuICAgICAgY2FzZSAnTW9kZXJhdGUgcmFpbic6XG4gICAgICBjYXNlICdIZWF2eSByYWluIGF0IHRpbWVzJzpcbiAgICAgIGNhc2UgJ0hlYXZ5IHJhaW4nOlxuICAgICAgY2FzZSAnTGlnaHQgZnJlZXppbmcgcmFpbic6XG4gICAgICBjYXNlICdNb2RlcmF0ZSBvciBoZWF2eSBmcmVlemluZyByYWluJzpcbiAgICAgIGNhc2UgJ1BhdGNoeSBmcmVlemluZyBkcml6emxlIHBvc3NpYmxlJzpcbiAgICAgIGNhc2UgJ0xpZ2h0IHJhaW4gc2hvd2VyJzpcbiAgICAgIGNhc2UgJ01vZGVyYXRlIG9yIGhlYXZ5IHJhaW4gc2hvd2VyJzpcbiAgICAgIGNhc2UgJ1RvcnJlbnRpYWwgcmFpbiBzaG93ZXInOlxuICAgICAgICBib2R5LmRhdGFzZXQuY29uZGl0aW9uID0gJ3JhaW4nO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ1BhdGNoeSBzbm93IHBvc3NpYmxlJzpcbiAgICAgIGNhc2UgJ1BhdGNoeSBzbGVldCBwb3NzaWJsZSc6XG4gICAgICBjYXNlICdCbG93aW5nIHNub3cnOlxuICAgICAgY2FzZSAnQmxpenphcmQnOlxuICAgICAgY2FzZSAnRnJlZXppbmcgZm9nJzpcbiAgICAgIGNhc2UgJ0xpZ2h0IHNsZWV0JzpcbiAgICAgIGNhc2UgJ01vZGVyYXRlIG9yIGhlYXZ5IHNsZWV0JzpcbiAgICAgIGNhc2UgJ1BhdGNoeSBsaWdodCBzbm93JzpcbiAgICAgIGNhc2UgJ0xpZ2h0IHNub3cnOlxuICAgICAgY2FzZSAnTW9kZXJhdGUgc25vdyc6XG4gICAgICBjYXNlICdQYXRjaHkgaGVhdnkgc25vdyc6XG4gICAgICBjYXNlICdIZWF2eSBzbm93JzpcbiAgICAgIGNhc2UgJ0ljZSBwZWxsZXRzJzpcbiAgICAgIGNhc2UgJ0xpZ2h0IHNsZWV0IHNob3dlcnMnOlxuICAgICAgY2FzZSAnTW9kZXJhdGUgb3IgaGVhdnkgc2xlZXQgc2hvd2Vycyc6XG4gICAgICBjYXNlICdMaWdodCBzbm93IHNob3dlcnMnOlxuICAgICAgY2FzZSAnTW9kZXJhdGUgb3IgaGVhdnkgc25vdyBzaG93ZXJzJzpcbiAgICAgIGNhc2UgJ0xpZ2h0IHNob3dlcnMgb2YgaWNlIHBlbGxldHMnOlxuICAgICAgY2FzZSAnTW9kZXJhdGUgb3IgaGVhdnkgc2hvd2VycyBvZiBpY2UgcGVsbGV0cyc6XG4gICAgICAgIGJvZHkuZGF0YXNldC5jb25kaXRpb24gPSAnc25vdyc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnVGh1bmRlcnkgb3V0YnJlYWtzIHBvc3NpYmxlJzpcbiAgICAgIGNhc2UgJ1BhdGNoeSBsaWdodCByYWluIHdpdGggdGh1bmRlcic6XG4gICAgICBjYXNlICdNb2RlcmF0ZSBvciBoZWF2eSByYWluIHdpdGggdGh1bmRlcic6XG4gICAgICBjYXNlICdQYXRjaHkgbGlnaHQgc25vdyB3aXRoIHRodW5kZXInOlxuICAgICAgY2FzZSAnTW9kZXJhdGUgb3IgaGVhdnkgc25vdyB3aXRoIHRodW5kZXInOlxuICAgICAgICBib2R5LmRhdGFzZXQuY29uZGl0aW9uID0gJ3RodW5kZXInO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBnZXRXZWF0aGVySW5mbygnamFrYXJ0YScpXG4gICAgLnRoZW4oZnVuY3Rpb24ocmVzb2x2ZSkge1xuICAgICAgZGlzcGxheVdlYXRoZXJJbmZvKHJlc29sdmUsIHRlbXBVbml0QnV0dG9uLmRhdGFzZXQudW5pdCk7XG4gICAgICBzZWFyY2hCdXR0b24uc2V0QXR0cmlidXRlKCdkYXRhLXdlYXRoZXItaW5mbycsIEpTT04uc3RyaW5naWZ5KHJlc29sdmUpKTtcbiAgICB9KTtcbiAgYWRkRXZlbnRzKCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQ7IiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fID0gbmV3IFVSTChcIi4vZm9udHMvUG9wcGlucy1Cb2xkLnR0ZlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8xX19fID0gbmV3IFVSTChcIi4vZm9udHMvUG9wcGlucy1NZWRpdW0udHRmXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzJfX18gPSBuZXcgVVJMKFwiLi9mb250cy9Qb3BwaW5zLVJlZ3VsYXIudHRmXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzNfX18gPSBuZXcgVVJMKFwiLi9mb250cy9Qb3BwaW5zLUxpZ2h0LnR0ZlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF80X19fID0gbmV3IFVSTChcIi4vaW1hZ2VzL3N1bm55LmpwZ1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF81X19fID0gbmV3IFVSTChcIi4vaW1hZ2VzL2NsZWFyLmpwZ1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF82X19fID0gbmV3IFVSTChcIi4vaW1hZ2VzL2Nsb3VkeS5qcGdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfN19fXyA9IG5ldyBVUkwoXCIuL2ltYWdlcy9yYWluLmpwZ1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF84X19fID0gbmV3IFVSTChcIi4vaW1hZ2VzL3Nub3cuanBnXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzlfX18gPSBuZXcgVVJMKFwiLi9pbWFnZXMvdGh1bmRlci5qcGdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMV9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzFfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzJfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8yX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8zX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfM19fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfNF9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzRfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzVfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF81X19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF82X19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfNl9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfN19fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzdfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzhfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF84X19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF85X19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfOV9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYEBmb250LWZhY2Uge1xuICBmb250LWZhbWlseTogcG9wcGlucy1ib2xkO1xuICBzcmM6IHVybCgke19fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX199KTtcbn1cblxuQGZvbnQtZmFjZSB7XG4gIGZvbnQtZmFtaWx5OiBwb3BwaW5zLW1lZGl1bTtcbiAgc3JjOiB1cmwoJHtfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xX19ffSk7XG59XG5cbkBmb250LWZhY2Uge1xuICBmb250LWZhbWlseTogcG9wcGlucy1yZWd1bGFyO1xuICBzcmM6IHVybCgke19fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzJfX199KTtcbn1cblxuQGZvbnQtZmFjZSB7XG4gIGZvbnQtZmFtaWx5OiBwb3BwaW5zLWxpZ2h0O1xuICBzcmM6IHVybCgke19fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzNfX199KTtcbn1cblxuYm9keSB7XG4gIHdpZHRoOiAxMDB2dztcbiAgaGVpZ2h0OiAxMDB2aDtcbiAgcGFkZGluZzogMDtcbiAgbWFyZ2luOiAwO1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIG92ZXJmbG93OiBoaWRkZW47XG5cbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcblxuICBmb250LWZhbWlseTogcG9wcGlucy1saWdodDtcbiAgYmFja2dyb3VuZC1zaXplOiAxNTAwcHggMTAwdmg7XG4gIGJhY2tncm91bmQtYXR0YWNobWVudDogZml4ZWQ7XG59XG5cbmJvZHlbZGF0YS1jb25kaXRpb249J3N1bm55J10ge1xuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJHtfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF80X19ffSk7XG59XG5cbmJvZHlbZGF0YS1jb25kaXRpb249J2NsZWFyJ10ge1xuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJHtfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF81X19ffSk7XG59XG5cbmJvZHlbZGF0YS1jb25kaXRpb249J2Nsb3VkeSddIHtcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCR7X19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfNl9fX30pO1xufVxuXG5ib2R5W2RhdGEtY29uZGl0aW9uPSdyYWluJ10ge1xuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJHtfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF83X19ffSk7XG4gIGJhY2tncm91bmQtc2l6ZTogMTUwMHB4IDE4MHZoO1xufVxuXG5ib2R5W2RhdGEtY29uZGl0aW9uPSdzbm93J10ge1xuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJHtfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF84X19ffSk7XG59XG5cbmJvZHlbZGF0YS1jb25kaXRpb249J3RodW5kZXInXSB7XG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybCgke19fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzlfX199KTtcbn1cblxuZm9ybSB7XG4gIGFsaWduLXNlbGY6IGZsZXgtZW5kO1xuICBwYWRkaW5nOiAyMHB4O1xuXG4gIGlucHV0IHtcbiAgICB3aWR0aDogMjAwcHg7XG4gICAgYm9yZGVyOiAxcHggc29saWQgd2hpdGU7XG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCAwIDAgLyAwLjQpO1xuICAgIGNvbG9yOiB3aGl0ZTtcbiAgfVxuXG4gIGlucHV0LCBidXR0b24ge1xuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgaGVpZ2h0OiAzMnB4O1xuICAgIGZvbnQtZmFtaWx5OiBwb3BwaW5zLXJlZ3VsYXI7XG4gIH1cbn1cblxuYnV0dG9uIHtcbiAgYXBwZWFyYW5jZTogbm9uZTtcbiAgb3V0bGluZTogbm9uZTtcbiAgYm9yZGVyOiBub25lO1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCAwIDAgLyAwLjQpO1xuICBjb2xvcjogd2hpdGU7XG59XG5cbmJ1dHRvbjpob3ZlciB7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuI3RlbXBlcmF0dXJlLXVuaXQtYnV0dG9uIHtcbiAgZmxleC1ncm93OiAwO1xuICBhbGlnbi1zZWxmOiBmbGV4LWVuZDtcbiAgbWFyZ2luLXRvcDogLThweDtcbiAgbWFyZ2luLXJpZ2h0OiAyMHB4O1xuICB3aWR0aDogMzZweDtcbiAgaGVpZ2h0OiAzMnB4O1xuICBmb250LXNpemU6IDEuMnJlbTtcbiAgZm9udC1mYW1pbHk6IHBvcHBpbnMtbWVkaXVtO1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbn1cblxuI2luZm8tY29udGFpbmVyIHtcbiAgd2lkdGg6IDM3MHB4O1xuICBtYXJnaW4tdG9wOiA2NHB4O1xuICBhbGlnbi1zZWxmOiBjZW50ZXI7XG4gIHBhZGRpbmc6IDIwcHggMCAyMHB4IDI0cHg7XG4gIGJvcmRlci1yYWRpdXM6IDE1cHg7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGU6IDI0cHggOTZweCByZXBlYXQoMywgMzZweCkgLyA5NnB4IDI0MHB4O1xuICBjb2x1bW4tZ2FwOiAyOHB4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBmb250LXNpemU6IDEuMXJlbTtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwIDAgMCAvIDAuNyk7XG4gIGNvbG9yOiB3aGl0ZTtcblxuICAjY2l0eSB7XG4gICAgZ3JpZC1hcmVhOiAyIC8gMSAvIHNwYW4gMSAvIHNwYW4gMjtcbiAgICBmb250LXNpemU6IDEuNnJlbTtcbiAgICBmb250LWZhbWlseTogcG9wcGlucy1tZWRpdW07XG4gICAgcGFkZGluZy1ib3R0b206IDE0cHg7XG4gIH1cblxuICAjdGVtcGVyYXR1cmUge1xuICAgIGdyaWQtYXJlYTogMyAvIDEgLyBzcGFuIDMgLyBzcGFuIDE7XG4gICAgZm9udC1zaXplOiA0cmVtO1xuICAgIGZvbnQtZmFtaWx5OiBwb3BwaW5zLWJvbGQ7XG5cbiAgICAudGVtcGVyYXR1cmUtdW5pdCB7XG4gICAgICBmb250LXNpemU6IDEuMnJlbTtcbiAgICAgIHZlcnRpY2FsLWFsaWduOiB0ZXh0LXRvcDtcbiAgICB9XG4gIH1cblxuICAjY29uZGl0aW9uIHtcbiAgICBncmlkLWFyZWE6IDEgLyAxIC8gc3BhbiAxIC8gc3BhbiAyO1xuICAgIGZvbnQtc2l6ZTogMS40cmVtO1xuICAgIGZvbnQtZmFtaWx5OiBwb3BwaW5zLXJlZ3VsYXI7XG4gIH1cbn1gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSx5QkFBeUI7RUFDekIsNENBQWtDO0FBQ3BDOztBQUVBO0VBQ0UsMkJBQTJCO0VBQzNCLDRDQUFvQztBQUN0Qzs7QUFFQTtFQUNFLDRCQUE0QjtFQUM1Qiw0Q0FBcUM7QUFDdkM7O0FBRUE7RUFDRSwwQkFBMEI7RUFDMUIsNENBQW1DO0FBQ3JDOztBQUVBO0VBQ0UsWUFBWTtFQUNaLGFBQWE7RUFDYixVQUFVO0VBQ1YsU0FBUztFQUNULGVBQWU7RUFDZixnQkFBZ0I7O0VBRWhCLGFBQWE7RUFDYixzQkFBc0I7O0VBRXRCLDBCQUEwQjtFQUMxQiw2QkFBNkI7RUFDN0IsNEJBQTRCO0FBQzlCOztBQUVBO0VBQ0UseURBQXlDO0FBQzNDOztBQUVBO0VBQ0UseURBQXlDO0FBQzNDOztBQUVBO0VBQ0UseURBQTBDO0FBQzVDOztBQUVBO0VBQ0UseURBQXdDO0VBQ3hDLDZCQUE2QjtBQUMvQjs7QUFFQTtFQUNFLHlEQUF3QztBQUMxQzs7QUFFQTtFQUNFLHlEQUEyQztBQUM3Qzs7QUFFQTtFQUNFLG9CQUFvQjtFQUNwQixhQUFhOztFQUViO0lBQ0UsWUFBWTtJQUNaLHVCQUF1QjtJQUN2QixrQkFBa0I7SUFDbEIsbUNBQW1DO0lBQ25DLFlBQVk7RUFDZDs7RUFFQTtJQUNFLHNCQUFzQjtJQUN0QixZQUFZO0lBQ1osNEJBQTRCO0VBQzlCO0FBQ0Y7O0FBRUE7RUFDRSxnQkFBZ0I7RUFDaEIsYUFBYTtFQUNiLFlBQVk7RUFDWixrQkFBa0I7RUFDbEIsbUNBQW1DO0VBQ25DLFlBQVk7QUFDZDs7QUFFQTtFQUNFLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxZQUFZO0VBQ1osb0JBQW9CO0VBQ3BCLGdCQUFnQjtFQUNoQixrQkFBa0I7RUFDbEIsV0FBVztFQUNYLFlBQVk7RUFDWixpQkFBaUI7RUFDakIsMkJBQTJCO0VBQzNCLGFBQWE7RUFDYix1QkFBdUI7QUFDekI7O0FBRUE7RUFDRSxZQUFZO0VBQ1osZ0JBQWdCO0VBQ2hCLGtCQUFrQjtFQUNsQix5QkFBeUI7RUFDekIsbUJBQW1CO0VBQ25CLGFBQWE7RUFDYixxREFBcUQ7RUFDckQsZ0JBQWdCO0VBQ2hCLG1CQUFtQjtFQUNuQixpQkFBaUI7RUFDakIsbUNBQW1DO0VBQ25DLFlBQVk7O0VBRVo7SUFDRSxrQ0FBa0M7SUFDbEMsaUJBQWlCO0lBQ2pCLDJCQUEyQjtJQUMzQixvQkFBb0I7RUFDdEI7O0VBRUE7SUFDRSxrQ0FBa0M7SUFDbEMsZUFBZTtJQUNmLHlCQUF5Qjs7SUFFekI7TUFDRSxpQkFBaUI7TUFDakIsd0JBQXdCO0lBQzFCO0VBQ0Y7O0VBRUE7SUFDRSxrQ0FBa0M7SUFDbEMsaUJBQWlCO0lBQ2pCLDRCQUE0QjtFQUM5QjtBQUNGXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6IHBvcHBpbnMtYm9sZDtcXG4gIHNyYzogdXJsKC4vZm9udHMvUG9wcGlucy1Cb2xkLnR0Zik7XFxufVxcblxcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6IHBvcHBpbnMtbWVkaXVtO1xcbiAgc3JjOiB1cmwoLi9mb250cy9Qb3BwaW5zLU1lZGl1bS50dGYpO1xcbn1cXG5cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiBwb3BwaW5zLXJlZ3VsYXI7XFxuICBzcmM6IHVybCguL2ZvbnRzL1BvcHBpbnMtUmVndWxhci50dGYpO1xcbn1cXG5cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiBwb3BwaW5zLWxpZ2h0O1xcbiAgc3JjOiB1cmwoLi9mb250cy9Qb3BwaW5zLUxpZ2h0LnR0Zik7XFxufVxcblxcbmJvZHkge1xcbiAgd2lkdGg6IDEwMHZ3O1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG4gIHBhZGRpbmc6IDA7XFxuICBtYXJnaW46IDA7XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcblxcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuXFxuICBmb250LWZhbWlseTogcG9wcGlucy1saWdodDtcXG4gIGJhY2tncm91bmQtc2l6ZTogMTUwMHB4IDEwMHZoO1xcbiAgYmFja2dyb3VuZC1hdHRhY2htZW50OiBmaXhlZDtcXG59XFxuXFxuYm9keVtkYXRhLWNvbmRpdGlvbj0nc3VubnknXSB7XFxuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoLi9pbWFnZXMvc3VubnkuanBnKTtcXG59XFxuXFxuYm9keVtkYXRhLWNvbmRpdGlvbj0nY2xlYXInXSB7XFxuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoLi9pbWFnZXMvY2xlYXIuanBnKTtcXG59XFxuXFxuYm9keVtkYXRhLWNvbmRpdGlvbj0nY2xvdWR5J10ge1xcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKC4vaW1hZ2VzL2Nsb3VkeS5qcGcpO1xcbn1cXG5cXG5ib2R5W2RhdGEtY29uZGl0aW9uPSdyYWluJ10ge1xcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKC4vaW1hZ2VzL3JhaW4uanBnKTtcXG4gIGJhY2tncm91bmQtc2l6ZTogMTUwMHB4IDE4MHZoO1xcbn1cXG5cXG5ib2R5W2RhdGEtY29uZGl0aW9uPSdzbm93J10ge1xcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKC4vaW1hZ2VzL3Nub3cuanBnKTtcXG59XFxuXFxuYm9keVtkYXRhLWNvbmRpdGlvbj0ndGh1bmRlciddIHtcXG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybCguL2ltYWdlcy90aHVuZGVyLmpwZyk7XFxufVxcblxcbmZvcm0ge1xcbiAgYWxpZ24tc2VsZjogZmxleC1lbmQ7XFxuICBwYWRkaW5nOiAyMHB4O1xcblxcbiAgaW5wdXQge1xcbiAgICB3aWR0aDogMjAwcHg7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkIHdoaXRlO1xcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCAwIDAgLyAwLjQpO1xcbiAgICBjb2xvcjogd2hpdGU7XFxuICB9XFxuXFxuICBpbnB1dCwgYnV0dG9uIHtcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gICAgaGVpZ2h0OiAzMnB4O1xcbiAgICBmb250LWZhbWlseTogcG9wcGlucy1yZWd1bGFyO1xcbiAgfVxcbn1cXG5cXG5idXR0b24ge1xcbiAgYXBwZWFyYW5jZTogbm9uZTtcXG4gIG91dGxpbmU6IG5vbmU7XFxuICBib3JkZXI6IG5vbmU7XFxuICBib3JkZXItcmFkaXVzOiA0cHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAgMCAwIC8gMC40KTtcXG4gIGNvbG9yOiB3aGl0ZTtcXG59XFxuXFxuYnV0dG9uOmhvdmVyIHtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuI3RlbXBlcmF0dXJlLXVuaXQtYnV0dG9uIHtcXG4gIGZsZXgtZ3JvdzogMDtcXG4gIGFsaWduLXNlbGY6IGZsZXgtZW5kO1xcbiAgbWFyZ2luLXRvcDogLThweDtcXG4gIG1hcmdpbi1yaWdodDogMjBweDtcXG4gIHdpZHRoOiAzNnB4O1xcbiAgaGVpZ2h0OiAzMnB4O1xcbiAgZm9udC1zaXplOiAxLjJyZW07XFxuICBmb250LWZhbWlseTogcG9wcGlucy1tZWRpdW07XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxufVxcblxcbiNpbmZvLWNvbnRhaW5lciB7XFxuICB3aWR0aDogMzcwcHg7XFxuICBtYXJnaW4tdG9wOiA2NHB4O1xcbiAgYWxpZ24tc2VsZjogY2VudGVyO1xcbiAgcGFkZGluZzogMjBweCAwIDIwcHggMjRweDtcXG4gIGJvcmRlci1yYWRpdXM6IDE1cHg7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZTogMjRweCA5NnB4IHJlcGVhdCgzLCAzNnB4KSAvIDk2cHggMjQwcHg7XFxuICBjb2x1bW4tZ2FwOiAyOHB4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGZvbnQtc2l6ZTogMS4xcmVtO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwIDAgMCAvIDAuNyk7XFxuICBjb2xvcjogd2hpdGU7XFxuXFxuICAjY2l0eSB7XFxuICAgIGdyaWQtYXJlYTogMiAvIDEgLyBzcGFuIDEgLyBzcGFuIDI7XFxuICAgIGZvbnQtc2l6ZTogMS42cmVtO1xcbiAgICBmb250LWZhbWlseTogcG9wcGlucy1tZWRpdW07XFxuICAgIHBhZGRpbmctYm90dG9tOiAxNHB4O1xcbiAgfVxcblxcbiAgI3RlbXBlcmF0dXJlIHtcXG4gICAgZ3JpZC1hcmVhOiAzIC8gMSAvIHNwYW4gMyAvIHNwYW4gMTtcXG4gICAgZm9udC1zaXplOiA0cmVtO1xcbiAgICBmb250LWZhbWlseTogcG9wcGlucy1ib2xkO1xcblxcbiAgICAudGVtcGVyYXR1cmUtdW5pdCB7XFxuICAgICAgZm9udC1zaXplOiAxLjJyZW07XFxuICAgICAgdmVydGljYWwtYWxpZ246IHRleHQtdG9wO1xcbiAgICB9XFxuICB9XFxuXFxuICAjY29uZGl0aW9uIHtcXG4gICAgZ3JpZC1hcmVhOiAxIC8gMSAvIHNwYW4gMSAvIHNwYW4gMjtcXG4gICAgZm9udC1zaXplOiAxLjRyZW07XFxuICAgIGZvbnQtZmFtaWx5OiBwb3BwaW5zLXJlZ3VsYXI7XFxuICB9XFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMpIHtcbiAgaWYgKCFvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IHt9O1xuICB9XG4gIGlmICghdXJsKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuICB1cmwgPSBTdHJpbmcodXJsLl9fZXNNb2R1bGUgPyB1cmwuZGVmYXVsdCA6IHVybCk7XG5cbiAgLy8gSWYgdXJsIGlzIGFscmVhZHkgd3JhcHBlZCBpbiBxdW90ZXMsIHJlbW92ZSB0aGVtXG4gIGlmICgvXlsnXCJdLipbJ1wiXSQvLnRlc3QodXJsKSkge1xuICAgIHVybCA9IHVybC5zbGljZSgxLCAtMSk7XG4gIH1cbiAgaWYgKG9wdGlvbnMuaGFzaCkge1xuICAgIHVybCArPSBvcHRpb25zLmhhc2g7XG4gIH1cblxuICAvLyBTaG91bGQgdXJsIGJlIHdyYXBwZWQ/XG4gIC8vIFNlZSBodHRwczovL2RyYWZ0cy5jc3N3Zy5vcmcvY3NzLXZhbHVlcy0zLyN1cmxzXG4gIGlmICgvW1wiJygpIFxcdFxcbl18KCUyMCkvLnRlc3QodXJsKSB8fCBvcHRpb25zLm5lZWRRdW90ZXMpIHtcbiAgICByZXR1cm4gXCJcXFwiXCIuY29uY2F0KHVybC5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykucmVwbGFjZSgvXFxuL2csIFwiXFxcXG5cIiksIFwiXFxcIlwiKTtcbiAgfVxuICByZXR1cm4gdXJsO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07Il0sIm5hbWVzIjpbImZldGNoV2VhdGhlckRhdGEiLCJjaXR5TmFtZSIsInJlc3BvbnNlIiwiZmV0Y2giLCJkYXRhIiwianNvbiIsInByb2Nlc3NXZWF0aGVyRGF0YSIsImxvY2F0aW9uIiwibmFtZSIsImNvdW50cnlOYW1lIiwiY291bnRyeSIsImNlbHNpdXNUZW1wIiwiTWF0aCIsInJvdW5kIiwiY3VycmVudCIsInRlbXBfYyIsImZhaHJlbmhlaXRUZW1wIiwidGVtcF9mIiwiY2Vsc2l1c0ZlZWxzTGlrZSIsImZlZWxzbGlrZV9jIiwiZmFocmVuaGVpdEZlZWxzTGlrZSIsImZlZWxzbGlrZV9mIiwid2luZFNwZWVkS3BoIiwid2luZF9rcGgiLCJ3aW5kU3BlZWRNcGgiLCJ3aW5kX21waCIsImh1bWlkaXR5IiwiY29uZGl0aW9uIiwidGV4dCIsImdldFdlYXRoZXJJbmZvIiwiY2l0eSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJ0ZW1wZXJhdHVyZSIsImZlZWxzTGlrZSIsIndpbmRTcGVlZCIsInRleHRDb250ZW50Iiwid2VhdGhlckluZm8iLCJpbml0V2VhdGhlclBhZ2UiLCJpbml0IiwiYm9keSIsInF1ZXJ5U2VsZWN0b3IiLCJpbnB1dCIsInNlYXJjaEJ1dHRvbiIsInRlbXBVbml0QnV0dG9uIiwiYWRkRXZlbnRzIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50IiwidmFsdWUiLCJ0aGVuIiwicmVzb2x2ZSIsImRpc3BsYXlXZWF0aGVySW5mbyIsImRhdGFzZXQiLCJ1bml0Iiwic2V0QXR0cmlidXRlIiwiSlNPTiIsInN0cmluZ2lmeSIsInByZXZlbnREZWZhdWx0IiwiZ2V0QXR0cmlidXRlIiwicGFyc2UiLCJkaXNwbGF5V2VhdGhlckluZm9JbkNlbHNpdXMiLCJkaXNwbGF5V2VhdGhlckluZm9JbkZhaHJlbmhlaXQiLCJzZXRCYWNrZ3JvdW5kIiwiaW5uZXJIVE1MIl0sInNvdXJjZVJvb3QiOiIifQ==