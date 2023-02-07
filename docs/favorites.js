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
    const map = new google.maps.Map(document.getElementById("map"), {
        center: coord,
        zoom: 13,
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
                li.innerHTML = place.name + "<br> Address: " + place.formatted_address + "<br> Price: " + place.price_level + "<br> Rating: " + place.rating;
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

