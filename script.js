function formatDate(date) {
    let hours = date.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
  
    let dayIndex = date.getDay(); // 0 and 6
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    let day = days[dayIndex];
    return `${day} ${hours}:${minutes}`;
  }
  function displayWeatherCondition(response) {
    console.log(response.data);
   document.querySelector("#city").innerHTML = response.data.name;
   document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
   document.querySelector("#humidity").innerHTML = response.data.main.humidity;
   document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
   document.querySelector("#description").innerHTML = response.data.weather[0].main;
  }
  function searchCity(city) {
    let apiKey = "ed7bf7f5cf99619f0aa2717501c76f85";
    let apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeatherCondition);
  }
  function handleSubmit(event) {
    event.preventDefault();
    // let cityElement = document.querySelector("#city");
    //let cityInput = document.querySelector("#city-input");
    //cityElement.innerHTML = cityInput.value;
    // make an API call openweather API
    // once I get the http response, we display the city name and temperature
    let city = document.querySelector("#city-input").value;
    searchCity(city);
  }
  function searchLocation(position) {
    // position.coords.latitude
    // position.coords.longitude
    let apiKey = "ed7bf7f5cf99619f0aa2717501c76f85";
      let apiUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}
      &appid=${apiKey}&units=metric`;
      console.log(apiUrl);
      axios.get(apiUrl).then(displayWeatherCondition);
  }
  function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation); 
    // => {   doSomething(position.coords.latitude, position.coords.longitude);});
  }
  function convertToFahrenheit(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    let temperature = temperatureElement.innerHTML;
    temperatureElement.innerHTML = 20;
  }
  
  function convertToCelsius(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = 65;
  }
  let dateElement = document.querySelector("#date");
  let currentTime = new Date();
  dateElement.innerHTML = formatDate(currentTime);
  
  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", handleSubmit);
  
  let fahrenheitLink = document.querySelector("#fahrenheit-link");
  fahrenheitLink.addEventListener("click", convertToFahrenheit);
  
  let celsiusLink = document.querySelector("#celsius-link");
  celsiusLink.addEventListener("click", convertToCelsius);

  let currentLocationButton = document.querySelector("#current-location-button");
  currentLocationButton.addEventListener("click", getCurrentLocation);
  searchCity("Lisbon");
  