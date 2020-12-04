var queryUrl="https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2014-01-01&endtime=2014-01-02"

// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
  createFeatures(data.features);
});

function createFeatures(earthquakeData) {

  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.place +
      "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
  }

  var geojsonMarkerOptions = {
    radius: 8,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};
  // Create a GeoJSON layer containing the features array on the earthquakeData object
  // Run the onEachFeature function once for each piece of data in the array
  var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature,
    pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, geojsonMarkerOptions);
        }

  });

  // Sending our earthquakes layer to the createMap function
  createMap(earthquakes);
}

function createMap(earthquakes) {

  // Define streetmap and darkmap layers
  var light = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
     attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
     maxZoom: 18,
     id: "light-v10",
     accessToken: "pk.eyJ1IjoiY2piZWltZm9ocjEzIiwiYSI6ImNraTlvM3Y1azA0MDEyeXJ0MzI5Znd5MzkifQ.geMVG9oPZGJooZ6_cvdzIQ"
   });

  var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "dark-v10",
    accessToken: {API_KEY}
  });

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Light Map": light,
    "Dark Map": darkmap
  };

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load
  var myMap = L.map("map", {
    center: [
        37.7749, -122.4194
    ],
    zoom: 5,
    layers: [light, earthquakes]
  });

  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
}

// circle coloring 
// var geojsonMarkerOptions = {
//   radius: 8,
//   fillColor: "#ff7800",
//   color: "#000",
//   weight: 1,
//   opacity: 1,
//   fillOpacity: 0.8
// };

// L.geoJSON(someGeojsonFeature, {
//   pointToLayer: function (feature, latlng) {
//       return L.circleMarker(latlng, geojsonMarkerOptions);
//   }
// }).addTo(map);

// for (var i = 0; i < features.properties.mag.length; i++) {

//   // Conditionals for earthquake points
//   var color = "";
//   if (features.properties.mag[i].points<1) {
//     color = "yellow";
//   }
//   else if (features.properties.mag[i].points <2) {
//     color = "blue";
//   }
//   else if (features.properties.mag[i].points > 90) {
//     color = "green";
//   }
//   else {
//     color = "red";
//   }

//   // Add circles to map
//   L.circle(countries[i].location, {
//     fillOpacity: 0.75,
//     color: "white",
//     fillColor: color,
//     // Adjust radius
//     radius: countries[i].points * 1500
//   }).bindPopup("<h1>" + countries[i].name + "</h1> <hr> <h3>Points: " + countries[i].points + "</h3>").addTo(myMap);
// }
