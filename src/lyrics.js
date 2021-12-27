const spawn = require("child_process").spawn;

const pythonFile = spawn('python',["lyrics.py"]);

lyrics = ''

pythonFile.stdout.on('data', (data) => {
    lyrics = data.toString()
	console.log(lyrics)
});

// var express = require("express");
// var app = express();

// app.get('/lyrics', function(req, res){
// 	res.write(lyrics);
// });
// app.listen(8080);

// var mainContainer = document.getElementById("get-lyrics");
// var div = document.createElement("div");
// div.innerHTML = lyrics;
// mainContainer.appendChild(div);

var express = require('express');
var app = express();

app.get('/lyrics.html', function(req, res) {
    res.sendFile(__dirname + "/" + "lyrics.html");
});

app.get('lyrics.html', function(req, res){
response = {
    searchlyr : req.query.searchlyrics,
};

console.log(response);
res.end(JSON.stringify(lyrics));
});

var server = app.listen(8888, function(){
var host = server.address().address;
var port = server.address().port;
console.log("Listening at http://%s:%s", host, port);
});
