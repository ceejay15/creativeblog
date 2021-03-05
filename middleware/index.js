const app = require('express')();// use express server to run node
var cors = require('cors');
const config = require('./config');
app.use(cors())  // use CORS
var fs   = require('fs');

var bodyParser = require('body-parser');
const query = require('./query/query');
app.use(bodyParser.urlencoded({ extended: true }));// parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
require('./config/index');
require('./query/query');


// app.post('/create', bodyParser.json(), function(req,res){
//    query.getQuery("create", req.body); 
// })

app.post('/create', bodyParser.json(), function(req,res){   
    query.getQuery("create", req.body,res);    
})

app.get('/list', bodyParser.json(), function(req,res){   
    query.getQuery("list", {},res);    
})

app.post('/edit', bodyParser.json(), function(req,res){ 

    console.log(req.body)
   
  let tmp =  query.getQuery("edit", req.body);
  res.send({status:1, message: tmp});
    
})

app.post('/remove', bodyParser.json(), function(req,res){
      
    //console.log('hello',req.body);
  query.getQuery("delete", req.body._id);
  res.send({status:1})
  
 })
 
//make app listen to port 
app.listen(config.port, () => console.log(`Middleware started listening on port ${config.port}! CORS ENABLE!`))