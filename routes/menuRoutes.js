const express = require('express');
const Menu = require("../models/Menu");
const router = express.Router();


///post method for menuitem

router.post('/',async (req,res)=>{


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
  router.get('/',async (req,res) => {
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

  router.get('./:tasteType',async(req,res)=>{
    try{
              

        const tasteType = req.params.tasteType;
        if(tasteType=='sweet' || tasteType =='spicy' || tasteType=='sour'){
            const response = await Menu.find({taste:tasteType});
            console.log('response fetched');
            res.status(200).json(response);
            
        }
    }
    catch(err){
        res.status(500).json({error:'invalid taste type'});
    }
  })

  module.exports= router