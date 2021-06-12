
const express = require('express');
const path = require('path');
const  router = require('./routes');

const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
require("dotenv").config();

/* App variables */
const url = 'mongodb://localhost:27017/ida'
const app = express();
const port = 3001;

 //Connecting with Mongodb serve
  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then((db)=>{
      console.log("Succesfully connected to mongodb server");
  },(err)=>console.log(err));


  
  
 
  app.use(express.static(__dirname + "/public"));
  app.options('*', cors());
  app.use(cors());
  app.use(morgan('tiny'));
  app.use(express.json());

  /* intilizibg endpoint*/
  app.use('/users',router);


    //Listening to Port

  app.listen(port,()=>{
    console.log(`App is running at localhost:${port}`);
});




