const express = require('express');

const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const config = require('./config');

const uesrRoutes = require('./routes/user');

const app = express();

app.use(bodyParser.urlencoded({ extended : true}));//form data
app.use(bodyParser.json());//application/json

//cors headers settings
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });
  
app.use('/api/user',uesrRoutes);

app.use((error,req,res,next)=>{
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({
        message:message
    });
})

mongoose.connect(config.database);
 var port = process.env.Port || 8080; //normal db connection

app.listen(port,function(){
    console.log('connected succesfully!',port) 
});