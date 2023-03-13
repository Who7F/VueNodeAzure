const Sauce = require('../models/sauce');
const fs = require('fs');
const connection = require('../connection')


exports.cheatSauce =(req, res, next) =>{
	res.status(201).json({
			message: req.body.sauce

		});
};


exports.createSauce = (req, res, next) => {
	const url = req.protocol + '://' + req.get('host');
 	const newSauce = JSON.parse(req.body.sauce);
	
	const Request = require('tedious').Request  
	const TYPES = require('tedious').TYPES; 
	console.log(newSauce);
	const request = new Request("INSERT INTO dbo.sauce (userid, title, content, upload) VALUES (@userid, @title, @content, @upload);", function(err) {
		if (err) {  
			console.log(err);}  
		});
		console.log(url + '/images/' + req.file.filename)
		console.log(url)
			
		request.addParameter('userid', TYPES.BigInt,newSauce.userId);
		request.addParameter('title', TYPES.NVarChar,newSauce.title);
		request.addParameter('content', TYPES.NVarChar,newSauce.content);
		request.addParameter('upload', TYPES.NVarChar,req.file.filename);
		
	
	connection.execSql(request);
	
	
	res.status(201).json({
		message: 'Post saved'
	});
	
};

exports.getOneSauce = (req, res, next) => {
	const Request = require('tedious').Request;
	const request = new Request("SELECT sauceid, title, content, upload, name FROM dbo.sauce INNER JOIN dbo.employ ON dbo.sauce.userid = dbo.employ.userid where sauceid = '" + req.params.id + "';", function(err) {
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
			theRow['url'] = 'http://' + req.get('host') + '/images/' + theRow['upload'];
			
			sauce.push(theRow);
		});
		res.status(200).json(sauce);
	});
	
	
};

exports.getAllSauce = (req, res, next) => {
	const Request = require('tedious').Request 
	const request = new Request("SELECT dbo.sauce.sauceid, title, content, upload, name, [read] FROM dbo.sauce INNER JOIN dbo.employ ON dbo.sauce.userid = dbo.employ.userid LEFT JOIN dbo.esauce ON dbo.sauce.sauceid = dbo.esauce.sauceid AND dbo.esauce.userid = " + req.params.id + " WHERE dbo.sauce.alive = '1';", function(err) {
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
			theRow['url'] = 'http://' + req.get('host') + '/images/' + theRow['upload'];
			
			sauce.push(theRow);
			
		});
		res.status(200).json(sauce);
	});
	
	
};

exports.readSauce = (req, res, next) => {
	console.log(req.body.userId)
	const Request = require('tedious').Request 
	const TYPES = require('tedious').TYPES; 
	const request = new Request("INSERT INTO dbo.esauce (sauceid, userid) VALUES (@sauceid, @userid);", function(err) {
		if (err) {  
			console.log(err);}  
	});
	request.addParameter('sauceid', TYPES.BigInt,req.body.postId);
	request.addParameter('userid', TYPES.BigInt,req.body.userId);
	
	request.callback = function (err, rowCount, rows) {
      // rows is not being set but rowCount is. May be a bug.
      if (err) {
        // Error handling.
      } else {
        //
      }
	};
	connection.execSql(request);
	
	res.status(201).json({
		message: 'Post saved'
	});
}

exports.modifySauce = (req, res, next) => {
	let sauce = new Sauce({_id: req.params._id})
	if (req.file){
		const url = req.protocol + '://' + req.get('host');
		const newSauce = JSON.parse(req.body.sauce);
		sauce = ({
			_id: req.params.id,
			userId: newSauce.userId,
			name: newSauce.name,
			description: newSauce.description,
			manufacturer: newSauce.manufacturer,
			mainPepper: newSauce.mainPepper,
			imageUrl: url + '/images/' + req.file.filename,
			heat: newSauce.heat,
		});
		/**
		Error was in the below
		unlink returns a promise so unlinkSync is used
		**/
		//fs.unlink ('images/' + newSauce.imageUrl);
		Sauce.findOne({_id: req.params.id}).then((oldSauce) => {
			const filename = oldSauce.imageUrl.split('/images/')[1];
			//fs.unlink('images/' + filename, () => {
			//	console.log('images/' + filename);
			//});
			fs.unlinkSync('images/' + filename);
		});
	} else{
		const newSauce = req.body;
		sauce = ({
			_id: req.params.id,
			userId: newSauce.userId,
			name: newSauce.name,
			description: newSauce.description,
			manufacturer: newSauce.manufacturer,
			mainPepper: newSauce.mainPepper,
			heat: newSauce.heat,
		});
	}
	Sauce.updateOne({_id: req.params.id}, sauce).then(()=> {
		res.status(201).json({
			message: 'Sauce updated'
		});
	}).catch((error) => {
		res.status(400).json({
			error: error
		});
	});
};

exports.deleteSauce = (req, res, next) =>{
	
	//if (!sauce){
	//		return res.status(404).json({
	//			error: new Error('unknow')
	//		});
	//	}
	//	if (sauce.userId !== req.auth.userId){
	//		return res.status(400).json({
	//			error: new Error('unaitherized request')
	//		});
	//	}
	
	
	
	const Request = require('tedious').Request
	console.log(req.params.id);
	const request = new Request("UPDATE dbo.sauce SET alive = '0' WHERE sauceid =" + req.params.id +";", function(err) {
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
		


//Taken from modifySauce 
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
//https://www.mongodb.com/docs/manual/reference/operator/update/set/
//https://www.mongodb.com/docs/manual/reference/operator/update/inc/
//https://www.mongodb.com/docs/manual/reference/operator/update/push/
//https://www.mongodb.com/docs/manual/reference/operator/update/pull/
exports.likeSauce = (req, res, next) => {
	Sauce.findOne({_id: req.params.id}).then((sauce) => {
		if (req.body.like === 1){
			sauce.usersLiked.push(req.body.userId);
			likeSauce = ({
				likes: ++sauce.likes,
				usersLiked: sauce.usersLiked,
			});
		} else if(req.body.like === -1) {
			likeSauce = ({
				$push: { usersDisliked: req.body.userId },
				$inc: { dislikes: +1 },
			});
		} else if (req.body.like === -0 && sauce.usersLiked.includes(req.body.userId)){
			likeSauce = ({
				$pull: { usersLiked: req.body.userId },
				$inc: { likes: -1 },
			});
		} else if (req.body.like === -0 && sauce.usersDisliked.includes(req.body.userId)){
			likeSauce = ({
				$pull: { usersDisliked: req.body.userId },
				$inc: { dislikes: -1 },
			});
		} else {
			console.log('Likes are being hacked!  Sweet');
			res.status(201).json({
				message: 'opps'
			});
		}
		Sauce.updateOne({_id: req.params.id}, likeSauce).then(()=> {
		
			res.status(201).json({
				message: 'Sauce updated'
			});
		}).catch((error) => {
			res.status(400).json({
				error: error
			});
		});
	});
};
