$(document).ready(function() {
  if (localStorage.getItem('key')) {
    var cityHistory = JSON.parse(localStorage.getItem('key'));
  } else {
    var cityHistory = [];
  }
  for ( var i = 0; i < cityHistory.length; i++){
    console.log(cityHistory[i]);
    // var newItem = $('<li class="historyBtn list-group-item">')
    // newItem.addClass("searchCity");
    // newItem.attr("data-name", cityHistory[i]);
    // newItem.text(cityHistory[i]);
    $("#search-history").append(cityHistory[i]);
    }
  
   

  //loop through your city arrays, create a btn el, give btn a value[i] & append to a page in an element that you want it to be
  $( "#cityBtn").on('click', function(e) {
  e.preventDefault();
  var city = $("#cityTxt").val() 
  //console.log(city);
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=95c06a4959ecde027a9ba59c29561f0d&units=imperial";
  // console.log(queryURL);
  $.ajax({
    url: queryURL,
    method: "GET",
    })
  .then(function(response) {
    console.log(response);
    var date = moment().format('LL');
    var lat = response.coord.lat;
    var lon = response.coord.lon;
    $(".city").html("<h1>" + response.name + " (" + date + ")" + "</h1>");
    $(".temp").text("Temp: " + response.main.temp);
    $(".wind").text("Wind Speed: " + response.wind.speed);
    $(".humidity").text("Humidity: " + response.main.humidity);
  
    cityHistory.push(city);
    localStorage.setItem('key',JSON.stringify(cityHistory))
    var queryURLUV = "http:api.openweathermap.org/data/2.5/uvi?appid=95c06a4959ecde027a9ba59c29561f0d&lat=" + lat + "&lon=" +lon;
    $.ajax({
      url: queryURLUV,
      method: "GET",
      })
    .then(function(response){
      console.log(response);
      $(".uv").text("UV: " + response.value); 
    })
    });
    var queryURLFor = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=95c06a4959ecde027a9ba59c29561f0d";
    $.ajax({
      url: queryURLFor,
      method: "GET",
      })
    .then(function(response){
      console.log(response);
    })
  });


});

/*key is a variable

'key' - is a string*/



