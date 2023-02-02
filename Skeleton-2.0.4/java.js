//var APIkey = "AIzaSyDbRLVtnxgOTPF4I23qMVJ908WFl6-TDOc"

var weatherKey = "4b68235b6d97901e4e6eb2b454a04dd0";

var map;
var service;
var infowindow;
var searchBtn = document.querySelector(".search-button");
document.querySelector("#googlesearch").value = "San Diego";
searchCity();

var coord = {lat: 32.11, lng: -117.32}
console.log(coord)
var daygo = "San Diego"
var cal = "California"
//searchCity(daygo);
searchBtn.addEventListener("click", function () {
  //var cityName = document.querySelector("#googlesearch").value
  //console.log(cityName)
  var stateName = document.querySelector('select[name="state"]').value
  console.log(stateName)
  searchCity()
  var coo = JSON.parse(localStorage.getItem("city"));
  console.log(coo);
  //var storedcity = localStorage.getItem("city");
  //console.log(JSON.parse(storedcity));
  
})
function searchCity() {
  var cityName = document.querySelector("#googlesearch").value
  console.log(cityName);
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + weatherKey;
  console.log(queryURL)
  fetch(queryURL).then(function (response) {
    console.log(response)
    return response.json()

  })
    .then(function (data) {
      
      console.log(data);
      coord = {lat: data.coord.lat, lng: data.coord.lon};
      console.log(coord)
      localStorage.setItem("city", JSON.stringify(coord));
      initMap(coord);
})
}

function initMap(ev) {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: ev,
    zoom: 13,
    mapId: "5e79efcdf99d1225",
  });
  const service = new google.maps.places.PlacesService(map);
  let getNextPage;
  const moreButton = document.getElementById("more");

  moreButton.onclick = function () {
    moreButton.disabled = true;
    if (getNextPage) {
      getNextPage();
    }
  };

  service.nearbySearch(
    { location: ev, radius: 2000, type: "restaurant"},
    (results, status, pagination) => {
      if (status !== "OK" || !results) return;

      addPlaces(results, map);
      moreButton.disabled = !pagination || !pagination.hasNextPage;
      if (pagination && pagination.hasNextPage) {
        getNextPage = () => {
          pagination.nextPage();
        }
      }
    }
  )
}

function addPlaces(places, map) {
  const placesList = document.getElementById("places");

  for(const place of places) {
    if (place.geometry && place.geometry.location) {
      const image = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25),
      };

      new google.maps.Marker({
        map,
        icon: image,
        title: place.name,
        position: place.geometry.location,
      });

      const li= document.createElement("li");

      li.textContent = place.name;
      placesList.appendChild(li);
      li.addEventListener("click", () => {
        map.setCenter(place.geometry.location);


      });
     /* searchBtn.addEventListener('click', ()=>{
        var restlist = document.querySelectorAll('li');
        console.log(restlist.length);
        for (let i= 0; i < restlist.length; i++) {
          restlist.textContent = place.name;
        }

      })*/
    }
  }
}
  // // we will want to find the restaurant and vegetarian in here 


window.initMap = initMap();
// Need to figure out what additional call we need to figure out to get to the restaurants for the location. 


//service.textSearch(request, callback);

// https://api.openweathermap.org/data/2.5/weather?q={city name},{state code},{country code}&appid={API key}
