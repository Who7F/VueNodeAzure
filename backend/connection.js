require("dotenv").config();

const Connection = require('tedious').Connection;  
const config = {  
    server: process.env.AZURE_DATABASE_NAME,  
    authentication: {
        type: 'default',
        options: {
			trustedConnection: true,
                userName: process.env.AZURE_DATABASE_USER, 
                password: process.env.AZURE_DATABASE_PASSWORD  
        }
    },
    options: {
        // If you are on Microsoft Azure, you need encryption:
		rowCollectionOnDone: true,
        encrypt: true,
        database: 'mydatabase'
    }
}; 
const connection = new Connection(config);  
connection.on('connect', function(err) { 
	if(err){
		console.log(err)
	}
        // If no error, then good to proceed.
    console.log("Connected");  
});
module.exports = connection