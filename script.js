// requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=Austin&appid=4a9827780393807327e2dc82f1ce3e68'; //5 day url
var cityValue = $(".cityName");
var whatCity = $(".whatCity")
var cityTitle = $(".cityTitle")
var currentTemp = $(".currentTemp")
var currentWind = $(".currentWind")
var currentHumidity = $(".currentHumidity")


/* fetch(requestUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  }); */

function cityHandler(event) { //grab what city they want on event
    
    event.preventDefault();

    var cityName = whatCity.val();


    var apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&appid=4a9827780393807327e2dc82f1ce3e68';
    
     fetch(apiUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    var weatherResults = data.list[0]; //grabs first element out of our API data, we have multiple for the same day
    var temp = weatherResults.main.temp; //grabbing specifically the temp out of our datapoint
    var humidity = weatherResults.main.humidity; //grabbing specifically the temp out of our datapoint
    var wind = weatherResults.wind.speed;
    console.log(weatherResults.main.temp);
    temp = (temp - 273.15) * 9/5 + 32; //Kelvin to Fahrenheit conversion
    var tempFixed = Math.floor(temp); //rounding Temp to a whole number.


    var icon = weatherResults.weather[0].icon; // Grabs Icon from our current weather.
    var weatherIconUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png"; //places icon code inside our link

    var weatherIconElement = $("<img>").attr("src", weatherIconUrl); //creates an image element, with source being our icon above.

    currentTemp.text("Current Tempature: " + tempFixed + "F°"); //updates our text to show current temp.
    currentTemp.append(weatherIconElement); //appending our image from above

    currentWind.text("Current Wind: " + wind + " mph"); //Wind Speeds in MPH
    currentHumidity.text("Current Humidity:" + humidity + "%"); //Humidity in %

    var [date1] = weatherResults.dt_txt.split(" "); //splitting the date, and getting the first index part out so we can have a date with no time.
    $(".date1").text(date1); //appending

    console.log(data.list);
    console.log(tempFixed);







  }); 

  cityTitle.text(cityName);
    


}


  cityValue.on('submit', cityHandler);