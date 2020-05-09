$(document).ready(function() {
  if (localStorage.getItem('key')) {
    var cityHistory = JSON.parse(localStorage.getItem('key'));
  } else {
    var cityHistory = [];
  }
  for ( var i = 0; i < cityHistory.length; i++){
    console.log(cityHistory[i]);
    var newItem = $('<li class="historyBtn list-group-item">')
    newItem.addClass("searchCity");
    newItem.attr("data-name", cityHistory[i]);
    newItem.text(cityHistory[i]);
    $("#search-history").prepend(newItem);
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
    //console.log(response);
    var date = moment().format('L');
    var lat = response.coord.lat;
    var lon = response.coord.lon;
    $(".city").html("<h1>" + response.name + " (" + date + ")" + "</h1>");
    $("icon").html("<img src=" + response.weather.icon + "/>")
    $(".temp").text("Temp: " + response.main.temp);
    $(".wind").text("Wind Speed: " + response.wind.speed);
    $(".humidity").text("Humidity: " + response.main.humidity);
  
    //cityHistory.push(city);
    localStorage.setItem('key',JSON.stringify(cityHistory))
    var queryURLUV = "http:api.openweathermap.org/data/2.5/uvi?appid=95c06a4959ecde027a9ba59c29561f0d&lat=" + lat + "&lon=" +lon;
    $.ajax({
      url: queryURLUV,
      method: "GET",
      })
    .then(function(response){
      //console.log(response);
      var uvindex = response.value;
      if (uvindex < 6 && uvindex >= 3){
        $(uvindex).css("background-color", "yellow");
    }
    else if (uvindex < 8 && uvindex >= 6){
        $(".uv").css("background-color", "orange");
    }
    else if (uvindex < 11 && uvindex >= 8){
        $(".uv").css("background-color", "red");
    }
    else if (uvindex >= 11){
        $(".uv").css("background-color", "violet");
    }
    $(".uv").text("UV Index: " + uvindex);
    }) 
    var queryURLFor = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=95c06a4959ecde027a9ba59c29561f0d&units=imperial";
    $.ajax({
      url: queryURLFor,
      method: "GET",
      })
    .then(function(response){
      // console.log(response);
      $("#day5weather").html(" ");
      for ( var i = 3; i < 40; i=i+8) {
        var infoList = response.list
        console.log(infoList[i]);
        var day = $("<div>")
        day.attr("class", "box")
        //step 1. create an element
        var dayDate = $("<p>");
        //step 2. give the element an attribute/text
        dayDate.text(moment(infoList[i].dt_txt).format("MM/DD/YYYY")); 
        //step 3. append it to the box
        day.append(dayDate);
        
        //s.1
        var dayIcon = $('<img>')
        //s.2
        dayIcon.attr('src', "https://openweathermap.org/img/w/" + infoList[i].weather[0].icon + ".png")
        //s.3        
        day.append(dayIcon)

        //s.1
        var dayTemp = $("<p>");
        //s.2
        dayTemp.text(`Temp: ${infoList[i].main.temp}`);
        //s.3
        day.append(dayTemp);

        //this linke appends the entire box to the page
        $("#day5weather").append(day);
      }
      // $(".box1").html("<p>" +  date + "</p>");
      // $(".box1").text("Temp: " + response.list[i].main.temp);
      // $(".box1").text("Humidity: " + response.list[1].main.humidity);
      // console.log(response.list[0]);
      // console.log(response.list[7]);
      // console.log(response.list[14]);
      // console.log(response.list[21]);
      // console.log(response.list[28]);
      // console.log(response.list[34]);
    })
    });

    })
  });



/*key is a variable

'key' - is a string*/



