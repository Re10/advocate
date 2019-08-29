const express= require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const cors=require('cors');
//file include//

const db=require('./server/core');
const apiServer=require('./server/index');

const app=express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('uploads'));

app.use('/',apiServer.api);

app.use(function(req,res,next){
    res.status(404).json({status:'Page Not Found'}).end();
})

app.set('port',db.config.port);

const server=app.listen(app.get('port'),function(){
    console.log("Express Listening Port:"+server.address().port);
});


