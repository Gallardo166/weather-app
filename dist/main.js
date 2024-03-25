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
    height: 28px;
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
}

#info-container {
  width: 370px;
  margin-top: 64px;
  margin-left: 36px;
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
}`, "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;EACE,yBAAyB;EACzB,4CAAkC;AACpC;;AAEA;EACE,2BAA2B;EAC3B,4CAAoC;AACtC;;AAEA;EACE,4BAA4B;EAC5B,4CAAqC;AACvC;;AAEA;EACE,0BAA0B;EAC1B,4CAAmC;AACrC;;AAEA;EACE,YAAY;EACZ,aAAa;EACb,UAAU;EACV,SAAS;EACT,eAAe;EACf,gBAAgB;;EAEhB,aAAa;EACb,sBAAsB;;EAEtB,0BAA0B;EAC1B,6BAA6B;EAC7B,4BAA4B;AAC9B;;AAEA;EACE,yDAAyC;AAC3C;;AAEA;EACE,yDAAyC;AAC3C;;AAEA;EACE,yDAA0C;AAC5C;;AAEA;EACE,yDAAwC;EACxC,6BAA6B;AAC/B;;AAEA;EACE,yDAAwC;AAC1C;;AAEA;EACE,yDAA2C;AAC7C;;AAEA;EACE,oBAAoB;EACpB,aAAa;;EAEb;IACE,YAAY;IACZ,uBAAuB;IACvB,kBAAkB;IAClB,mCAAmC;IACnC,YAAY;EACd;;EAEA;IACE,sBAAsB;IACtB,YAAY;IACZ,4BAA4B;EAC9B;AACF;;AAEA;EACE,gBAAgB;EAChB,aAAa;EACb,YAAY;EACZ,kBAAkB;EAClB,mCAAmC;EACnC,YAAY;AACd;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,YAAY;EACZ,oBAAoB;EACpB,gBAAgB;EAChB,kBAAkB;EAClB,WAAW;EACX,YAAY;EACZ,iBAAiB;EACjB,2BAA2B;AAC7B;;AAEA;EACE,YAAY;EACZ,gBAAgB;EAChB,iBAAiB;EACjB,yBAAyB;EACzB,mBAAmB;EACnB,aAAa;EACb,qDAAqD;EACrD,gBAAgB;EAChB,mBAAmB;EACnB,iBAAiB;EACjB,mCAAmC;EACnC,YAAY;;EAEZ;IACE,kCAAkC;IAClC,iBAAiB;IACjB,2BAA2B;IAC3B,oBAAoB;EACtB;;EAEA;IACE,kCAAkC;IAClC,eAAe;IACf,yBAAyB;;IAEzB;MACE,iBAAiB;MACjB,wBAAwB;IAC1B;EACF;;EAEA;IACE,kCAAkC;IAClC,iBAAiB;IACjB,4BAA4B;EAC9B;AACF","sourcesContent":["@font-face {\n  font-family: poppins-bold;\n  src: url(./fonts/Poppins-Bold.ttf);\n}\n\n@font-face {\n  font-family: poppins-medium;\n  src: url(./fonts/Poppins-Medium.ttf);\n}\n\n@font-face {\n  font-family: poppins-regular;\n  src: url(./fonts/Poppins-Regular.ttf);\n}\n\n@font-face {\n  font-family: poppins-light;\n  src: url(./fonts/Poppins-Light.ttf);\n}\n\nbody {\n  width: 100vw;\n  height: 100vh;\n  padding: 0;\n  margin: 0;\n  position: fixed;\n  overflow: hidden;\n\n  display: flex;\n  flex-direction: column;\n\n  font-family: poppins-light;\n  background-size: 1500px 100vh;\n  background-attachment: fixed;\n}\n\nbody[data-condition='sunny'] {\n  background-image: url(./images/sunny.jpg);\n}\n\nbody[data-condition='clear'] {\n  background-image: url(./images/clear.jpg);\n}\n\nbody[data-condition='cloudy'] {\n  background-image: url(./images/cloudy.jpg);\n}\n\nbody[data-condition='rain'] {\n  background-image: url(./images/rain.jpg);\n  background-size: 1500px 180vh;\n}\n\nbody[data-condition='snow'] {\n  background-image: url(./images/snow.jpg);\n}\n\nbody[data-condition='thunder'] {\n  background-image: url(./images/thunder.jpg);\n}\n\nform {\n  align-self: flex-end;\n  padding: 20px;\n\n  input {\n    width: 200px;\n    border: 1px solid white;\n    border-radius: 5px;\n    background-color: rgba(0 0 0 / 0.4);\n    color: white;\n  }\n\n  input, button {\n    box-sizing: border-box;\n    height: 28px;\n    font-family: poppins-regular;\n  }\n}\n\nbutton {\n  appearance: none;\n  outline: none;\n  border: none;\n  border-radius: 4px;\n  background-color: rgba(0 0 0 / 0.4);\n  color: white;\n}\n\nbutton:hover {\n  cursor: pointer;\n}\n\n#temperature-unit-button {\n  flex-grow: 0;\n  align-self: flex-end;\n  margin-top: -8px;\n  margin-right: 20px;\n  width: 36px;\n  height: 32px;\n  font-size: 1.2rem;\n  font-family: poppins-medium;\n}\n\n#info-container {\n  width: 370px;\n  margin-top: 64px;\n  margin-left: 36px;\n  padding: 20px 0 20px 24px;\n  border-radius: 15px;\n  display: grid;\n  grid-template: 24px 96px repeat(3, 36px) / 96px 240px;\n  column-gap: 28px;\n  align-items: center;\n  font-size: 1.1rem;\n  background-color: rgba(0 0 0 / 0.7);\n  color: white;\n\n  #city {\n    grid-area: 2 / 1 / span 1 / span 2;\n    font-size: 1.6rem;\n    font-family: poppins-medium;\n    padding-bottom: 14px;\n  }\n\n  #temperature {\n    grid-area: 3 / 1 / span 3 / span 1;\n    font-size: 4rem;\n    font-family: poppins-bold;\n\n    .temperature-unit {\n      font-size: 1.2rem;\n      vertical-align: text-top;\n    }\n  }\n\n  #condition {\n    grid-area: 1 / 1 / span 1 / span 2;\n    font-size: 1.4rem;\n    font-family: poppins-regular;\n  }\n}"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQzVEYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2FwaS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy93ZWF0aGVyLXBhZ2UuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9zdHlsZS5jc3M/NzE2MyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGZldGNoV2VhdGhlckRhdGEgPSBhc3luYyBmdW5jdGlvbihjaXR5TmFtZSkge1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGBodHRwczovL2FwaS53ZWF0aGVyYXBpLmNvbS92MS9jdXJyZW50Lmpzb24/a2V5PTYyZjJhMzkxNTc5ODQzYjQ5NDQxNTUxMDkyNDE5MDMmcT0ke2NpdHlOYW1lfWApO1xuICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICByZXR1cm4gZGF0YTtcbn07XG5cbmNvbnN0IHByb2Nlc3NXZWF0aGVyRGF0YSA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgY29uc3QgY2l0eU5hbWUgPSBkYXRhLmxvY2F0aW9uLm5hbWU7XG4gIGNvbnN0IGNvdW50cnlOYW1lID0gZGF0YS5sb2NhdGlvbi5jb3VudHJ5O1xuICBjb25zdCBjZWxzaXVzVGVtcCA9IE1hdGgucm91bmQoZGF0YS5jdXJyZW50LnRlbXBfYyk7XG4gIGNvbnN0IGZhaHJlbmhlaXRUZW1wID0gTWF0aC5yb3VuZChkYXRhLmN1cnJlbnQudGVtcF9mKTtcbiAgY29uc3QgY2Vsc2l1c0ZlZWxzTGlrZSA9IE1hdGgucm91bmQoZGF0YS5jdXJyZW50LmZlZWxzbGlrZV9jKTtcbiAgY29uc3QgZmFocmVuaGVpdEZlZWxzTGlrZSA9IE1hdGgucm91bmQoZGF0YS5jdXJyZW50LmZlZWxzbGlrZV9mKTtcbiAgY29uc3Qgd2luZFNwZWVkS3BoID0gZGF0YS5jdXJyZW50LndpbmRfa3BoO1xuICBjb25zdCB3aW5kU3BlZWRNcGggPSBkYXRhLmN1cnJlbnQud2luZF9tcGg7XG4gIGNvbnN0IGh1bWlkaXR5ID0gZGF0YS5jdXJyZW50Lmh1bWlkaXR5O1xuICBjb25zdCBjb25kaXRpb24gPSBkYXRhLmN1cnJlbnQuY29uZGl0aW9uLnRleHQ7XG5cbiAgcmV0dXJuIHsgY2l0eU5hbWUsIGNvdW50cnlOYW1lLCBjZWxzaXVzVGVtcCwgZmFocmVuaGVpdFRlbXAsIGNlbHNpdXNGZWVsc0xpa2UsIGZhaHJlbmhlaXRGZWVsc0xpa2UsIHdpbmRTcGVlZEtwaCwgd2luZFNwZWVkTXBoLCBodW1pZGl0eSwgY29uZGl0aW9uIH07XG59O1xuXG5jb25zdCBnZXRXZWF0aGVySW5mbyA9IGFzeW5jIGZ1bmN0aW9uKGNpdHlOYW1lKSB7XG4gIGNvbnN0IGNpdHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2l0eScpO1xuICBjb25zdCB0ZW1wZXJhdHVyZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0ZW1wZXJhdHVyZScpO1xuICBjb25zdCBmZWVsc0xpa2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmVlbHMtbGlrZScpO1xuICBjb25zdCB3aW5kU3BlZWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd2luZCcpO1xuICBjb25zdCBodW1pZGl0eSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdodW1pZGl0eScpO1xuICBjb25zdCBjb25kaXRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29uZGl0aW9uJyk7XG5cbiAgY2l0eS50ZXh0Q29udGVudCA9ICcnO1xuICB0ZW1wZXJhdHVyZS50ZXh0Q29udGVudCA9ICcnO1xuICBmZWVsc0xpa2UudGV4dENvbnRlbnQgPSAnJztcbiAgd2luZFNwZWVkLnRleHRDb250ZW50ID0gJyc7XG4gIGh1bWlkaXR5LnRleHRDb250ZW50ID0gJyc7XG4gIGNvbmRpdGlvbi50ZXh0Q29udGVudCA9ICdMb2FkaW5nLi4uJztcbiAgY29uc3QgZGF0YSA9IGF3YWl0IGZldGNoV2VhdGhlckRhdGEoY2l0eU5hbWUpO1xuICBjb25zdCB3ZWF0aGVySW5mbyA9IHByb2Nlc3NXZWF0aGVyRGF0YShkYXRhKTtcbiAgcmV0dXJuIHdlYXRoZXJJbmZvO1xufVxuXG5leHBvcnQgeyBnZXRXZWF0aGVySW5mbyB9OyIsImltcG9ydCBpbml0V2VhdGhlclBhZ2UgZnJvbSAnLi93ZWF0aGVyLXBhZ2UnO1xuaW1wb3J0ICcuL3N0eWxlLmNzcyc7XG5cbmluaXRXZWF0aGVyUGFnZSgpO1xuIiwiaW1wb3J0IHsgZ2V0V2VhdGhlckluZm8gfSBmcm9tICcuL2FwaSc7XG5cbmNvbnN0IGluaXQgPSBmdW5jdGlvbigpIHtcbiAgY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcbiAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2l0eS1uYW1lJyk7XG4gIGNvbnN0IHNlYXJjaEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWFyY2gtYnV0dG9uJyk7XG4gIGNvbnN0IHRlbXBVbml0QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RlbXBlcmF0dXJlLXVuaXQtYnV0dG9uJyk7XG4gIGNvbnN0IGNpdHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2l0eScpO1xuICBjb25zdCB0ZW1wZXJhdHVyZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0ZW1wZXJhdHVyZScpO1xuICBjb25zdCBmZWVsc0xpa2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmVlbHMtbGlrZScpO1xuICBjb25zdCB3aW5kU3BlZWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd2luZCcpO1xuICBjb25zdCBodW1pZGl0eSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdodW1pZGl0eScpO1xuICBjb25zdCBjb25kaXRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29uZGl0aW9uJyk7XG5cbiAgY29uc3QgYWRkRXZlbnRzID0gZnVuY3Rpb24oKSB7XG5cbiAgICBzZWFyY2hCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgIGdldFdlYXRoZXJJbmZvKGlucHV0LnZhbHVlKVxuICAgICAgICAudGhlbihmdW5jdGlvbihyZXNvbHZlKSB7XG4gICAgICAgICAgZGlzcGxheVdlYXRoZXJJbmZvKHJlc29sdmUsIHRlbXBVbml0QnV0dG9uLmRhdGFzZXQudW5pdCk7XG4gICAgICAgICAgc2VhcmNoQnV0dG9uLnNldEF0dHJpYnV0ZSgnZGF0YS13ZWF0aGVyLWluZm8nLCBKU09OLnN0cmluZ2lmeShyZXNvbHZlKSk7XG4gICAgICB9KTtcbiAgICAgIGlucHV0LnZhbHVlID0gJyc7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0pXG5cbiAgICB0ZW1wVW5pdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgaWYgKHRlbXBVbml0QnV0dG9uLmdldEF0dHJpYnV0ZSgnZGF0YS11bml0JykgPT09ICdjZWxzaXVzJykge1xuICAgICAgICB0ZW1wVW5pdEJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2RhdGEtdW5pdCcsICdmYWhyZW5oZWl0Jyk7XG4gICAgICAgIHRlbXBVbml0QnV0dG9uLnRleHRDb250ZW50ID0gJ8KwRic7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0ZW1wVW5pdEJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2RhdGEtdW5pdCcsICdjZWxzaXVzJyk7XG4gICAgICAgIHRlbXBVbml0QnV0dG9uLnRleHRDb250ZW50ID0gJ8KwQyc7XG4gICAgICB9XG4gICAgICBpZiAoc2VhcmNoQnV0dG9uLmRhdGFzZXQud2VhdGhlckluZm8gIT09ICcnKSB7ZGlzcGxheVdlYXRoZXJJbmZvKEpTT04ucGFyc2Uoc2VhcmNoQnV0dG9uLmRhdGFzZXQud2VhdGhlckluZm8pLCB0ZW1wVW5pdEJ1dHRvbi5kYXRhc2V0LnVuaXQpfTtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSlcbiAgfVxuXG4gIGNvbnN0IGRpc3BsYXlXZWF0aGVySW5mbyA9IGZ1bmN0aW9uKGRhdGEsIHVuaXQpIHtcbiAgICBpZiAodW5pdCA9PT0gJ2NlbHNpdXMnKSB7XG4gICAgICBkaXNwbGF5V2VhdGhlckluZm9JbkNlbHNpdXMoZGF0YSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRpc3BsYXlXZWF0aGVySW5mb0luRmFocmVuaGVpdChkYXRhKTtcbiAgICB9O1xuICAgIHNldEJhY2tncm91bmQoZGF0YS5jb25kaXRpb24pO1xuICB9XG5cbiAgY29uc3QgZGlzcGxheVdlYXRoZXJJbmZvSW5DZWxzaXVzID0gZnVuY3Rpb24oZGF0YSkge1xuICAgIGNpdHkudGV4dENvbnRlbnQgPSBgJHtkYXRhLmNpdHlOYW1lfSwgJHtkYXRhLmNvdW50cnlOYW1lfWA7XG4gICAgdGVtcGVyYXR1cmUuaW5uZXJIVE1MID0gYFxuICAgICAgJHtkYXRhLmNlbHNpdXNUZW1wfTxzcGFuIGNsYXNzPSd0ZW1wZXJhdHVyZS11bml0Jz7CsEM8L3NwYW4+XG4gICAgYDtcbiAgICBmZWVsc0xpa2UuaW5uZXJIVE1MID0gYFxuICAgICAgRmVlbHMgbGlrZTogJHtkYXRhLmNlbHNpdXNGZWVsc0xpa2V9PHNwYW4gY2xhc3M9J3RlbXBlcmF0dXJlLXVuaXQnPiDCsEM8L3NwYW4+XG4gICAgYDtcbiAgICB3aW5kU3BlZWQudGV4dENvbnRlbnQgPSBgV2luZDogJHtkYXRhLndpbmRTcGVlZEtwaH0ga3BoYDtcbiAgICBodW1pZGl0eS50ZXh0Q29udGVudCA9IGBIdW1pZGl0eTogJHtkYXRhLmh1bWlkaXR5fSVgO1xuICAgIGNvbmRpdGlvbi50ZXh0Q29udGVudCA9IGRhdGEuY29uZGl0aW9uO1xuICB9XG5cbiAgY29uc3QgZGlzcGxheVdlYXRoZXJJbmZvSW5GYWhyZW5oZWl0ID0gZnVuY3Rpb24oZGF0YSkge1xuICAgIGNpdHkudGV4dENvbnRlbnQgPSBgJHtkYXRhLmNpdHlOYW1lfSwgJHtkYXRhLmNvdW50cnlOYW1lfWA7XG4gICAgdGVtcGVyYXR1cmUuaW5uZXJIVE1MID0gYFxuICAgICAgJHtkYXRhLmZhaHJlbmhlaXRUZW1wfTxzcGFuIGNsYXNzPSd0ZW1wZXJhdHVyZS11bml0Jz7CsEY8L3NwYW4+XG4gICAgYDtcbiAgICBmZWVsc0xpa2UuaW5uZXJIVE1MID0gYFxuICAgICAgRmVlbHMgbGlrZTogJHtkYXRhLmZhaHJlbmhlaXRGZWVsc0xpa2V9PHNwYW4gY2xhc3M9J3RlbXBlcmF0dXJlLXVuaXQnPiDCsEY8L3NwYW4+XG4gICAgYDtcbiAgICB3aW5kU3BlZWQudGV4dENvbnRlbnQgPSBgV2luZDogJHtkYXRhLndpbmRTcGVlZE1waH0gbXBoYDtcbiAgICBodW1pZGl0eS50ZXh0Q29udGVudCA9IGBIdW1pZGl0eTogJHtkYXRhLmh1bWlkaXR5fSVgO1xuICAgIGNvbmRpdGlvbi50ZXh0Q29udGVudCA9IGRhdGEuY29uZGl0aW9uO1xuICB9XG5cbiAgY29uc3Qgc2V0QmFja2dyb3VuZCA9IGZ1bmN0aW9uKGNvbmRpdGlvbikge1xuICAgIHN3aXRjaCAoY29uZGl0aW9uKSB7XG4gICAgICBjYXNlICdTdW5ueSc6XG4gICAgICAgIGJvZHkuZGF0YXNldC5jb25kaXRpb24gPSAnc3VubnknO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ0NsZWFyJzpcbiAgICAgICAgYm9keS5kYXRhc2V0LmNvbmRpdGlvbiA9ICdjbGVhcic7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnUGFydGx5IGNsb3VkeSc6XG4gICAgICBjYXNlICdDbG91ZHknOlxuICAgICAgY2FzZSAnT3ZlcmNhc3QnOlxuICAgICAgY2FzZSAnRm9nJzpcbiAgICAgIGNhc2UgJ01pc3QnOlxuICAgICAgICBib2R5LmRhdGFzZXQuY29uZGl0aW9uID0gJ2Nsb3VkeSc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnUGF0Y2h5IHJhaW4gcG9zc2libGUnOlxuICAgICAgY2FzZSAnUGF0Y2h5IGxpZ2h0IGRyaXp6bGUnOlxuICAgICAgY2FzZSAnTGlnaHQgZHJpenpsZSc6XG4gICAgICBjYXNlICdGcmVlemluZyBkcml6emxlJzpcbiAgICAgIGNhc2UgJ0hlYXZ5IGZyZWV6aW5nIGRyaXp6bGUnOlxuICAgICAgY2FzZSAnUGF0Y2h5IGxpZ2h0IHJhaW4nOlxuICAgICAgY2FzZSAnTGlnaHQgcmFpbic6XG4gICAgICBjYXNlICdNb2RlcmF0ZSByYWluIGF0IGFsbCB0aW1lcyc6XG4gICAgICBjYXNlICdNb2RlcmF0ZSByYWluJzpcbiAgICAgIGNhc2UgJ0hlYXZ5IHJhaW4gYXQgdGltZXMnOlxuICAgICAgY2FzZSAnSGVhdnkgcmFpbic6XG4gICAgICBjYXNlICdMaWdodCBmcmVlemluZyByYWluJzpcbiAgICAgIGNhc2UgJ01vZGVyYXRlIG9yIGhlYXZ5IGZyZWV6aW5nIHJhaW4nOlxuICAgICAgY2FzZSAnUGF0Y2h5IGZyZWV6aW5nIGRyaXp6bGUgcG9zc2libGUnOlxuICAgICAgY2FzZSAnTGlnaHQgcmFpbiBzaG93ZXInOlxuICAgICAgY2FzZSAnTW9kZXJhdGUgb3IgaGVhdnkgcmFpbiBzaG93ZXInOlxuICAgICAgY2FzZSAnVG9ycmVudGlhbCByYWluIHNob3dlcic6XG4gICAgICAgIGJvZHkuZGF0YXNldC5jb25kaXRpb24gPSAncmFpbic7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnUGF0Y2h5IHNub3cgcG9zc2libGUnOlxuICAgICAgY2FzZSAnUGF0Y2h5IHNsZWV0IHBvc3NpYmxlJzpcbiAgICAgIGNhc2UgJ0Jsb3dpbmcgc25vdyc6XG4gICAgICBjYXNlICdCbGl6emFyZCc6XG4gICAgICBjYXNlICdGcmVlemluZyBmb2cnOlxuICAgICAgY2FzZSAnTGlnaHQgc2xlZXQnOlxuICAgICAgY2FzZSAnTW9kZXJhdGUgb3IgaGVhdnkgc2xlZXQnOlxuICAgICAgY2FzZSAnUGF0Y2h5IGxpZ2h0IHNub3cnOlxuICAgICAgY2FzZSAnTGlnaHQgc25vdyc6XG4gICAgICBjYXNlICdNb2RlcmF0ZSBzbm93JzpcbiAgICAgIGNhc2UgJ1BhdGNoeSBoZWF2eSBzbm93JzpcbiAgICAgIGNhc2UgJ0hlYXZ5IHNub3cnOlxuICAgICAgY2FzZSAnSWNlIHBlbGxldHMnOlxuICAgICAgY2FzZSAnTGlnaHQgc2xlZXQgc2hvd2Vycyc6XG4gICAgICBjYXNlICdNb2RlcmF0ZSBvciBoZWF2eSBzbGVldCBzaG93ZXJzJzpcbiAgICAgIGNhc2UgJ0xpZ2h0IHNub3cgc2hvd2Vycyc6XG4gICAgICBjYXNlICdNb2RlcmF0ZSBvciBoZWF2eSBzbm93IHNob3dlcnMnOlxuICAgICAgY2FzZSAnTGlnaHQgc2hvd2VycyBvZiBpY2UgcGVsbGV0cyc6XG4gICAgICBjYXNlICdNb2RlcmF0ZSBvciBoZWF2eSBzaG93ZXJzIG9mIGljZSBwZWxsZXRzJzpcbiAgICAgICAgYm9keS5kYXRhc2V0LmNvbmRpdGlvbiA9ICdzbm93JztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdUaHVuZGVyeSBvdXRicmVha3MgcG9zc2libGUnOlxuICAgICAgY2FzZSAnUGF0Y2h5IGxpZ2h0IHJhaW4gd2l0aCB0aHVuZGVyJzpcbiAgICAgIGNhc2UgJ01vZGVyYXRlIG9yIGhlYXZ5IHJhaW4gd2l0aCB0aHVuZGVyJzpcbiAgICAgIGNhc2UgJ1BhdGNoeSBsaWdodCBzbm93IHdpdGggdGh1bmRlcic6XG4gICAgICBjYXNlICdNb2RlcmF0ZSBvciBoZWF2eSBzbm93IHdpdGggdGh1bmRlcic6XG4gICAgICAgIGJvZHkuZGF0YXNldC5jb25kaXRpb24gPSAndGh1bmRlcic7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIGdldFdlYXRoZXJJbmZvKCdqYWthcnRhJylcbiAgICAudGhlbihmdW5jdGlvbihyZXNvbHZlKSB7XG4gICAgICBkaXNwbGF5V2VhdGhlckluZm8ocmVzb2x2ZSwgdGVtcFVuaXRCdXR0b24uZGF0YXNldC51bml0KTtcbiAgICAgIHNlYXJjaEJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2RhdGEtd2VhdGhlci1pbmZvJywgSlNPTi5zdHJpbmdpZnkocmVzb2x2ZSkpO1xuICAgIH0pO1xuICBhZGRFdmVudHMoKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdDsiLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18gPSBuZXcgVVJMKFwiLi9mb250cy9Qb3BwaW5zLUJvbGQudHRmXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzFfX18gPSBuZXcgVVJMKFwiLi9mb250cy9Qb3BwaW5zLU1lZGl1bS50dGZcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMl9fXyA9IG5ldyBVUkwoXCIuL2ZvbnRzL1BvcHBpbnMtUmVndWxhci50dGZcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfM19fXyA9IG5ldyBVUkwoXCIuL2ZvbnRzL1BvcHBpbnMtTGlnaHQudHRmXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzRfX18gPSBuZXcgVVJMKFwiLi9pbWFnZXMvc3VubnkuanBnXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzVfX18gPSBuZXcgVVJMKFwiLi9pbWFnZXMvY2xlYXIuanBnXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzZfX18gPSBuZXcgVVJMKFwiLi9pbWFnZXMvY2xvdWR5LmpwZ1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF83X19fID0gbmV3IFVSTChcIi4vaW1hZ2VzL3JhaW4uanBnXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzhfX18gPSBuZXcgVVJMKFwiLi9pbWFnZXMvc25vdy5qcGdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfOV9fXyA9IG5ldyBVUkwoXCIuL2ltYWdlcy90aHVuZGVyLmpwZ1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMV9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMl9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzJfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzNfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8zX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF80X19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfNF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfNV9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzVfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzZfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF82X19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF83X19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfN19fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfOF9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzhfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzlfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF85X19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgQGZvbnQtZmFjZSB7XG4gIGZvbnQtZmFtaWx5OiBwb3BwaW5zLWJvbGQ7XG4gIHNyYzogdXJsKCR7X19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fX30pO1xufVxuXG5AZm9udC1mYWNlIHtcbiAgZm9udC1mYW1pbHk6IHBvcHBpbnMtbWVkaXVtO1xuICBzcmM6IHVybCgke19fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzFfX199KTtcbn1cblxuQGZvbnQtZmFjZSB7XG4gIGZvbnQtZmFtaWx5OiBwb3BwaW5zLXJlZ3VsYXI7XG4gIHNyYzogdXJsKCR7X19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMl9fX30pO1xufVxuXG5AZm9udC1mYWNlIHtcbiAgZm9udC1mYW1pbHk6IHBvcHBpbnMtbGlnaHQ7XG4gIHNyYzogdXJsKCR7X19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfM19fX30pO1xufVxuXG5ib2R5IHtcbiAgd2lkdGg6IDEwMHZ3O1xuICBoZWlnaHQ6IDEwMHZoO1xuICBwYWRkaW5nOiAwO1xuICBtYXJnaW46IDA7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcblxuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuXG4gIGZvbnQtZmFtaWx5OiBwb3BwaW5zLWxpZ2h0O1xuICBiYWNrZ3JvdW5kLXNpemU6IDE1MDBweCAxMDB2aDtcbiAgYmFja2dyb3VuZC1hdHRhY2htZW50OiBmaXhlZDtcbn1cblxuYm9keVtkYXRhLWNvbmRpdGlvbj0nc3VubnknXSB7XG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybCgke19fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzRfX199KTtcbn1cblxuYm9keVtkYXRhLWNvbmRpdGlvbj0nY2xlYXInXSB7XG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybCgke19fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzVfX199KTtcbn1cblxuYm9keVtkYXRhLWNvbmRpdGlvbj0nY2xvdWR5J10ge1xuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJHtfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF82X19ffSk7XG59XG5cbmJvZHlbZGF0YS1jb25kaXRpb249J3JhaW4nXSB7XG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybCgke19fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzdfX199KTtcbiAgYmFja2dyb3VuZC1zaXplOiAxNTAwcHggMTgwdmg7XG59XG5cbmJvZHlbZGF0YS1jb25kaXRpb249J3Nub3cnXSB7XG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybCgke19fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzhfX199KTtcbn1cblxuYm9keVtkYXRhLWNvbmRpdGlvbj0ndGh1bmRlciddIHtcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCR7X19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfOV9fX30pO1xufVxuXG5mb3JtIHtcbiAgYWxpZ24tc2VsZjogZmxleC1lbmQ7XG4gIHBhZGRpbmc6IDIwcHg7XG5cbiAgaW5wdXQge1xuICAgIHdpZHRoOiAyMDBweDtcbiAgICBib3JkZXI6IDFweCBzb2xpZCB3aGl0ZTtcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwIDAgMCAvIDAuNCk7XG4gICAgY29sb3I6IHdoaXRlO1xuICB9XG5cbiAgaW5wdXQsIGJ1dHRvbiB7XG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICBoZWlnaHQ6IDI4cHg7XG4gICAgZm9udC1mYW1pbHk6IHBvcHBpbnMtcmVndWxhcjtcbiAgfVxufVxuXG5idXR0b24ge1xuICBhcHBlYXJhbmNlOiBub25lO1xuICBvdXRsaW5lOiBub25lO1xuICBib3JkZXI6IG5vbmU7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwIDAgMCAvIDAuNCk7XG4gIGNvbG9yOiB3aGl0ZTtcbn1cblxuYnV0dG9uOmhvdmVyIHtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4jdGVtcGVyYXR1cmUtdW5pdC1idXR0b24ge1xuICBmbGV4LWdyb3c6IDA7XG4gIGFsaWduLXNlbGY6IGZsZXgtZW5kO1xuICBtYXJnaW4tdG9wOiAtOHB4O1xuICBtYXJnaW4tcmlnaHQ6IDIwcHg7XG4gIHdpZHRoOiAzNnB4O1xuICBoZWlnaHQ6IDMycHg7XG4gIGZvbnQtc2l6ZTogMS4ycmVtO1xuICBmb250LWZhbWlseTogcG9wcGlucy1tZWRpdW07XG59XG5cbiNpbmZvLWNvbnRhaW5lciB7XG4gIHdpZHRoOiAzNzBweDtcbiAgbWFyZ2luLXRvcDogNjRweDtcbiAgbWFyZ2luLWxlZnQ6IDM2cHg7XG4gIHBhZGRpbmc6IDIwcHggMCAyMHB4IDI0cHg7XG4gIGJvcmRlci1yYWRpdXM6IDE1cHg7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGU6IDI0cHggOTZweCByZXBlYXQoMywgMzZweCkgLyA5NnB4IDI0MHB4O1xuICBjb2x1bW4tZ2FwOiAyOHB4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBmb250LXNpemU6IDEuMXJlbTtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwIDAgMCAvIDAuNyk7XG4gIGNvbG9yOiB3aGl0ZTtcblxuICAjY2l0eSB7XG4gICAgZ3JpZC1hcmVhOiAyIC8gMSAvIHNwYW4gMSAvIHNwYW4gMjtcbiAgICBmb250LXNpemU6IDEuNnJlbTtcbiAgICBmb250LWZhbWlseTogcG9wcGlucy1tZWRpdW07XG4gICAgcGFkZGluZy1ib3R0b206IDE0cHg7XG4gIH1cblxuICAjdGVtcGVyYXR1cmUge1xuICAgIGdyaWQtYXJlYTogMyAvIDEgLyBzcGFuIDMgLyBzcGFuIDE7XG4gICAgZm9udC1zaXplOiA0cmVtO1xuICAgIGZvbnQtZmFtaWx5OiBwb3BwaW5zLWJvbGQ7XG5cbiAgICAudGVtcGVyYXR1cmUtdW5pdCB7XG4gICAgICBmb250LXNpemU6IDEuMnJlbTtcbiAgICAgIHZlcnRpY2FsLWFsaWduOiB0ZXh0LXRvcDtcbiAgICB9XG4gIH1cblxuICAjY29uZGl0aW9uIHtcbiAgICBncmlkLWFyZWE6IDEgLyAxIC8gc3BhbiAxIC8gc3BhbiAyO1xuICAgIGZvbnQtc2l6ZTogMS40cmVtO1xuICAgIGZvbnQtZmFtaWx5OiBwb3BwaW5zLXJlZ3VsYXI7XG4gIH1cbn1gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSx5QkFBeUI7RUFDekIsNENBQWtDO0FBQ3BDOztBQUVBO0VBQ0UsMkJBQTJCO0VBQzNCLDRDQUFvQztBQUN0Qzs7QUFFQTtFQUNFLDRCQUE0QjtFQUM1Qiw0Q0FBcUM7QUFDdkM7O0FBRUE7RUFDRSwwQkFBMEI7RUFDMUIsNENBQW1DO0FBQ3JDOztBQUVBO0VBQ0UsWUFBWTtFQUNaLGFBQWE7RUFDYixVQUFVO0VBQ1YsU0FBUztFQUNULGVBQWU7RUFDZixnQkFBZ0I7O0VBRWhCLGFBQWE7RUFDYixzQkFBc0I7O0VBRXRCLDBCQUEwQjtFQUMxQiw2QkFBNkI7RUFDN0IsNEJBQTRCO0FBQzlCOztBQUVBO0VBQ0UseURBQXlDO0FBQzNDOztBQUVBO0VBQ0UseURBQXlDO0FBQzNDOztBQUVBO0VBQ0UseURBQTBDO0FBQzVDOztBQUVBO0VBQ0UseURBQXdDO0VBQ3hDLDZCQUE2QjtBQUMvQjs7QUFFQTtFQUNFLHlEQUF3QztBQUMxQzs7QUFFQTtFQUNFLHlEQUEyQztBQUM3Qzs7QUFFQTtFQUNFLG9CQUFvQjtFQUNwQixhQUFhOztFQUViO0lBQ0UsWUFBWTtJQUNaLHVCQUF1QjtJQUN2QixrQkFBa0I7SUFDbEIsbUNBQW1DO0lBQ25DLFlBQVk7RUFDZDs7RUFFQTtJQUNFLHNCQUFzQjtJQUN0QixZQUFZO0lBQ1osNEJBQTRCO0VBQzlCO0FBQ0Y7O0FBRUE7RUFDRSxnQkFBZ0I7RUFDaEIsYUFBYTtFQUNiLFlBQVk7RUFDWixrQkFBa0I7RUFDbEIsbUNBQW1DO0VBQ25DLFlBQVk7QUFDZDs7QUFFQTtFQUNFLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxZQUFZO0VBQ1osb0JBQW9CO0VBQ3BCLGdCQUFnQjtFQUNoQixrQkFBa0I7RUFDbEIsV0FBVztFQUNYLFlBQVk7RUFDWixpQkFBaUI7RUFDakIsMkJBQTJCO0FBQzdCOztBQUVBO0VBQ0UsWUFBWTtFQUNaLGdCQUFnQjtFQUNoQixpQkFBaUI7RUFDakIseUJBQXlCO0VBQ3pCLG1CQUFtQjtFQUNuQixhQUFhO0VBQ2IscURBQXFEO0VBQ3JELGdCQUFnQjtFQUNoQixtQkFBbUI7RUFDbkIsaUJBQWlCO0VBQ2pCLG1DQUFtQztFQUNuQyxZQUFZOztFQUVaO0lBQ0Usa0NBQWtDO0lBQ2xDLGlCQUFpQjtJQUNqQiwyQkFBMkI7SUFDM0Isb0JBQW9CO0VBQ3RCOztFQUVBO0lBQ0Usa0NBQWtDO0lBQ2xDLGVBQWU7SUFDZix5QkFBeUI7O0lBRXpCO01BQ0UsaUJBQWlCO01BQ2pCLHdCQUF3QjtJQUMxQjtFQUNGOztFQUVBO0lBQ0Usa0NBQWtDO0lBQ2xDLGlCQUFpQjtJQUNqQiw0QkFBNEI7RUFDOUI7QUFDRlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCJAZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiBwb3BwaW5zLWJvbGQ7XFxuICBzcmM6IHVybCguL2ZvbnRzL1BvcHBpbnMtQm9sZC50dGYpO1xcbn1cXG5cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiBwb3BwaW5zLW1lZGl1bTtcXG4gIHNyYzogdXJsKC4vZm9udHMvUG9wcGlucy1NZWRpdW0udHRmKTtcXG59XFxuXFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogcG9wcGlucy1yZWd1bGFyO1xcbiAgc3JjOiB1cmwoLi9mb250cy9Qb3BwaW5zLVJlZ3VsYXIudHRmKTtcXG59XFxuXFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogcG9wcGlucy1saWdodDtcXG4gIHNyYzogdXJsKC4vZm9udHMvUG9wcGlucy1MaWdodC50dGYpO1xcbn1cXG5cXG5ib2R5IHtcXG4gIHdpZHRoOiAxMDB2dztcXG4gIGhlaWdodDogMTAwdmg7XFxuICBwYWRkaW5nOiAwO1xcbiAgbWFyZ2luOiAwO1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG5cXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcblxcbiAgZm9udC1mYW1pbHk6IHBvcHBpbnMtbGlnaHQ7XFxuICBiYWNrZ3JvdW5kLXNpemU6IDE1MDBweCAxMDB2aDtcXG4gIGJhY2tncm91bmQtYXR0YWNobWVudDogZml4ZWQ7XFxufVxcblxcbmJvZHlbZGF0YS1jb25kaXRpb249J3N1bm55J10ge1xcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKC4vaW1hZ2VzL3N1bm55LmpwZyk7XFxufVxcblxcbmJvZHlbZGF0YS1jb25kaXRpb249J2NsZWFyJ10ge1xcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKC4vaW1hZ2VzL2NsZWFyLmpwZyk7XFxufVxcblxcbmJvZHlbZGF0YS1jb25kaXRpb249J2Nsb3VkeSddIHtcXG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybCguL2ltYWdlcy9jbG91ZHkuanBnKTtcXG59XFxuXFxuYm9keVtkYXRhLWNvbmRpdGlvbj0ncmFpbiddIHtcXG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybCguL2ltYWdlcy9yYWluLmpwZyk7XFxuICBiYWNrZ3JvdW5kLXNpemU6IDE1MDBweCAxODB2aDtcXG59XFxuXFxuYm9keVtkYXRhLWNvbmRpdGlvbj0nc25vdyddIHtcXG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybCguL2ltYWdlcy9zbm93LmpwZyk7XFxufVxcblxcbmJvZHlbZGF0YS1jb25kaXRpb249J3RodW5kZXInXSB7XFxuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoLi9pbWFnZXMvdGh1bmRlci5qcGcpO1xcbn1cXG5cXG5mb3JtIHtcXG4gIGFsaWduLXNlbGY6IGZsZXgtZW5kO1xcbiAgcGFkZGluZzogMjBweDtcXG5cXG4gIGlucHV0IHtcXG4gICAgd2lkdGg6IDIwMHB4O1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCB3aGl0ZTtcXG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAgMCAwIC8gMC40KTtcXG4gICAgY29sb3I6IHdoaXRlO1xcbiAgfVxcblxcbiAgaW5wdXQsIGJ1dHRvbiB7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAgIGhlaWdodDogMjhweDtcXG4gICAgZm9udC1mYW1pbHk6IHBvcHBpbnMtcmVndWxhcjtcXG4gIH1cXG59XFxuXFxuYnV0dG9uIHtcXG4gIGFwcGVhcmFuY2U6IG5vbmU7XFxuICBvdXRsaW5lOiBub25lO1xcbiAgYm9yZGVyOiBub25lO1xcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwIDAgMCAvIDAuNCk7XFxuICBjb2xvcjogd2hpdGU7XFxufVxcblxcbmJ1dHRvbjpob3ZlciB7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbiN0ZW1wZXJhdHVyZS11bml0LWJ1dHRvbiB7XFxuICBmbGV4LWdyb3c6IDA7XFxuICBhbGlnbi1zZWxmOiBmbGV4LWVuZDtcXG4gIG1hcmdpbi10b3A6IC04cHg7XFxuICBtYXJnaW4tcmlnaHQ6IDIwcHg7XFxuICB3aWR0aDogMzZweDtcXG4gIGhlaWdodDogMzJweDtcXG4gIGZvbnQtc2l6ZTogMS4ycmVtO1xcbiAgZm9udC1mYW1pbHk6IHBvcHBpbnMtbWVkaXVtO1xcbn1cXG5cXG4jaW5mby1jb250YWluZXIge1xcbiAgd2lkdGg6IDM3MHB4O1xcbiAgbWFyZ2luLXRvcDogNjRweDtcXG4gIG1hcmdpbi1sZWZ0OiAzNnB4O1xcbiAgcGFkZGluZzogMjBweCAwIDIwcHggMjRweDtcXG4gIGJvcmRlci1yYWRpdXM6IDE1cHg7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZTogMjRweCA5NnB4IHJlcGVhdCgzLCAzNnB4KSAvIDk2cHggMjQwcHg7XFxuICBjb2x1bW4tZ2FwOiAyOHB4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGZvbnQtc2l6ZTogMS4xcmVtO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwIDAgMCAvIDAuNyk7XFxuICBjb2xvcjogd2hpdGU7XFxuXFxuICAjY2l0eSB7XFxuICAgIGdyaWQtYXJlYTogMiAvIDEgLyBzcGFuIDEgLyBzcGFuIDI7XFxuICAgIGZvbnQtc2l6ZTogMS42cmVtO1xcbiAgICBmb250LWZhbWlseTogcG9wcGlucy1tZWRpdW07XFxuICAgIHBhZGRpbmctYm90dG9tOiAxNHB4O1xcbiAgfVxcblxcbiAgI3RlbXBlcmF0dXJlIHtcXG4gICAgZ3JpZC1hcmVhOiAzIC8gMSAvIHNwYW4gMyAvIHNwYW4gMTtcXG4gICAgZm9udC1zaXplOiA0cmVtO1xcbiAgICBmb250LWZhbWlseTogcG9wcGlucy1ib2xkO1xcblxcbiAgICAudGVtcGVyYXR1cmUtdW5pdCB7XFxuICAgICAgZm9udC1zaXplOiAxLjJyZW07XFxuICAgICAgdmVydGljYWwtYWxpZ246IHRleHQtdG9wO1xcbiAgICB9XFxuICB9XFxuXFxuICAjY29uZGl0aW9uIHtcXG4gICAgZ3JpZC1hcmVhOiAxIC8gMSAvIHNwYW4gMSAvIHNwYW4gMjtcXG4gICAgZm9udC1zaXplOiAxLjRyZW07XFxuICAgIGZvbnQtZmFtaWx5OiBwb3BwaW5zLXJlZ3VsYXI7XFxuICB9XFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMpIHtcbiAgaWYgKCFvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IHt9O1xuICB9XG4gIGlmICghdXJsKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuICB1cmwgPSBTdHJpbmcodXJsLl9fZXNNb2R1bGUgPyB1cmwuZGVmYXVsdCA6IHVybCk7XG5cbiAgLy8gSWYgdXJsIGlzIGFscmVhZHkgd3JhcHBlZCBpbiBxdW90ZXMsIHJlbW92ZSB0aGVtXG4gIGlmICgvXlsnXCJdLipbJ1wiXSQvLnRlc3QodXJsKSkge1xuICAgIHVybCA9IHVybC5zbGljZSgxLCAtMSk7XG4gIH1cbiAgaWYgKG9wdGlvbnMuaGFzaCkge1xuICAgIHVybCArPSBvcHRpb25zLmhhc2g7XG4gIH1cblxuICAvLyBTaG91bGQgdXJsIGJlIHdyYXBwZWQ/XG4gIC8vIFNlZSBodHRwczovL2RyYWZ0cy5jc3N3Zy5vcmcvY3NzLXZhbHVlcy0zLyN1cmxzXG4gIGlmICgvW1wiJygpIFxcdFxcbl18KCUyMCkvLnRlc3QodXJsKSB8fCBvcHRpb25zLm5lZWRRdW90ZXMpIHtcbiAgICByZXR1cm4gXCJcXFwiXCIuY29uY2F0KHVybC5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykucmVwbGFjZSgvXFxuL2csIFwiXFxcXG5cIiksIFwiXFxcIlwiKTtcbiAgfVxuICByZXR1cm4gdXJsO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07Il0sIm5hbWVzIjpbImZldGNoV2VhdGhlckRhdGEiLCJjaXR5TmFtZSIsInJlc3BvbnNlIiwiZmV0Y2giLCJkYXRhIiwianNvbiIsInByb2Nlc3NXZWF0aGVyRGF0YSIsImxvY2F0aW9uIiwibmFtZSIsImNvdW50cnlOYW1lIiwiY291bnRyeSIsImNlbHNpdXNUZW1wIiwiTWF0aCIsInJvdW5kIiwiY3VycmVudCIsInRlbXBfYyIsImZhaHJlbmhlaXRUZW1wIiwidGVtcF9mIiwiY2Vsc2l1c0ZlZWxzTGlrZSIsImZlZWxzbGlrZV9jIiwiZmFocmVuaGVpdEZlZWxzTGlrZSIsImZlZWxzbGlrZV9mIiwid2luZFNwZWVkS3BoIiwid2luZF9rcGgiLCJ3aW5kU3BlZWRNcGgiLCJ3aW5kX21waCIsImh1bWlkaXR5IiwiY29uZGl0aW9uIiwidGV4dCIsImdldFdlYXRoZXJJbmZvIiwiY2l0eSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJ0ZW1wZXJhdHVyZSIsImZlZWxzTGlrZSIsIndpbmRTcGVlZCIsInRleHRDb250ZW50Iiwid2VhdGhlckluZm8iLCJpbml0V2VhdGhlclBhZ2UiLCJpbml0IiwiYm9keSIsInF1ZXJ5U2VsZWN0b3IiLCJpbnB1dCIsInNlYXJjaEJ1dHRvbiIsInRlbXBVbml0QnV0dG9uIiwiYWRkRXZlbnRzIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50IiwidmFsdWUiLCJ0aGVuIiwicmVzb2x2ZSIsImRpc3BsYXlXZWF0aGVySW5mbyIsImRhdGFzZXQiLCJ1bml0Iiwic2V0QXR0cmlidXRlIiwiSlNPTiIsInN0cmluZ2lmeSIsInByZXZlbnREZWZhdWx0IiwiZ2V0QXR0cmlidXRlIiwicGFyc2UiLCJkaXNwbGF5V2VhdGhlckluZm9JbkNlbHNpdXMiLCJkaXNwbGF5V2VhdGhlckluZm9JbkZhaHJlbmhlaXQiLCJzZXRCYWNrZ3JvdW5kIiwiaW5uZXJIVE1MIl0sInNvdXJjZVJvb3QiOiIifQ==