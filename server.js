const express = require('express')
const app = express();
const db = require('./db');
require('dotenv').config();
const passport = require('./auth')
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

//middleWare function

const logRequest = (req,res,next)=>{
  console.log(`[${new Date().toLocaleString()}] Request Made to: ${req.originalUrl}`);
  next();
  
}



//calling the midleware
app.use(passport.initialize()); ///for password
 app.use(logRequest)       ///for logrequest

const localAuthMiddleware = passport.authenticate('local',{session:false});




app.get('/', localAuthMiddleware, function(req, res){
  res.send('welcome to our hotel');
  
})



const personRoutes = require('./routes/personRoutes')
app.use('/person',localAuthMiddleware,personRoutes);
const menuRoutes = require('./routes/menuRoutes')
app.use('/menu',menuRoutes);


app.listen(PORT, () =>{
  console.log(`Server running on port ${PORT}`);
  
})






