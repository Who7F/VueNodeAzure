const fs = require('fs');
const connection = require('../connection')


exports.cheatAccount =(req, res, next) =>{
	res.status(201).json({
			message: req.body.sauce

		});
};

exports.getAccontName = (req, res, next) => {
	const Request = require('tedious').Request
	
	const request = new Request("SELECT name FROM dbo.employ where userid = " + req.params.id +";", function(err) {
		if (err) {  
			console.log(err);}  
	});
	
	request.callback = function (err, rowCount, rows) {
      // rows is not being set but rowCount is. May be a bug.
      if (err) {
        // Error handling.
      } else {
        //
      }
	};
	
	connection.execSql(request);
	
	request.on('doneInProc', function(rowCount, more, rows){
		
		
		const getName = rows[0][0].value;
		if (getName){
			res.status(200).json(getName);
		}else{
			res.status(404).json({error: error});
		}	
	});
};

exports.getAccontDetals = (req, res, next) => {
	const Request = require('tedious').Request
	
	const request = new Request("SELECT name, email, department FROM dbo.employ where userid = " + req.params.id +";", function(err) {
		if (err) {  
			console.log(err);}  
	});
	
	request.callback = function (err, rowCount, rows) {
      // rows is not being set but rowCount is. May be a bug.
      if (err) {
        // Error handling.
      } else {
        //
      }
	};
	
	connection.execSql(request);
	
	request.on('doneInProc', function(rowCount, more, rows){
		let sauce = [];
		
		rows.forEach(function(row){
			let theRow = {};//really javascrip
			row.forEach(function(i){
				let columnName = i.metadata.colName; 
				theRow[columnName] = i.value;
			});
			sauce.push(theRow);
			
		});
		res.status(200).json(sauce);
	});
};


exports.deleteAccont = (req, res, next) =>{
	
	const Request = require('tedious').Request
	
	const request = new Request("UPDATE dbo.employ SET alive = '0' WHERE userid =" + req.params.id +";", function(err) {
		if (err) {  
			console.log(err);}  
	});
	
	request.callback = function (err, rowCount, rows) {
      // rows is not being set but rowCount is. May be a bug.
      if (err) {
        // Error handling.
      } else {
        //
      }
	};
	
	connection.execSql(request);
	
	res.status(200).json({message : 'del'}); 

};
