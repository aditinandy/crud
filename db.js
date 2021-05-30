const mongoose = require('mongoose');

const crudSchema = new mongoose.Schema({
	fname: {
		type: String,
		require: true
	},
	lname: {
		type: String,
		require: true
	}
})

module.exports = mongoose.model('crud_Schema', crudSchema);