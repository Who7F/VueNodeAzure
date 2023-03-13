

//Porject 7
const express = require('express');
const bodyParser = require('body-parser');
//const mongoose = require('mongoose');
const path = require('path');

//Adding in my rootes
const userRoutes = require('./routes/user');
const saucesRoutes = require('./routes/sauce');
const accountRoutes = require('./routes/account')
const connection = require('./connection')
const app = express();

require("dotenv").config();

//mongoose.connect(process.env.MANGO_DATABASE)
//	.then((error) =>{
//		console.log('Succesfu');
//	})
//	.catch(() =>{
//		console.log('failed');
//		console.log(error);
//	})


connection.connect();


//Headers
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
	next();
});
//Note to self.  dont use post on this part

app.use(bodyParser.json());

//Sign up, loging in, and load sauces all need to return somthing else you get a CORS error 
app.use('/images', express.static(path.join(__dirname, 'images')))
app.use('/api/auth', userRoutes);
app.use('/api/sauces', saucesRoutes);	
app.use('/api/account', accountRoutes);

module.exports = app;