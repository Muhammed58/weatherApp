const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");


const app = express();
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", (req, res) =>{
    res.sendFile(__dirname + "/index.html");

    

    
    
});

app.post("/", (req, res) =>{
    const cityName = req.body.city;
    var url ="https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=metric&appid=" + yourAPIKey;
    https.get(url, (response) =>{
    
        console.log(response.statusCode);
        response.on("data", (data) =>{
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const desc = weatherData.weather[0].description;
            const city = weatherData.name;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

            res.write("<h1 style='text-transform: capitalize;'>" + city +  " Temp: " + temp + " Celcius </br></br>  Weather: " + desc + "</h1>");
            res.write("<img src='" + imageURL + "'>");
            
            res.send();
        });
    });
});


app.listen(3000, () =>{
    console.log("Server is running on port 3000.");
});

