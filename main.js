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
  const celsiusTemp = data.current.temp_c;
  const fahrenheitTemp = data.current.temp_f;
  const celsiusFeelsLike = data.current.feelslike_c;
  const fahrenheitFeelsLike = data.current.feelslike_f;
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
  const cityName = document.getElementById('city-name');
  const searchButton = document.getElementById('search-button');
  const addEvents = function () {
    searchButton.addEventListener('click', () => {
      console.log(cityName.value);
      displayWeatherInfo(cityName.value);
      cityName.value = '';
    });
  };
  const displayWeatherInfo = function (cityName) {
    (0,_api__WEBPACK_IMPORTED_MODULE_0__.getWeatherInfo)(cityName).then(function (resolve) {
      console.log(resolve);
    });
  };
  addEvents();
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (init);

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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cHAvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvd2VhdGhlci1wYWdlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGZldGNoV2VhdGhlckRhdGEgPSBhc3luYyBmdW5jdGlvbihjaXR5TmFtZSkge1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGBodHRwczovL2FwaS53ZWF0aGVyYXBpLmNvbS92MS9jdXJyZW50Lmpzb24/a2V5PTYyZjJhMzkxNTc5ODQzYjQ5NDQxNTUxMDkyNDE5MDMmcT0ke2NpdHlOYW1lfWApO1xuICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICByZXR1cm4gZGF0YTtcbn07XG5cbmNvbnN0IHByb2Nlc3NXZWF0aGVyRGF0YSA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgY29uc3QgY2l0eU5hbWUgPSBkYXRhLmxvY2F0aW9uLm5hbWU7XG4gIGNvbnN0IGNvdW50cnlOYW1lID0gZGF0YS5sb2NhdGlvbi5jb3VudHJ5O1xuICBjb25zdCBjZWxzaXVzVGVtcCA9IGRhdGEuY3VycmVudC50ZW1wX2M7XG4gIGNvbnN0IGZhaHJlbmhlaXRUZW1wID0gZGF0YS5jdXJyZW50LnRlbXBfZjtcbiAgY29uc3QgY2Vsc2l1c0ZlZWxzTGlrZSA9IGRhdGEuY3VycmVudC5mZWVsc2xpa2VfYztcbiAgY29uc3QgZmFocmVuaGVpdEZlZWxzTGlrZSA9IGRhdGEuY3VycmVudC5mZWVsc2xpa2VfZjtcbiAgY29uc3Qgd2luZFNwZWVkID0gZGF0YS5jdXJyZW50LndpbmRfa3BoO1xuICBjb25zdCBodW1pZGl0eSA9IGRhdGEuY3VycmVudC5odW1pZGl0eTtcbiAgY29uc3QgY29uZGl0aW9uID0gZGF0YS5jdXJyZW50LmNvbmRpdGlvbi50ZXh0O1xuXG4gIHJldHVybiB7IGNpdHlOYW1lLCBjb3VudHJ5TmFtZSwgY2Vsc2l1c1RlbXAsIGZhaHJlbmhlaXRUZW1wLCBjZWxzaXVzRmVlbHNMaWtlLCBmYWhyZW5oZWl0RmVlbHNMaWtlLCB3aW5kU3BlZWQsIGh1bWlkaXR5LCBjb25kaXRpb24gfTtcbn07XG5cbmNvbnN0IGdldFdlYXRoZXJJbmZvID0gYXN5bmMgZnVuY3Rpb24oY2l0eU5hbWUpIHtcbiAgY29uc3QgZGF0YSA9IGF3YWl0IGZldGNoV2VhdGhlckRhdGEoY2l0eU5hbWUpO1xuICBjb25zdCB3ZWF0aGVySW5mbyA9IHByb2Nlc3NXZWF0aGVyRGF0YShkYXRhKTtcbiAgcmV0dXJuIHdlYXRoZXJJbmZvO1xufVxuXG5leHBvcnQgeyBnZXRXZWF0aGVySW5mbyB9OyIsImltcG9ydCBpbml0V2VhdGhlclBhZ2UgZnJvbSAnLi93ZWF0aGVyLXBhZ2UnO1xuXG5pbml0V2VhdGhlclBhZ2UoKTtcbiIsImltcG9ydCB7IGdldFdlYXRoZXJJbmZvIH0gZnJvbSAnLi9hcGknO1xuXG5jb25zdCBpbml0ID0gZnVuY3Rpb24oKSB7XG5cbiAgY29uc3QgY2l0eU5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2l0eS1uYW1lJyk7XG4gIGNvbnN0IHNlYXJjaEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWFyY2gtYnV0dG9uJyk7XG5cbiAgY29uc3QgYWRkRXZlbnRzID0gZnVuY3Rpb24oKSB7XG4gICAgc2VhcmNoQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coY2l0eU5hbWUudmFsdWUpO1xuICAgICAgZGlzcGxheVdlYXRoZXJJbmZvKGNpdHlOYW1lLnZhbHVlKTtcbiAgICAgIGNpdHlOYW1lLnZhbHVlID0gJyc7XG4gICAgfSlcbiAgfVxuXG4gIGNvbnN0IGRpc3BsYXlXZWF0aGVySW5mbyA9IGZ1bmN0aW9uKGNpdHlOYW1lKSB7XG4gICAgZ2V0V2VhdGhlckluZm8oY2l0eU5hbWUpXG4gICAgICAudGhlbihmdW5jdGlvbihyZXNvbHZlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlc29sdmUpO1xuICAgIH0pO1xuICB9XG5cbiAgYWRkRXZlbnRzKCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQ7Il0sIm5hbWVzIjpbImZldGNoV2VhdGhlckRhdGEiLCJjaXR5TmFtZSIsInJlc3BvbnNlIiwiZmV0Y2giLCJkYXRhIiwianNvbiIsInByb2Nlc3NXZWF0aGVyRGF0YSIsImxvY2F0aW9uIiwibmFtZSIsImNvdW50cnlOYW1lIiwiY291bnRyeSIsImNlbHNpdXNUZW1wIiwiY3VycmVudCIsInRlbXBfYyIsImZhaHJlbmhlaXRUZW1wIiwidGVtcF9mIiwiY2Vsc2l1c0ZlZWxzTGlrZSIsImZlZWxzbGlrZV9jIiwiZmFocmVuaGVpdEZlZWxzTGlrZSIsImZlZWxzbGlrZV9mIiwid2luZFNwZWVkIiwid2luZF9rcGgiLCJodW1pZGl0eSIsImNvbmRpdGlvbiIsInRleHQiLCJnZXRXZWF0aGVySW5mbyIsIndlYXRoZXJJbmZvIiwiaW5pdFdlYXRoZXJQYWdlIiwiaW5pdCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJzZWFyY2hCdXR0b24iLCJhZGRFdmVudHMiLCJhZGRFdmVudExpc3RlbmVyIiwiY29uc29sZSIsImxvZyIsInZhbHVlIiwiZGlzcGxheVdlYXRoZXJJbmZvIiwidGhlbiIsInJlc29sdmUiXSwic291cmNlUm9vdCI6IiJ9