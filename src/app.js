var os = require('os');
var express = require('express');
var cluster = require('cluster');

var WORKERS = os.cpus().length;

if (cluster.isMaster) {
	for (var i = 0; i < WORKERS; i++) {
		cluster.fork();
	}
	
	cluster.on('online', function(worker) {
		console.log('Worker ' + worker.process.pid + ' online');
	});

	cluster.on('exit', function(worker, code, signal) {
		console.log('Worker ' + worker.process.pid + ' exited with code: ' + code + ', and signal: ' + signal);
		console.log('Starting new worker');
		cluster.fork();
	});
} else {
	var app = express();
	app.get('/', function (req, res) {
		var host = os.hostname();
		var pid = process.pid;
		
		res.send('<html><body>Hello from process #' + pid + ' in ' + host + '!</body></html>');
	});

	app.listen(80);
	console.log('Running on http://localhost:8080');
}