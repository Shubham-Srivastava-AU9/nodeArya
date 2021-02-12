var express = require("express");
var CityRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";



var city = [
    {
      "_id": 1,
      "city_name": "Delhi",
      "city": 1,
      "country_name": "India"
    },
    {
      "_id": 3,
      "city_name": "Pune",
      "city": 3,
      "country_name": "India"
    },
    {
      "_id": 2,
      "city_name": "Mumbai",
      "city": 2,
      "country_name": "India"
    },
    {
      "_id": 4,
      "city_name": "Chandigarh",
      "city": 4,
      "country_name": "India"
    },
    {
      "_id": 5,
      "city_name": "Goa",
      "city": 5,
      "country_name": "India"
    },
    {
      "_id": 6,
      "city_name": "Manali",
      "city": 6,
      "country_name": "India"
    }
  ]

var menu = [
    {link :"/",page : "home"},
    {link:"/city",page:"city"},
    {link:"/hotels",page:"hotel"}
]
function route(menu){
  CityRouter.route('/')
  .get(function(req,res){
    mongodb.connect(url,(err,connetcion)=>{
      if(err){
        res.status(501).send('eror in connecting')
      }else{
        const dbo=connetcion.db('aryabhatta')
        dbo.collection('city').find({}).toArray((err,molu)=>{
          if(err){
            res.status(502).send('eror i n fetching')
          }else{
            res.render('city',{title:'city page',menu:menu})
          }
        })
      }
    })

    //   res.send(city)
  });
  CityRouter.route('/details/:id')
  .get(function(req,res){
      var id =req.params.id
      var name =req.query.name
      res.send(`city details >>>${id} & ${name}`)
  })
  return CityRouter
}
  module.exports = route;