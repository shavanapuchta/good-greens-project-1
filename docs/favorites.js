var APIkey = "AIzaSyDbRLVtnxgOTPF4I23qMVJ908WFl6-TDOc"
// https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJrTLr-GyuEmsRBfy61i59si0&key=AIzaSyDbRLVtnxgOTPF4I23qMVJ908WFl6-TDOc
// Above is the query URL to fetch a restaurant by placeID 

// Grabs favorites array from local storage
var favoriteList = JSON.parse(localStorage.getItem("Favorites")) || [];

// Create function that loops through favoriteslist and fetches for each placeID using the googlemaps URL above to create that process

for (let i = 0; i < favoriteList.length; i++) {
    console.log(favoriteList[i]);
}


