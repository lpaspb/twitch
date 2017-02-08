

window.onload = function() {

var btn = document.querySelector("#btn");
var btn2 = document.querySelector("#btn2");

 loadRandom();

btn.addEventListener('click', function(){
  
    loadAjax("//en.wikipedia.org/w/api.php?origin=*&action=query&format=json&list=search&srprop=snippet&srsearch=");
    
    }, false);
    
btn2.addEventListener('click', function(){
  
     loadRandom();

    }, false);


}


function resetContent() {

var wiki = document.querySelector("#wiki");

wiki.innerHTML = '';

}




function loadAjax (url) {

resetContent();


    
var inputValue = document.querySelector("input[type=search]").value;
var url;
var xhr = new XMLHttpRequest;
var title = inputValue; 

var ua = navigator.userAgent.toLowerCase(); 
if (ua.indexOf('safari') != -1) { 
  if (ua.indexOf('chrome') > -1) {
   url = url + title;
  } else {
  url = "https://cors.now.sh/" + url + title;
  }
}
    
xhr.open('GET', url, true);

xhr.onreadystatechange = function() {

    var response = xhr.responseText;
    if (response) {
    var json = JSON.parse(response);
    }
    
    
    if (response != "" && xhr.readyState == 4) {
     
     var inputValue = document.querySelector("input[type=search]").value;
      
     if (inputValue != "")   {     
        
        var feedArr = json.query.search;
        
     }
        
        console.log(inputValue)
         
        if (inputValue != "")   {  
          
             for (var i = 0; i < feedArr.length; i++){
           
                
               var title = "<p><a href='http://en.wikipedia.org/wiki/" + 
                   
                json.query.search[i].title + "'> <strong id='title'>" + 
                   
                json.query.search[i].title +  "</strong></a></p>";
                
                
                var desc = "<p id='desc'>" + json.query.search[i].snippet +  "</p>";

                var element = document.createElement("div");

                element.innerHTML = title + "\n" + desc;


                my_div = document.getElementById("wiki");

                my_div.appendChild(element);

              
           }
        }
        
        
            else   {
    
               var element = document.createElement("p");

               element.innerHTML = "No Articles";

               my_div = document.getElementById("wiki");

               my_div.appendChild(element);

        
    
}
          
       
        
    } 
        
    
  
}



xhr.send();


}




function loadRandom () {
   
    resetContent();

    var url;
    var ua = navigator.userAgent.toLowerCase(); 

    if (ua.indexOf('safari') != -1) { 
  if (ua.indexOf('chrome') > -1) {
   
  url = "//en.wikipedia.org/w/api.php?origin=*&action=query&format=json&list=random&rnlimit=5";;
  } else {
  url = "https://cors.now.sh/" + "//en.wikipedia.org/w/api.php?origin=*&action=query&format=json&list=random&rnlimit=5";;
  }
}
    
    
    var xhr = new XMLHttpRequest;
    
    xhr.open('GET', url);
   
    xhr.onreadystatechange = function() {
        
           var response = xhr.responseText;
            
            if (response) {
            
            var json = JSON.parse(response);
            
            console.log(json);
               
            var randArray = json.query.random;
            
            var title  = "http://en.wikipedia.org/wiki/" + 
                   
             json.query.random[0].title;
                
             document.querySelector("#btn2").setAttribute("href", title)  ; 
                
            
        }
            
            
    }
        
    
    
    
    xhr.send();
    
}
