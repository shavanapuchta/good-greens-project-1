// var placeIdURL = "https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJrTLr-GyuEmsRBfy61i59si0&key=AIzaSyDbRLVtnxgOTPF4I23qMVJ908WFl6-TDOc"

// Above is the query URL to fetch a restaurant by placeID 

var APIkey = "AIzaSyDbRLVtnxgOTPF4I23qMVJ908WFl6-TDOc"

var createList = document.querySelectorAll("li");

// Grabs favorites array from local storage
var favoriteList = JSON.parse(localStorage.getItem("Favorites")) || [];

// Create function that loops through favoriteList and fetches for each placeID  

for (let i = 0; i < favoriteList.length; i++) {
    console.log(favoriteList[i]);
}

window.onload = (event) => {
    console.log('The page has fully loaded')
}


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

// window.initMap = initMap;

function addFavorites() {
    console.log(favoriteList)
    // const placesList = document.getElementById("places");

    // for (const place of places) {
}