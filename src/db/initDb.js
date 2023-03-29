var mongoose = require('mongoose');
require('dotenv').config();


// Database connection

mongoose
  .connect(process.env.MONGODBURI, {
    dbName: process.env.MONGODBNAME,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((data) => {
    console.log('MongoDB connected successfully.....');
  })
  .catch((err) => {
    console.error('Error in connecting database....', err);
  }); 

/* 
  const mysql = require("mysql");
  const connection = mysql.createConnection({ 
    host: "localhost", // host for connection
    port: 3306, // default port for mysql is 3306
    database: "test", // database from which we want to connect out node application 
    user: "root", // username of the mysql connection 
    password: "root" // password of the mysql connection
   });

   connection.connect(function (err) {
    if(err){
        console.log("error occurred while connecting");
    }
    else{
        console.log("connection created with Mysql successfully");
    }
 }); */