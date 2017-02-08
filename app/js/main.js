var corsURL = "https://cors.now.sh/";

window.onload = function() {

    var btn = document.querySelector("#btn");
    var btn2 = document.querySelector("#btn2");

    loadRandom();

    btn.addEventListener('click', function() {

        loadAjax("//en.wikipedia.org/w/api.php?origin=*&action=query&format=json&list=search&srprop=snippet&srsearch=");

    }, false);

    btn2.addEventListener('click', function() {

        loadRandom();

    }, false);


}


function resetContent() {

    var wiki = document.querySelector("#wiki");

    wiki.innerHTML = '';
}

function addElementInBlock (elementInner, eltag, blockID) {
                        
    var element = document.createElement(eltag);
    element.innerHTML = elementInner; 
    var block = document.getElementById(blockID);
    block.appendChild(element);
 }

function formattedURL (url) {                           
        
        var inputValue = document.querySelector("input[type=search]").value;
        var queryTitle = inputValue;
        
    
        var formattedURL = url;
        var userAgent = navigator.userAgent.toLowerCase();
        
        if (userAgent.indexOf('safari') != -1 && formattedURL.indexOf("random") == -1) {
            if (userAgent.indexOf('chrome') > -1) {
                 formattedURL = formattedURL + queryTitle;
                 return formattedURL;
            } else {
                formattedURL = corsURL + formattedURL + queryTitle;
                return formattedURL;
            }
        } else {
            if (userAgent.indexOf('chrome') > -1) {
                 formattedURL = formattedURL;
                 return formattedURL;
            } else {
                formattedURL = corsURL + formattedURL;
                return formattedURL;
            }
            
        }
    }


function loadAjax(url) {

    resetContent();

    var inputValue = document.querySelector("input[type=search]").value;
    
    url = formattedURL(url);
    
    var xhr = new XMLHttpRequest;
    
    xhr.open('GET', url, true);

    xhr.onreadystatechange = function() {

        var response = xhr.responseText;
        
        if (response != "" && xhr.readyState == 4) {
            
            var json = JSON.parse(response);

            if (inputValue != "") {

                var feedArr = json.query.search;

                for (var i = 0; i < feedArr.length; i++) {
                    
                    var title = "<p><a href='http://en.wikipedia.org/wiki/" +

                        json.query.search[i].title + "'> <strong id='title'>" +

                        json.query.search[i].title + "</strong></a></p>";

                    var desc = "<p id='desc'>" + json.query.search[i].snippet + "</p>";

                    addElementInBlock (title + "\n" + desc, "p", "wiki");

                }
            } else {
                
                addElementInBlock ("No Articles", "p", "wiki");

            }
        }
    }

    xhr.send();
}



function loadRandom() {

    resetContent();

    var apiURL = "//en.wikipedia.org/w/api.php?origin=*&action=query&format=json&list=random&rnlimit=5";
    
    formattedURL(apiURL)

    var xhr = new XMLHttpRequest;

    xhr.open('GET', corsURL + apiURL);

    xhr.onreadystatechange = function() {

        var response = xhr.responseText;

        if (response) {

            var json = JSON.parse(response);

            var randArray = json.query.random;

            var title = "http://en.wikipedia.org/wiki/" +
            json.query.random[0].title;

            document.querySelector("#btn2").setAttribute("href", title);
        }
    }

    xhr.send();
}