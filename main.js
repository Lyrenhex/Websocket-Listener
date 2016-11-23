const websocket = require('nodejs-websocket');
const fs = require('fs');
const request = require('request');
var querystring = require('querystring');

var conf = JSON.parse(fs.readFileSync('config.json', 'utf-8'));

function start() {
    var wsClient = websocket.connect(conf.websocket, connected);
    wsClient.on('error', function (error) {
        if (error.toString().indexOf('ECONNREFUSED') > -1) {
            console.log('Socket connection was refused!');
            console.log('Retrying in 10 seconds...');
            setTimeout(start, 10000);
        } else {
            console.log('error', error);
        }
    });

    wsClient.on('text', function (str) {
        var json = JSON.parse(str);
        console.log(json);
    });

    function connected() {
        console.log('Connected to websocket');
    }
}

start();
