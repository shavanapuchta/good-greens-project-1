// var placeIdURL = "https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJrTLr-GyuEmsRBfy61i59si0&key=AIzaSyDbRLVtnxgOTPF4I23qMVJ908WFl6-TDOc"

// Above is the query URL to fetch a restaurant by placeID 

var APIkey = "AIzaSyDbRLVtnxgOTPF4I23qMVJ908WFl6-TDOc"

// Grabs favorites array from local storage
var favoritesList = JSON.parse(localStorage.getItem("favorites")) || [];

// Create function that loops through favoriteList and fetches for each placeID  

for (let i = 0; i < favoritesList.length; i++) {
    console.log(favoritesList[i]);
}

window.onload = (event) => {
    console.log('The page has fully loaded');
    addFavorites();
}

function addFavorites() {
    console.log(favoritesList)

    const favoritesListElement = document.getElementById("favorites");

    // for (const place of places) {
    const li = document.createElement("li");

    li.innerHTML = favoritesList + " did I do that?"
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
