// requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=Austin&appid=4a9827780393807327e2dc82f1ce3e68'; //5 day url
var cityValue = $(".cityName");
var whatCity = $(".whatCity")
var cityTitle = $(".cityTitle")
var currentTemp = $(".currentTemp")
var currentWind = $(".currentWind")
var currentHumidity = $(".currentHumidity")
var dropDown = $(".itemDefault");
var dropDown2 = $(".dropdown-divider")
var drop = $(".dropdown-menu");
var firstLoad = true;
var cityName;
var x = 0;







var newAnchor = $('<a>');



var day1 = $(".day1")
var day2 = $(".day2")
var day3 = $(".day3")
var day4 = $(".day4")
var day5 = $(".day5")






function cityHandler(event) { //grab what city they want on event

  
    
    event.preventDefault();

    
    x++; //using x variable to evaluate later down in the line to empty out our containers on a new search but to also keep our first load containers.

    if (firstLoad){ //first load will be set to san antonio so we don't have to make another fetch request for Sa specifically

    cityName = "San Antonio";
    firstLoad = false;
    }else{ 
      cityName = whatCity.val();
      console.log("here i am");
    }

    
var uniqueId = Math.random().toString(36).substr(2, 9); //section creates anchors and asigns them a random ID.

var anchorId = "anchor-" + uniqueId;

var anchor = $("<a></a>", {
  id: anchorId,
  text: cityName
});

  if (x > 1){
    dropDown.after(anchor);
    dropDown.children().append(anchor);
    anchor.addClass("dropdown-item itemDefault text-warning")
  }
    



   


    var apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&appid=4a9827780393807327e2dc82f1ce3e68';
    
     fetch(apiUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    var weatherResults = data.list[0]; //grabs first element out of our API data, we have multiple for the same day TODO: Get specifically todays time and 
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

    
   

    
    for (var i = 0; i < 5; i++){

      weatherResults = data.list[(i + 1) * 8 - 1];

      var newParagraph = $('<p>');
      var newParagraph1 = $('<p>');
      var newParagraph2 = $('<p>');
      var newHeader = $('<h2>');

      

      var temp = weatherResults.main.temp; //grabbing specifically the temp out of our datapoint
      var humidity = weatherResults.main.humidity; //grabbing specifically the temp out of our datapoint
      var wind = weatherResults.wind.speed;
      var [date1] = weatherResults.dt_txt.split(" ");
  //We want to append multiple pararaphs.

      temp = (temp - 273.15) * 9/5 + 32; //Kelvin to Fahrenheit conversion
      var tempFixed = Math.floor(temp); //rounding Temp to a whole number.

      var targetElement = $(".day" + (i + 1)).children('.card-footer'); //appending date to footer cards of every card, each time we run through the forloop +1 is added onto the end of day
      targetElement.text(date1);

      var targetElement1 = $(".day" + (i + 1)).children('.card-body'); //appending date to footer cards of every card, each time we run through the forloop +1 is added onto the end of day
     

      
      

      newParagraph.text("Forecasted Tempature: " + tempFixed + "F°");
      newParagraph1.text("Forecasted Wind: " + wind + " mph");
      newParagraph2.text("Forecasted Humidity:" + humidity + "%");
      newHeader.text(cityName);

      targetElement1.append(newHeader); 
      targetElement1.append(newParagraph);
      targetElement1.append(newParagraph1);
      targetElement1.append(newParagraph2);
      targetElement1.append("<hr>");

      
      

      console.log(temp + humidity + wind + date1);


      var icon = weatherResults.weather[0].icon; // Grabs Icon from our current weather.
      var weatherIconUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png"; //places icon code inside our line
      var targetElement2 = $(".day" + (i + 1)).find('img');
      targetElement2.attr('src', weatherIconUrl);
      targetElement2.css('width', '100px'); 
      targetElement2.css('height', '100px'); 
      targetElement2.css('display', 'block'); 
      targetElement2.css('margin', '0 auto');
      

   
      
      
      
      

    }


   






  }); 


  if (x > 1){
    for (var i = 0; i < 5; i++){
    console.log("Here i am!!!");
    var targetElement1 = $(".day" + (i + 1)).children('.card-body');
    targetElement1.empty();
    }

  }
  
  cityTitle.text(cityName);
  
    



}



function cityAuto(event){ //will auto-type our default text if clicked on.
  console.log(event.target);
  $('.whatCity').val(event.target.text);
  
}

$( window ).on( "load", cityHandler); // we load our function on start, so we can grab San antonios current weather and have icons and temps.

  cityValue.on('submit', cityHandler);
  drop.on('click', cityAuto);