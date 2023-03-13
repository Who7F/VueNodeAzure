const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//require("dotenv").config();
const connection = require('../connection')

exports.signup = (req, res, next) => {

	bcrypt.hash(req.body.password, 10).then((hash) => {
		const Request = require('tedious').Request		
		const TYPES = require('tedious').TYPES; 
		
		const request = new Request("INSERT INTO dbo.employ (name, email, password) VALUES (@name, @email, @password);", function(err) {
			if (err) {  
				console.log(err);}  
			});
			
			request.addParameter('name', TYPES.NVarChar,req.body.name);
			request.addParameter('email', TYPES.NVarChar,req.body.email);
			request.addParameter('password', TYPES.NVarChar,hash);
			request.on('row', function(columns) {  
            columns.forEach(function(column) { 
              if (column.value === null) {  
                console.log('NULL');  
              } else {  
                console.log("Product id of inserted item is " + column.value);  
              }  
            });  
        });
	
		connection.execSql(request);
		
		res.status(201).json({
			message : 'User saved'
		});
		
	});
	
};

exports.login = (req, res, next) => {
	const Request = require('tedious').Request 
	//connection.connect();
	const request = new Request("SELECT password, userid, name FROM dbo.employ where email = '" +req.body.email+ "' AND alive = 1;", function(err) {
		if (err) {  
			console.log(err);}  
	});
	
	
	connection.execSql(request);
	request.on('doneInProc', function(rowCount, more, rows){
		if (rowCount === 1){
			const semesters = rows[0]
			console.log(semesters[0].value, semesters[1].value)
		
			
			bcrypt.compare(req.body.password, semesters[0].value).then((valid) => {
				if (!valid) {
					return res.status(401).json({
							error: new Error('Incorrect password')
					});
				}
				const token = jwt.sign(
					{ userId: semesters[1].value}, process.env.HASH_KEY,{ expiresIn: '24h' });
					res.status(200).json({
					userId: semesters[1].value,
					token: token,
					UserName: semesters[2].value
				});
			
			}).catch((error) => {
				res.status(500).json({
					error: error
				})
			});
		}else{
			return res.status(401).json({ message: 'No user'});
		}
	});
};

