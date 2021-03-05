const config = require('../config/index');

var mongo = require('mongodb');
var mongodb = require('mongodb').MongoClient;

var dbu;
var ObjectID = require('mongodb').ObjectID;

mongodb.connect(config.host, function(err, db) {
    if (err) throw err;
    console.log("Database connected");    
    dbu = db.db(config.database);
  });


function getQuery(type, data, res){
    switch(type){
        case "create":
         return create(data);
         break;
         case "edit":
             return edit(data);
            break;
        case "list":
           return list();
           break;
        case "delete":
            return remove(data);
         break; 
         case "search":
            break;         
       default:
          break;
    }


    function create(data){
        dbu.collection(config.collection).insertOne(data, function(err, result){
            if(err || ! result){
                callbackResult({status:0, error: err})
            }else{
                callbackResult({status:1, result :1})
            }
       })
    }

    function edit(data){        
        var query = { _id: ObjectID(data._id) };
        console.log("query =",query);
        var toUpdate = { $set: {title: data.title, content: data.content } };
            dbu.collection(config.collection).updateOne(query, toUpdate,function(err, result){
                if(err || ! result){
                console.log(err); 
                //callbackResult({status:0})
                return {status:0};
                }else{
                console.log("has result",result);
                return {status: 1, updated:1}
                //callbackResult({status:1, result: 1})
                }
        })
    }

    function list(){
        dbu.collection(config.collection).find().toArray(function(err, result){
            if(err || ! result){
               console.log(err); 
               callbackResult({status:0})
            }else{
               
               let temp = result == [] ? null : result;
               console.log("has result",temp);
               callbackResult({status:1, result: temp})
            }
       })
    }

    function remove(data){
        dbu.collection(config.collection).deleteOne({_id: ObjectID(data)}, function(err, result){
            if(err)  callbackResult({status:1, error:err});            
                        
            return {status:1, result:1}
            
        })
    }
    
    function callbackResult(result){ 
        res.send(result);
    }
}

module.exports = {
    getQuery 

}
