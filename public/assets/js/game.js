/*
 * Project     : tycoon
 * File        : game.js
 * Author      : eray
 * Date        : 13.10.2014
 * Description : 
 */

$(document).ready(function(){
    var socket = io.connect('http://localhost:3700');

    var money = 0;
    var increase = 1;

    setInterval(function(){
        money += increase;
        $("#money").html(money);
    }, 1000);

    $("#increase").bind('click', function(){
        increase += 5;
        $("#speed").html(increase);
        socket.emit('increase');
    });

    $("#decrease").bind('click', function(){
        increase -= 5;
        $("#speed").html(increase);
        socket.emit('decrease');
    });

    socket.on('refresh', function(data) {
        money = data.money;
        $("#money").html(money);
    });
});