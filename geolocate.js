/*
  Function to be called when requesting the location
  Returns false if location not available
*/
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(reverseGeoLookup);
  } else {
    return false;
  }
}

/*
  Uses api.postcodes.io to look up the outcodes for the user's location
  NB: This isn't street level accurate - but more for a general area/town.
*/
function reverseGeoLookup(position) {
  var lat = position.coords.latitude;
  var lon = position.coords.longitude;
  var req = new XMLHttpRequest();
  req.open("GET", "https://api.postcodes.io/outcodes?lon=" + lon + "&lat=" + lat + "&limit=1", true);

  req.onreadystatechange = function () {
    if (req.readyState == 4) {
      var result = JSON.parse(req.response).result;
      if (result && result.length > 0) {
        return result[0].outcode;
      }
    }
    return false;
  };

  req.send();
}