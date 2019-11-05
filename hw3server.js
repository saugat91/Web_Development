//Saugat Dawadi CS 375 HW3
//Server side code for the Weather Forecast

console.log('server side code')

//Imports express
var express = require('express');
var app = express();

//imports the key from the Aeriskey
var aerisKey = require('./aeriskey.json');

//imports requrest
var request = require('request');

app.use(express.static("."));
app.listen(8080, () => { console.log('listening on 8080') });

//Get weather endpoint
app.get("/getweather", function (req, res) {

    let lat = req.query.lat;
    let long = req.query.long;
    let clientId = aerisKey.accessID
    let secretKey = aerisKey.secretKey

    //generates the base url 
    let URL = "https://api.aerisapi.com/forecasts/" + lat + "," + long + "?client_id=" + clientId + "&client_secret=" + secretKey;

    //Sends request, and receives response which is sent back
    request(URL, (error, response, body) => {
        res.send(body);
    });

});



