// Create the tile layer that will be the background of our map
var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "light-v10",
  accessToken: API_KEY
});

// Initialize all of the LayerGroups we'll be using
var layers = {
  NON_GOVERNMENT: new L.LayerGroup(),
  SECONDARY_SCHOOLS: new L.LayerGroup()
};

// Create the map with our layers
var map = L.map("map-id", {
  center: [-31.9523, 115.8613],
  zoom: 12,
  layers: [
    layers.NON_GOVERNMENT,
    layers.SECONDARY_SCHOOLS
  ]
});

// Add our 'lightmap' tile layer to the map
lightmap.addTo(map);

// Create an overlays object to add to the layer control
var overlays = {
  "Private Schools": layers.NON_GOVERNMENT,
  "Public Schools": layers.SECONDARY_SCHOOLS

};

// Create a control for our layers, add our overlay layers to it
L.control.layers(null, overlays).addTo(map);

// Create a legend to display information about our map
var info = L.control({
  position: "bottomright"
});

// When the layer control is added, insert a div with the class of "legend"
info.onAdd = function() {
  var div = L.DomUtil.create("div", "legend");
  return div;
};
// Add the info legend to the map
info.addTo(map);

// Initialize an object containing icons for each layer group
var icons = {
  NON_GOVERNMENT: L.ExtraMarkers.icon({
    icon: "ion-cash",
    iconColor: "white",
    markerColor: "green",
    shape: "star"
  }),
  SECONDARY_SCHOOLS: L.ExtraMarkers.icon({
    icon: "ion-man",
    iconColor: "white",
    markerColor: "blue",
    shape: "circle"
  })
};

// Load in json data
var jsonData = "static/Schoolds_year12.json";

// Grab data with d3
d3.json(jsonData).then(function(data) {
  // var stationStatus = statusRes.data.stations;
  // var stationInfo = infoRes.data.stations;

  // Create an object to keep of the number of markers in each layer
  var schoolCount = {
    NON_GOVERNMENT: 0,
    SECONDARY_SCHOOLS: 0
  };

  // Initialize a schoolStatusCode, which will be used as a key to access the appropriate layers, icons, and station count for layer group
  var schoolStatusCode;

  // Loop through the schools (they're the same size and have partially matching data)
  for (var i = 0; i < data.length; i++) {

    // Create a new schools object with properties of both schools objects
    var school = data[i];
    
    if (school.Classification  === "SECONDARY SCHOOLS") {
      schoolStatusCode = "SECONDARY_SCHOOLS";
    }
    else {
      schoolStatusCode = "NON_GOVERNMENT";
    }

    // Update the station count
    schoolCount[schoolStatusCode]++;
    // Create a new marker with the appropriate icon and coordinates
    var newMarker = L.marker([school.Latitude, school.Longitude], {
      icon: icons[schoolStatusCode]
    });

    // Add the new marker to the appropriate layer
    newMarker.bindPopup(school.School_Name + "<br> 2020 School Ranking: " + school.Ranking + "<br> Median ATAR Score:" + school.Score);
    newMarker.addTo(layers[schoolStatusCode]);

    // Bind a popup to the marker that will  display on click. This will be rendered as HTML
    
  }

  // Call the updateLegend function, which will... update the legend!
  updateLegend(schoolCount);
});  


// Update the legend's innerHTML with the school count
function updateLegend(schoolCount) {
  document.querySelector(".legend").innerHTML = [
    "<p class='NON_GOVERNMENT'>Private Schools: " + schoolCount.NON_GOVERNMENT + "</p>",
    "<p class='SECONDARY_SCHOOLS'>Goverment Schools: " + schoolCount.SECONDARY_SCHOOLS + "</p>"
  ].join("");
}
