/*jslint browser: true*/
/*global $, jQuery, alert*/


$(function () {

    load();
    
    var offlineBtn = $(".twitch__offline"),
        allBtn = $(".twitch__all"),
        onlineBtn = $(".twitch__online"),
        offlineBlock = $(".twitch__offline-output"),
        onlineBlock = $(".twitch__online-output");
    

    allBtn.on('click', function () {

        onlineBlock.css("display", "block");
        offlineBlock.css("display", "block");


    });


    offlineBtn.on('click', function () {


        onlineBlock.css("display", "none");
        offlineBlock.css("display", "block");

    });

    onlineBtn.on('click', function () {

        offlineBlock.css("display", "none");
        onlineBlock.css("display", "block");

    });

});


function load(isOnline) {

    var name,
        status,
        link,
        icon,
        streams = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin"];

    
    streams.forEach(function (val, i) {

        $.ajax({
            url: "//wind-bow.gomix.me/twitch-api/streams/" + val,
            type: 'GET',
            dataType: 'jsonp',
            data: {
                format: 'json'
            },
            success: function (data) {

                
                if (data.stream === null) {

                    $.ajax({
                        url: "//wind-bow.gomix.me/twitch-api/channels/" + val,
                        type: 'GET',
                        dataType: 'jsonp',
                        data: {
                            format: 'json'
                        },
                        success: function (data) {

                            var offline = $(".twitch__offline-output");

                            name = data.display_name;
                            status = "";
                            link = data.url;
                            icon = data.logo;

                            if (icon === undefined) {
                                icon = "http://assets.bizjournals.com/lib/img/newsle-empty-icon.png";
                            }
                            if (status === undefined) {
                                status = "";
                            }

                            if (data.status === 404) {
                                status = "user does not exsist";
                                offline.append("<tr><td><span class='notex'></span></td><td><img src='" + icon + "'></td><td class='twitch__name'><a href='" + link + "'>" + name + " </td>" + "<td class='twitch__game'>" + status + "</td></tr>");
                            } else {
                            
                                offline.append("<tr><td><span class='offline'></span></td><td><img src='" + icon + "'></td><td class='twitch__name'><a href='" + link + "'>" + name + " </td>" + "<td class='twitch__game'>" + status + "</td></tr>");
                            
                            }

                        },
                        error: function (error) {
                            var offline = $(".twitch__offline-output");
                            offline.append("<p>error</p>");
                        }
                    });
                } else if (data.stream !== null) {

                    $.ajax({
                        url: "//wind-bow.gomix.me/twitch-api/channels/" + val,
                        type: 'GET',
                        dataType: 'jsonp',
                        data: {
                            format: 'json'
                        },
                        success: function (data) {

                            var online = $(".twitch__online-output");

                            name = data.display_name;
                            status = data.status;
                            link = data.link;
                            icon = data.logo;



                            online.append("<tr><td><span class='online'></span></td><td><img src='" + icon + "'></td><td class='twitch__name'><a href='" + link + "'>" + name + " </td>" + "<td class='twitch__game'>" + status + "</td></tr>");

                        },
                        error: function (error) {
                            var online = $(".twitch__online-output");
                            online.append("<p>error</p>");
                        }
                    });

                }

            },
            error: function (error) {
                var online = $(".twitch__online-output");
                online.append("<p>error</p>");


            }

        });

    });

}