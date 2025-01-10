const express = require('express')
const app = express();
const db = require('./db');
const Person = require("./models/Person");
const Menu = require("./models/Menu")
require('dotenv').config();


const bodyParser = require('body-parser');
app.use(bodyParser.json());



app.get('/', function(req, res){
  res.send('welcome to our hotel');
  
})


///post method for menuitem

app.post('/menu',async (req,res)=>{


  try{
    const data = req.body;
    const newMenu = new Menu(data);
    const response = await newMenu.save();
    console.log('data saved');
    res.status(200).json(response);
    

  }
  catch(err){
         console.log(err);
         res.status(500).json({error:'internal server error'});
         
  }
})

//get method for menu item
app.get('/menu',async (req,res) => {
  try{

    const data = await Menu.find();
    console.log('data fetched');
         res.status(200).json(data);

  }
  catch(err){
    console.log(err);
    res.status(500).json({error:"internal error"})

  }

})


const personRoutes = require('./routes/personRoutes')
app.use('/person',personRoutes);
const menuRoutes = require('./routes/menuRoutes')
app.use('/menu',menuRoutes);


const PORT = process.env.PORT || 3001;

app.listen(PORT, () =>{
  console.log(`Server running on port ${PORT}`);
  
})






