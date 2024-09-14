// let apiKey = "AIzaSyCZUoURx - dCX5675lGu_tO5AfpzKx9i_Ao";

// Display nearby hospitals from google maps

async function initMap() {
  var lat = 22.35986956234364;
  var lng = 91.83315844578688;
  var location = { lat, lng }; // Replace with your location

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        lat = position.coords.latitude;
        lng = position.coords.longitude;
      });
    }
  }

  getLocation();

  const { Map } = await google.maps.importLibrary("maps");

  map = new Map(document.getElementById("map"), {
    center: location,
    zoom: 16,
    mapId: "176afa56d3fae32d", // Replace with your map ID
  });

  var request = {
    location: location,
    radius: "2000",
    type: ["hospital"],
  };

  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);

  function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
    }
  }

  async function createMarker(place) {
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    var marker = new AdvancedMarkerElement({
      map: map,
      position: place.geometry.location,
    });

    var infowindow = new google.maps.InfoWindow({
      content:
        "<div class='bg-dark p-2'><strong>" +
        place.name +
        "</strong><br>" +
        place.vicinity +
        "</div>",
    });

    marker.addListener("click", function () {
      infowindow.open(map, marker);
    });
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed. Please enable your browser location functionality."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}

// Call the function to display the map
initMap();
