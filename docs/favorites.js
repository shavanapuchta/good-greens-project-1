// var placeIdURL = "https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJrTLr-GyuEmsRBfy61i59si0&key=AIzaSyDbRLVtnxgOTPF4I23qMVJ908WFl6-TDOc"

// Above is the query URL to fetch a restaurant by placeID 

var APIkey = "AIzaSyDbRLVtnxgOTPF4I23qMVJ908WFl6-TDOc";
var weatherKey = "4b68235b6d97901e4e6eb2b454a04dd0";
var marker;
var map;

// Grabs favorites array from local storage
var favoritesList = JSON.parse(localStorage.getItem("favorites")) || [];

var coord = { lat: 32.7153, lng: -117.1573 }
console.log(coord)


function initMap() {
    const map = new google.maps.Map(document.getElementById("favorites-map"), {
        center: coord,
        zoom: 5,
        mapId: "5e79efcdf99d1225",
    });

    // Create function that loops through favoriteList and grabs each placeID  
    for (let i = 0; i < favoritesList.length; i++) {
        console.log(favoritesList[i]);

        var request = {
            placeId: favoritesList[i],
            fields: ["name", "formatted_address", "price_level", "rating", "place_id", "geometry"]
        };
        console.log(request)

        const service = new google.maps.places.PlacesService(map);

        service.getDetails(request, callback);
        function callback(place, status) {
            if (
                status == google.maps.places.PlacesServiceStatus.OK &&
                place &&
                place.geometry &&
                place.geometry.location) {
                console.log(status);
                console.log(place);
                createMarker(place);
                const placesList = document.getElementById("favorites")
                const li = document.createElement("li");
                placesList.appendChild(li);
                if (place.price_level == 1) {
        if (place.rating < 1.3) {
          li.innerHTML = place.name + "<br> Address: <br>" + place.formatted_address + "<br> Rating: &starf; <br> Price: $ <br>";
        } else if (place.rating >= 1.3 && place.rating < 1.7) {
          li.innerHTML = place.name + "<br> Address: <br>" + place.formatted_address + "<br> Rating: &starf; <i style='font-size:75%' class='fa'>&#xf123;</i> <br> Price: $ <br>";
        } else if (place.rating >= 1.7 && place.rating < 2.3) {
          li.innerHTML = place.name + "<br> Address: <br>" + place.formatted_address + "<br> Rating: &starf; &starf;  <br> Price: $ <br>";
        } else if (place.rating >= 2.3 && place.rating < 2.7) {
          li.innerHTML = place.name + "<br> Address: <br>" + place.formatted_address + "<br> Rating: &starf; &starf; <i style='font-size:75%' class='fa'>&#xf123;</i>   <br> Price: $ <br>";
        } else if (place.rating >= 2.7 && place.rating < 3.3) {
          li.innerHTML = place.name + "<br> Address: <br>" + place.formatted_address + "<br> Rating: &starf; &starf; &starf;  <br> Price: $ <br>";
        } else if (place.rating >= 3.3 && place.rating < 3.7) {
          li.innerHTML = place.name + "<br> Address: <br>" + place.formatted_address + "<br> Rating: &starf; &starf; &starf;  <i style='font-size:75%' class='fa'>&#xf123;</i>  <br> Price: $ <br>";
        } else if (place.rating >= 3.7 && place.rating < 4.3) {
          li.innerHTML = place.name + "<br> Address: <br>" + place.formatted_address + "<br> Rating: &starf; &starf; &starf; &starf;  <br> Price: $ <br>";
        } else if (place.rating >= 4.3 && place.rating < 4.7) {
          li.innerHTML = place.name + "<br> Address: <br>" + place.formatted_address + "<br> Rating: &starf; &starf; &starf; &starf;  <i style='font-size:75%' class='fa'>&#xf123;</i> <br> Price: $ <br>";
        } else if (place.rating >= 4.7) {
          li.innerHTML = place.name + "<br> Address: <br>" + place.formatted_address + "<br> Rating: &starf; &starf; &starf; &starf; &starf; <br> Price: $ <br>";
        }
      } else if (place.price_level == 2) {
        if (place.rating < 1.3) {
          li.innerHTML = place.name + "<br> Address: <br>" + place.formatted_address + "<br> Rating: &starf; <br> Price: $$ <br>";
        } else if (place.rating >= 1.3 && place.rating < 1.7) {
          li.innerHTML = place.name + "<br> Address: <br>" + place.formatted_address + "<br> Rating: &starf; <i style='font-size:75%' class='fa'>&#xf123;</i> <br> Price: $$ <br>";
        } else if (place.rating >= 1.7 && place.rating < 2.3) {
          li.innerHTML = place.name + "<br> Address: <br>" + place.formatted_address + "<br> Rating: &starf; &starf;  <br> Price: $$ <br>";
        } else if (place.rating >= 2.3 && place.rating < 2.7) {
          li.innerHTML = place.name + "<br> Address: <br>" + place.formatted_address + "<br> Rating: &starf; &starf; <i style='font-size:75%' class='fa'>&#xf123;</i>   <br> Price: $$ <br>";
        } else if (place.rating >= 2.7 && place.rating < 3.3) {
          li.innerHTML = place.name + "<br> Address: <br>" + place.formatted_address + "<br> Rating: &starf; &starf; &starf;  <br> Price: $$ <br>";
        } else if (place.rating >= 3.3 && place.rating < 3.7) {
          li.innerHTML = place.name + "<br> Address: <br>" + place.formatted_address + "<br> Rating: &starf; &starf; &starf;  <i style='font-size:75%' class='fa'>&#xf123;</i>  <br> Price: $$ <br>";
        } else if (place.rating >= 3.7 && place.rating < 4.3) {
          li.innerHTML = place.name + "<br> Address: <br>" + place.formatted_address + "<br> Rating: &starf; &starf; &starf; &starf;  <br> Price: $$ <br>";
        } else if (place.rating >= 4.3 && place.rating < 4.7) {
          li.innerHTML = place.name + "<br> Address: <br>" + place.formatted_address + "<br> Rating: &starf; &starf; &starf; &starf;  <i style='font-size:75%' class='fa'>&#xf123;</i> <br> Price: $$ <br>";
        } else if (place.rating >= 4.7) {
          li.innerHTML = place.name + "<br> Address: <br>" + place.formatted_address + "<br> Rating: &starf; &starf; &starf; &starf; &starf; <br> Price: $$ <br>";
        }
      } else if (place.price_level == 3) {
        if (place.rating < 1.3) {
          li.innerHTML = place.name + "<br> Address: <br>" + place.formatted_address + "<br> Rating: &starf; <br> Price: $$$ <br>";
        } else if (place.rating >= 1.3 && place.rating < 1.7) {
          li.innerHTML = place.name + "<br> Address: <br>" + place.formatted_address + "<br> Rating: &starf; <i style='font-size:75%' class='fa'>&#xf123;</i> <br> Price: $$$ <br>";
        } else if (place.rating >= 1.7 && place.rating < 2.3) {
          li.innerHTML = place.name + "<br> Address: <br>" + place.formatted_address + "<br> Rating: &starf; &starf;  <br> Price: $$$ <br>";
        } else if (place.rating >= 2.3 && place.rating < 2.7) {
          li.innerHTML = place.name + "<br> Address: <br>" + place.formatted_address + "<br> Rating: &starf; &starf; <i style='font-size:75%' class='fa'>&#xf123;</i>   <br> Price: $$$ <br>";
        } else if (place.rating >= 2.7 && place.rating < 3.3) {
          li.innerHTML = place.name + "<br> Address: <br>" + place.formatted_address + "<br> Rating: &starf; &starf; &starf;  <br> Price: $$$ <br>";
        } else if (place.rating >= 3.3 && place.rating < 3.7) {
          li.innerHTML = place.name + "<br> Address: <br>" + place.formatted_address + "<br> Rating: &starf; &starf; &starf;  <i style='font-size:75%' class='fa'>&#xf123;</i>  <br> Price: $$$ <br>";
        } else if (place.rating >= 3.7 && place.rating < 4.3) {
          li.innerHTML = place.name + "<br> Address: <br>" + place.formatted_address + "<br> Rating: &starf; &starf; &starf; &starf;  <br> Price: $$$ <br>";
        } else if (place.rating >= 4.3 && place.rating < 4.7) {
          li.innerHTML = place.name + "<br> Address: <br>" + place.formatted_address + "<br> Rating: &starf; &starf; &starf; &starf;  <i style='font-size:75%' class='fa'>&#xf123;</i> <br> Price: $$$ <br>";
        } else if (place.rating >= 4.7) {
          li.innerHTML = place.name + "<br> Address: <br>" + place.formatted_address + "<br> Rating: &starf; &starf; &starf; &starf; &starf; <br> Price: $$$ <br>";
        }
      } else if (place.price_level == 4) {
        if (place.rating < 1.3) {
          li.innerHTML = place.name + "<br> Address: <br>" + place.formatted_address + "<br> Rating: &starf; <br> Price: $$$$ <br>";
        } else if (place.rating >= 1.3 && place.rating < 1.7) {
          li.innerHTML = place.name + "<br> Address: <br>" + place.formatted_address + "<br> Rating: &starf; <i style='font-size:75%' class='fa'>&#xf123;</i> <br> Price: $$$$ <br>";
        } else if (place.rating >= 1.7 && place.rating < 2.3) {
          li.innerHTML = place.name + "<br> Address: <br>" + place.formatted_address + "<br> Rating: &starf; &starf;  <br> Price: $$$$ <br>";
        } else if (place.rating >= 2.3 && place.rating < 2.7) {
          li.innerHTML = place.name + "<br> Address: <br>" + place.formatted_address + "<br> Rating: &starf; &starf; <i style='font-size:75%' class='fa'>&#xf123;</i>   <br> Price: $$$$ <br>";
        } else if (place.rating >= 2.7 && place.rating < 3.3) {
          li.innerHTML = place.name + "<br> Address: <br>" + place.formatted_address + "<br> Rating: &starf; &starf; &starf;  <br> Price: $$$$ <br>";
        } else if (place.rating >= 3.3 && place.rating < 3.7) {
          li.innerHTML = place.name + "<br> Address: <br>" + place.formatted_address + "<br> Rating: &starf; &starf; &starf;  <i style='font-size:75%' class='fa'>&#xf123;</i>  <br> Price:  $$$$ <br>";
        } else if (place.rating >= 3.7 && place.rating < 4.3) {
          li.innerHTML = place.name + "<br> Address: <br>" + place.formatted_address + "<br> Rating: &starf; &starf; &starf; &starf;  <br> Price:  $$$$ <br>";
        } else if (place.rating >= 4.3 && place.rating < 4.7) {
          li.innerHTML = place.name + "<br> Address: <br>" + place.formatted_address + "<br> Rating: &starf; &starf; &starf; &starf;  <i style='font-size:75%' class='fa'>&#xf123;</i> <br> Price:  $$$$ <br>";
        } else if (place.rating >= 4.7) {
          li.innerHTML = place.name + "<br> Address: <br>" + place.formatted_address + "<br> Rating: &starf; &starf; &starf; &starf; &starf; <br> Price:  $$$$ <br>";
        }
      } else if (place.price_level == 5) {
        if (place.rating < 1.3) {
          li.innerHTML = place.name + "<br> Address: <br>" + place.formatted_address + "<br> Rating: &starf; <br> Price: $$$$$ <br>";
        } else if (place.rating >= 1.3 && place.rating < 1.7) {
          li.innerHTML = place.name + "<br> Address: <br>" + place.formatted_address + "<br> Rating: &starf; <i style='font-size:75%' class='fa'>&#xf123;</i> <br> Price: $$$$$ <br>";
        } else if (place.rating >= 1.7 && place.rating < 2.3) {
          li.innerHTML = place.name + "<br> Address: <br>" + place.formatted_address + "<br> Rating: &starf; &starf;  <br> Price:  $$$$$ <br>";
        } else if (place.rating >= 2.3 && place.rating < 2.7) {
          li.innerHTML = place.name + "<br> Address: <br>" + place.formatted_address + "<br> Rating: &starf; &starf; <i style='font-size:75%' class='fa'>&#xf123;</i>   <br> Price: $$$$$ <br>";
        } else if (place.rating >= 2.7 && place.rating < 3.3) {
          li.innerHTML = place.name + "<br> Address: <br>" + place.formatted_address + "<br> Rating: &starf; &starf; &starf;  <br> Price: $$$$$ <br>";
        } else if (place.rating >= 3.3 && place.rating < 3.7) {
          li.innerHTML = place.name + "<br> Address: <br>" + place.formatted_address + "<br> Rating: &starf; &starf; &starf;  <i style='font-size:75%' class='fa'>&#xf123;</i>  <br> Price: $$$$$ <br>";
        } else if (place.rating >= 3.7 && place.rating < 4.3) {
          li.innerHTML = place.name + "<br> Address: <br>" + place.formatted_address + "<br> Rating: &starf; &starf; &starf; &starf;  <br> Price: $$$$$ <br>";
        } else if (place.rating >= 4.3 && place.rating < 4.7) {
          li.innerHTML = place.name + "<br> Address: <br>" + place.formatted_address + "<br> Rating: &starf; &starf; &starf; &starf;  <i style='font-size:75%' class='fa'>&#xf123;</i> <br> Price: $$$$$ <br>";
        } else if (place.rating >= 4.7) {
          li.innerHTML = place.name + "<br> Address: <br>" + place.formatted_address + "<br> Rating: &starf; &starf; &starf; &starf; &starf; <br> Price: $$$$$ <br>";
        }
      } else if (place.price_level == undefined) {
        if (place.rating < 1.3) {
          li.innerHTML = place.name + "<br> Address: <br>" + place.formatted_address + "<br> Rating: &starf; <br> Price Not Listed" + "<br>";
        } else if (place.rating >= 1.3 && place.rating < 1.7) {
          li.innerHTML = place.name + "<br> Address: <br>" + place.formatted_address + "<br> Rating: &starf; <i style='font-size:75%' class='fa'>&#xf123;</i> <br> Price: Price Not Listed" + "<br>";
        } else if (place.rating >= 1.7 && place.rating < 2.3) {
          li.innerHTML = place.name + "<br> Address: <br>" + place.formatted_address + "<br> Rating: &starf; &starf;  <br> Price: Price Not Listed" + "<br>";
        } else if (place.rating >= 2.3 && place.rating < 2.7) {
          li.innerHTML = place.name + "<br> Address: <br>" + place.formatted_address + "<br> Rating: &starf; &starf; <i style='font-size:75%' class='fa'>&#xf123;</i>   <br> Price: Price Not Listed" + "<br>";
        } else if (place.rating >= 2.7 && place.rating < 3.3) {
          li.innerHTML = place.name + "<br> Address: <br>" + place.formatted_address + "<br> Rating: &starf; &starf; &starf;  <br> Price: Price Not Listed" + "<br>";
        } else if (place.rating >= 3.3 && place.rating < 3.7) {
          li.innerHTML = place.name + "<br> Address: <br>" + place.formatted_address + "<br> Rating: &starf; &starf; &starf;  <i style='font-size:75%' class='fa'>&#xf123;</i>  <br> Price: Price Not Listed" + "<br>";
        } else if (place.rating >= 3.7 && place.rating < 4.3) {
          li.innerHTML = place.name + "<br> Address: <br>" + place.formatted_address + "<br> Rating: &starf; &starf; &starf; &starf;  <br> Price: Price Not Listed" + "<br>";
        } else if (place.rating >= 4.3 && place.rating < 4.7) {
          li.innerHTML = place.name + "<br> Address: <br>" + place.formatted_address + "<br> Rating: &starf; &starf; &starf; &starf;  <i style='font-size:75%' class='fa'>&#xf123;</i> <br> Price: Price Not Listed" + "<br>";
        } else if (place.rating >= 4.7) {
          li.innerHTML = place.name + "<br> Address: <br>" + place.formatted_address + "<br> Rating: &starf; &starf; &starf; &starf; &starf; <br> Price: Price Not Listed" + "<br>";
        }
      };

            }
        }
    }

    function createMarker(place) {
        if (!place.geometry || !place.geometry.location) return;

        marker = new google.maps.Marker({
            map,
            position: place.geometry.location,
        });

    }

}

console.log(favoritesList)


window.initMap = initMap();













// Set the position of the marker using the place ID and location.
// @ts-ignore This should be in @typings/googlemaps.
// marker.setPlace({
//     placeId: place.place_id,
//     location: place.geometry.location,
// });
// marker.setVisible(true);
// infowindowContent.children.namedItem("place-name").textContent = place.name;
// infowindowContent.children.namedItem("place-id").textContent =
//     place.place_id;
// infowindowContent.children.namedItem("place-address").textContent =
//     place.formatted_address;
// infowindow.open(map, marker);

