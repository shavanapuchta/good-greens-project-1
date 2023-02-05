//var APIkey = "AIzaSyDbRLVtnxgOTPF4I23qMVJ908WFl6-TDOc"

var weatherKey = "4b68235b6d97901e4e6eb2b454a04dd0";

var map;
var service;
var infowindow;
var searchBtn = document.querySelector(".search-button");
document.querySelector("#googlesearch").value = "San Diego";
searchCity();

var coord = { lat: 32.11, lng: -117.32 }
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
      coord = { lat: data.coord.lat, lng: data.coord.lon };
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
    { location: ev, radius: 5000, type: "restaurant", keyword: "Vegetarian" },
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

  for (const place of places) {
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
      searchBtn.addEventListener('click', () => {
        var recreatelist = document.querySelectorAll("li");
        console.log(recreatelist[0]);
        for (let i = 0; i < recreatelist.length; i++) {
          recreatelist[i].remove();
          console.log(place)
        }

      })
      const li = document.createElement("li");
      if (place.rating < 1.5){
        li.innerHTML = place.name + "<br> Address: " + place.vicinity + "<br> Rating: &starf; <br> Price: " + place.price_level + "/5" + "<br>" ;
      }else if (place.rating >= 1.5 && place.rating < 2.5) {
        li.innerHTML = place.name + "<br> Address: " + place.vicinity + "<br> Rating: &starf; &starf;  <br> Price: " + place.price_level + "/5" + "<br>" ;
      }else if (place.rating >= 2.5 && place.rating <3.5) {
        li.innerHTML = place.name + "<br> Address: " + place.vicinity + "<br> Rating: &starf; &starf; &starf;  <br> Price: " + place.price_level + "/5" + "<br>" ;
      }else if (place.rating >= 3.5 && place.rating <4.5) {
        li.innerHTML = place.name + "<br> Address: " + place.vicinity + "<br> Rating: &starf; &starf; &starf; &starf; <br> Price: " + place.price_level + "/5" + "<br>" ;
      }else if (place.rating >= 4.5) {
        li.innerHTML = place.name + "<br> Address: " + place.vicinity + "<br> Rating: &starf; &starf; &starf; &starf; &starf; <br> Price: " + place.price_level + "/5" + "<br>" ;

      }
      placesList.appendChild(li);
      li.addEventListener("click", () => {
        map.setCenter(place.geometry.location);

        // if (place.rating < 1.5) {
        //   place.rating.style.color = "violet"
        // }
        // if (place.rating >= 1.5 && < 2.5) {
        //   place.rating.style.color = "red"

        // }
        // if (place.rating >= 2.5 && place.rating <3.5) {
        //   

        // }
        // if (place.rating >= 3.5 && place.rating <4.5) {
        //   place.rating.style.color = "red"

        // }
        // if (place.rating >= 4.5) {
        //   place.rating.style.color = "red"

        // }


      });

    }
  }
}
// // we will want to find the restaurant and vegetarian in here 


window.initMap = initMap();
// Need to figure out what additional call we need to figure out to get to the restaurants for the location.


//service.textSearch(request, callback);

// https://api.openweathermap.org/data/2.5/weather?q={city name},{state code},{country code}&appid={API key}
