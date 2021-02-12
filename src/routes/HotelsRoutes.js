var express = require('express');
var HotelRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017";
// var url = "mongodb+srv://dev:mongo123@cluster0.f8vmc.mongodb.net/aryabhat?retryWrites=true&w=majority";
var url = "mongodb+srv://admin:Shubham268@cluster0.r7fr0.mongodb.net/aryabhatta?retryWrites=true&w=majority"

function router(menu){
  HotelRouter.route('/')
      .get(function(req,res){
          // creating connection
          mongodb.connect(url,(err,connection)=>{
            if(err){
              res.status(500).send("Error While Connecting")
            }else{
              //connection got created and pass db name
              const dbo = connection.db('aryabhatta');
              //make find query to collection
              dbo.collection('hotels').find({}).toArray((err,data) => {
                if(err){
                  res.status(501).send("Error while fetching")
                }else{
                  res.render('hotel',{title:"Hotel Page",hoteldata:data,menu})
                }
              })
            }
          })
      })

  //http://localhost:8700/hotel/details
  HotelRouter.route('/details/:id')
      .get(function(req,res){
        //var id = req.params.id
        var {id} = req.params
        mongodb.connect(url,(err,connection) => {
          if(err){
            res.status(500).send("Error while connecting")
          }else{
            const dbo = connection.db('aryabhatta')
            dbo.collection('hotels').findOne({_id:id},(err,data)=>{
              if(err){
                res.status(501).send("Error while fetching")
              }else{
                res.render('hotelDetails',{title:"Hotel Details Page",hoteldata:data,menu})
              }
            })
          }
        })
      })
    
   return HotelRouter
}

module.exports = router;