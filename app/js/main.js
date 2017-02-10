var corsURL = "https://cors.now.sh/";

$(function() {

    load();
    var offlineBtn = $(".twitch__offline");
    var allBtn = $(".twitch__all");
    var onlineBtn = $(".twitch__online");
    var offlineBlock = $(".twitch__offline-output");
    var onlineBlock = $(".twitch__online-output");
    var allBlock = $(".twitch__all-output");

    allBtn.on('click', function() {

       onlineBlock.css("display", "block");
        offlineBlock.css("display", "block");
       

    });
    
    
    offlineBtn.on('click', function() {
        
       
        onlineBlock.css("display", "none");
        offlineBlock.css("display", "block");

    });

    onlineBtn.on('click', function() {
        
        offlineBlock.css("display", "none");
        onlineBlock.css("display", "block");

    });

});


function load(isOnline) {

    var name;
    var link;
    var icon;
    
    var streams = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin"];

    var url = "//wind-bow.gomix.me/twitch-api/streams/";
   
    streams.forEach(function(val, i) { 
        
        $.ajax({
            url: url + streams[i],
            type: 'GET',
            dataType: 'jsonp',
            data: {
                format: 'json'
            },
            success: function(data) {

                if (data.stream === null) {
                   
                    $.getJSON("//wind-bow.gomix.me/twitch-api/channels/" + val, function(data) {
                       
                         console.log(val);
                        if (data.status == 404) {
                            
                            icon = "http://assets.bizjournals.com/lib/img/newsle-empty-icon.png";
                            var offline = $(".twitch__offline-output");
                            offline.append("<tr><td class='twitch__name'><img src='" + icon + "'>" + "<a href='" + link + "'>" + val + "<span span class='notex'> </span> </td></tr>");
                            

                        } else {

                            var offline = $(".twitch__offline-output");
                           
                             console.log(data);
                            name = data.display_name;
                            link = data.url;
                            status = data.status;
                            icon = data.profile_banner;
                            
                            if (icon == null) {
                                icon = "http://assets.bizjournals.com/lib/img/newsle-empty-icon.png"
                            }
                            
                            if (status == null) {
                                status = "";
                            }
                            offline.append("<tr><td class='twitch__name'><img src='" + icon + "'>" + "<a href='" + link + "'>" + name + "<span class='offline'></span> </td><td class='twitch__game'>" + status + "</td></tr>");
                        }
                    });

                } else if (data.stream != null) {
                   
                    var online = $(".twitch__online-output");
                    name = data.stream.channel.display_name;
                    var game = data.stream.channel.game;
                    link = data.stream.channel.url;
                    icon = data.stream.preview.small;
                    online.append("<tr><td class='twitch__name'><img src='" + icon + "'>" + "<a href='" + link + "'>" + name + "<span class='online'></span> </a> </td>  <td class='twitch__game'>" + game + "</td>");
                    console.log(data);

                }
                 
            },
            error: function(error) {
                console.log(error);
          
            
            }
          
        });

});

    }


