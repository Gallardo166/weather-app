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
  const windSpeed = data.current.wind_kph;
  const humidity = data.current.humidity;
  const condition = data.current.condition.text;
  return {
    cityName,
    countryName,
    celsiusTemp,
    fahrenheitTemp,
    celsiusFeelsLike,
    fahrenheitFeelsLike,
    windSpeed,
    humidity,
    condition
  };
};
const getWeatherInfo = async function (cityName) {
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
  const cityName = document.getElementById('city');
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
    cityName.textContent = `${data.cityName}, ${data.countryName}`;
    temperature.innerHTML = `
      ${data.celsiusTemp}<span class='temperature-unit'>°C</span>
    `;
    feelsLike.innerHTML = `
      Feels like: ${data.celsiusFeelsLike}<span class='temperature-unit'> °C</span>
    `;
    windSpeed.textContent = `Wind: ${data.windSpeed} kph`;
    humidity.textContent = `Humidity: ${data.humidity}%`;
    condition.textContent = data.condition;
  };
  const displayWeatherInfoInFahrenheit = function (data) {
    cityName.textContent = `${data.cityName}, ${data.countryName}`;
    temperature.innerHTML = `
      ${data.fahrenheitTemp}<span class='temperature-unit'>°F</span>
    `;
    feelsLike.innerHTML = `
      Feels like: ${data.fahrenheitFeelsLike}<span class='temperature-unit'> °F</span>
    `;
    windSpeed.textContent = `Wind: ${data.windSpeed} kph`;
    humidity.textContent = `Humidity: ${data.humidity}%`;
    condition.textContent = data.condition;
  };
  const setBackground = function (condition) {
    switch (condition) {
      case 'Sunny':
        body.dataset.condition = 'sunny';
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
var ___CSS_LOADER_URL_IMPORT_5___ = new URL(/* asset import */ __webpack_require__(/*! ./images/cloudy.jpg */ "./src/images/cloudy.jpg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_6___ = new URL(/* asset import */ __webpack_require__(/*! ./images/rain.jpg */ "./src/images/rain.jpg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_7___ = new URL(/* asset import */ __webpack_require__(/*! ./images/snow.jpg */ "./src/images/snow.jpg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_8___ = new URL(/* asset import */ __webpack_require__(/*! ./images/thunder.jpg */ "./src/images/thunder.jpg"), __webpack_require__.b);
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

  display: flex;
  flex-direction: column;

  font-family: poppins-light;
  background-size: 1500px 100vh;
  background-attachment: fixed;
  background-position: 0 0;
}

body[data-condition='sunny'] {
  background-image: url(${___CSS_LOADER_URL_REPLACEMENT_4___});
}

body[data-condition='cloudy'] {
  background-image: url(${___CSS_LOADER_URL_REPLACEMENT_5___});
}

body[data-condition='rain'] {
  background-image: url(${___CSS_LOADER_URL_REPLACEMENT_6___});
}

body[data-condition='snow'] {
  background-image: url(${___CSS_LOADER_URL_REPLACEMENT_7___});
}

body[data-condition='thunder'] {
  background-image: url(${___CSS_LOADER_URL_REPLACEMENT_8___});
}

form {
  align-self: flex-end;
  padding: 20px;

  input {
    width: 200px;
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
  background-color: rgba(0 0 0 / 0.3);
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
  margin-top: 64px;
  padding-left: 124px;
  display: grid;
  grid-template: 24px 52px repeat(3, 36px) / 96px 240px;
  column-gap: 28px;
  align-items: center;
  font-size: 1.1rem;

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
}`, "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;EACE,yBAAyB;EACzB,4CAAkC;AACpC;;AAEA;EACE,2BAA2B;EAC3B,4CAAoC;AACtC;;AAEA;EACE,4BAA4B;EAC5B,4CAAqC;AACvC;;AAEA;EACE,0BAA0B;EAC1B,4CAAmC;AACrC;;AAEA;EACE,YAAY;EACZ,aAAa;EACb,UAAU;EACV,SAAS;EACT,eAAe;;EAEf,aAAa;EACb,sBAAsB;;EAEtB,0BAA0B;EAC1B,6BAA6B;EAC7B,4BAA4B;EAC5B,wBAAwB;AAC1B;;AAEA;EACE,yDAAyC;AAC3C;;AAEA;EACE,yDAA0C;AAC5C;;AAEA;EACE,yDAAwC;AAC1C;;AAEA;EACE,yDAAwC;AAC1C;;AAEA;EACE,yDAA2C;AAC7C;;AAEA;EACE,oBAAoB;EACpB,aAAa;;EAEb;IACE,YAAY;EACd;;EAEA;IACE,sBAAsB;IACtB,YAAY;IACZ,4BAA4B;EAC9B;AACF;;AAEA;EACE,gBAAgB;EAChB,aAAa;EACb,YAAY;EACZ,kBAAkB;EAClB,mCAAmC;EACnC,YAAY;AACd;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,YAAY;EACZ,oBAAoB;EACpB,gBAAgB;EAChB,kBAAkB;EAClB,WAAW;EACX,YAAY;EACZ,iBAAiB;EACjB,2BAA2B;AAC7B;;AAEA;EACE,gBAAgB;EAChB,mBAAmB;EACnB,aAAa;EACb,qDAAqD;EACrD,gBAAgB;EAChB,mBAAmB;EACnB,iBAAiB;;EAEjB;IACE,kCAAkC;IAClC,iBAAiB;IACjB,2BAA2B;IAC3B,oBAAoB;EACtB;;EAEA;IACE,kCAAkC;IAClC,eAAe;IACf,yBAAyB;;IAEzB;MACE,iBAAiB;MACjB,wBAAwB;IAC1B;EACF;;EAEA;IACE,kCAAkC;IAClC,iBAAiB;IACjB,4BAA4B;EAC9B;AACF","sourcesContent":["@font-face {\n  font-family: poppins-bold;\n  src: url(./fonts/Poppins-Bold.ttf);\n}\n\n@font-face {\n  font-family: poppins-medium;\n  src: url(./fonts/Poppins-Medium.ttf);\n}\n\n@font-face {\n  font-family: poppins-regular;\n  src: url(./fonts/Poppins-Regular.ttf);\n}\n\n@font-face {\n  font-family: poppins-light;\n  src: url(./fonts/Poppins-Light.ttf);\n}\n\nbody {\n  width: 100vw;\n  height: 100vh;\n  padding: 0;\n  margin: 0;\n  position: fixed;\n\n  display: flex;\n  flex-direction: column;\n\n  font-family: poppins-light;\n  background-size: 1500px 100vh;\n  background-attachment: fixed;\n  background-position: 0 0;\n}\n\nbody[data-condition='sunny'] {\n  background-image: url(./images/sunny.jpg);\n}\n\nbody[data-condition='cloudy'] {\n  background-image: url(./images/cloudy.jpg);\n}\n\nbody[data-condition='rain'] {\n  background-image: url(./images/rain.jpg);\n}\n\nbody[data-condition='snow'] {\n  background-image: url(./images/snow.jpg);\n}\n\nbody[data-condition='thunder'] {\n  background-image: url(./images/thunder.jpg);\n}\n\nform {\n  align-self: flex-end;\n  padding: 20px;\n\n  input {\n    width: 200px;\n  }\n\n  input, button {\n    box-sizing: border-box;\n    height: 28px;\n    font-family: poppins-regular;\n  }\n}\n\nbutton {\n  appearance: none;\n  outline: none;\n  border: none;\n  border-radius: 4px;\n  background-color: rgba(0 0 0 / 0.3);\n  color: white;\n}\n\nbutton:hover {\n  cursor: pointer;\n}\n\n#temperature-unit-button {\n  flex-grow: 0;\n  align-self: flex-end;\n  margin-top: -8px;\n  margin-right: 20px;\n  width: 36px;\n  height: 32px;\n  font-size: 1.2rem;\n  font-family: poppins-medium;\n}\n\n#info-container {\n  margin-top: 64px;\n  padding-left: 124px;\n  display: grid;\n  grid-template: 24px 52px repeat(3, 36px) / 96px 240px;\n  column-gap: 28px;\n  align-items: center;\n  font-size: 1.1rem;\n\n  #city {\n    grid-area: 2 / 1 / span 1 / span 2;\n    font-size: 1.6rem;\n    font-family: poppins-medium;\n    padding-bottom: 14px;\n  }\n\n  #temperature {\n    grid-area: 3 / 1 / span 3 / span 1;\n    font-size: 4rem;\n    font-family: poppins-bold;\n\n    .temperature-unit {\n      font-size: 1.2rem;\n      vertical-align: text-top;\n    }\n  }\n\n  #condition {\n    grid-area: 1 / 1 / span 1 / span 2;\n    font-size: 1.4rem;\n    font-family: poppins-regular;\n  }\n}"],"sourceRoot":""}]);
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

module.exports = __webpack_require__.p + "63a4e6a5b9fd87eaf5e6.jpg";

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUE2QjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ25GYTs7QUFFYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNqQ2E7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ1RhOztBQUViO0FBQ0E7QUFDQSxjQUFjLEtBQXdDLEdBQUcsc0JBQWlCLEdBQUcsQ0FBSTtBQUNqRjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDVGE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrREFBa0Q7QUFDbEQ7QUFDQTtBQUNBLDBDQUEwQztBQUMxQztBQUNBO0FBQ0E7QUFDQSxpRkFBaUY7QUFDakY7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSx5REFBeUQ7QUFDekQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUM1RGE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9hcGkuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvd2VhdGhlci1wYWdlLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvc3R5bGUuY3NzPzcxNjMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBmZXRjaFdlYXRoZXJEYXRhID0gYXN5bmMgZnVuY3Rpb24oY2l0eU5hbWUpIHtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgaHR0cHM6Ly9hcGkud2VhdGhlcmFwaS5jb20vdjEvY3VycmVudC5qc29uP2tleT02MmYyYTM5MTU3OTg0M2I0OTQ0MTU1MTA5MjQxOTAzJnE9JHtjaXR5TmFtZX1gKTtcbiAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgcmV0dXJuIGRhdGE7XG59O1xuXG5jb25zdCBwcm9jZXNzV2VhdGhlckRhdGEgPSBmdW5jdGlvbihkYXRhKSB7XG4gIGNvbnN0IGNpdHlOYW1lID0gZGF0YS5sb2NhdGlvbi5uYW1lO1xuICBjb25zdCBjb3VudHJ5TmFtZSA9IGRhdGEubG9jYXRpb24uY291bnRyeTtcbiAgY29uc3QgY2Vsc2l1c1RlbXAgPSBNYXRoLnJvdW5kKGRhdGEuY3VycmVudC50ZW1wX2MpO1xuICBjb25zdCBmYWhyZW5oZWl0VGVtcCA9IE1hdGgucm91bmQoZGF0YS5jdXJyZW50LnRlbXBfZik7XG4gIGNvbnN0IGNlbHNpdXNGZWVsc0xpa2UgPSBNYXRoLnJvdW5kKGRhdGEuY3VycmVudC5mZWVsc2xpa2VfYyk7XG4gIGNvbnN0IGZhaHJlbmhlaXRGZWVsc0xpa2UgPSBNYXRoLnJvdW5kKGRhdGEuY3VycmVudC5mZWVsc2xpa2VfZik7XG4gIGNvbnN0IHdpbmRTcGVlZCA9IGRhdGEuY3VycmVudC53aW5kX2twaDtcbiAgY29uc3QgaHVtaWRpdHkgPSBkYXRhLmN1cnJlbnQuaHVtaWRpdHk7XG4gIGNvbnN0IGNvbmRpdGlvbiA9IGRhdGEuY3VycmVudC5jb25kaXRpb24udGV4dDtcblxuICByZXR1cm4geyBjaXR5TmFtZSwgY291bnRyeU5hbWUsIGNlbHNpdXNUZW1wLCBmYWhyZW5oZWl0VGVtcCwgY2Vsc2l1c0ZlZWxzTGlrZSwgZmFocmVuaGVpdEZlZWxzTGlrZSwgd2luZFNwZWVkLCBodW1pZGl0eSwgY29uZGl0aW9uIH07XG59O1xuXG5jb25zdCBnZXRXZWF0aGVySW5mbyA9IGFzeW5jIGZ1bmN0aW9uKGNpdHlOYW1lKSB7XG4gIGNvbnN0IGRhdGEgPSBhd2FpdCBmZXRjaFdlYXRoZXJEYXRhKGNpdHlOYW1lKTtcbiAgY29uc3Qgd2VhdGhlckluZm8gPSBwcm9jZXNzV2VhdGhlckRhdGEoZGF0YSk7XG4gIHJldHVybiB3ZWF0aGVySW5mbztcbn1cblxuZXhwb3J0IHsgZ2V0V2VhdGhlckluZm8gfTsiLCJpbXBvcnQgaW5pdFdlYXRoZXJQYWdlIGZyb20gJy4vd2VhdGhlci1wYWdlJztcbmltcG9ydCAnLi9zdHlsZS5jc3MnO1xuXG5pbml0V2VhdGhlclBhZ2UoKTtcbiIsImltcG9ydCB7IGdldFdlYXRoZXJJbmZvIH0gZnJvbSAnLi9hcGknO1xuXG5jb25zdCBpbml0ID0gZnVuY3Rpb24oKSB7XG4gIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XG4gIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NpdHktbmFtZScpO1xuICBjb25zdCBzZWFyY2hCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VhcmNoLWJ1dHRvbicpO1xuICBjb25zdCB0ZW1wVW5pdEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0ZW1wZXJhdHVyZS11bml0LWJ1dHRvbicpO1xuICBjb25zdCBjaXR5TmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaXR5Jyk7XG4gIGNvbnN0IHRlbXBlcmF0dXJlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RlbXBlcmF0dXJlJyk7XG4gIGNvbnN0IGZlZWxzTGlrZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmZWVscy1saWtlJyk7XG4gIGNvbnN0IHdpbmRTcGVlZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3aW5kJyk7XG4gIGNvbnN0IGh1bWlkaXR5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2h1bWlkaXR5Jyk7XG4gIGNvbnN0IGNvbmRpdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb25kaXRpb24nKTtcblxuICBjb25zdCBhZGRFdmVudHMgPSBmdW5jdGlvbigpIHtcblxuICAgIHNlYXJjaEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgZ2V0V2VhdGhlckluZm8oaW5wdXQudmFsdWUpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc29sdmUpIHtcbiAgICAgICAgICBkaXNwbGF5V2VhdGhlckluZm8ocmVzb2x2ZSwgdGVtcFVuaXRCdXR0b24uZGF0YXNldC51bml0KTtcbiAgICAgICAgICBzZWFyY2hCdXR0b24uc2V0QXR0cmlidXRlKCdkYXRhLXdlYXRoZXItaW5mbycsIEpTT04uc3RyaW5naWZ5KHJlc29sdmUpKTtcbiAgICAgIH0pO1xuICAgICAgaW5wdXQudmFsdWUgPSAnJztcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSlcblxuICAgIHRlbXBVbml0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICBpZiAodGVtcFVuaXRCdXR0b24uZ2V0QXR0cmlidXRlKCdkYXRhLXVuaXQnKSA9PT0gJ2NlbHNpdXMnKSB7XG4gICAgICAgIHRlbXBVbml0QnV0dG9uLnNldEF0dHJpYnV0ZSgnZGF0YS11bml0JywgJ2ZhaHJlbmhlaXQnKTtcbiAgICAgICAgdGVtcFVuaXRCdXR0b24udGV4dENvbnRlbnQgPSAnwrBGJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRlbXBVbml0QnV0dG9uLnNldEF0dHJpYnV0ZSgnZGF0YS11bml0JywgJ2NlbHNpdXMnKTtcbiAgICAgICAgdGVtcFVuaXRCdXR0b24udGV4dENvbnRlbnQgPSAnwrBDJztcbiAgICAgIH1cbiAgICAgIGlmIChzZWFyY2hCdXR0b24uZGF0YXNldC53ZWF0aGVySW5mbyAhPT0gJycpIHtkaXNwbGF5V2VhdGhlckluZm8oSlNPTi5wYXJzZShzZWFyY2hCdXR0b24uZGF0YXNldC53ZWF0aGVySW5mbyksIHRlbXBVbml0QnV0dG9uLmRhdGFzZXQudW5pdCl9O1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9KVxuICB9XG5cbiAgY29uc3QgZGlzcGxheVdlYXRoZXJJbmZvID0gZnVuY3Rpb24oZGF0YSwgdW5pdCkge1xuICAgIGlmICh1bml0ID09PSAnY2Vsc2l1cycpIHtcbiAgICAgIGRpc3BsYXlXZWF0aGVySW5mb0luQ2Vsc2l1cyhkYXRhKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGlzcGxheVdlYXRoZXJJbmZvSW5GYWhyZW5oZWl0KGRhdGEpO1xuICAgIH07XG4gICAgc2V0QmFja2dyb3VuZChkYXRhLmNvbmRpdGlvbik7XG4gIH1cblxuICBjb25zdCBkaXNwbGF5V2VhdGhlckluZm9JbkNlbHNpdXMgPSBmdW5jdGlvbihkYXRhKSB7XG4gICAgY2l0eU5hbWUudGV4dENvbnRlbnQgPSBgJHtkYXRhLmNpdHlOYW1lfSwgJHtkYXRhLmNvdW50cnlOYW1lfWA7XG4gICAgdGVtcGVyYXR1cmUuaW5uZXJIVE1MID0gYFxuICAgICAgJHtkYXRhLmNlbHNpdXNUZW1wfTxzcGFuIGNsYXNzPSd0ZW1wZXJhdHVyZS11bml0Jz7CsEM8L3NwYW4+XG4gICAgYDtcbiAgICBmZWVsc0xpa2UuaW5uZXJIVE1MID0gYFxuICAgICAgRmVlbHMgbGlrZTogJHtkYXRhLmNlbHNpdXNGZWVsc0xpa2V9PHNwYW4gY2xhc3M9J3RlbXBlcmF0dXJlLXVuaXQnPiDCsEM8L3NwYW4+XG4gICAgYDtcbiAgICB3aW5kU3BlZWQudGV4dENvbnRlbnQgPSBgV2luZDogJHtkYXRhLndpbmRTcGVlZH0ga3BoYDtcbiAgICBodW1pZGl0eS50ZXh0Q29udGVudCA9IGBIdW1pZGl0eTogJHtkYXRhLmh1bWlkaXR5fSVgO1xuICAgIGNvbmRpdGlvbi50ZXh0Q29udGVudCA9IGRhdGEuY29uZGl0aW9uO1xuICB9XG5cbiAgY29uc3QgZGlzcGxheVdlYXRoZXJJbmZvSW5GYWhyZW5oZWl0ID0gZnVuY3Rpb24oZGF0YSkge1xuICAgIGNpdHlOYW1lLnRleHRDb250ZW50ID0gYCR7ZGF0YS5jaXR5TmFtZX0sICR7ZGF0YS5jb3VudHJ5TmFtZX1gO1xuICAgIHRlbXBlcmF0dXJlLmlubmVySFRNTCA9IGBcbiAgICAgICR7ZGF0YS5mYWhyZW5oZWl0VGVtcH08c3BhbiBjbGFzcz0ndGVtcGVyYXR1cmUtdW5pdCc+wrBGPC9zcGFuPlxuICAgIGA7XG4gICAgZmVlbHNMaWtlLmlubmVySFRNTCA9IGBcbiAgICAgIEZlZWxzIGxpa2U6ICR7ZGF0YS5mYWhyZW5oZWl0RmVlbHNMaWtlfTxzcGFuIGNsYXNzPSd0ZW1wZXJhdHVyZS11bml0Jz4gwrBGPC9zcGFuPlxuICAgIGA7XG4gICAgd2luZFNwZWVkLnRleHRDb250ZW50ID0gYFdpbmQ6ICR7ZGF0YS53aW5kU3BlZWR9IGtwaGA7XG4gICAgaHVtaWRpdHkudGV4dENvbnRlbnQgPSBgSHVtaWRpdHk6ICR7ZGF0YS5odW1pZGl0eX0lYDtcbiAgICBjb25kaXRpb24udGV4dENvbnRlbnQgPSBkYXRhLmNvbmRpdGlvbjtcbiAgfVxuXG4gIGNvbnN0IHNldEJhY2tncm91bmQgPSBmdW5jdGlvbihjb25kaXRpb24pIHtcbiAgICBzd2l0Y2ggKGNvbmRpdGlvbikge1xuICAgICAgY2FzZSAnU3VubnknOlxuICAgICAgIGJvZHkuZGF0YXNldC5jb25kaXRpb24gPSAnc3VubnknO1xuICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnUGFydGx5IGNsb3VkeSc6XG4gICAgICBjYXNlICdDbG91ZHknOlxuICAgICAgY2FzZSAnT3ZlcmNhc3QnOlxuICAgICAgY2FzZSAnRm9nJzpcbiAgICAgIGNhc2UgJ01pc3QnOlxuICAgICAgICBib2R5LmRhdGFzZXQuY29uZGl0aW9uID0gJ2Nsb3VkeSc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnUGF0Y2h5IHJhaW4gcG9zc2libGUnOlxuICAgICAgY2FzZSAnUGF0Y2h5IGxpZ2h0IGRyaXp6bGUnOlxuICAgICAgY2FzZSAnTGlnaHQgZHJpenpsZSc6XG4gICAgICBjYXNlICdGcmVlemluZyBkcml6emxlJzpcbiAgICAgIGNhc2UgJ0hlYXZ5IGZyZWV6aW5nIGRyaXp6bGUnOlxuICAgICAgY2FzZSAnUGF0Y2h5IGxpZ2h0IHJhaW4nOlxuICAgICAgY2FzZSAnTGlnaHQgcmFpbic6XG4gICAgICBjYXNlICdNb2RlcmF0ZSByYWluIGF0IGFsbCB0aW1lcyc6XG4gICAgICBjYXNlICdNb2RlcmF0ZSByYWluJzpcbiAgICAgIGNhc2UgJ0hlYXZ5IHJhaW4gYXQgdGltZXMnOlxuICAgICAgY2FzZSAnSGVhdnkgcmFpbic6XG4gICAgICBjYXNlICdMaWdodCBmcmVlemluZyByYWluJzpcbiAgICAgIGNhc2UgJ01vZGVyYXRlIG9yIGhlYXZ5IGZyZWV6aW5nIHJhaW4nOlxuICAgICAgY2FzZSAnUGF0Y2h5IGZyZWV6aW5nIGRyaXp6bGUgcG9zc2libGUnOlxuICAgICAgY2FzZSAnTGlnaHQgcmFpbiBzaG93ZXInOlxuICAgICAgY2FzZSAnTW9kZXJhdGUgb3IgaGVhdnkgcmFpbiBzaG93ZXInOlxuICAgICAgY2FzZSAnVG9ycmVudGlhbCByYWluIHNob3dlcic6XG4gICAgICAgIGJvZHkuZGF0YXNldC5jb25kaXRpb24gPSAncmFpbic7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnUGF0Y2h5IHNub3cgcG9zc2libGUnOlxuICAgICAgY2FzZSAnUGF0Y2h5IHNsZWV0IHBvc3NpYmxlJzpcbiAgICAgIGNhc2UgJ0Jsb3dpbmcgc25vdyc6XG4gICAgICBjYXNlICdCbGl6emFyZCc6XG4gICAgICBjYXNlICdGcmVlemluZyBmb2cnOlxuICAgICAgY2FzZSAnTGlnaHQgc2xlZXQnOlxuICAgICAgY2FzZSAnTW9kZXJhdGUgb3IgaGVhdnkgc2xlZXQnOlxuICAgICAgY2FzZSAnUGF0Y2h5IGxpZ2h0IHNub3cnOlxuICAgICAgY2FzZSAnTGlnaHQgc25vdyc6XG4gICAgICBjYXNlICdNb2RlcmF0ZSBzbm93JzpcbiAgICAgIGNhc2UgJ1BhdGNoeSBoZWF2eSBzbm93JzpcbiAgICAgIGNhc2UgJ0hlYXZ5IHNub3cnOlxuICAgICAgY2FzZSAnSWNlIHBlbGxldHMnOlxuICAgICAgY2FzZSAnTGlnaHQgc2xlZXQgc2hvd2Vycyc6XG4gICAgICBjYXNlICdNb2RlcmF0ZSBvciBoZWF2eSBzbGVldCBzaG93ZXJzJzpcbiAgICAgIGNhc2UgJ0xpZ2h0IHNub3cgc2hvd2Vycyc6XG4gICAgICBjYXNlICdNb2RlcmF0ZSBvciBoZWF2eSBzbm93IHNob3dlcnMnOlxuICAgICAgY2FzZSAnTGlnaHQgc2hvd2VycyBvZiBpY2UgcGVsbGV0cyc6XG4gICAgICBjYXNlICdNb2RlcmF0ZSBvciBoZWF2eSBzaG93ZXJzIG9mIGljZSBwZWxsZXRzJzpcbiAgICAgICAgYm9keS5kYXRhc2V0LmNvbmRpdGlvbiA9ICdzbm93JztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdUaHVuZGVyeSBvdXRicmVha3MgcG9zc2libGUnOlxuICAgICAgY2FzZSAnUGF0Y2h5IGxpZ2h0IHJhaW4gd2l0aCB0aHVuZGVyJzpcbiAgICAgIGNhc2UgJ01vZGVyYXRlIG9yIGhlYXZ5IHJhaW4gd2l0aCB0aHVuZGVyJzpcbiAgICAgIGNhc2UgJ1BhdGNoeSBsaWdodCBzbm93IHdpdGggdGh1bmRlcic6XG4gICAgICBjYXNlICdNb2RlcmF0ZSBvciBoZWF2eSBzbm93IHdpdGggdGh1bmRlcic6XG4gICAgICAgIGJvZHkuZGF0YXNldC5jb25kaXRpb24gPSAndGh1bmRlcic7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIGFkZEV2ZW50cygpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0OyIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyA9IG5ldyBVUkwoXCIuL2ZvbnRzL1BvcHBpbnMtQm9sZC50dGZcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMV9fXyA9IG5ldyBVUkwoXCIuL2ZvbnRzL1BvcHBpbnMtTWVkaXVtLnR0ZlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8yX19fID0gbmV3IFVSTChcIi4vZm9udHMvUG9wcGlucy1SZWd1bGFyLnR0ZlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8zX19fID0gbmV3IFVSTChcIi4vZm9udHMvUG9wcGlucy1MaWdodC50dGZcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfNF9fXyA9IG5ldyBVUkwoXCIuL2ltYWdlcy9zdW5ueS5qcGdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfNV9fXyA9IG5ldyBVUkwoXCIuL2ltYWdlcy9jbG91ZHkuanBnXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzZfX18gPSBuZXcgVVJMKFwiLi9pbWFnZXMvcmFpbi5qcGdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfN19fXyA9IG5ldyBVUkwoXCIuL2ltYWdlcy9zbm93LmpwZ1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF84X19fID0gbmV3IFVSTChcIi4vaW1hZ2VzL3RodW5kZXIuanBnXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzFfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8xX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8yX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMl9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfM19fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzNfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzRfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF80X19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF81X19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfNV9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfNl9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzZfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzdfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF83X19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF84X19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfOF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYEBmb250LWZhY2Uge1xuICBmb250LWZhbWlseTogcG9wcGlucy1ib2xkO1xuICBzcmM6IHVybCgke19fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX199KTtcbn1cblxuQGZvbnQtZmFjZSB7XG4gIGZvbnQtZmFtaWx5OiBwb3BwaW5zLW1lZGl1bTtcbiAgc3JjOiB1cmwoJHtfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xX19ffSk7XG59XG5cbkBmb250LWZhY2Uge1xuICBmb250LWZhbWlseTogcG9wcGlucy1yZWd1bGFyO1xuICBzcmM6IHVybCgke19fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzJfX199KTtcbn1cblxuQGZvbnQtZmFjZSB7XG4gIGZvbnQtZmFtaWx5OiBwb3BwaW5zLWxpZ2h0O1xuICBzcmM6IHVybCgke19fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzNfX199KTtcbn1cblxuYm9keSB7XG4gIHdpZHRoOiAxMDB2dztcbiAgaGVpZ2h0OiAxMDB2aDtcbiAgcGFkZGluZzogMDtcbiAgbWFyZ2luOiAwO1xuICBwb3NpdGlvbjogZml4ZWQ7XG5cbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcblxuICBmb250LWZhbWlseTogcG9wcGlucy1saWdodDtcbiAgYmFja2dyb3VuZC1zaXplOiAxNTAwcHggMTAwdmg7XG4gIGJhY2tncm91bmQtYXR0YWNobWVudDogZml4ZWQ7XG4gIGJhY2tncm91bmQtcG9zaXRpb246IDAgMDtcbn1cblxuYm9keVtkYXRhLWNvbmRpdGlvbj0nc3VubnknXSB7XG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybCgke19fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzRfX199KTtcbn1cblxuYm9keVtkYXRhLWNvbmRpdGlvbj0nY2xvdWR5J10ge1xuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJHtfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF81X19ffSk7XG59XG5cbmJvZHlbZGF0YS1jb25kaXRpb249J3JhaW4nXSB7XG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybCgke19fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzZfX199KTtcbn1cblxuYm9keVtkYXRhLWNvbmRpdGlvbj0nc25vdyddIHtcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCR7X19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfN19fX30pO1xufVxuXG5ib2R5W2RhdGEtY29uZGl0aW9uPSd0aHVuZGVyJ10ge1xuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJHtfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF84X19ffSk7XG59XG5cbmZvcm0ge1xuICBhbGlnbi1zZWxmOiBmbGV4LWVuZDtcbiAgcGFkZGluZzogMjBweDtcblxuICBpbnB1dCB7XG4gICAgd2lkdGg6IDIwMHB4O1xuICB9XG5cbiAgaW5wdXQsIGJ1dHRvbiB7XG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICBoZWlnaHQ6IDI4cHg7XG4gICAgZm9udC1mYW1pbHk6IHBvcHBpbnMtcmVndWxhcjtcbiAgfVxufVxuXG5idXR0b24ge1xuICBhcHBlYXJhbmNlOiBub25lO1xuICBvdXRsaW5lOiBub25lO1xuICBib3JkZXI6IG5vbmU7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwIDAgMCAvIDAuMyk7XG4gIGNvbG9yOiB3aGl0ZTtcbn1cblxuYnV0dG9uOmhvdmVyIHtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4jdGVtcGVyYXR1cmUtdW5pdC1idXR0b24ge1xuICBmbGV4LWdyb3c6IDA7XG4gIGFsaWduLXNlbGY6IGZsZXgtZW5kO1xuICBtYXJnaW4tdG9wOiAtOHB4O1xuICBtYXJnaW4tcmlnaHQ6IDIwcHg7XG4gIHdpZHRoOiAzNnB4O1xuICBoZWlnaHQ6IDMycHg7XG4gIGZvbnQtc2l6ZTogMS4ycmVtO1xuICBmb250LWZhbWlseTogcG9wcGlucy1tZWRpdW07XG59XG5cbiNpbmZvLWNvbnRhaW5lciB7XG4gIG1hcmdpbi10b3A6IDY0cHg7XG4gIHBhZGRpbmctbGVmdDogMTI0cHg7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGU6IDI0cHggNTJweCByZXBlYXQoMywgMzZweCkgLyA5NnB4IDI0MHB4O1xuICBjb2x1bW4tZ2FwOiAyOHB4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBmb250LXNpemU6IDEuMXJlbTtcblxuICAjY2l0eSB7XG4gICAgZ3JpZC1hcmVhOiAyIC8gMSAvIHNwYW4gMSAvIHNwYW4gMjtcbiAgICBmb250LXNpemU6IDEuNnJlbTtcbiAgICBmb250LWZhbWlseTogcG9wcGlucy1tZWRpdW07XG4gICAgcGFkZGluZy1ib3R0b206IDE0cHg7XG4gIH1cblxuICAjdGVtcGVyYXR1cmUge1xuICAgIGdyaWQtYXJlYTogMyAvIDEgLyBzcGFuIDMgLyBzcGFuIDE7XG4gICAgZm9udC1zaXplOiA0cmVtO1xuICAgIGZvbnQtZmFtaWx5OiBwb3BwaW5zLWJvbGQ7XG5cbiAgICAudGVtcGVyYXR1cmUtdW5pdCB7XG4gICAgICBmb250LXNpemU6IDEuMnJlbTtcbiAgICAgIHZlcnRpY2FsLWFsaWduOiB0ZXh0LXRvcDtcbiAgICB9XG4gIH1cblxuICAjY29uZGl0aW9uIHtcbiAgICBncmlkLWFyZWE6IDEgLyAxIC8gc3BhbiAxIC8gc3BhbiAyO1xuICAgIGZvbnQtc2l6ZTogMS40cmVtO1xuICAgIGZvbnQtZmFtaWx5OiBwb3BwaW5zLXJlZ3VsYXI7XG4gIH1cbn1gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSx5QkFBeUI7RUFDekIsNENBQWtDO0FBQ3BDOztBQUVBO0VBQ0UsMkJBQTJCO0VBQzNCLDRDQUFvQztBQUN0Qzs7QUFFQTtFQUNFLDRCQUE0QjtFQUM1Qiw0Q0FBcUM7QUFDdkM7O0FBRUE7RUFDRSwwQkFBMEI7RUFDMUIsNENBQW1DO0FBQ3JDOztBQUVBO0VBQ0UsWUFBWTtFQUNaLGFBQWE7RUFDYixVQUFVO0VBQ1YsU0FBUztFQUNULGVBQWU7O0VBRWYsYUFBYTtFQUNiLHNCQUFzQjs7RUFFdEIsMEJBQTBCO0VBQzFCLDZCQUE2QjtFQUM3Qiw0QkFBNEI7RUFDNUIsd0JBQXdCO0FBQzFCOztBQUVBO0VBQ0UseURBQXlDO0FBQzNDOztBQUVBO0VBQ0UseURBQTBDO0FBQzVDOztBQUVBO0VBQ0UseURBQXdDO0FBQzFDOztBQUVBO0VBQ0UseURBQXdDO0FBQzFDOztBQUVBO0VBQ0UseURBQTJDO0FBQzdDOztBQUVBO0VBQ0Usb0JBQW9CO0VBQ3BCLGFBQWE7O0VBRWI7SUFDRSxZQUFZO0VBQ2Q7O0VBRUE7SUFDRSxzQkFBc0I7SUFDdEIsWUFBWTtJQUNaLDRCQUE0QjtFQUM5QjtBQUNGOztBQUVBO0VBQ0UsZ0JBQWdCO0VBQ2hCLGFBQWE7RUFDYixZQUFZO0VBQ1osa0JBQWtCO0VBQ2xCLG1DQUFtQztFQUNuQyxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsWUFBWTtFQUNaLG9CQUFvQjtFQUNwQixnQkFBZ0I7RUFDaEIsa0JBQWtCO0VBQ2xCLFdBQVc7RUFDWCxZQUFZO0VBQ1osaUJBQWlCO0VBQ2pCLDJCQUEyQjtBQUM3Qjs7QUFFQTtFQUNFLGdCQUFnQjtFQUNoQixtQkFBbUI7RUFDbkIsYUFBYTtFQUNiLHFEQUFxRDtFQUNyRCxnQkFBZ0I7RUFDaEIsbUJBQW1CO0VBQ25CLGlCQUFpQjs7RUFFakI7SUFDRSxrQ0FBa0M7SUFDbEMsaUJBQWlCO0lBQ2pCLDJCQUEyQjtJQUMzQixvQkFBb0I7RUFDdEI7O0VBRUE7SUFDRSxrQ0FBa0M7SUFDbEMsZUFBZTtJQUNmLHlCQUF5Qjs7SUFFekI7TUFDRSxpQkFBaUI7TUFDakIsd0JBQXdCO0lBQzFCO0VBQ0Y7O0VBRUE7SUFDRSxrQ0FBa0M7SUFDbEMsaUJBQWlCO0lBQ2pCLDRCQUE0QjtFQUM5QjtBQUNGXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6IHBvcHBpbnMtYm9sZDtcXG4gIHNyYzogdXJsKC4vZm9udHMvUG9wcGlucy1Cb2xkLnR0Zik7XFxufVxcblxcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6IHBvcHBpbnMtbWVkaXVtO1xcbiAgc3JjOiB1cmwoLi9mb250cy9Qb3BwaW5zLU1lZGl1bS50dGYpO1xcbn1cXG5cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiBwb3BwaW5zLXJlZ3VsYXI7XFxuICBzcmM6IHVybCguL2ZvbnRzL1BvcHBpbnMtUmVndWxhci50dGYpO1xcbn1cXG5cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiBwb3BwaW5zLWxpZ2h0O1xcbiAgc3JjOiB1cmwoLi9mb250cy9Qb3BwaW5zLUxpZ2h0LnR0Zik7XFxufVxcblxcbmJvZHkge1xcbiAgd2lkdGg6IDEwMHZ3O1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG4gIHBhZGRpbmc6IDA7XFxuICBtYXJnaW46IDA7XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxuXFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG5cXG4gIGZvbnQtZmFtaWx5OiBwb3BwaW5zLWxpZ2h0O1xcbiAgYmFja2dyb3VuZC1zaXplOiAxNTAwcHggMTAwdmg7XFxuICBiYWNrZ3JvdW5kLWF0dGFjaG1lbnQ6IGZpeGVkO1xcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAwO1xcbn1cXG5cXG5ib2R5W2RhdGEtY29uZGl0aW9uPSdzdW5ueSddIHtcXG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybCguL2ltYWdlcy9zdW5ueS5qcGcpO1xcbn1cXG5cXG5ib2R5W2RhdGEtY29uZGl0aW9uPSdjbG91ZHknXSB7XFxuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoLi9pbWFnZXMvY2xvdWR5LmpwZyk7XFxufVxcblxcbmJvZHlbZGF0YS1jb25kaXRpb249J3JhaW4nXSB7XFxuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoLi9pbWFnZXMvcmFpbi5qcGcpO1xcbn1cXG5cXG5ib2R5W2RhdGEtY29uZGl0aW9uPSdzbm93J10ge1xcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKC4vaW1hZ2VzL3Nub3cuanBnKTtcXG59XFxuXFxuYm9keVtkYXRhLWNvbmRpdGlvbj0ndGh1bmRlciddIHtcXG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybCguL2ltYWdlcy90aHVuZGVyLmpwZyk7XFxufVxcblxcbmZvcm0ge1xcbiAgYWxpZ24tc2VsZjogZmxleC1lbmQ7XFxuICBwYWRkaW5nOiAyMHB4O1xcblxcbiAgaW5wdXQge1xcbiAgICB3aWR0aDogMjAwcHg7XFxuICB9XFxuXFxuICBpbnB1dCwgYnV0dG9uIHtcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gICAgaGVpZ2h0OiAyOHB4O1xcbiAgICBmb250LWZhbWlseTogcG9wcGlucy1yZWd1bGFyO1xcbiAgfVxcbn1cXG5cXG5idXR0b24ge1xcbiAgYXBwZWFyYW5jZTogbm9uZTtcXG4gIG91dGxpbmU6IG5vbmU7XFxuICBib3JkZXI6IG5vbmU7XFxuICBib3JkZXItcmFkaXVzOiA0cHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAgMCAwIC8gMC4zKTtcXG4gIGNvbG9yOiB3aGl0ZTtcXG59XFxuXFxuYnV0dG9uOmhvdmVyIHtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuI3RlbXBlcmF0dXJlLXVuaXQtYnV0dG9uIHtcXG4gIGZsZXgtZ3JvdzogMDtcXG4gIGFsaWduLXNlbGY6IGZsZXgtZW5kO1xcbiAgbWFyZ2luLXRvcDogLThweDtcXG4gIG1hcmdpbi1yaWdodDogMjBweDtcXG4gIHdpZHRoOiAzNnB4O1xcbiAgaGVpZ2h0OiAzMnB4O1xcbiAgZm9udC1zaXplOiAxLjJyZW07XFxuICBmb250LWZhbWlseTogcG9wcGlucy1tZWRpdW07XFxufVxcblxcbiNpbmZvLWNvbnRhaW5lciB7XFxuICBtYXJnaW4tdG9wOiA2NHB4O1xcbiAgcGFkZGluZy1sZWZ0OiAxMjRweDtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlOiAyNHB4IDUycHggcmVwZWF0KDMsIDM2cHgpIC8gOTZweCAyNDBweDtcXG4gIGNvbHVtbi1nYXA6IDI4cHg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZm9udC1zaXplOiAxLjFyZW07XFxuXFxuICAjY2l0eSB7XFxuICAgIGdyaWQtYXJlYTogMiAvIDEgLyBzcGFuIDEgLyBzcGFuIDI7XFxuICAgIGZvbnQtc2l6ZTogMS42cmVtO1xcbiAgICBmb250LWZhbWlseTogcG9wcGlucy1tZWRpdW07XFxuICAgIHBhZGRpbmctYm90dG9tOiAxNHB4O1xcbiAgfVxcblxcbiAgI3RlbXBlcmF0dXJlIHtcXG4gICAgZ3JpZC1hcmVhOiAzIC8gMSAvIHNwYW4gMyAvIHNwYW4gMTtcXG4gICAgZm9udC1zaXplOiA0cmVtO1xcbiAgICBmb250LWZhbWlseTogcG9wcGlucy1ib2xkO1xcblxcbiAgICAudGVtcGVyYXR1cmUtdW5pdCB7XFxuICAgICAgZm9udC1zaXplOiAxLjJyZW07XFxuICAgICAgdmVydGljYWwtYWxpZ246IHRleHQtdG9wO1xcbiAgICB9XFxuICB9XFxuXFxuICAjY29uZGl0aW9uIHtcXG4gICAgZ3JpZC1hcmVhOiAxIC8gMSAvIHNwYW4gMSAvIHNwYW4gMjtcXG4gICAgZm9udC1zaXplOiAxLjRyZW07XFxuICAgIGZvbnQtZmFtaWx5OiBwb3BwaW5zLXJlZ3VsYXI7XFxuICB9XFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMpIHtcbiAgaWYgKCFvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IHt9O1xuICB9XG4gIGlmICghdXJsKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuICB1cmwgPSBTdHJpbmcodXJsLl9fZXNNb2R1bGUgPyB1cmwuZGVmYXVsdCA6IHVybCk7XG5cbiAgLy8gSWYgdXJsIGlzIGFscmVhZHkgd3JhcHBlZCBpbiBxdW90ZXMsIHJlbW92ZSB0aGVtXG4gIGlmICgvXlsnXCJdLipbJ1wiXSQvLnRlc3QodXJsKSkge1xuICAgIHVybCA9IHVybC5zbGljZSgxLCAtMSk7XG4gIH1cbiAgaWYgKG9wdGlvbnMuaGFzaCkge1xuICAgIHVybCArPSBvcHRpb25zLmhhc2g7XG4gIH1cblxuICAvLyBTaG91bGQgdXJsIGJlIHdyYXBwZWQ/XG4gIC8vIFNlZSBodHRwczovL2RyYWZ0cy5jc3N3Zy5vcmcvY3NzLXZhbHVlcy0zLyN1cmxzXG4gIGlmICgvW1wiJygpIFxcdFxcbl18KCUyMCkvLnRlc3QodXJsKSB8fCBvcHRpb25zLm5lZWRRdW90ZXMpIHtcbiAgICByZXR1cm4gXCJcXFwiXCIuY29uY2F0KHVybC5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykucmVwbGFjZSgvXFxuL2csIFwiXFxcXG5cIiksIFwiXFxcIlwiKTtcbiAgfVxuICByZXR1cm4gdXJsO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07Il0sIm5hbWVzIjpbImZldGNoV2VhdGhlckRhdGEiLCJjaXR5TmFtZSIsInJlc3BvbnNlIiwiZmV0Y2giLCJkYXRhIiwianNvbiIsInByb2Nlc3NXZWF0aGVyRGF0YSIsImxvY2F0aW9uIiwibmFtZSIsImNvdW50cnlOYW1lIiwiY291bnRyeSIsImNlbHNpdXNUZW1wIiwiTWF0aCIsInJvdW5kIiwiY3VycmVudCIsInRlbXBfYyIsImZhaHJlbmhlaXRUZW1wIiwidGVtcF9mIiwiY2Vsc2l1c0ZlZWxzTGlrZSIsImZlZWxzbGlrZV9jIiwiZmFocmVuaGVpdEZlZWxzTGlrZSIsImZlZWxzbGlrZV9mIiwid2luZFNwZWVkIiwid2luZF9rcGgiLCJodW1pZGl0eSIsImNvbmRpdGlvbiIsInRleHQiLCJnZXRXZWF0aGVySW5mbyIsIndlYXRoZXJJbmZvIiwiaW5pdFdlYXRoZXJQYWdlIiwiaW5pdCIsImJvZHkiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJpbnB1dCIsImdldEVsZW1lbnRCeUlkIiwic2VhcmNoQnV0dG9uIiwidGVtcFVuaXRCdXR0b24iLCJ0ZW1wZXJhdHVyZSIsImZlZWxzTGlrZSIsImFkZEV2ZW50cyIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsInZhbHVlIiwidGhlbiIsInJlc29sdmUiLCJkaXNwbGF5V2VhdGhlckluZm8iLCJkYXRhc2V0IiwidW5pdCIsInNldEF0dHJpYnV0ZSIsIkpTT04iLCJzdHJpbmdpZnkiLCJwcmV2ZW50RGVmYXVsdCIsImdldEF0dHJpYnV0ZSIsInRleHRDb250ZW50IiwicGFyc2UiLCJkaXNwbGF5V2VhdGhlckluZm9JbkNlbHNpdXMiLCJkaXNwbGF5V2VhdGhlckluZm9JbkZhaHJlbmhlaXQiLCJzZXRCYWNrZ3JvdW5kIiwiaW5uZXJIVE1MIl0sInNvdXJjZVJvb3QiOiIifQ==