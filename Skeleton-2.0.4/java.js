//var APIkey = "AIzaSyDbRLVtnxgOTPF4I23qMVJ908WFl6-TDOc"

var weatherKey = "4b68235b6d97901e4e6eb2b454a04dd0";

var map;
var service;
var infowindow;
var searchBtn = document.querySelector(".search-button")



function searchCity(city, state) {
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + weatherKey;
  console.log(queryURL)
  fetch(queryURL).then(function (response) {
    console.log(response)
    return response.json()

  })
    .then(function (data) {
      console.log(data);

      function initMap() {
        const map = new google.maps.Map(document.getElementById("map"), {
          center: { lat: data.coord.lat, lng: data.coord.lon },
          zoom: 13,
          mapId: "5e79efcdf99d1225",
        });
        const marker = new google.maps.Marker({
          position: { lat: data.coord.lat, lng: data.coord.lon },
          map: map,
        })

        const service = new google.maps.places.PlacesService(map)
        // // we will want to find the restaurant and vegetarian in here 
      }
      window.initMap = initMap();
    })

}

searchBtn.addEventListener("click", function () {
  var cityName = document.querySelector("#googlesearch").value
  console.log(cityName)
  var stateName = document.querySelector('select[name="state"]').value
  console.log(stateName)
  searchCity(cityName, stateName)
})


// Need to figure out what additional call we need to figure out to get to the restaurants for the location. 


//service.textSearch(request, callback);

// https://api.openweathermap.org/data/2.5/weather?q={city name},{state code},{country code}&appid={API key}
