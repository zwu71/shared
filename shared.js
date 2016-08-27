// Shared code needed by the code of all three pages.

// Prefix to use for Local Storage.  You may change this.
var APP_PREFIX = "walkingRoutesApp";

// Array of saved Route objects.
var savedRoutes = [];

// This adds a method to JavaScript Numbers that can be used to convert
// them from degrees to radians.  It is used like other methods, e.g.,
//     var angle = 180;
//     angle.toRad() === Math.PI
Number.prototype.toRad = function() 
{
    return this * Math.PI / 180;
};

// This adds a method to JavaScript Numbers that can be used to convert
// them from radians to degrees.  It is used like other methods, e.g.,
//     var angle = Math.PI;
//     angle.toDeg() === 180
Number.prototype.toDeg = function() 
{
    return this * 180 / Math.PI;
};

// This function displays the given message String as a "toast" message at
// the bottom of the screen.  It will be displayed for 1 second, or if the
// number of milliseconds given by the timeout argument if specified.
function displayMessage(message, timeout)
{
    if (timeout === undefined)
    {
        // Timeout argument not specifed, use default.
        timeout = 1000;
    } 

    if (typeof(message) == 'number')
    {
        // If argument is a number, convert to a string.
        message = message.toString();
    }

    if (typeof(message) != 'string')
    {
        console.log("displayMessage: Argument is not a string.");
        return;
    }

    if (message.length == 0)
    {
        console.log("displayMessage: Given an empty string.");
        return;
    }

    var snackbarContainer = document.getElementById('toast');
    var data = {
        message: message,
        timeout: timeout
    };
    if (snackbarContainer && snackbarContainer.hasOwnProperty("MaterialSnackbar"))
    {
        snackbarContainer.MaterialSnackbar.showSnackbar(data);
    }
}

// Location constructor.
// Creates a location object which holds lat, long, accuracy and time.
// Can be passed to Google Maps API as a LatLng object.
function Location(coords)
{
    this.lat = coords.latitude;
    this.lng = coords.longitude;
    this.accuracy = coords.accuracy;
    this.timeStamp = new Date();
    var lat = JSON.stringify(this.lat);
    var lng = JSON.stringify(this.lng);
    localStorage.setItem("old lat", lat);
    localStorage.setItem("old lng", lng);
}

// This function calculates the distance between two Location objects and
// returns the result in metres.
function calculateDistanceBetweenLocations(location1, location2)
{
    var lat1 = localStorage.getItem("old lat");
    var lon1 = localStorage.getItem("old lon");

    var lat2 = coords.latitude;
    var lon2 = coords.longitude; 

    // Calculation using Haversine formula:
    // http://en.wikipedia.org/wiki/Haversine_formula
    // http://www.movable-type.co.uk/scripts/LatLong.html
    
    var R = 6371000; // meter (the Earth radius)
    var dLat = (lat2 - lat1).toRad();
    var dLon = (lon2 - lon1).toRad(); 
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * 
          Math.sin(dLon / 2) * Math.sin(dLon / 2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
    var d = R * c;
    
    return d;
}





