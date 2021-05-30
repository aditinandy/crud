const express = require('express');
const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/crud';

const app = express();

app.use(express.json());

mongoose.connect(url, {userNewUrlParser: true});

const con = mongoose.connection

con.on("open", function(){
	console.log('connected');
})

const router = require('./router');
app.use('/crud', router);

app.listen(9000, function(){
	console.log('stared at 9000');
})