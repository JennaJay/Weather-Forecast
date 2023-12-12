const APIKey = "cacae1c70a88961d8307488c100a6ca2" 
const searchButton = document.querySelector("#searchBtn")
const getCity = document.querySelector(".cityname")
var todayCity = document.querySelector('#todayCity')
var todayTemp = document.querySelector('#todayTemp')
var todayWind = document.querySelector('#todayWind')
var todayHumidity = document.querySelector('#todayHumidity')
//var nextFive = document.querySelector('#weatherCard')
var dayOne = document.querySelector('#dayOne')



function getLatLon() {
    
var cityname = getCity.value

var latlon = `http://api.openweathermap.org/geo/1.0/direct?q=${cityname}&limit=1&appid=${APIKey}`
fetch(latlon) 
.then(function (response) {
    return response.json();
})
.then(function (data) {
    var lat = data[0].lat
    var lon = data[0].lon
    console.log(data);

    getWeather(lat,lon)
    getFiveDay(lat,lon)

})
}
searchButton.addEventListener("click", getLatLon)


function getWeather(lat,lon) {
    var weather = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${APIKey}`
    fetch(weather)
    .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);

        todayTemp.textContent = 'Temp: ' + data.main.temp + '\u00b0F'
        todayCity.textContent = data.name
        todayHumidity.textContent = 'Humidity: ' + data.main.humidity + ' %'
        todayWind.textContent = 'Wind: ' + data.wind.speed + ' MPH'
    });
}

function getFiveDay(lat,lon) {
    var weatherFive = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${APIKey}`
    fetch(weatherFive)
    .then(function (response) {
        return response.json();
      })
      .then(function (data) {
          var fiveDays = [];
          
          var fiveCards = data.list.filter(forecast, function() {
              var weatherDate = new Date(forecast.dt_txt).getDate();
              if(!fiveDays.includes(weatherDate)) {
                  return fiveDays.push(weatherDate);
                }
            });
            console.log(fiveCards);
        })
        //console.log(data); 
    }
    
    
    








