const express = require('express');
const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/crud';
const crud_Schema = require('./db');
const bodyparser = require('body-parser');
const hbs = require('hbs');
const path = require('path');

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended : true}));
app.set("views", './views');
app.set('view engine', 'ejs');

mongoose.connect(url, {userNewUrlParser: true});

const con = mongoose.connection;

con.on("open", function(){
	console.log('connected');
})

app.get('/', (req, res) => {
	res.render('index', {
			title: 'home'
		});
})

app.get('/crud', async(req, res) => {
	try{
		const crud = await crud_Schema.find({}).toArray(function(err, data){
			assert.equal(err, null);
			res.render("index", {
				lists: data
			});
		}); 
	}
	catch(error){
		res.send(error);
	}
});

app.get('/crud/fetch', async(req, res, next) => {
	try{
		// let rand = Math.random();
		const fetch = await crud_Schema.aggregate([{$sample: {size: 2}}]);
		res.send(fetch);
	}
	catch(error){
		res.send(error);
	}
})

// const router = require('./router');
// app.use('/crud', router);

app.listen(9000, function(){
	console.log('stared at 9000');
})