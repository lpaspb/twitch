
var longitude;
var latitude;

var temp;
var celsius;
var farengheit;

var apiKey = '3d6ea7e572d48a4286db05fd9da78c91';
var apiSource = 'https://cors.now.sh/http://api.openweathermap.org/data/2.5/weather?';


$( document ).ready(function() {
    
    
    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position){
        
        longitude =  position.coords.longitude;
        latitude  =  position.coords.latitude;
   
        $.getJSON(apiSource, {
            "lat" : latitude,
            "lon" : longitude,
            "appid" : apiKey
        },
        function(data){
    
        temp = data.main.temp;
        celsius = Math.round(temp - 273);
        farengheit = Math.round(celsius * 9/5 + 32);
        var icon = data.weather[0].icon;  
            
        var city;
             if ((latitude >= 59.01 && latitude <= 59.99) && (longitude >= 30.01  && longitude <= 30.99) ) {
                 city = "Saint-Petersburg, RU";
            } else {
                city = data.name + ',' + ' ' + data.sys.country;
            }
            
            
        var monthNames = [
                        "January", "February", "March",
                        "April", "May", "June", "July",
                        "August", "September", "October",
                        "November", "December"
                            ];

        var date = new Date();
        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();

        var date = day + ' ' + monthNames[monthIndex] + ' ' + year;
        var url = "http://openweathermap.org/img/w/" + icon;
        var png = ".png"
        $('.weather__city').html(city);
        $('.weather__date').html(date);
        $('.weather__temp').html(celsius + "˚C");
        $('.weather__icon').css('background-image','url("' + url + png + ' ")');
        $('.weather__group--btn').append('<a class="weather__btn weather__btn--celsius" href="#">˚C</a>');
        $('.weather__group--btn').append('<a class="weather__btn weather__btn--farengheit" href="#">˚F</a>');
        $( ".info" ).remove();
        });
        
        
    });
    
    }
    
    $(document).on('click','.weather__btn--farengheit', function(){
             var str = farengheit + "˚F"
             str = str.replace(/\" "/g, "");
             $('.weather__temp').html(str);
             
             
         }); 
        
   $(document).on('click','.weather__btn--celsius', function(){
             
             var str = celsius + "˚C";
             $('.weather__temp').html(str);
             
             
         }); 
    

});
     

