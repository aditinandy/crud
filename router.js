const express = require('express');

const router = express.Router();

const crud_Schema = require('./db');

// see all data

router.get('/', async(req, res) => {
	try{
		const crud = await crud_Schema.find();
		res.json(crud);
	}
	catch(error){
		res.send(error);
	}
});

// upload part

router.post('/', async(req, res) => {
	const upload = new crud_Schema({
		fname: req.body.fname,
		lname: req.body.lname
	})
	try{
		const save = await upload.save();
		res.json(save);
	}catch(err){
		res.send(err);
	}
})

// fetch data

router.get('/:id', async(req, res) => {
	try{
		const crud1 = await crud_Schema.findById(req.params.id);
		res.json(crud1);
	}
	catch(error){
		res.send(error);
	}
})

// patch data

router.patch('/:id', async(req, res) => {
	try{
		const patch = await crud_Schema.findById(req.params.id);
		patch.lname = req.body.lname;
		const save = await patch.save();
		res.json(save);
	}
	catch(error){
		res.send(error);
	}
})

// delete data

router.delete('/:id', async(req, res) => {
	try{
		const dlt = await crud_Schema.findById(req.params.id);
		const final = await crud_Schema.remove(dlt);
		res.json(final);
	}
	catch(error){
		res.send(error);
	}
})

module.exports = router;