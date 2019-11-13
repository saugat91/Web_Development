//Saugat Dawadi CS375 HW 3 Weather forecast
//Client side JS for the weather app


//getlocation which gets the location
//idea from w3schools, but implemented using jQuery
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        $("#current").html("Geolocation is not supported by this browser.")
    }
}

//sends the latitude and longitude to the index.html page
function showPosition(position) {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    $("#current").html("Lat: " + lat + " | Long: " + long)

    // AJAX CALL to Server
    let url = "/getweather/"
    $.ajax({ type: "GET", url: url, data: { lat: lat, long: long } }).then(data => {
        let jsonData = JSON.parse(data).response[0].periods;
        processData(jsonData);
    });
}


function processData(data) {

    // Parse and process data
    weatherWeek = []
    data.forEach((d) => {
        weatherWeek.push({
            dateTime: new Date(d.dateTimeISO),
            avgTempF: d.avgTempF,
            weather: d.weather,
            icon: d.icon,
        });
    });

    // Render Weather Table
    renderWeather(weatherWeek)
}

//Renders table for the week
function renderWeather(weekData) {

    let table = "<table class='table'>"
    table += "<thead><tr>"
    table += "<th>Date</th> <th>Average(F)</th> <th>Forecast</th> <th> </th>"
    table += "</thead></tr><tbody>"

    weekData.forEach(day => {
        table += "<tr>"
        table += "<td>" + day.dateTime.toDateString() + "</td>"
        table += "<td>" + day.avgTempF + "</td>"
        table += "<td>" + day.weather + "</td>"
        table += "<td>" + "<img src=Icons/" + day.icon + "></img>"
        table += "</tr>"
    });

    table += "</tbody></table>"
    $("#table").html(table)

}
