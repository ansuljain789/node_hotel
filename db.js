const mongoose = require('mongoose'); /// import mongoose 
// define the mongoDb connection URL

const mongoUrl = 'mongodb://localhost:27017/hotels' //here hotels is the database name 

//setup mongodb connection
mongoose.connect(mongoUrl,{
    useNewUrlParser:true,
    useUnifiedTopology: true
})

const db =mongoose.connection;
db.on('connected',()=>{
    console.log("mongoDb connected");
    
});
db.on('error',(err)=>{
    console.log("mongodb connection error",err);
});
db.on('disconnected',()=>{
    console.log("mongodb disconnedted");
    
});

///export the databaase connection
module.exports = db;