var express = require('express');
var app = express();
// var port = 3000;
var port = process.env.PORT || 3000

// var menu = [
//     {link : './', to: 'home'},
//     {link : '/city' ,to: 'city'},
//     {link : '/hotels',to:'hotel'}

// ]
// var HotelRouter = require('./src/routes/HotelsRoutes')(menu);
// var cityRouter = require('./src/routes/CityRoutes')(menu);

var menu = [
    {link :"/",page : "home"},
    {link:"/city",page:"city"},
    {link:"/hotels",page:"hotel"},
    {link:"/aboutUs",page:"Aboutus"}
]
var HotelRouter = require('./src/routes/HotelsRoutes')(menu);
var CityRouter = require('./src/routes/CityRoutes')(menu);

app.get('/',function(req,res){

    // res.send("hi from express")
    res.render('index',{title:"page",menu:menu})

} );

//for the statics file like CSS

app.use(express.static(__dirname+'/public'));

//html files >>set the path>>for our display thing look in views
app.set('views','./src/views')
//view engine
app.set('view engine','ejs')

app.use('/city',CityRouter);
app.use('/hotels',HotelRouter);


app.listen(port,function(err){
    if (err) throw err;
    console.log(`server is running on ${port}`)

})