//var APIkey = "AIzaSyDbRLVtnxgOTPF4I23qMVJ908WFl6-TDOc"

var map;
var service;
var infowindow;

function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 32.7157, lng: -117.1611 },
    zoom: 13,
    mapId: "5e79efcdf99d1225",
  });
}
const marker = new google.maps.Marker({
    position: { lat: 32.7157, lng: -117.1611 },
    map: map,
})

window.initAutocomplete = initAutocomplete;


//service.textSearch(request, callback);


