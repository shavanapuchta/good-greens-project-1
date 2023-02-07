//var APIkey = "AIzaSyDbRLVtnxgOTPF4I23qMVJ908WFl6-TDOc"
var weatherKey = "4b68235b6d97901e4e6eb2b454a04dd0";
var map;
var service;
var infowindow;
var searchBtn = document.querySelector(".search-button");
document.querySelector("#googlesearch").value = "San Diego";
var vegetariancheck = document.getElementById("veg1");
var vegancheck = document.getElementById("veg2");
searchCity();

// Displays the city of San Diego and vegetarian/vegan restaurants on the map when opening the website.

var coord = { lat: 32.11, lng: -117.32 }
console.log(coord)
var daygo = "San Diego"
var cal = "California"
//searchCity(daygo);

// Runs the searchCity function after we select our city and click search. 

searchBtn.addEventListener("click", function () {
  //var cityName = document.querySelector("#googlesearch").value
  //console.log(cityName)
  //var stateName = document.querySelector('select[name="state"]').value
  //console.log(stateName)
  searchCity()
  var coo = JSON.parse(localStorage.getItem("city"));
  console.log(coo);
  //var storedcity = localStorage.getItem("city");
  //console.log(JSON.parse(storedcity));

})

// We use the openweather API to get the latitude and longitude of a city and use this to feed to the google API for our searches. 

function searchCity() {
  var cityName = document.querySelector("#googlesearch").value;
  console.log(cityName);
  var zip = document.getElementById("zip").value;
  console.log(zip);
  if (zip == "") {
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
  } else {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?zip=" + zip + ",us&appid=" + weatherKey;
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

  // Displays more restaurant results at the bottom of the page when we click the "more results button"  

  moreButton.onclick = function () {
    moreButton.disabled = true;
    if (getNextPage) {
      getNextPage();
    }
  };

  // Parameters we use to narrow down our nearby search. Searches within a 5000 meter radius for vegetarian restaurants.
  if (vegetariancheck.checked == true && vegancheck.checked == false) {
    service.nearbySearch(
      { location: ev, radius: 5000, type: "restaurant", keyword: "Vegetarian" },
      (results, status, pagination) => {
        if (status !== "OK" || !results) return;

        // Adds the restaurants based on city to a list at the bottom of the page with the address, rating, and price level. 

        addPlaces(results, map);
        moreButton.disabled = !pagination || !pagination.hasNextPage;
        if (pagination && pagination.hasNextPage) {
          getNextPage = () => {
            pagination.nextPage();
          }
        }
      }
    )
  } else if (vegancheck.checked == true && vegetariancheck.checked == false) {
    service.nearbySearch(
      { location: ev, radius: 5000, type: "restaurant", keyword: "Vegan" },
      (results, status, pagination) => {
        if (status !== "OK" || !results) return;

        // Adds the restaurants based on city to a list at the bottom of the page with the address, rating, and price level. 

        addPlaces(results, map);
        moreButton.disabled = !pagination || !pagination.hasNextPage;
        if (pagination && pagination.hasNextPage) {
          getNextPage = () => {
            pagination.nextPage();
          }
        }
      }
    )
  } else if (vegancheck.checked == true && vegetariancheck.checked == true) {
    service.nearbySearch(
      { location: ev, radius: 5000, type: "restaurant", keyword: "Vegetarian" },
      (results, status, pagination) => {
        if (status !== "OK" || !results) return;

        // Adds the restaurants based on city to a list at the bottom of the page with the address, rating, and price level. 

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
}

function addPlaces(places, map) {
  console.log(places)
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

      // Displays stars underneath the restaurant that correspond with the restaurant's respective rating as well as a dollar sign based on how expensive the food is. Google's API provides us with both the ratings and the price level.
      // Added data attribute that stores google api's place_id and added on click function.
      if (place.price_level == 1) {
        if (place.rating < 1.3) {
          li.innerHTML = place.name + "<br> Address: " + place.vicinity + "<button onclick='storeFavorites(event)' data-placeId='" + place.place_id + "' id='addfavorite'>Favorite &#11088</button><br> Rating: &starf; <br> Price: $ <br>";
        } else if (place.rating >= 1.3 && place.rating < 1.7) {
          li.innerHTML = place.name + "<br> Address: " + place.vicinity + "<button onclick='storeFavorites(event)' data-placeId='" + place.place_id + "' id='addfavorite'>Favorite &#11088</button><br> Rating: &starf; <i style='font-size:75%' class='fa'>&#xf123;</i> <br> Price: $ <br>";
        } else if (place.rating >= 1.7 && place.rating < 2.3) {
          li.innerHTML = place.name + "<br> Address: " + place.vicinity + "<button onclick='storeFavorites(event)' data-placeId='" + place.place_id + "' id='addfavorite'>Favorite &#11088</button><br> Rating: &starf; &starf;  <br> Price: $ <br>";
        } else if (place.rating >= 2.3 && place.rating < 2.7) {
          li.innerHTML = place.name + "<br> Address: " + place.vicinity + "<button onclick='storeFavorites(event)' data-placeId='" + place.place_id + "' id='addfavorite'>Favorite &#11088</button><br> Rating: &starf; &starf; <i style='font-size:75%' class='fa'>&#xf123;</i>   <br> Price: $ <br>";
        } else if (place.rating >= 2.7 && place.rating < 3.3) {
          li.innerHTML = place.name + "<br> Address: " + place.vicinity + "<button onclick='storeFavorites(event)' data-placeId='" + place.place_id + "' id='addfavorite'>Favorite &#11088</button><br> Rating: &starf; &starf; &starf;  <br> Price: $ <br>";
        } else if (place.rating >= 3.3 && place.rating < 3.7) {
          li.innerHTML = place.name + "<br> Address: " + place.vicinity + "<button onclick='storeFavorites(event)' data-placeId='" + place.place_id + "' id='addfavorite'>Favorite &#11088</button><br> Rating: &starf; &starf; &starf;  <i style='font-size:75%' class='fa'>&#xf123;</i>  <br> Price: $ <br>";
        } else if (place.rating >= 3.7 && place.rating < 4.3) {
          li.innerHTML = place.name + "<br> Address: " + place.vicinity + "<button onclick='storeFavorites(event)' data-placeId='" + place.place_id + "' id='addfavorite'>Favorite &#11088</button><br> Rating: &starf; &starf; &starf; &starf;  <br> Price: $ <br>";
        } else if (place.rating >= 4.3 && place.rating < 4.7) {
          li.innerHTML = place.name + "<br> Address: " + place.vicinity + "<button onclick='storeFavorites(event)' data-placeId='" + place.place_id + "' id='addfavorite'>Favorite &#11088</button><br> Rating: &starf; &starf; &starf; &starf;  <i style='font-size:75%' class='fa'>&#xf123;</i> <br> Price: $ <br>";
        } else if (place.rating >= 4.7) {
          li.innerHTML = place.name + "<br> Address: " + place.vicinity + "<button onclick='storeFavorites(event)' data-placeId='" + place.place_id + "' id='addfavorite'>Favorite &#11088</button><br> Rating: &starf; &starf; &starf; &starf; &starf; <br> Price: $ <br>";
        }
      } else if (place.price_level == 2) {
        if (place.rating < 1.3) {
          li.innerHTML = place.name + "<br> Address: " + place.vicinity + "<button onclick='storeFavorites(event)' data-placeId='" + place.place_id + "' id='addfavorite'>Favorite &#11088</button><br> Rating: &starf; <br> Price: $$ <br>";
        } else if (place.rating >= 1.3 && place.rating < 1.7) {
          li.innerHTML = place.name + "<br> Address: " + place.vicinity + "<button onclick='storeFavorites(event)' data-placeId='" + place.place_id + "' id='addfavorite'>Favorite &#11088</button><br> Rating: &starf; <i style='font-size:75%' class='fa'>&#xf123;</i> <br> Price: $$ <br>";
        } else if (place.rating >= 1.7 && place.rating < 2.3) {
          li.innerHTML = place.name + "<br> Address: " + place.vicinity + "<button onclick='storeFavorites(event)' data-placeId='" + place.place_id + "' id='addfavorite'>Favorite &#11088</button><br> Rating: &starf; &starf;  <br> Price: $$ <br>";
        } else if (place.rating >= 2.3 && place.rating < 2.7) {
          li.innerHTML = place.name + "<br> Address: " + place.vicinity + "<button onclick='storeFavorites(event)' data-placeId='" + place.place_id + "' id='addfavorite'>Favorite &#11088</button><br> Rating: &starf; &starf; <i style='font-size:75%' class='fa'>&#xf123;</i>   <br> Price: $$ <br>";
        } else if (place.rating >= 2.7 && place.rating < 3.3) {
          li.innerHTML = place.name + "<br> Address: " + place.vicinity + "<button onclick='storeFavorites(event)' data-placeId='" + place.place_id + "' id='addfavorite'>Favorite &#11088</button><br> Rating: &starf; &starf; &starf;  <br> Price: $$ <br>";
        } else if (place.rating >= 3.3 && place.rating < 3.7) {
          li.innerHTML = place.name + "<br> Address: " + place.vicinity + "<button onclick='storeFavorites(event)' data-placeId='" + place.place_id + "' id='addfavorite'>Favorite &#11088</button><br> Rating: &starf; &starf; &starf;  <i style='font-size:75%' class='fa'>&#xf123;</i>  <br> Price: $$ <br>";
        } else if (place.rating >= 3.7 && place.rating < 4.3) {
          li.innerHTML = place.name + "<br> Address: " + place.vicinity + "<button onclick='storeFavorites(event)' data-placeId='" + place.place_id + "' id='addfavorite'>Favorite &#11088</button><br> Rating: &starf; &starf; &starf; &starf;  <br> Price: $$ <br>";
        } else if (place.rating >= 4.3 && place.rating < 4.7) {
          li.innerHTML = place.name + "<br> Address: " + place.vicinity + "<button onclick='storeFavorites(event)' data-placeId='" + place.place_id + "' id='addfavorite'>Favorite &#11088</button><br> Rating: &starf; &starf; &starf; &starf;  <i style='font-size:75%' class='fa'>&#xf123;</i> <br> Price: $$ <br>";
        } else if (place.rating >= 4.7) {
          li.innerHTML = place.name + "<br> Address: " + place.vicinity + "<button onclick='storeFavorites(event)' data-placeId='" + place.place_id + "' id='addfavorite'>Favorite &#11088</button><br> Rating: &starf; &starf; &starf; &starf; &starf; <br> Price: $$ <br>";
        }
      } else if (place.price_level == 3) {
        if (place.rating < 1.3) {
          li.innerHTML = place.name + "<br> Address: " + place.vicinity + "<button onclick='storeFavorites(event)' data-placeId='" + place.place_id + "' id='addfavorite'>Favorite &#11088</button><br> Rating: &starf; <br> Price: $$$ <br>";
        } else if (place.rating >= 1.3 && place.rating < 1.7) {
          li.innerHTML = place.name + "<br> Address: " + place.vicinity + "<button onclick='storeFavorites(event)' data-placeId='" + place.place_id + "' id='addfavorite'>Favorite &#11088</button><br> Rating: &starf; <i style='font-size:75%' class='fa'>&#xf123;</i> <br> Price: $$$ <br>";
        } else if (place.rating >= 1.7 && place.rating < 2.3) {
          li.innerHTML = place.name + "<br> Address: " + place.vicinity + "<button onclick='storeFavorites(event)' data-placeId='" + place.place_id + "' id='addfavorite'>Favorite &#11088</button><br> Rating: &starf; &starf;  <br> Price: $$$ <br>";
        } else if (place.rating >= 2.3 && place.rating < 2.7) {
          li.innerHTML = place.name + "<br> Address: " + place.vicinity + "<button onclick='storeFavorites(event)' data-placeId='" + place.place_id + "' id='addfavorite'>Favorite &#11088</button><br> Rating: &starf; &starf; <i style='font-size:75%' class='fa'>&#xf123;</i>   <br> Price: $$$ <br>";
        } else if (place.rating >= 2.7 && place.rating < 3.3) {
          li.innerHTML = place.name + "<br> Address: " + place.vicinity + "<button onclick='storeFavorites(event)' data-placeId='" + place.place_id + "' id='addfavorite'>Favorite &#11088</button><br> Rating: &starf; &starf; &starf;  <br> Price: $$$ <br>";
        } else if (place.rating >= 3.3 && place.rating < 3.7) {
          li.innerHTML = place.name + "<br> Address: " + place.vicinity + "<button onclick='storeFavorites(event)' data-placeId='" + place.place_id + "' id='addfavorite'>Favorite &#11088</button><br> Rating: &starf; &starf; &starf;  <i style='font-size:75%' class='fa'>&#xf123;</i>  <br> Price: $$$ <br>";
        } else if (place.rating >= 3.7 && place.rating < 4.3) {
          li.innerHTML = place.name + "<br> Address: " + place.vicinity + "<button onclick='storeFavorites(event)' data-placeId='" + place.place_id + "' id='addfavorite'>Favorite &#11088</button><br> Rating: &starf; &starf; &starf; &starf;  <br> Price: $$$ <br>";
        } else if (place.rating >= 4.3 && place.rating < 4.7) {
          li.innerHTML = place.name + "<br> Address: " + place.vicinity + "<button onclick='storeFavorites(event)' data-placeId='" + place.place_id + "' id='addfavorite'>Favorite &#11088</button><br> Rating: &starf; &starf; &starf; &starf;  <i style='font-size:75%' class='fa'>&#xf123;</i> <br> Price: $$$ <br>";
        } else if (place.rating >= 4.7) {
          li.innerHTML = place.name + "<br> Address: " + place.vicinity + "<button onclick='storeFavorites(event)' data-placeId='" + place.place_id + "' id='addfavorite'>Favorite &#11088</button><br> Rating: &starf; &starf; &starf; &starf; &starf; <br> Price: $$$ <br>";
        }
      } else if (place.price_level == 4) {
        if (place.rating < 1.3) {
          li.innerHTML = place.name + "<br> Address: " + place.vicinity + "<button onclick='storeFavorites(event)' data-placeId='" + place.place_id + "' id='addfavorite'>Favorite &#11088</button><br> Rating: &starf; <br> Price: $$$$ <br>";
        } else if (place.rating >= 1.3 && place.rating < 1.7) {
          li.innerHTML = place.name + "<br> Address: " + place.vicinity + "<button onclick='storeFavorites(event)' data-placeId='" + place.place_id + "' id='addfavorite'>Favorite &#11088</button><br> Rating: &starf; <i style='font-size:75%' class='fa'>&#xf123;</i> <br> Price: $$$$ <br>";
        } else if (place.rating >= 1.7 && place.rating < 2.3) {
          li.innerHTML = place.name + "<br> Address: " + place.vicinity + "<button onclick='storeFavorites(event)' data-placeId='" + place.place_id + "' id='addfavorite'>Favorite &#11088</button><br> Rating: &starf; &starf;  <br> Price: $$$$ <br>";
        } else if (place.rating >= 2.3 && place.rating < 2.7) {
          li.innerHTML = place.name + "<br> Address: " + place.vicinity + "<button onclick='storeFavorites(event)' data-placeId='" + place.place_id + "' id='addfavorite'>Favorite &#11088</button><br> Rating: &starf; &starf; <i style='font-size:75%' class='fa'>&#xf123;</i>   <br> Price: $$$$ <br>";
        } else if (place.rating >= 2.7 && place.rating < 3.3) {
          li.innerHTML = place.name + "<br> Address: " + place.vicinity + "<button onclick='storeFavorites(event)' data-placeId='" + place.place_id + "' id='addfavorite'>Favorite &#11088</button><br> Rating: &starf; &starf; &starf;  <br> Price: $$$$ <br>";
        } else if (place.rating >= 3.3 && place.rating < 3.7) {
          li.innerHTML = place.name + "<br> Address: " + place.vicinity + "<button onclick='storeFavorites(event)' data-placeId='" + place.place_id + "' id='addfavorite'>Favorite &#11088</button><br> Rating: &starf; &starf; &starf;  <i style='font-size:75%' class='fa'>&#xf123;</i>  <br> Price:  $$$$ <br>";
        } else if (place.rating >= 3.7 && place.rating < 4.3) {
          li.innerHTML = place.name + "<br> Address: " + place.vicinity + "<button onclick='storeFavorites(event)' data-placeId='" + place.place_id + "' id='addfavorite'>Favorite &#11088</button><br> Rating: &starf; &starf; &starf; &starf;  <br> Price:  $$$$ <br>";
        } else if (place.rating >= 4.3 && place.rating < 4.7) {
          li.innerHTML = place.name + "<br> Address: " + place.vicinity + "<button onclick='storeFavorites(event)' data-placeId='" + place.place_id + "' id='addfavorite'>Favorite &#11088</button><br> Rating: &starf; &starf; &starf; &starf;  <i style='font-size:75%' class='fa'>&#xf123;</i> <br> Price:  $$$$ <br>";
        } else if (place.rating >= 4.7) {
          li.innerHTML = place.name + "<br> Address: " + place.vicinity + "<button onclick='storeFavorites(event)' data-placeId='" + place.place_id + "' id='addfavorite'>Favorite &#11088</button><br> Rating: &starf; &starf; &starf; &starf; &starf; <br> Price:  $$$$ <br>";
        }
      } else if (place.price_level == 5) {
        if (place.rating < 1.3) {
          li.innerHTML = place.name + "<br> Address: " + place.vicinity + "<button onclick='storeFavorites(event)' data-placeId='" + place.place_id + "' id='addfavorite'>Favorite &#11088</button><br> Rating: &starf; <br> Price: $$$$$ <br>";
        } else if (place.rating >= 1.3 && place.rating < 1.7) {
          li.innerHTML = place.name + "<br> Address: " + place.vicinity + "<button onclick='storeFavorites(event)' data-placeId='" + place.place_id + "' id='addfavorite'>Favorite &#11088</button><br> Rating: &starf; <i style='font-size:75%' class='fa'>&#xf123;</i> <br> Price: $$$$$ <br>";
        } else if (place.rating >= 1.7 && place.rating < 2.3) {
          li.innerHTML = place.name + "<br> Address: " + place.vicinity + "<button onclick='storeFavorites(event)' data-placeId='" + place.place_id + "' id='addfavorite'>Favorite &#11088</button><br> Rating: &starf; &starf;  <br> Price:  $$$$$ <br>";
        } else if (place.rating >= 2.3 && place.rating < 2.7) {
          li.innerHTML = place.name + "<br> Address: " + place.vicinity + "<button onclick='storeFavorites(event)' data-placeId='" + place.place_id + "' id='addfavorite'>Favorite &#11088</button><br> Rating: &starf; &starf; <i style='font-size:75%' class='fa'>&#xf123;</i>   <br> Price: $$$$$ <br>";
        } else if (place.rating >= 2.7 && place.rating < 3.3) {
          li.innerHTML = place.name + "<br> Address: " + place.vicinity + "<button onclick='storeFavorites(event)' data-placeId='" + place.place_id + "' id='addfavorite'>Favorite &#11088</button><br> Rating: &starf; &starf; &starf;  <br> Price: $$$$$ <br>";
        } else if (place.rating >= 3.3 && place.rating < 3.7) {
          li.innerHTML = place.name + "<br> Address: " + place.vicinity + "<button onclick='storeFavorites(event)' data-placeId='" + place.place_id + "' id='addfavorite'>Favorite &#11088</button><br> Rating: &starf; &starf; &starf;  <i style='font-size:75%' class='fa'>&#xf123;</i>  <br> Price: $$$$$ <br>";
        } else if (place.rating >= 3.7 && place.rating < 4.3) {
          li.innerHTML = place.name + "<br> Address: " + place.vicinity + "<button onclick='storeFavorites(event)' data-placeId='" + place.place_id + "' id='addfavorite'>Favorite &#11088</button><br> Rating: &starf; &starf; &starf; &starf;  <br> Price: $$$$$ <br>";
        } else if (place.rating >= 4.3 && place.rating < 4.7) {
          li.innerHTML = place.name + "<br> Address: " + place.vicinity + "<button onclick='storeFavorites(event)' data-placeId='" + place.place_id + "' id='addfavorite'>Favorite &#11088</button><br> Rating: &starf; &starf; &starf; &starf;  <i style='font-size:75%' class='fa'>&#xf123;</i> <br> Price: $$$$$ <br>";
        } else if (place.rating >= 4.7) {
          li.innerHTML = place.name + "<br> Address: " + place.vicinity + "<button onclick='storeFavorites(event)' data-placeId='" + place.place_id + "' id='addfavorite'>Favorite &#11088</button><br> Rating: &starf; &starf; &starf; &starf; &starf; <br> Price: $$$$$ <br>";
        }
      } else if (place.price_level == undefined) {
        if (place.rating < 1.3) {
          li.innerHTML = place.name + "<br> Address: " + place.vicinity + "<button onclick='storeFavorites(event)' data-placeId='" + place.place_id + "' id='addfavorite'>Favorite &#11088</button><br> Rating: &starf; <br> Price Not Listed" + "<br>";
        } else if (place.rating >= 1.3 && place.rating < 1.7) {
          li.innerHTML = place.name + "<br> Address: " + place.vicinity + "<button onclick='storeFavorites(event)' data-placeId='" + place.place_id + "' id='addfavorite'>Favorite &#11088</button><br> Rating: &starf; <i style='font-size:75%' class='fa'>&#xf123;</i> <br> Price: Price Not Listed" + "<br>";
        } else if (place.rating >= 1.7 && place.rating < 2.3) {
          li.innerHTML = place.name + "<br> Address: " + place.vicinity + "<button onclick='storeFavorites(event)' data-placeId='" + place.place_id + "' id='addfavorite'>Favorite &#11088</button><br> Rating: &starf; &starf;  <br> Price: Price Not Listed" + "<br>";
        } else if (place.rating >= 2.3 && place.rating < 2.7) {
          li.innerHTML = place.name + "<br> Address: " + place.vicinity + "<button onclick='storeFavorites(event)' data-placeId='" + place.place_id + "' id='addfavorite'>Favorite &#11088</button><br> Rating: &starf; &starf; <i style='font-size:75%' class='fa'>&#xf123;</i>   <br> Price: Price Not Listed" + "<br>";
        } else if (place.rating >= 2.7 && place.rating < 3.3) {
          li.innerHTML = place.name + "<br> Address: " + place.vicinity + "<button onclick='storeFavorites(event)' data-placeId='" + place.place_id + "' id='addfavorite'>Favorite &#11088</button><br> Rating: &starf; &starf; &starf;  <br> Price: Price Not Listed" + "<br>";
        } else if (place.rating >= 3.3 && place.rating < 3.7) {
          li.innerHTML = place.name + "<br> Address: " + place.vicinity + "<button onclick='storeFavorites(event)' data-placeId='" + place.place_id + "' id='addfavorite'>Favorite &#11088</button><br> Rating: &starf; &starf; &starf;  <i style='font-size:75%' class='fa'>&#xf123;</i>  <br> Price: Price Not Listed" + "<br>";
        } else if (place.rating >= 3.7 && place.rating < 4.3) {
          li.innerHTML = place.name + "<br> Address: " + place.vicinity + "<button onclick='storeFavorites(event)' data-placeId='" + place.place_id + "' id='addfavorite'>Favorite &#11088</button><br> Rating: &starf; &starf; &starf; &starf;  <br> Price: Price Not Listed" + "<br>";
        } else if (place.rating >= 4.3 && place.rating < 4.7) {
          li.innerHTML = place.name + "<br> Address: " + place.vicinity + "<button onclick='storeFavorites(event)' data-placeId='" + place.place_id + "' id='addfavorite'>Favorite &#11088</button><br> Rating: &starf; &starf; &starf; &starf;  <i style='font-size:75%' class='fa'>&#xf123;</i> <br> Price: Price Not Listed" + "<br>";
        } else if (place.rating >= 4.7) {
          li.innerHTML = place.name + "<br> Address: " + place.vicinity + "<button onclick='storeFavorites(event)' data-placeId='" + place.place_id + "' id='addfavorite'>Favorite &#11088</button><br> Rating: &starf; &starf; &starf; &starf; &starf; <br> Price: Price Not Listed" + "<br>";
        }
      };

      placesList.appendChild(li);
      li.addEventListener("click", () => {
        map.setCenter(place.geometry.location);


      });

    }
  }
}

// function that saves favorites to local storage

function storeFavorites(event) {
  console.log(event.target.getAttribute("data-placeId"))
  var favoritesList = JSON.parse(localStorage.getItem("favorites")) || [];
  favoritesList.push(event.target.getAttribute("data-placeId"))
  localStorage.setItem("favorites", JSON.stringify(favoritesList))
  alert("Restaurant saved to favorites")
}


window.initMap = initMap();



