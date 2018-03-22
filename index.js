//USEWHAT BACKEND DATA CONNECTOR
//20180322
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
const express = require('express');
const Promise = require('bluebird');
const bodyParser = require('body-parser');
const moment = require('moment');
const http = require('http');
//const https = require('https');
const port = 8080;

const app = express();
app.use(bodyParser.json());

//mongo connection URL
var url = 'mongodb://localhost:27017/usewhat';

var logDate = () => {
	return '[' + moment().format('YYYY-MM-DD hh:mm:ss.SSS') + ']::';
}

//server test api
app.get('/test/get',(req, res)=>{
	// Use connect method to connect to the server
	MongoClient.connect(url).then((conn)=>{
		console.log(logDate() + "connected to the db.")
		conn.close();
		res.send({success:true});
	}).catch((err)=>{
		console.log(err);
		res.send({success:false});
	});
});

http.createServer(app).listen(port,()=>{
	console.log(logDate() + "server listening on port, "+ port);
});