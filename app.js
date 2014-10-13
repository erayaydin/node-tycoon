var express = require("express");
var jade    = require("jade");
var io      = require("socket.io");
var cplayer  = require("./controllers/player.js");
var app     = express();
var port    = 3700;

app.set("views", __dirname + "/views");
app.set("view engine", "jade");
app.engine("jade", jade.__express);

app.use(express.static(__dirname + "/public"));

app.get("/", function(req,res){
    res.render("game");
});

var io = io.listen(app.listen(port));
console.log("Port: " + port);

io.sockets.on('connection', function (socket) {
    console.log("New connection: " + socket.id);

    var player = new cplayer();
    console.log("Player(" + socket.id + ") registered!");

    socket.on('increase', function(data){
        console.log("Player(" + socket.id + ") increased!");
        player.increase(5);
    });

    socket.on('decrease', function(data){
        console.log("Player(" + socket.id + ") decreased!");
        player.decrease(5);
    });

    var timer = setInterval(function(){
        var money = player.control();
        socket.emit('refresh', { money: money });
        console.log("Player(" + socket.id + ") control completed!");
    }, 30000);

    socket.on('disconnect', function() {
        console.log("Disconnect connection: " + socket.id);
        delete this.player;
        clearInterval(timer);
    });
});